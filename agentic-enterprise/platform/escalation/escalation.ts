import type { AuditLog } from "../audit/audit-log.ts";
import type { Database } from "../core/db.ts";
import { parseJson, transaction } from "../core/db.ts";
import { PlatformError } from "../core/errors.ts";
import type { HumanRole, JsonObject } from "../core/types.ts";
import { newId, type Clock } from "../core/util.ts";

/**
 * مسار التصعيد: متى وكيف يُحال الأمر إلى إنسان.
 * التفاصيل والجدول الكامل في platform/escalation/README.md.
 *
 * كل تصعيد له سبب من قائمة مغلقة، ودرجة خطورة، ودور بشري مستهدف، ومهلة استجابة (SLA) حسب الخطورة.
 * التصعيد يوقف المهمة (status = escalated) ولا يستأنفها إلا إنسان.
 */

export const ESCALATION_REASONS = [
  "guardrail_triggered",
  "policy_exception",
  "low_confidence",
  "suspected_fraud",
  "suspected_prompt_injection",
  "approval_rejected",
  "approval_expired",
  "approval_revoked",
  "execution_failed",
  "max_attempts_exceeded",
  "missing_data",
  "sanctions_potential_match",
  "agent_requested",
  "runtime_error",
  "delegation_limit",
] as const;
export type EscalationReason = (typeof ESCALATION_REASONS)[number];

export type Severity = "low" | "medium" | "high" | "critical";

/** مهلة الاستجابة بالساعات حسب الخطورة. */
export const SLA_HOURS: Record<Severity, number> = { critical: 1, high: 4, medium: 24, low: 72 };

export interface Escalation {
  id: string;
  taskId: string;
  raisedBy: string;
  reason: EscalationReason;
  severity: Severity;
  toRole: HumanRole;
  summary: string;
  context: JsonObject;
  status: "open" | "acknowledged" | "resolved";
  createdAt: string;
  dueAt: string;
  resolution: string | null;
  resolvedBy: string | null;
}

export interface RaiseEscalationInput {
  taskId: string;
  raisedBy: string;
  reason: EscalationReason;
  severity: Severity;
  toRole: HumanRole;
  summary: string;
  context?: JsonObject;
}

/** قناة إشعار. الآن قناة ذاكرة فقط؛ Slack والبريد "مستقبلي" عبر connectors. */
export interface EscalationNotifier {
  notify(e: Escalation): void;
}

export class InMemoryNotifier implements EscalationNotifier {
  readonly sent: Escalation[] = [];
  notify(e: Escalation): void {
    this.sent.push(e);
  }
}

export class EscalationService {
  constructor(
    private readonly db: Database,
    private readonly audit: AuditLog,
    private readonly clock: Clock,
    private readonly notifier: EscalationNotifier = new InMemoryNotifier(),
  ) {
    db.exec(`
      CREATE TABLE IF NOT EXISTS escalations (
        id TEXT PRIMARY KEY, task_id TEXT NOT NULL, raised_by TEXT NOT NULL, reason TEXT NOT NULL,
        severity TEXT NOT NULL, to_role TEXT NOT NULL, summary TEXT NOT NULL, context TEXT NOT NULL,
        status TEXT NOT NULL, created_at TEXT NOT NULL, due_at TEXT NOT NULL, resolution TEXT, resolved_by TEXT
      );
      CREATE INDEX IF NOT EXISTS idx_esc_status ON escalations(status);
    `);
  }

  raise(input: RaiseEscalationInput): Escalation {
    // فحص التكرار ثم الإدراج في معاملة واحدة، فلا تنشئ عمليتان متزامنتان تصعيدين للسبب نفسه.
    return transaction(this.db, () => this.raiseUnsafe(input));
  }

  private raiseUnsafe(input: RaiseEscalationInput): Escalation {
    // منع التكرار: تصعيد مفتوح للسبب نفسه على المهمة نفسها يكفي.
    const dup = this.list({ taskId: input.taskId, status: "open" }).find((e) => e.reason === input.reason);
    if (dup) return dup;
    const now = this.clock.now();
    const e: Escalation = {
      id: newId("esc"),
      taskId: input.taskId,
      raisedBy: input.raisedBy,
      reason: input.reason,
      severity: input.severity,
      toRole: input.toRole,
      summary: input.summary,
      context: input.context ?? {},
      status: "open",
      createdAt: now.toISOString(),
      dueAt: new Date(now.getTime() + SLA_HOURS[input.severity] * 3_600_000).toISOString(),
      resolution: null,
      resolvedBy: null,
    };
    this.db
      .prepare(`INSERT INTO escalations VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NULL, NULL)`)
      .run(e.id, e.taskId, e.raisedBy, e.reason, e.severity, e.toRole, e.summary, JSON.stringify(e.context), e.status, e.createdAt, e.dueAt);
    this.audit.append({
      actor: { type: input.raisedBy.startsWith("u-") ? "human" : input.raisedBy === "orchestrator" || input.raisedBy === "tool-executor" ? "system" : "agent", id: input.raisedBy },
      action: "escalation.raised",
      target: e.id,
      taskId: e.taskId,
      outcome: "info",
      data: { reason: e.reason, severity: e.severity, toRole: e.toRole, summary: e.summary },
    });
    this.notifier.notify(e);
    return e;
  }

  resolve(id: string, humanId: string, resolution: string): Escalation {
    const e = this.get(id);
    if (e.status === "resolved") throw new PlatformError("INVALID_TRANSITION", "Escalation already resolved");
    this.db.prepare("UPDATE escalations SET status = 'resolved', resolution = ?, resolved_by = ? WHERE id = ?").run(resolution, humanId, id);
    this.audit.append({ actor: { type: "human", id: humanId }, action: "escalation.resolved", target: id, taskId: e.taskId, outcome: "success", data: { resolution } });
    return { ...e, status: "resolved", resolution, resolvedBy: humanId };
  }

  get(id: string): Escalation {
    const r = this.db.prepare("SELECT * FROM escalations WHERE id = ?").get(id);
    if (!r) throw new PlatformError("NOT_FOUND", `Escalation ${id} not found`);
    return rowToEscalation(r as Record<string, unknown>);
  }

  list(filter: { taskId?: string; status?: Escalation["status"]; toRole?: HumanRole } = {}): Escalation[] {
    const clauses: string[] = [];
    const params: string[] = [];
    if (filter.taskId) (clauses.push("task_id = ?"), params.push(filter.taskId));
    if (filter.status) (clauses.push("status = ?"), params.push(filter.status));
    if (filter.toRole) (clauses.push("to_role = ?"), params.push(filter.toRole));
    const where = clauses.length ? `WHERE ${clauses.join(" AND ")}` : "";
    return this.db
      .prepare(`SELECT * FROM escalations ${where} ORDER BY created_at`)
      .all(...params)
      .map((r) => rowToEscalation(r as Record<string, unknown>));
  }

  /** التصعيدات المفتوحة التي تجاوزت مهلتها. تُرفع خطورتها وتُعرض في لوحة المراقبة. */
  overdue(): Escalation[] {
    const now = this.clock.now().getTime();
    return this.list({ status: "open" }).filter((e) => new Date(e.dueAt).getTime() < now);
  }
}

function rowToEscalation(r: Record<string, unknown>): Escalation {
  return {
    id: String(r.id),
    taskId: String(r.task_id),
    raisedBy: String(r.raised_by),
    reason: r.reason as EscalationReason,
    severity: r.severity as Severity,
    toRole: r.to_role as HumanRole,
    summary: String(r.summary),
    context: parseJson<JsonObject>(r.context),
    status: r.status as Escalation["status"],
    createdAt: String(r.created_at),
    dueAt: String(r.due_at),
    resolution: (r.resolution as string | null) ?? null,
    resolvedBy: (r.resolved_by as string | null) ?? null,
  };
}
