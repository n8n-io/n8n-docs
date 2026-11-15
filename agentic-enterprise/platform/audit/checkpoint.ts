import { appendFileSync, existsSync, mkdirSync, readFileSync } from "node:fs";
import { dirname } from "node:path";
import { createPrivateKey, createPublicKey, sign as edSign, verify as edVerify, type KeyObject } from "node:crypto";
import { z } from "zod";
import type { Database } from "../core/db.ts";
import { canonicalJson } from "../core/util.ts";
import { fingerprint } from "../identity/approver-keys.ts";

/**
 * نقاط تحقق موقّعة لرأس سلسلة audit، تُصدَّر إلى شاهد خارجي (witness).
 *
 * لماذا: التثبيت الخارجي (ADR-008) لا يحمي من مهاجم يملك القاعدة وملف التثبيت ومفتاحه معًا؛ يستطيع إعادة كتابة
 * كل شيء بما فيه التثبيتات. نقطة التحقق المُرسلة إلى طرف ثالث (نظام لدى جهة أخرى، أو مخزن WORM خارج الحساب، أو
 * خدمة ختم زمني) لا يمكنه تعديلها بعد إرسالها. أي تاريخ أُعيدت كتابته قبل آخر نقطة مُصدَّرة يتعارض معها.
 *
 * التوقيع Ed25519 بمفتاح المنصة الخاص بنقاط التحقق (لا يُستخدم لغير ذلك)، فيستطيع الشاهد التحقق بالمفتاح العام فقط.
 */
export const CheckpointSchema = z.strictObject({
  v: z.literal(1),
  scope: z.string().min(1).max(64),
  seq: z.number().int().nonnegative(),
  hash: z.string().regex(/^[0-9a-f]{64}$/),
  ts: z.string(),
  keyFingerprint: z.string(),
  signature: z.string(),
});
export type Checkpoint = z.infer<typeof CheckpointSchema>;

const message = (c: Omit<Checkpoint, "signature">) => Buffer.from(canonicalJson({ purpose: "audit-checkpoint/v1", ...c }));

export function makeCheckpoint(db: Database, scope: string, privateKeyPem: string, now: Date): Checkpoint {
  const head = db.prepare("SELECT seq, hash FROM audit_log ORDER BY seq DESC LIMIT 1").get() as { seq: number; hash: string } | undefined;
  const key: KeyObject = createPrivateKey(privateKeyPem);
  const pub = createPublicKey(key).export({ type: "spki", format: "pem" }).toString();
  const body = { v: 1 as const, scope, seq: head ? Number(head.seq) : 0, hash: head?.hash ?? "0".repeat(64), ts: now.toISOString(), keyFingerprint: fingerprint(pub) };
  return { ...body, signature: edSign(null, message(body), key).toString("base64") };
}

export function checkpointSignatureValid(c: Checkpoint, publicKeyPem: string): boolean {
  const { signature, ...body } = c;
  if (fingerprint(publicKeyPem) !== c.keyFingerprint) return false;
  return edVerify(null, message(body), createPublicKey(publicKeyPem), Buffer.from(signature, "base64"));
}

export interface WitnessCheck {
  ok: boolean;
  checked: number;
  problems: string[];
}

/** يقارن السجل الحالي بنقاط التحقق التي يحتفظ بها الشاهد: كل نقطة يجب أن تطابق الصف عند رقمها. */
export function verifyAgainstCheckpoints(db: Database, checkpoints: Checkpoint[], publicKeyPem: string, scope?: string): WitnessCheck {
  const problems: string[] = [];
  let checked = 0;
  for (const c of checkpoints) {
    if (scope && c.scope !== scope) continue;
    checked++;
    if (!checkpointSignatureValid(c, publicKeyPem)) {
      problems.push(`checkpoint seq ${c.seq} (${c.ts}): invalid signature`);
      continue;
    }
    if (c.seq === 0) continue;
    const row = db.prepare("SELECT hash FROM audit_log WHERE seq = ?").get(c.seq) as { hash: string } | undefined;
    if (!row) problems.push(`checkpoint seq ${c.seq} (${c.ts}): event missing from audit log (truncation)`);
    else if (row.hash !== c.hash) problems.push(`checkpoint seq ${c.seq} (${c.ts}): hash differs (history rewritten)`);
  }
  return { ok: problems.length === 0, checked, problems };
}

/** مستقبِل نقاط التحقق: ملف JSONL (على مخزن WORM خارجي) أو عنوان HTTPS لدى الشاهد. */
export interface CheckpointSink {
  readonly kind: string;
  publish(c: Checkpoint): Promise<void>;
}

export class FileCheckpointSink implements CheckpointSink {
  readonly kind = "file";
  constructor(private readonly path: string) {
    mkdirSync(dirname(path), { recursive: true });
  }
  async publish(c: Checkpoint): Promise<void> {
    appendFileSync(this.path, JSON.stringify(c) + "\n", { mode: 0o600 });
  }
}

export class HttpCheckpointSink implements CheckpointSink {
  readonly kind = "http";
  constructor(
    private readonly url: string,
    private readonly fetchImpl: typeof fetch = fetch,
  ) {
    const u = new URL(url);
    const local = ["localhost", "127.0.0.1", "[::1]"].includes(u.hostname);
    if (u.protocol !== "https:" && !(local && u.protocol === "http:")) throw new Error("Witness URL must use https (http only for localhost)");
  }
  async publish(c: Checkpoint): Promise<void> {
    const res = await this.fetchImpl(this.url, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(c), redirect: "manual", signal: AbortSignal.timeout(10_000) });
    if (res.status < 200 || res.status >= 300) throw new Error(`Witness returned HTTP ${res.status}`);
  }
}

export function readCheckpointFile(path: string): Checkpoint[] {
  if (!existsSync(path)) return [];
  return readFileSync(path, "utf8").split("\n").filter((l) => l.trim()).map((l) => CheckpointSchema.parse(JSON.parse(l)));
}
