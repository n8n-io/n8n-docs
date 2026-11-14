import type { AgentDefinition, AgentOutcome } from "../agent/agent-definition.ts";
import type { AgentRegistry } from "../agent/registry.ts";
import type { ApprovalGate } from "../approval/approval-gate.ts";
import type { AuditLog } from "../audit/audit-log.ts";
import { assertAuditIntegrity } from "../audit/integrity.ts";
import type { Connectors } from "../connectors/types.ts";
import type { Database } from "../core/db.ts";
import { ensureColumns, parseJson, transaction } from "../core/db.ts";
import type { HumanDirectory } from "../core/directory.ts";
import { PlatformError } from "../core/errors.ts";
import type { KillSwitch } from "../core/kill-switch.ts";
import type { JsonObject } from "../core/types.ts";
import { hashObject, newId, type Clock } from "../core/util.ts";
import type { EscalationService } from "../escalation/escalation.ts";
import type { MemoryStore } from "../memory/memory-store.ts";
import { verifyHumanAction, type ApproverKeyRegistry, type DecisionProof, type HumanActionProof, type HumanActionPurpose } from "../identity/approver-keys.ts";
import type { AgentRuntime } from "../runtime/runtime.ts";
import { detectInjection } from "../security/untrusted.ts";
import type { ToolExecutor } from "../tools/executor.ts";
import { TERMINAL, TRANSITIONS, type Handoff, type Task, type TaskStatus } from "./task.ts";

/**
 * المنسق: يستلم المهام ويوزعها على الوكلاء حسب نوعها، ويتتبع حالتها، وينفّذ الإحالات بين الوكلاء،
 * ويستأنف المهام بعد القرارات البشرية.
 *
 * ضمانات:
 * - idempotency: المهمة ذات المفتاح نفسه لا تُنشأ مرتين، فإعادة الإرسال آمنة.
 * - كل انتقال حالة يُتحقق منه مقابل TRANSITIONS ويُسجَّل في audit log.
 * - مخرج الوكيل يُتحقق منه بـ outputSchema. المخرج غير الصالح فشل وليس نجاحًا.
 * - الإحالة لا تُقبل إلا إلى أنواع مهام مدرجة في canHandoffTo للوكيل.
 * - المحتوى الخارجي في المهمة يُفحص بحثًا عن حقن تعليمات قبل التشغيل.
 */

export interface SubmitTaskInput {
  type: string;
  input: JsonObject;
  originator: string;
  idempotencyKey?: string;
  parentId?: string;
}

export interface OrchestratorDeps {
  db: Database;
  audit: AuditLog;
  gate: ApprovalGate;
  escalations: EscalationService;
  memory: MemoryStore;
  killSwitch: KillSwitch;
  directory: HumanDirectory;
  clock: Clock;
  executor: () => ToolExecutor;
  connectors: Connectors;
  runtime: AgentRuntime;
  maxAttempts: number;
  /** المهلة الافتراضية لتشغيل وكيل واحد، إن لم يحدد الوكيل مهلته. */
  defaultTimeoutMs: number;
  /** توثيق القرارات البشرية غير الموافقة (T17). */
  humanAuth: { mode: "signed" | "trusted"; keys: ApproverKeyRegistry };
  /** السجل التشغيلي للوكلاء: الحالة والإصدار والاستقلالية. */
  registry: AgentRegistry;
  /** true: الوكيل الجديد أو المعدّل ينتظر نشرًا بشريًا قبل التشغيل. */
  requireDeploy: boolean;
  /** أقصى عمق لسلسلة الإحالات (الجذر = 0). الافتراضي 6. */
  maxHandoffDepth?: number;
  /** سقف التكلفة التراكمية لكل وكيل خلال 24 ساعة متحركة (دولار). يتجاوزه تعريف الوكيل إن حدد dailyBudgetUsd. */
  dailyBudgetUsd?: number;
}

/** عدد مرات ظهور (نوع المهمة، hash المدخلات) نفسه بين الأسلاف قبل اعتبار السلسلة حلقة. يسمح بالاستئناف المشروع مرة واحدة. */
export const MAX_SAME_HANDOFF_IN_CHAIN = 2;

/** التأخير المتصاعد بعد الفشل: 30 ثانية ثم 60 ثم 120، بحد أقصى 15 دقيقة. */
export function backoffMs(attempts: number): number {
  return Math.min(30_000 * 2 ** Math.max(0, attempts - 1), 15 * 60_000);
}

class LeaseLost extends Error {}

export class Orchestrator {
  private readonly agents = new Map<string, AgentDefinition>();
  private readonly routes = new Map<string, string>();

  constructor(private readonly deps: OrchestratorDeps) {
    deps.db.exec(`
      CREATE TABLE IF NOT EXISTS tasks (
        id TEXT PRIMARY KEY, type TEXT NOT NULL, status TEXT NOT NULL, assignee TEXT NOT NULL,
        input TEXT NOT NULL, output TEXT, parent_id TEXT, originator TEXT NOT NULL, attempts INTEGER NOT NULL,
        idempotency_key TEXT UNIQUE, pending_handoffs TEXT NOT NULL, last_error TEXT,
        created_at TEXT NOT NULL, updated_at TEXT NOT NULL
      );
      CREATE INDEX IF NOT EXISTS idx_tasks_status ON tasks(status);
      CREATE INDEX IF NOT EXISTS idx_tasks_parent ON tasks(parent_id);
    `);
    ensureColumns(deps.db, "tasks", { lease_id: "TEXT", lease_expires_at: "TEXT", not_before: "TEXT" });
  }

  register(agent: AgentDefinition): void {
    if (this.agents.has(agent.id)) throw new Error(`Agent ${agent.id} already registered`);
    for (const type of agent.handles) {
      const existing = this.routes.get(type);
      if (existing) throw new Error(`Task type ${type} already routed to ${existing}`);
      this.routes.set(type, agent.id);
    }
    this.agents.set(agent.id, agent);
    this.deps.registry.sync(agent, this.deps.requireDeploy);
  }

  agent(id: string): AgentDefinition {
    const a = this.agents.get(id);
    if (!a) throw new PlatformError("NOT_FOUND", `Agent ${id} not registered`);
    return a;
  }

  listAgents(): AgentDefinition[] {
    return [...this.agents.values()];
  }

  submit(input: SubmitTaskInput): Task {
    return transaction(this.deps.db, () => this.submitUnsafe(input));
  }

  private submitUnsafe(input: SubmitTaskInput): Task {
    if (input.idempotencyKey) {
      const existing = this.deps.db.prepare("SELECT * FROM tasks WHERE idempotency_key = ?").get(input.idempotencyKey);
      if (existing) return rowToTask(existing as Record<string, unknown>);
    }
    const assignee = this.routes.get(input.type);
    if (!assignee) throw new PlatformError("NOT_FOUND", `No agent handles task type ${input.type}`);
    if (!this.deps.directory.has(input.originator)) throw new PlatformError("NOT_FOUND", `Unknown originator ${input.originator}`);
    const now = this.deps.clock.now().toISOString();
    const task: Task = {
      id: newId("task"), type: input.type, status: "queued", assignee, input: input.input, output: null,
      parentId: input.parentId ?? null, originator: input.originator, attempts: 0,
      idempotencyKey: input.idempotencyKey ?? null, pendingHandoffs: [], lastError: null,
      leaseId: null, leaseExpiresAt: null, notBefore: null, createdAt: now, updatedAt: now,
    };
    this.deps.db
      .prepare(
        `INSERT INTO tasks (id, type, status, assignee, input, output, parent_id, originator, attempts, idempotency_key, pending_handoffs, last_error, created_at, updated_at)
         VALUES (?, ?, ?, ?, ?, NULL, ?, ?, 0, ?, '[]', NULL, ?, ?)`,
      )
      .run(task.id, task.type, task.status, task.assignee, JSON.stringify(task.input), task.parentId, task.originator, task.idempotencyKey, now, now);
    this.deps.audit.append({
      actor: { type: input.parentId ? "agent" : "human", id: input.parentId ? this.get(input.parentId).assignee : input.originator },
      action: "task.submitted", target: task.id, taskId: task.id, outcome: "success",
      data: { type: task.type, assignee, parentId: task.parentId },
    });
    return task;
  }

  get(id: string): Task {
    const r = this.deps.db.prepare("SELECT * FROM tasks WHERE id = ?").get(id);
    if (!r) throw new PlatformError("NOT_FOUND", `Task ${id} not found`);
    return rowToTask(r as Record<string, unknown>);
  }

  list(filter: { status?: TaskStatus; parentId?: string } = {}): Task[] {
    const clauses: string[] = [];
    const params: string[] = [];
    if (filter.status) (clauses.push("status = ?"), params.push(filter.status));
    if (filter.parentId) (clauses.push("parent_id = ?"), params.push(filter.parentId));
    const where = clauses.length ? `WHERE ${clauses.join(" AND ")}` : "";
    return this.deps.db.prepare(`SELECT * FROM tasks ${where} ORDER BY created_at, rowid`).all(...params).map((r) => rowToTask(r as Record<string, unknown>));
  }

  /**
   * يشغّل المهام المستحقة في الطابور حتى يفرغ، بما فيها المهام الناتجة عن الإحالات.
   * آمن للتشغيل من عدة عمليات في الوقت نفسه: كل مهمة يطالب بها عامل واحد فقط (claim ذري).
   */
  async drain(maxTasks = 100): Promise<Task[]> {
    if (this.deps.killSwitch.isEngaged()) return [];
    assertAuditIntegrity(this.deps.audit, this.deps.killSwitch, "queue processing");
    this.recoverExpiredLeases();
    const done: Task[] = [];
    const skipped = new Set<string>();
    for (let i = 0; i < maxTasks; i++) {
      if (this.deps.killSwitch.isEngaged()) break;
      const now = this.deps.clock.now().toISOString();
      const next = this.list({ status: "queued" }).find(
        (t) => !skipped.has(t.id) && (!t.notBefore || t.notBefore <= now) && this.deps.registry.isActive(t.assignee) && this.budgetRemaining(t.assignee) > 0,
      );
      if (!next) break;
      const result = await this.run(next.id);
      // لم يتغير شيء: سبقنا عامل آخر إليها. نتخطاها في هذه الدورة.
      if (result.updatedAt === next.updatedAt && result.status === next.status) skipped.add(next.id);
      else done.push(result);
    }
    return done;
  }

  /**
   * مطالبة ذرية بمهمة: داخل معاملة IMMEDIATE، تنتقل من queued إلى running فقط إن كانت ما تزال queued
   * ومستحقة. تعيد null إن سبقها عامل آخر. هذا يمنع التشغيل المكرر (R4).
   */
  claim(taskId: string, leaseMs: number): Task | null {
    return transaction(this.deps.db, () => {
      const task = this.get(taskId);
      const now = this.deps.clock.now();
      if (task.status !== "queued" || (task.notBefore && task.notBefore > now.toISOString())) return null;
      if (!this.deps.registry.isActive(task.assignee)) return null; // الوكيل موقوف أو غير منشور: تبقى المهمة في الطابور
      if (this.budgetRemaining(task.assignee) <= 0) {
        this.noteBudgetExhausted(task.assignee);
        return null; // الميزانية اليومية استُنفدت: تبقى المهمة في الطابور حتى تنفتح النافذة أو يرفع إنسان السقف
      }
      return this.transition(task, "running", { attempts: task.attempts + 1 }, { id: newId("lease"), expiresAt: new Date(now.getTime() + leaseMs).toISOString() });
    });
  }

  /** الوكلاء المسجلون (للقراءة). */
  registeredAgents(): AgentDefinition[] {
    return [...this.agents.values()];
  }

  /** السقف الفعلي للوكيل خلال 24 ساعة (Infinity إن لم يُحدد سقف). */
  dailyBudget(agentId: string): number {
    const a = this.agents.get(agentId);
    return a?.dailyBudgetUsd ?? this.deps.dailyBudgetUsd ?? Infinity;
  }

  /** ما أنفقه الوكيل في آخر 24 ساعة، من أحداث agent.usage في audit (المصدر الموثوق للتكلفة). */
  spentLast24h(agentId: string): number {
    const since = new Date(this.deps.clock.now().getTime() - 24 * 3_600_000).toISOString();
    const rows = this.deps.db.prepare("SELECT data FROM audit_log WHERE action = 'agent.usage' AND actor_id = ? AND ts >= ?").all(agentId, since);
    return rows.reduce((n, r) => n + Number(parseJson<{ costUsd?: number }>(r.data).costUsd ?? 0), 0);
  }

  budgetRemaining(agentId: string): number {
    const cap = this.dailyBudget(agentId);
    return cap === Infinity ? Infinity : cap - this.spentLast24h(agentId);
  }

  /** يسجل حدث استنفاد الميزانية مرة واحدة لكل نافذة 24 ساعة، لا عند كل محاولة مطالبة. */
  private noteBudgetExhausted(agentId: string): void {
    const since = new Date(this.deps.clock.now().getTime() - 24 * 3_600_000).toISOString();
    const already = this.deps.db.prepare("SELECT 1 FROM audit_log WHERE action = 'agent.budget_exhausted' AND target = ? AND ts >= ? LIMIT 1").get(agentId, since);
    if (!already)
      this.deps.audit.append({ actor: { type: "system", id: "orchestrator" }, action: "agent.budget_exhausted", target: agentId, outcome: "denied", data: { capUsd: this.dailyBudget(agentId), spentUsd: this.spentLast24h(agentId) } });
  }

  /**
   * يعيد للطابور المهام التي انتهى إيجارها وهي running، أي التي مات عاملها أو تجاوز مهلته (R3).
   * تُحسب المحاولة، وبعد الحد الأقصى تُصعَّد بدل إعادة المحاولة.
   */
  recoverExpiredLeases(): Task[] {
    const now = this.deps.clock.now().toISOString();
    const stale = this.list({ status: "running" }).filter((t) => t.leaseExpiresAt && t.leaseExpiresAt < now);
    return stale.map((t) => {
      this.deps.audit.append({ actor: { type: "system", id: "orchestrator" }, action: "task.lease_expired", target: t.id, taskId: t.id, outcome: "failure", data: { leaseId: t.leaseId, expiredAt: t.leaseExpiresAt, attempts: t.attempts } });
      return this.handleRunError(t.id, this.agent(t.assignee), new Error(`Lease expired at ${t.leaseExpiresAt} (worker crash or timeout)`), t.leaseId);
    });
  }

  async run(taskId: string): Promise<Task> {
    this.deps.killSwitch.assertNotEngaged();
    const agent = this.agent(this.get(taskId).assignee);
    const timeoutMs = agent.timeoutMs ?? this.deps.defaultTimeoutMs;
    const claimed = this.claim(taskId, timeoutMs + 60_000);
    if (!claimed) return this.get(taskId);
    const task = claimed;
    const leaseId = task.leaseId!;

    // فحص المحتوى الخارجي قبل أن يراه أي نموذج. الاشتباه يُسجَّل ويُمرَّر كإشارة للوكيل وللحواجز.
    const injection = scanUntrusted(task.input);
    if (injection.length) {
      this.deps.audit.append({ actor: { type: "system", id: "orchestrator" }, action: "security.injection_suspected", taskId, outcome: "info", data: { findings: injection as unknown as JsonObject[] } as unknown as JsonObject });
    }

    const executor = this.deps.executor();
    const abort = new AbortController();
    let timer: NodeJS.Timeout | undefined;
    let outcome: AgentOutcome;
    try {
      const result = await Promise.race([
        this.deps.runtime.run({ agent, task, tools: executor.gatewayFor(agent, taskId, leaseId), toolList: executor.toolsFor(agent), signal: abort.signal, maxBudgetUsd: this.budgetRemaining(agent.id) }),
        new Promise<never>((_, reject) => {
          timer = setTimeout(() => (abort.abort(), reject(new Error(`Agent run exceeded timeout of ${timeoutMs} ms`))), timeoutMs);
        }),
      ]);
      const parsed = agent.outputSchema.safeParse(result.outcome);
      if (!parsed.success) throw new Error(`Invalid agent output: ${parsed.error.message.slice(0, 500)}`);
      outcome = parsed.data;
      if (result.usage) this.deps.audit.append({ actor: { type: "agent", id: agent.id }, action: "agent.usage", taskId, outcome: "info", data: result.usage as unknown as JsonObject });
    } catch (err) {
      return this.handleRunError(taskId, agent, err, leaseId);
    } finally {
      clearTimeout(timer);
    }

    const current = this.get(taskId);
    // أوقفها شيء آخر أثناء التشغيل، أو انتهى الإيجار واستعادها عامل آخر: نتيجة هذا التشغيل تُهمل.
    if (current.status !== "running" || current.leaseId !== leaseId) {
      this.deps.audit.append({ actor: { type: "system", id: "orchestrator" }, action: "task.result_discarded", taskId, outcome: "denied", data: { leaseId, currentStatus: current.status } });
      return current;
    }
    try {
      return transaction(this.deps.db, () => this.settle(current, agent, outcome));
    } catch (err) {
      if (err instanceof LeaseLost) return this.get(taskId);
      throw err;
    }
  }

  /** يطبّق قرارًا بشريًا على طلب موافقة، ثم ينفّذ الإجراء أو يصعّد، ويغلق المهمة إن اكتملت. */
  async decideApproval(approvalId: string, humanId: string, decision: "approve" | "reject", comment = "", proof?: DecisionProof): Promise<Task> {
    assertAuditIntegrity(this.deps.audit, this.deps.killSwitch, "approval decision");
    const req = this.deps.gate.decide(approvalId, humanId, decision, comment, proof);
    const task = this.get(req.taskId);
    if (req.status === "pending") return task; // ينتظر موافقًا ثانيًا
    if (req.status === "rejected") {
      this.deps.escalations.raise({ taskId: task.id, raisedBy: "orchestrator", reason: "approval_rejected", severity: "medium", toRole: this.agent(task.assignee).defaultEscalationRole, summary: `Approval ${approvalId} rejected by ${humanId}: ${comment}` });
      return this.escalateIfWaiting(task.id);
    }
    return this.executeApproval(approvalId);
  }

  /** سحب موافقة قبل تنفيذها. المهمة المنتظرة تُصعَّد ليقرر إنسان ما بعدها. */
  revokeApproval(approvalId: string, humanId: string, reason: string): Task {
    assertAuditIntegrity(this.deps.audit, this.deps.killSwitch, "approval revocation");
    const req = this.deps.gate.revoke(approvalId, humanId, reason);
    const task = this.get(req.taskId);
    this.deps.escalations.raise({ taskId: task.id, raisedBy: humanId, reason: "approval_revoked", severity: "medium", toRole: this.agent(task.assignee).defaultEscalationRole, summary: `Approval ${approvalId} revoked by ${humanId}: ${reason}` });
    return this.escalateIfWaiting(task.id);
  }

  /**
   * ينفّذ كل الموافقات المعتمدة التي لم تُنفَّذ بعد، كالتي اعتُمدت أثناء الإيقاف الطارئ.
   * يُستدعى يدويًا من المشغّل بعد رفع الإيقاف (ops/cli.ts resume)، ولا يحدث تلقائيًا.
   */
  async executePendingApproved(humanId: string, proof?: HumanActionProof): Promise<Task[]> {
    this.deps.killSwitch.assertNotEngaged();
    assertAuditIntegrity(this.deps.audit, this.deps.killSwitch, "resume of approved actions");
    const pending = this.deps.gate.list({ status: "approved" });
    // التوقيع يغطي قائمة الموافقات بالضبط: موافقة ظهرت بعد التوقيع لا تُنفَّذ به.
    const fp = this.authenticate("ops.resume_approved/v1", humanId, "pending-approved", { approvalIds: pending.map((a) => a.id).sort() }, proof);
    if (!this.deps.directory.get(humanId).roles.includes("platform_operator")) throw new PlatformError("UNAUTHORIZED_APPROVER", "Only a platform_operator can resume approved actions");
    this.deps.audit.append({ actor: { type: "human", id: humanId }, action: "ops.resume_approved", outcome: "success", data: { approvals: pending.map((a) => a.id), ...fp } });
    const out: Task[] = [];
    for (const a of pending) out.push(await this.executeApproval(a.id));
    return out;
  }

  /** رفع الإيقاف الطارئ: platform_operator فقط، وبسجل سليم، وبتوقيع. التفعيل نفسه لا يحتاج توقيعًا. */
  releaseEmergencyStop(humanId: string, note: string, proof?: HumanActionProof): void {
    if (!this.deps.directory.get(humanId).roles.includes("platform_operator")) throw new PlatformError("UNAUTHORIZED_APPROVER", "Only a platform_operator can release the emergency stop");
    if (!note.trim()) throw new PlatformError("INVALID_INPUT", "Releasing the emergency stop requires a note");
    const v = this.deps.audit.verify();
    if (!v.valid) throw new PlatformError("AUDIT_TAMPERED", `Refusing to release: audit chain broken at seq ${v.firstBrokenSeq}`);
    const fp = this.authenticate("ops.release_stop/v1", humanId, "emergency-stop", { note }, proof);
    this.deps.killSwitch.release();
    this.deps.audit.append({ actor: { type: "human", id: humanId }, action: "ops.kill_switch.release", outcome: "success", data: { note, ...fp } });
  }

  private authenticate(purpose: HumanActionPurpose, humanId: string, subject: string, details: unknown, proof?: HumanActionProof): { keyFingerprint?: string; auth: string } {
    if (this.deps.humanAuth.mode !== "signed") return { auth: "trusted" };
    try {
      return { auth: "signed", keyFingerprint: verifyHumanAction(this.deps.humanAuth.keys, this.deps.clock, proof, { purpose, humanId, subject, details }) };
    } catch (err) {
      this.deps.audit.append({ actor: { type: "human", id: humanId }, action: purpose.split("/")[0]!, target: subject, outcome: "denied", data: { code: "AUTHENTICATION_FAILED", reason: (err as Error).message } });
      throw err;
    }
  }

  private async executeApproval(approvalId: string): Promise<Task> {
    const taskId = this.deps.gate.get(approvalId).taskId;
    const result = await this.deps.executor().executeApproved(approvalId);
    // أثناء الإيقاف الطارئ: الموافقة تبقى approved والمهمة تنتظر. لا تصعيد ولا تنفيذ.
    if (result.status === "denied" && result.code === "KILL_SWITCH_ACTIVE") return this.get(taskId);
    if (result.status !== "ok") return this.escalateIfWaiting(taskId, JSON.stringify(result));
    return this.completeIfApprovalsDone(taskId);
  }

  /** يحوّل الموافقات المنتهية إلى تصعيدات. يُشغَّل دوريًا (cron) في الإنتاج. */
  sweepExpiredApprovals(): number {
    const expired = this.deps.gate.expireStale();
    for (const a of expired) {
      const task = this.get(a.taskId);
      this.deps.escalations.raise({ taskId: task.id, raisedBy: "orchestrator", reason: "approval_expired", severity: "medium", toRole: this.agent(task.assignee).defaultEscalationRole, summary: `Approval ${a.id} expired without decision` });
      this.escalateIfWaiting(task.id);
    }
    return expired.length;
  }

  /** استئناف بشري لمهمة مصعّدة: إعادتها للطابور، أو إغلاقها بقرار. */
  resolveEscalated(taskId: string, humanId: string, action: "requeue" | "complete" | "reject" | "cancel", note: string, proof?: HumanActionProof): Task {
    const task = this.get(taskId);
    if (task.status !== "escalated") throw new PlatformError("INVALID_TRANSITION", `Task ${taskId} is ${task.status}, not escalated`);
    if (!note.trim()) throw new PlatformError("INVALID_INPUT", "Resolving an escalation requires a note");
    this.authenticate("task.resolve_escalation/v1", humanId, taskId, { action, note }, proof);
    for (const e of this.deps.escalations.list({ taskId, status: "open" })) this.deps.escalations.resolve(e.id, humanId, note);
    this.deps.audit.append({ actor: { type: "human", id: humanId }, action: `task.${action}`, target: taskId, taskId, outcome: "success", data: { note } });
    const to: TaskStatus = action === "requeue" ? "queued" : action === "complete" ? "completed" : action === "reject" ? "rejected" : "cancelled";
    return this.transition(task, to);
  }

  private settle(task: Task, agent: AgentDefinition, outcome: AgentOutcome): Task {
    const output = outcome as unknown as JsonObject;
    const violations = agent.outcomeGuard?.(outcome, { task, connectors: this.deps.connectors }) ?? [];
    if (violations.length > 0) {
      this.deps.audit.append({ actor: { type: "system", id: "orchestrator" }, action: "agent.outcome_guard", taskId: task.id, outcome: "denied", data: { violations } });
      this.deps.escalations.raise({ taskId: task.id, raisedBy: "orchestrator", reason: "guardrail_triggered", severity: "high", toRole: agent.defaultEscalationRole, summary: `Agent outcome rejected by outcome guard: ${violations.join("; ")}`, context: { violations } });
    }
    const handoffs = violations.length > 0 ? [] : outcome.handoffs.filter((h) => this.allowHandoff(task, agent, h));
    const pendingApprovals = this.deps.gate.list({ taskId: task.id, status: "pending" });
    const openEscalations = this.deps.escalations.list({ taskId: task.id, status: "open" });

    // الحالة تُشتق من الوقائع المسجلة، لا من ادعاء الوكيل وحده.
    let next: TaskStatus;
    if (openEscalations.length > 0 || outcome.status === "escalated") next = "escalated";
    else if (pendingApprovals.length > 0) next = "awaiting_approval";
    else if (outcome.status === "needs_approval") {
      // الوكيل ادعى أنه طلب موافقة ولا يوجد طلب فعلي: تناقض يُصعَّد.
      this.deps.escalations.raise({ taskId: task.id, raisedBy: "orchestrator", reason: "runtime_error", severity: "medium", toRole: agent.defaultEscalationRole, summary: "Agent reported needs_approval but no approval request exists" });
      next = "escalated";
    } else if (outcome.status === "rejected") next = "rejected";
    else next = "completed";

    if (outcome.status === "escalated" && openEscalations.length === 0) {
      this.deps.escalations.raise({ taskId: task.id, raisedBy: agent.id, reason: "agent_requested", severity: "medium", toRole: agent.defaultEscalationRole, summary: outcome.summary });
    }

    const nowHandoffs = handoffs.filter((h) => h.when === "now");
    const deferred = handoffs.filter((h) => h.when === "after_approval");
    const updated = this.transition(task, next, { output, pendingHandoffs: next === "awaiting_approval" ? deferred : [] });
    for (const h of nowHandoffs) this.spawn(updated, h);
    if (next === "completed") for (const h of deferred) this.spawn(updated, h);
    return updated;
  }

  private completeIfApprovalsDone(taskId: string): Task {
    const task = this.get(taskId);
    const outstanding = this.deps.gate.list({ taskId }).filter((a) => a.status === "pending" || a.status === "approved");
    if (outstanding.length > 0 || task.status !== "awaiting_approval") return task;
    const done = this.transition(task, "completed", { pendingHandoffs: [] });
    for (const h of task.pendingHandoffs) this.spawn(done, h);
    return done;
  }

  private escalateIfWaiting(taskId: string, lastError?: string): Task {
    const task = this.get(taskId);
    return task.status === "awaiting_approval" ? this.transition(task, "escalated", lastError ? { lastError } : {}) : task;
  }

  private allowHandoff(task: Task, agent: AgentDefinition, h: Handoff): boolean {
    if (!(agent.canHandoffTo.includes(h.taskType) && this.routes.has(h.taskType))) {
      this.deps.audit.append({ actor: { type: "agent", id: agent.id }, action: "task.handoff", taskId: task.id, outcome: "denied", data: { taskType: h.taskType, reason: "not in canHandoffTo" } });
      return false;
    }
    // حد عمق التفويض وكشف الحلقات: سلسلة إحالات بلا نهاية تستهلك التكلفة وتخفي المسؤولية.
    const maxDepth = this.deps.maxHandoffDepth ?? 6;
    const key = `${h.taskType}:${hashObject(h.input)}`;
    let depth = 0;
    let repeats = 0;
    for (let t: Task | null = task; t; t = t.parentId ? this.get(t.parentId) : null) {
      if (`${t.type}:${hashObject(t.input)}` === key) repeats++;
      if (t.parentId) depth++;
      if (depth > maxDepth + 1) break;
    }
    const reason = depth + 1 > maxDepth ? `delegation depth ${depth + 1} exceeds ${maxDepth}` : repeats >= MAX_SAME_HANDOFF_IN_CHAIN ? `handoff loop: ${h.taskType} with the same input already appears ${repeats} times in this chain` : null;
    if (!reason) return true;
    this.deps.audit.append({ actor: { type: "agent", id: agent.id }, action: "task.handoff", taskId: task.id, outcome: "denied", data: { taskType: h.taskType, reason } });
    this.deps.escalations.raise({ taskId: task.id, raisedBy: "orchestrator", reason: "delegation_limit", severity: "medium", toRole: agent.defaultEscalationRole, summary: `Handoff to ${h.taskType} refused: ${reason}` });
    return false;
  }

  private spawn(parent: Task, h: Handoff): Task {
    return this.submit({ type: h.taskType, input: h.input, originator: parent.originator, parentId: parent.id, idempotencyKey: `${parent.id}:${h.taskType}:${hashObject(h.input).slice(0, 16)}` });
  }

  private handleRunError(taskId: string, agent: AgentDefinition, err: unknown, leaseId: string | null): Task {
    const message = err instanceof Error ? err.message : String(err);
    const task = this.get(taskId);
    if (task.status !== "running" || task.leaseId !== leaseId) return task; // الإيجار لم يعد لنا
    this.deps.audit.append({ actor: { type: "system", id: "orchestrator" }, action: "task.run_error", taskId, outcome: "failure", data: { error: message, attempts: task.attempts } });
    try {
      if (this.deps.killSwitch.isEngaged()) return this.transition(task, "failed", { lastError: message });
      if (task.attempts >= this.deps.maxAttempts) {
        this.deps.escalations.raise({ taskId, raisedBy: "orchestrator", reason: "max_attempts_exceeded", severity: "high", toRole: agent.defaultEscalationRole, summary: `Task failed ${task.attempts} times: ${message}` });
        return this.transition(task, "escalated", { lastError: message });
      }
      const notBefore = new Date(this.deps.clock.now().getTime() + backoffMs(task.attempts)).toISOString();
      return this.transition(task, "queued", { lastError: message, notBefore });
    } catch (e) {
      if (e instanceof LeaseLost) return this.get(taskId);
      throw e;
    }
  }

  /**
   * انتقال حالة ذري ومتحقق منه (compare-and-set): يُطبَّق فقط إن كانت الحالة والإيجار في القاعدة
   * ما يزالان كما قرأهما المستدعي. وإلا يرمي LeaseLost، فلا يكتب عاملان فوق بعضهما.
   */
  private transition(
    task: Task,
    to: TaskStatus,
    patch: Partial<Pick<Task, "output" | "attempts" | "pendingHandoffs" | "lastError" | "notBefore">> = {},
    lease: { id: string; expiresAt: string } | null = null,
  ): Task {
    if (!TRANSITIONS[task.status].includes(to))
      throw new PlatformError("INVALID_TRANSITION", `Task ${task.id}: ${task.status} → ${to} is not allowed`);
    return transaction(this.deps.db, () => {
      const now = this.deps.clock.now().toISOString();
      const next: Task = {
        ...task, ...patch, status: to, updatedAt: now,
        leaseId: to === "running" ? (lease?.id ?? null) : null,
        leaseExpiresAt: to === "running" ? (lease?.expiresAt ?? null) : null,
        notBefore: to === "queued" ? (patch.notBefore ?? null) : null,
      };
      const res = this.deps.db
        .prepare(
          `UPDATE tasks SET status = ?, output = ?, attempts = ?, pending_handoffs = ?, last_error = ?, lease_id = ?, lease_expires_at = ?, not_before = ?, updated_at = ?
           WHERE id = ? AND status = ? AND lease_id IS ?`,
        )
        .run(to, next.output ? JSON.stringify(next.output) : null, next.attempts, JSON.stringify(next.pendingHandoffs), next.lastError,
          next.leaseId, next.leaseExpiresAt, next.notBefore, now, task.id, task.status, task.leaseId);
      if (Number(res.changes) !== 1) throw new LeaseLost(`Task ${task.id} changed concurrently (expected ${task.status}/${task.leaseId})`);
      this.deps.audit.append({ actor: { type: "system", id: "orchestrator" }, action: "task.transition", target: task.id, taskId: task.id, outcome: "info", data: { from: task.status, to, ...(next.leaseId ? { leaseId: next.leaseId } : {}) } });
      if (TERMINAL.includes(to)) this.deps.memory.forgetTask(task.id);
      return next;
    });
  }
}

function scanUntrusted(input: JsonObject) {
  const items = Array.isArray(input.untrusted) ? (input.untrusted as Array<{ source?: string; text?: string }>) : [];
  return items.flatMap((u) => detectInjection(String(u.text ?? "")).map((f) => ({ source: String(u.source ?? "unknown"), ...f })));
}

function rowToTask(r: Record<string, unknown>): Task {
  return {
    id: String(r.id), type: String(r.type), status: r.status as TaskStatus, assignee: String(r.assignee),
    input: parseJson<JsonObject>(r.input), output: r.output ? parseJson<JsonObject>(r.output) : null,
    parentId: (r.parent_id as string | null) ?? null, originator: String(r.originator), attempts: Number(r.attempts),
    idempotencyKey: (r.idempotency_key as string | null) ?? null, pendingHandoffs: parseJson<Handoff[]>(r.pending_handoffs),
    lastError: (r.last_error as string | null) ?? null,
    leaseId: (r.lease_id as string | null) ?? null, leaseExpiresAt: (r.lease_expires_at as string | null) ?? null, notBefore: (r.not_before as string | null) ?? null,
    createdAt: String(r.created_at), updatedAt: String(r.updated_at),
  };
}
