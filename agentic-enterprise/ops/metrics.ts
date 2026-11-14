import type { Platform } from "../platform/index.ts";

/**
 * مؤشرات التشغيل والتنبيهات. كل رقم هنا مشتق من السجلات المرجعية (المهام، والموافقات، والتصعيدات، وaudit log)،
 * لا من تقارير الوكلاء عن أنفسهم.
 * عتبات التنبيه موثقة في docs/operations/RUNBOOK.md، وأي تغيير هنا يجب أن ينعكس هناك.
 */

export const ALERT_THRESHOLDS = {
  /** موافقة معلّقة أقدم من هذا (بالساعات) تقترب من انتهاء مهلتها البالغة 24 ساعة. */
  approvalAgeHours: 20,
  /** عدد مرات منع الحواجز لوكيل واحد في النافذة الزمنية. */
  guardrailBlocksPerAgent: 5,
  /** نسبة أخطاء الأدوات لوكيل، بشرط ألا يقل عدد الاستدعاءات عن الحد الأدنى. */
  toolErrorRate: 0.1,
  toolErrorMinCalls: 20,
  /** عدد حالات الاشتباه بحقن التعليمات في النافذة. */
  injectionSuspected: 3,
  /** سقف تكلفة النموذج اليومي بالدولار (الوضع الحي). */
  dailyCostUsd: 50,
  /** النافذة الزمنية للمؤشرات المتحركة، بالساعات. */
  windowHours: 24,
} as const;

export type AlertLevel = "critical" | "warning" | "info";
export interface Alert {
  level: AlertLevel;
  code: string;
  message: string;
  action: string;
}

export interface Metrics {
  generatedAt: string;
  killSwitch: boolean;
  audit: { valid: boolean; entries: number; firstBrokenSeq?: number; anchoring: string; pendingAnchors: number };
  tasks: { byStatus: Record<string, number>; byAgent: Record<string, Record<string, number>> };
  approvals: { pending: number; oldestPendingHours: number | null; approvedNotExecuted: number; byAction: Record<string, number> };
  escalations: { open: number; overdue: number; bySeverity: Record<string, number>; byRole: Record<string, number> };
  security: { guardrailBlocks: Record<string, number>; outcomeGuardViolations: number; injectionSuspected: number; sodDenials: number };
  tools: Record<string, { calls: number; errors: number; denied: number; errorRate: number }>;
  costUsd: { total: number; byAgent: Record<string, number> };
  alerts: Alert[];
}

const inc = (o: Record<string, number>, k: string, n = 1) => ((o[k] = (o[k] ?? 0) + n), o);

export function computeMetrics(p: Platform): Metrics {
  const now = p.clock.now();
  const since = new Date(now.getTime() - ALERT_THRESHOLDS.windowHours * 3_600_000).toISOString();
  const audit = p.audit.verify();
  const entries = p.audit.query().filter((e) => e.ts >= since);
  const tasks = p.orchestrator.list();
  const approvals = p.gate.list();
  const escalations = p.escalations.list({ status: "open" });
  const overdue = p.escalations.overdue();

  const byStatus: Record<string, number> = {};
  const byAgent: Record<string, Record<string, number>> = {};
  for (const t of tasks) {
    inc(byStatus, t.status);
    inc((byAgent[t.assignee] ??= {}), t.status);
  }

  const pending = approvals.filter((a) => a.status === "pending");
  const oldest = pending.length ? Math.max(...pending.map((a) => (now.getTime() - new Date(a.createdAt).getTime()) / 3_600_000)) : null;
  const byAction: Record<string, number> = {};
  for (const a of pending) inc(byAction, a.actionType);

  const tools: Metrics["tools"] = {};
  const guardrailBlocks: Record<string, number> = {};
  const costByAgent: Record<string, number> = {};
  let outcomeGuardViolations = 0;
  let injectionSuspected = 0;
  let sodDenials = 0;
  for (const e of entries) {
    if (e.action.startsWith("tool.") && e.actor.type === "agent") {
      const t = (tools[e.actor.id] ??= { calls: 0, errors: 0, denied: 0, errorRate: 0 });
      t.calls++;
      if (e.outcome === "failure") t.errors++;
      if (e.outcome === "denied") t.denied++;
      if (e.data.code === "GUARDRAIL_BLOCKED" || e.data.code === "GUARDRAIL_ESCALATED") inc(guardrailBlocks, e.actor.id);
    }
    if (e.action === "agent.outcome_guard") outcomeGuardViolations++;
    if (e.action === "security.injection_suspected") injectionSuspected++;
    if (e.outcome === "denied" && e.data.code === "SOD_VIOLATION") sodDenials++;
    if (e.action === "agent.usage") inc(costByAgent, e.actor.id, Number(e.data.costUsd ?? 0));
  }
  for (const t of Object.values(tools)) t.errorRate = t.calls ? Math.round((t.errors / t.calls) * 1000) / 1000 : 0;

  const bySeverity: Record<string, number> = {};
  const byRole: Record<string, number> = {};
  for (const e of escalations) (inc(bySeverity, e.severity), inc(byRole, e.toRole));
  const costTotal = Math.round(Object.values(costByAgent).reduce((s, x) => s + x, 0) * 10_000) / 10_000;

  const alerts: Alert[] = [];
  const add = (level: AlertLevel, code: string, message: string, action: string) => alerts.push({ level, code, message, action });
  if (!audit.valid) add("critical", "AUDIT_TAMPERED", `Audit chain broken at seq ${audit.firstBrokenSeq}`, "Engage kill switch, page CISO, follow runbook §6.2");
  if (p.config.APPROVER_AUTH !== "signed") add("warning", "APPROVER_AUTH_TRUSTED", "Approval decisions are not cryptographically signed: any shell user can approve as anyone", "Set APPROVER_AUTH=signed and register approver keys (runbook §3.1)");
  if (audit.anchoring === "none") add("warning", "AUDIT_ANCHOR_DISABLED", "Audit log is not externally anchored: truncation and full rewrites are undetectable", "Set AUDIT_ANCHOR_KEY (and AUDIT_ANCHOR_REQUIRED=true in production); runbook §2.4");
  if (p.killSwitch.isEngaged()) add("critical", "KILL_SWITCH_ENGAGED", "Emergency stop is engaged; all agent actions halted", "Follow runbook §5 release checklist when resolved");
  const critical = escalations.filter((e) => e.severity === "critical");
  if (critical.length) add("critical", "CRITICAL_ESCALATION", `${critical.length} critical escalation(s) open: ${critical.map((e) => e.reason).join(", ")}`, "Owner role must act within 1 hour (runbook §6.1)");
  if (overdue.length) add("warning", "ESCALATION_OVERDUE", `${overdue.length} escalation(s) past SLA`, "Notify role leads; reassign if needed");
  if (oldest !== null && oldest > ALERT_THRESHOLDS.approvalAgeHours) add("warning", "APPROVAL_AGING", `Oldest pending approval is ${oldest.toFixed(1)}h old (expires at 24h)`, "Remind approvers; expired approvals become escalations");
  const inactive = p.agents.list().filter((a) => a.status !== "ACTIVE" && a.status !== "ARCHIVED");
  if (inactive.length) add("warning", "AGENT_NOT_ACTIVE", `${inactive.map((a) => `${a.agentId}=${a.status}`).join(", ")}; their tasks wait in the queue`, "Review, then `ops agents activate` (signed) or stop/archive");
  const restricted = p.agents.list().filter((a) => a.autonomyOverride !== null);
  if (restricted.length) add("info", "AUTONOMY_RESTRICTED", `${restricted.map((a) => `${a.agentId}≤${a.autonomyOverride}`).join(", ")}`, "Restore with `ops agents autonomy <id> reset` (signed) when the review ends");
  const approvedNotExecuted = approvals.filter((a) => a.status === "approved").length;
  if (approvedNotExecuted && !p.killSwitch.isEngaged()) add("warning", "APPROVED_NOT_EXECUTED", `${approvedNotExecuted} approved action(s) not yet executed`, "Run `ops resume` after verifying the stop cause is resolved");
  for (const [agent, n] of Object.entries(guardrailBlocks))
    if (n >= ALERT_THRESHOLDS.guardrailBlocksPerAgent) add("warning", "GUARDRAIL_SPIKE", `${agent}: ${n} guardrail blocks in ${ALERT_THRESHOLDS.windowHours}h`, "Review transcripts for model drift or an attack campaign (runbook §6.3)");
  if (outcomeGuardViolations) add("warning", "OUTCOME_GUARD", `${outcomeGuardViolations} agent outcome(s) contradicted the system of record`, "Review the affected tasks; consider pausing the agent");
  if (injectionSuspected >= ALERT_THRESHOLDS.injectionSuspected) add("warning", "INJECTION_WAVE", `${injectionSuspected} tasks with prompt-injection markers in ${ALERT_THRESHOLDS.windowHours}h`, "Alert security; check the sender domains (runbook §6.3)");
  for (const [agent, t] of Object.entries(tools))
    if (t.calls >= ALERT_THRESHOLDS.toolErrorMinCalls && t.errorRate > ALERT_THRESHOLDS.toolErrorRate) add("warning", "TOOL_ERRORS", `${agent}: tool error rate ${(t.errorRate * 100).toFixed(1)}%`, "Check connector health (runbook §6.4)");
  for (const a of p.orchestrator.registeredAgents()) {
    const cap = p.orchestrator.dailyBudget(a.id);
    if (cap === Infinity) continue;
    const spent = p.orchestrator.spentLast24h(a.id);
    if (spent >= cap) add("critical", "BUDGET_EXHAUSTED", `${a.id} spent $${spent.toFixed(2)} of its $${cap} daily budget; its tasks wait in the queue`, "Investigate for loops, then raise dailyBudgetUsd deliberately or wait for the window");
    else if (spent >= 0.8 * cap) add("warning", "BUDGET_NEAR", `${a.id} at ${Math.round((100 * spent) / cap)}% of its $${cap} daily budget`, "Check for unusual volume or loops");
  }
  if (costTotal > ALERT_THRESHOLDS.dailyCostUsd) add("warning", "COST", `Model cost $${costTotal} in ${ALERT_THRESHOLDS.windowHours}h`, "Check for loops; lower effort or pause live mode");

  return {
    generatedAt: now.toISOString(),
    killSwitch: p.killSwitch.isEngaged(),
    audit: { valid: audit.valid, entries: audit.entries, anchoring: audit.anchoring ?? "none", pendingAnchors: audit.pendingAnchors ?? 0, ...(audit.firstBrokenSeq ? { firstBrokenSeq: audit.firstBrokenSeq } : {}) },
    tasks: { byStatus, byAgent },
    approvals: { pending: pending.length, oldestPendingHours: oldest === null ? null : Math.round(oldest * 10) / 10, approvedNotExecuted, byAction },
    escalations: { open: escalations.length, overdue: overdue.length, bySeverity, byRole },
    security: { guardrailBlocks, outcomeGuardViolations, injectionSuspected, sodDenials },
    tools,
    costUsd: { total: costTotal, byAgent: costByAgent },
    alerts: alerts.sort((a, b) => (a.level === b.level ? 0 : a.level === "critical" ? -1 : b.level === "critical" ? 1 : 0)),
  };
}
