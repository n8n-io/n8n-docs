import { createHash, createPrivateKey, createPublicKey, generateKeyPairSync, sign, verify, type KeyObject } from "node:crypto";
import type { AuditLog } from "../audit/audit-log.ts";
import type { Database } from "../core/db.ts";
import { transaction } from "../core/db.ts";
import type { HumanDirectory } from "../core/directory.ts";
import { PlatformError } from "../core/errors.ts";
import { canonicalJson, hashObject, type Clock } from "../core/util.ts";

/**
 * هوية الموافق ومصدر القرار (approval provenance) — إصلاح R7.
 *
 * كل إنسان يقرر في الموافقات يملك زوج مفاتيح Ed25519. المنصة تخزّن المفتاح العام فقط.
 * القرار يُوقَّع على: معرّف الطلب، والقرار، وhash الحمولة الدقيقة، والتعليق، والوقت.
 * النتيجة:
 * - لا يمكن انتحال موافق دون مفتاحه الخاص. `--as` وحده لم يعد كافيًا.
 * - التوقيع صالح لهذا الإجراء بهذه المعاملات فقط. أي تغيير في الحمولة يُبطله (ربط بالـ payloadHash).
 * - إعادة استخدام التوقيع على طلب آخر مستحيلة (ربط بالـ approvalId)، وعلى الطلب نفسه يمنعها SoD.
 * - التوقيع مخزّن في سجل القرار، فيمكن التحقق منه لاحقًا بشكل مستقل (non-repudiation).
 *
 * حدود معروفة (THREAT_MODEL.md): تسجيل المفاتيح يتم عبر platform_operator، فمن يملك هذا الدور
 * يستطيع تسجيل مفتاح باسم شخص آخر. كل تسجيل يُسجَّل في audit ويظهر في تنبيه، والحل الجذري ربط
 * المفاتيح بمزود الهوية (Okta/SSO مع WebAuthn)، وهذا مخطط.
 */

export const DECISION_PURPOSE = "approval-decision/v1";
export const MAX_CLOCK_SKEW_MS = 5 * 60_000;

export interface DecisionProof {
  approvalId: string;
  humanId: string;
  decision: "approve" | "reject";
  payloadHash: string;
  comment: string;
  issuedAt: string;
  /** توقيع Ed25519 بترميز base64 على الرسالة القانونية. */
  signature: string;
}

export type UnsignedDecision = Omit<DecisionProof, "signature">;

export function decisionMessage(d: UnsignedDecision): Buffer {
  return Buffer.from(canonicalJson({ purpose: DECISION_PURPOSE, ...d }));
}

export function signDecision(privateKey: KeyObject | string, d: UnsignedDecision): DecisionProof {
  const key = typeof privateKey === "string" ? createPrivateKey(privateKey) : privateKey;
  return { ...d, signature: sign(null, decisionMessage(d), key).toString("base64") };
}

export function fingerprint(publicKeyPem: string): string {
  const der = createPublicKey(publicKeyPem).export({ type: "spki", format: "der" });
  return `SHA256:${createHash("sha256").update(der).digest("base64").replace(/=+$/, "")}`;
}

export function generateApproverKeyPair(): { publicKeyPem: string; privateKeyPem: string } {
  const { publicKey, privateKey } = generateKeyPairSync("ed25519");
  return {
    publicKeyPem: publicKey.export({ type: "spki", format: "pem" }).toString(),
    privateKeyPem: privateKey.export({ type: "pkcs8", format: "pem" }).toString(),
  };
}

/**
 * إثبات موقّع لقرار بشري غير الموافقة (T17): تبرئة تطابق عقوبات، وحل تصعيد، ورفع إيقاف طارئ، واستئناف.
 * المبدأ: الإيقاف سهل دائمًا ولا يحتاج توقيعًا (fail-safe)، وكل ما يفتح أو يستأنف عملية يحتاج توقيعًا.
 * التوقيع يغطي الغرض (purpose) والموضوع (subject) وhash التفاصيل، فلا يُعاد استخدامه لغرض أو موضوع آخر.
 */
export const HUMAN_ACTIONS = ["compliance.resolve_match/v1", "task.resolve_escalation/v1", "ops.release_stop/v1", "ops.resume_approved/v1", "agent.activate/v1"] as const;
export type HumanActionPurpose = (typeof HUMAN_ACTIONS)[number];

export interface HumanActionProof {
  purpose: HumanActionPurpose;
  humanId: string;
  subject: string;
  detailsHash: string;
  issuedAt: string;
  signature: string;
}

export type UnsignedAction = Omit<HumanActionProof, "signature">;

function actionMessage(a: UnsignedAction): Buffer {
  return Buffer.from(canonicalJson({ kind: "human-action", ...a }));
}

export function signAction(privateKey: KeyObject | string, a: Omit<UnsignedAction, "detailsHash"> & { details: unknown }): HumanActionProof {
  const key = typeof privateKey === "string" ? createPrivateKey(privateKey) : privateKey;
  const { details, ...rest } = a;
  const unsigned: UnsignedAction = { ...rest, detailsHash: hashObject(details) };
  return { ...unsigned, signature: sign(null, actionMessage(unsigned), key).toString("base64") };
}

export interface RegisteredKey {
  humanId: string;
  publicKeyPem: string;
  fingerprint: string;
  registeredBy: string;
  registeredAt: string;
  revokedAt: string | null;
}

export class ApproverKeyRegistry {
  constructor(
    private readonly db: Database,
    private readonly audit: AuditLog,
    private readonly directory: HumanDirectory,
    private readonly clock: Clock,
  ) {
    db.exec(`
      CREATE TABLE IF NOT EXISTS human_keys (
        fingerprint TEXT PRIMARY KEY, human_id TEXT NOT NULL, public_key_pem TEXT NOT NULL,
        registered_by TEXT NOT NULL, registered_at TEXT NOT NULL, revoked_at TEXT
      );
      CREATE INDEX IF NOT EXISTS idx_human_keys_human ON human_keys(human_id);
    `);
  }

  /**
   * تسجيل مفتاح عام لإنسان. يتطلب platform_operator، ويُبطل أي مفتاح سابق للشخص نفسه (مفتاح نشط واحد).
   * system:bootstrap مسموح فقط لتهيئة بيئات الاختبار والتطوير، ويُسجَّل كذلك.
   */
  register(humanId: string, publicKeyPem: string, registeredBy: string): RegisteredKey {
    this.directory.get(humanId);
    if (registeredBy !== "system:bootstrap" && !this.directory.get(registeredBy).roles.includes("platform_operator"))
      throw new PlatformError("UNAUTHORIZED_APPROVER", "Only a platform_operator can register approver keys");
    const key = createPublicKey(publicKeyPem);
    if (key.asymmetricKeyType !== "ed25519") throw new PlatformError("INVALID_INPUT", "Approver keys must be Ed25519");
    const fp = fingerprint(publicKeyPem);
    const now = this.clock.now().toISOString();
    return transaction(this.db, () => {
      this.db.prepare("UPDATE human_keys SET revoked_at = ? WHERE human_id = ? AND revoked_at IS NULL").run(now, humanId);
      this.db.prepare("INSERT INTO human_keys VALUES (?, ?, ?, ?, ?, NULL)").run(fp, humanId, publicKeyPem, registeredBy, now);
      this.audit.append({ actor: { type: registeredBy.startsWith("system:") ? "system" : "human", id: registeredBy }, action: "identity.key_registered", target: humanId, outcome: "success", data: { fingerprint: fp } });
      return { humanId, publicKeyPem, fingerprint: fp, registeredBy, registeredAt: now, revokedAt: null };
    });
  }

  revoke(humanId: string, revokedBy: string): number {
    if (!this.directory.get(revokedBy).roles.includes("platform_operator") && revokedBy !== humanId)
      throw new PlatformError("UNAUTHORIZED_APPROVER", "Only a platform_operator or the key owner can revoke a key");
    const res = this.db.prepare("UPDATE human_keys SET revoked_at = ? WHERE human_id = ? AND revoked_at IS NULL").run(this.clock.now().toISOString(), humanId);
    this.audit.append({ actor: { type: "human", id: revokedBy }, action: "identity.key_revoked", target: humanId, outcome: "success", data: { revoked: Number(res.changes) } });
    return Number(res.changes);
  }

  activeKey(humanId: string): RegisteredKey | null {
    const r = this.db.prepare("SELECT * FROM human_keys WHERE human_id = ? AND revoked_at IS NULL").get(humanId) as Record<string, string> | undefined;
    return r ? { humanId: r.human_id!, publicKeyPem: r.public_key_pem!, fingerprint: r.fingerprint!, registeredBy: r.registered_by!, registeredAt: r.registered_at!, revokedAt: null } : null;
  }

  list(): RegisteredKey[] {
    return (this.db.prepare("SELECT * FROM human_keys ORDER BY registered_at").all() as Array<Record<string, string | null>>).map((r) => ({
      humanId: r.human_id!, publicKeyPem: r.public_key_pem!, fingerprint: r.fingerprint!, registeredBy: r.registered_by!, registeredAt: r.registered_at!, revokedAt: r.revoked_at ?? null,
    }));
  }

  /**
   * يتحقق من إثبات القرار مقابل الطلب الفعلي. يرمي AUTHENTICATION_FAILED مع السبب.
   * يعيد بصمة المفتاح المستخدم لتُخزَّن في سجل القرار.
   */
  verifyDecision(proof: DecisionProof | undefined, expected: UnsignedDecision): string {
    const fail = (why: string): never => {
      throw new PlatformError("AUTHENTICATION_FAILED", `Decision signature rejected: ${why}`);
    };
    if (!proof) return fail("missing signed decision proof");
    for (const k of ["approvalId", "humanId", "decision", "payloadHash", "comment"] as const)
      if (proof[k] !== expected[k]) fail(`${k} does not match the request being decided`);
    const skew = Math.abs(this.clock.now().getTime() - new Date(proof.issuedAt).getTime());
    if (!Number.isFinite(skew) || skew > MAX_CLOCK_SKEW_MS) fail(`issuedAt outside the ${MAX_CLOCK_SKEW_MS / 60_000}-minute window`);
    const key = this.activeKey(proof.humanId) ?? fail(`no active key registered for ${proof.humanId}`);
    const { signature, ...unsigned } = proof;
    let ok = false;
    try {
      ok = verify(null, decisionMessage(unsigned), createPublicKey(key.publicKeyPem), Buffer.from(signature, "base64"));
    } catch {
      ok = false;
    }
    if (!ok) fail("invalid signature");
    return key.fingerprint;
  }
}

/**
 * التحقق من قرار بشري موقّع (غير الموافقة). يعيد بصمة المفتاح.
 */
export function verifyHumanAction(
  registry: ApproverKeyRegistry,
  clock: Clock,
  proof: HumanActionProof | undefined,
  expected: { purpose: HumanActionPurpose; humanId: string; subject: string; details: unknown },
): string {
  const fail = (why: string): never => {
    throw new PlatformError("AUTHENTICATION_FAILED", `${expected.purpose} signature rejected: ${why}`);
  };
  if (!proof) return fail("missing signed proof");
  if (proof.purpose !== expected.purpose) fail("purpose mismatch");
  if (proof.humanId !== expected.humanId) fail("humanId mismatch");
  if (proof.subject !== expected.subject) fail("subject mismatch");
  if (proof.detailsHash !== hashObject(expected.details)) fail("details do not match what was signed");
  const skew = Math.abs(clock.now().getTime() - new Date(proof.issuedAt).getTime());
  if (!Number.isFinite(skew) || skew > MAX_CLOCK_SKEW_MS) fail("issuedAt outside the allowed window");
  const key = registry.activeKey(proof.humanId) ?? fail(`no active key registered for ${proof.humanId}`);
  const { signature, ...unsigned } = proof;
  let ok = false;
  try {
    ok = verify(null, actionMessage(unsigned), createPublicKey(key.publicKeyPem), Buffer.from(signature, "base64"));
  } catch {
    ok = false;
  }
  if (!ok) fail("invalid signature");
  return key.fingerprint;
}

/**
 * موقِّع للتطوير والاختبار: يولّد مفاتيح لكل البشر في الذاكرة ويسجّل مفاتيحها العامة.
 * لا يُستخدم في الإنتاج، حيث يحمل كل موافق مفتاحه الخاص على جهازه أو في جهاز أمان.
 */
export class DevSigner {
  private readonly keys = new Map<string, KeyObject>();
  constructor(registry: ApproverKeyRegistry, humanIds: string[]) {
    for (const id of humanIds) {
      const { publicKeyPem, privateKeyPem } = generateApproverKeyPair();
      registry.register(id, publicKeyPem, "system:bootstrap");
      this.keys.set(id, createPrivateKey(privateKeyPem));
    }
  }
  sign(d: UnsignedDecision): DecisionProof {
    return signDecision(this.key(d.humanId), d);
  }
  signAction(a: Omit<UnsignedAction, "detailsHash"> & { details: unknown }): HumanActionProof {
    return signAction(this.key(a.humanId), a);
  }
  private key(humanId: string): KeyObject {
    const k = this.keys.get(humanId);
    if (!k) throw new Error(`DevSigner has no key for ${humanId}`);
    return k;
  }
}
