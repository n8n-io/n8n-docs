import { z } from "zod";
import type { AuditLog } from "../audit/audit-log.ts";
import type { Database } from "../core/db.ts";
import { transaction } from "../core/db.ts";
import type { HumanDirectory } from "../core/directory.ts";
import { PlatformError } from "../core/errors.ts";
import { hashObject, type Clock } from "../core/util.ts";
import { verifyHumanAction, type ApproverKeyRegistry, type HumanActionProof } from "../identity/approver-keys.ts";
import type { AgentDefinition } from "./agent-definition.ts";

/**
 * سجل الوكلاء التشغيلي: الإصدار، والحالة، ومستوى الاستقلالية الفعلي.
 *
 * - **البصمة (definitionHash):** تغطي كل ما يحدد سلوك الوكيل وصلاحياته: الأدوات وصلاحياتها، والحواجز،
 *   والبروموت، وسياسة الذاكرة، ومخطط المخرج، والإحالات، والحدود. أي تغيير يُسجَّل في audit كإصدار جديد.
 * - **الحالة:** فقط ACTIVE يطالب بمهام ويستدعي أدوات. PAUSED يوقف الوكيل وحده فورًا (جراحيًا) دون
 *   إيقاف المنظومة كلها، وتبقى مهامه في الطابور.
 * - **الاستقلالية:** المستوى الفعلي = الأدنى بين تعريف الوكيل وما يحدده المشغّل. خفضها فوري ولا يحتاج
 *   توقيعًا (fail-safe)، ورفعها أو إعادة التفعيل يحتاج توقيع platform_operator.
 */

export const AGENT_STATUSES = ["CREATED", "CONFIGURED", "VALIDATED", "DEPLOYED", "ACTIVE", "PAUSED", "STOPPED", "ARCHIVED"] as const;
export type AgentStatus = (typeof AGENT_STATUSES)[number];

/** انتقالات دورة الحياة المسموحة. أي انتقال آخر يُرفض. */
export const AGENT_TRANSITIONS: Record<AgentStatus, AgentStatus[]> = {
  CREATED: ["CONFIGURED", "ARCHIVED"],
  CONFIGURED: ["VALIDATED", "ARCHIVED"],
  VALIDATED: ["DEPLOYED", "CONFIGURED", "ARCHIVED"],
  DEPLOYED: ["ACTIVE", "STOPPED"],
  ACTIVE: ["PAUSED", "STOPPED"],
  PAUSED: ["ACTIVE", "STOPPED"],
  STOPPED: ["DEPLOYED", "ARCHIVED"],
  ARCHIVED: [],
};

/**
 * مستويات الاستقلالية وما تسمح به من صلاحيات أدوات:
 * 0 مراقبة (read)، 1 توصية (read مع التصعيد والذاكرة)، 2 تنفيذ منخفض المخاطر (+write)،
 * 3 سير عمل بموافقات (+طلب approval)، 4 ممتد (مثل 3 مع حدود أعلى).
 * لا مستوى يتجاوز الموافقة البشرية أو الإيقاف الطارئ: طلب approval لا يُنفَّذ إلا بقرار موقّع.
 */
export type AutonomyLevel = 0 | 1 | 2 | 3 | 4;
export const AutonomySchema = z.union([z.literal(0), z.literal(1), z.literal(2), z.literal(3), z.literal(4)]);
const BUILTIN_ESCALATION_TOOLS = new Set(["escalate_to_human", "memory_recall", "memory_remember"]);

export function permittedByAutonomy(level: AutonomyLevel, permission: "read" | "write" | "approval", toolName: string): boolean {
  if (permission === "read") return true;
  if (level >= 1 && BUILTIN_ESCALATION_TOOLS.has(toolName)) return true;
  if (permission === "write") return level >= 2;
  return level >= 3;
}

export interface AgentRecord {
  agentId: string;
  version: string;
  definitionHash: string;
  status: AgentStatus;
  autonomyOverride: AutonomyLevel | null;
  updatedAt: string;
  updatedBy: string;
  note: string;
}

/** البصمة القانونية لتعريف الوكيل. لا تشمل الدوال (المعالجات)، بل كل ما يحدد العقد والصلاحيات. */
export function definitionFingerprint(a: AgentDefinition): string {
  return hashObject({
    id: a.id, version: a.version ?? "0.0.0", autonomyLevel: a.autonomyLevel ?? 3,
    tools: a.tools.map((t) => ({ name: t.name, permission: t.permission, action: t.irreversible?.action ?? null, roles: t.irreversible?.roles ?? null, input: z.toJSONSchema(t.input, { io: "input" }) })),
    guardrails: a.guardrails.map((g) => ({ id: g.id, appliesTo: g.appliesTo })),
    prompt: hashObject(a.systemPrompt), memory: a.memory, handles: a.handles, canHandoffTo: a.canHandoffTo,
    maxToolCalls: a.maxToolCalls, timeoutMs: a.timeoutMs ?? null, dailyBudgetUsd: a.dailyBudgetUsd ?? null, output: z.toJSONSchema(a.outputSchema, { io: "input" }),
    defaultEscalationRole: a.defaultEscalationRole, outcomeGuard: Boolean(a.outcomeGuard),
  });
}

export class AgentRegistry {
  constructor(
    private readonly db: Database,
    private readonly audit: AuditLog,
    private readonly directory: HumanDirectory,
    private readonly clock: Clock,
    private readonly auth: { mode: "signed" | "trusted"; keys: ApproverKeyRegistry },
  ) {
    db.exec(`
      CREATE TABLE IF NOT EXISTS agent_registry (
        agent_id TEXT PRIMARY KEY, version TEXT NOT NULL, definition_hash TEXT NOT NULL, status TEXT NOT NULL,
        autonomy_override INTEGER, updated_at TEXT NOT NULL, updated_by TEXT NOT NULL, note TEXT NOT NULL
      );
    `);
  }

  /**
   * يُستدعى عند تسجيل الوكيل في المنصة. الوكيل الجديد يُنشأ ACTIVE (تشغيل التطوير)، أو ينتظر النشر عند
   * requireDeploy. تغيير البصمة يُسجَّل في audit كإصدار جديد، ولا يغيّر الحالة التي قررها إنسان (PAUSED/STOPPED).
   */
  sync(a: AgentDefinition, requireDeploy: boolean): AgentRecord {
    return transaction(this.db, () => {
      const hash = definitionFingerprint(a);
      const version = a.version ?? "0.0.0";
      const existing = this.find(a.id);
      const now = this.clock.now().toISOString();
      if (!existing) {
        const status: AgentStatus = requireDeploy ? "VALIDATED" : "ACTIVE";
        this.db.prepare("INSERT INTO agent_registry VALUES (?, ?, ?, ?, NULL, ?, 'system:boot', 'registered')").run(a.id, version, hash, status, now);
        this.audit.append({ actor: { type: "system", id: "agent-registry" }, action: "agent.registered", target: a.id, outcome: "success", data: { version, definitionHash: hash, status } });
        return this.find(a.id)!;
      }
      if (existing.definitionHash !== hash) {
        const status: AgentStatus = existing.status === "PAUSED" || existing.status === "STOPPED" ? existing.status : requireDeploy ? "VALIDATED" : "ACTIVE";
        this.db.prepare("UPDATE agent_registry SET version = ?, definition_hash = ?, status = ?, updated_at = ?, updated_by = 'system:boot', note = 'definition changed' WHERE agent_id = ?").run(version, hash, status, now, a.id);
        this.audit.append({ actor: { type: "system", id: "agent-registry" }, action: "agent.definition_changed", target: a.id, outcome: "info", data: { fromVersion: existing.version, toVersion: version, fromHash: existing.definitionHash, toHash: hash, status } });
      }
      return this.find(a.id)!;
    });
  }

  find(agentId: string): AgentRecord | null {
    const r = this.db.prepare("SELECT * FROM agent_registry WHERE agent_id = ?").get(agentId) as Record<string, unknown> | undefined;
    if (!r) return null;
    return {
      agentId: String(r.agent_id), version: String(r.version), definitionHash: String(r.definition_hash), status: r.status as AgentStatus,
      autonomyOverride: r.autonomy_override === null ? null : (Number(r.autonomy_override) as AutonomyLevel),
      updatedAt: String(r.updated_at), updatedBy: String(r.updated_by), note: String(r.note),
    };
  }

  list(): AgentRecord[] {
    return (this.db.prepare("SELECT agent_id FROM agent_registry ORDER BY agent_id").all() as Array<{ agent_id: string }>).map((r) => this.find(r.agent_id)!);
  }

  isActive(agentId: string): boolean {
    return this.find(agentId)?.status === "ACTIVE";
  }

  effectiveAutonomy(a: AgentDefinition): AutonomyLevel {
    const declared = a.autonomyLevel ?? 3;
    const override = this.find(a.id)?.autonomyOverride;
    return (override === null || override === undefined ? declared : Math.min(declared, override)) as AutonomyLevel;
  }

  /**
   * تغيير حالة وكيل. التوقيف (PAUSED/STOPPED) لا يحتاج توقيعًا ويملكه أي platform_operator أو cfo أو ciso.
   * التفعيل والنشر يحتاجان platform_operator وتوقيعه (agent.activate/v1).
   */
  setStatus(agentId: string, to: AgentStatus, humanId: string, note: string, proof?: HumanActionProof): AgentRecord {
    if (!note.trim()) throw new PlatformError("INVALID_INPUT", "A lifecycle change requires a note");
    return transaction(this.db, () => {
      const rec = this.find(agentId) ?? (() => { throw new PlatformError("NOT_FOUND", `Agent ${agentId} not registered`); })();
      const roles = this.directory.get(humanId).roles;
      const stopping = to === "PAUSED" || to === "STOPPED" || to === "ARCHIVED";
      if (stopping && !roles.some((r) => r === "platform_operator" || r === "cfo" || r === "ciso"))
        throw new PlatformError("UNAUTHORIZED_APPROVER", "Pausing or stopping an agent requires platform_operator, cfo or ciso");
      if (!AGENT_TRANSITIONS[rec.status].includes(to)) throw new PlatformError("INVALID_TRANSITION", `Agent ${agentId}: ${rec.status} → ${to} is not allowed`);
      if (!stopping) {
        if (!roles.includes("platform_operator")) throw new PlatformError("UNAUTHORIZED_APPROVER", "Activating or deploying an agent requires platform_operator");
        this.authenticate(humanId, agentId, { to, note }, proof);
      }
      this.db.prepare("UPDATE agent_registry SET status = ?, updated_at = ?, updated_by = ?, note = ? WHERE agent_id = ? AND status = ?").run(to, this.clock.now().toISOString(), humanId, note, agentId, rec.status);
      this.audit.append({ actor: { type: "human", id: humanId }, action: "agent.status", target: agentId, outcome: "success", data: { from: rec.status, to, note, definitionHash: rec.definitionHash } });
      return this.find(agentId)!;
    });
  }

  /** خفض الاستقلالية فوري بلا توقيع. رفعها (أو إزالة القيد) يحتاج platform_operator وتوقيعه. */
  setAutonomy(agentId: string, level: AutonomyLevel | null, humanId: string, note: string, proof?: HumanActionProof): AgentRecord {
    if (!note.trim()) throw new PlatformError("INVALID_INPUT", "An autonomy change requires a note");
    return transaction(this.db, () => {
      const rec = this.find(agentId) ?? (() => { throw new PlatformError("NOT_FOUND", `Agent ${agentId} not registered`); })();
      const roles = this.directory.get(humanId).roles;
      const lowering = level !== null && (rec.autonomyOverride === null || level < rec.autonomyOverride);
      if (lowering) {
        if (!roles.some((r) => r === "platform_operator" || r === "cfo" || r === "ciso")) throw new PlatformError("UNAUTHORIZED_APPROVER", "Lowering autonomy requires platform_operator, cfo or ciso");
      } else {
        if (!roles.includes("platform_operator")) throw new PlatformError("UNAUTHORIZED_APPROVER", "Raising autonomy requires platform_operator");
        this.authenticate(humanId, agentId, { autonomy: level, note }, proof);
      }
      this.db.prepare("UPDATE agent_registry SET autonomy_override = ?, updated_at = ?, updated_by = ?, note = ? WHERE agent_id = ?").run(level, this.clock.now().toISOString(), humanId, note, agentId);
      this.audit.append({ actor: { type: "human", id: humanId }, action: "agent.autonomy", target: agentId, outcome: "success", data: { from: rec.autonomyOverride, to: level, note } });
      return this.find(agentId)!;
    });
  }

  private authenticate(humanId: string, agentId: string, details: unknown, proof?: HumanActionProof): void {
    if (this.auth.mode !== "signed") return;
    verifyHumanAction(this.auth.keys, this.clock, proof, { purpose: "agent.activate/v1", humanId, subject: agentId, details });
  }
}
