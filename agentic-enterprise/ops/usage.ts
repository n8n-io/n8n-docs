import type { Database } from "../platform/core/db.ts";
import { parseJson } from "../platform/core/db.ts";

/**
 * تقرير الاستخدام لفترة، من سجل audit (المصدر الموثوق غير القابل للتعديل)، أساسًا للفوترة والتقارير.
 * لا يُحسب شيء من حالة متغيرة: كل رقم هنا يمكن إعادة اشتقاقه والتحقق منه من السلسلة نفسها.
 */
export interface UsageReport {
  from: string;
  to: string;
  tasks: { submitted: number; byAgent: Record<string, { submitted: number; completed: number; escalated: number }> };
  toolCalls: { total: number; denied: number; byTool: Record<string, number> };
  approvals: { requested: number; executed: number; rejectedOrExpired: number };
  escalations: number;
  model: { runs: number; costUsd: number; byAgent: Record<string, number> };
  auditEvents: number;
}

export function computeUsage(db: Database, from: string, to: string): UsageReport {
  const rows = db.prepare("SELECT action, actor_id, outcome, task_id, data FROM audit_log WHERE ts >= ? AND ts < ? ORDER BY seq").all(from, to) as Array<{ action: string; actor_id: string; outcome: string; task_id: string | null; data: string }>;
  const r: UsageReport = {
    from, to,
    tasks: { submitted: 0, byAgent: {} },
    toolCalls: { total: 0, denied: 0, byTool: {} },
    approvals: { requested: 0, executed: 0, rejectedOrExpired: 0 },
    escalations: 0,
    model: { runs: 0, costUsd: 0, byAgent: {} },
    auditEvents: rows.length,
  };
  const assignee = new Map<string, string>();
  const agent = (id: string) => (r.tasks.byAgent[id] ??= { submitted: 0, completed: 0, escalated: 0 });
  for (const e of rows) {
    if (e.action === "task.submitted") {
      const d = parseJson<{ assignee?: string }>(e.data);
      r.tasks.submitted++;
      if (d.assignee) {
        agent(d.assignee).submitted++;
        if (e.task_id) assignee.set(e.task_id, d.assignee);
      }
    } else if (e.action === "task.transition") {
      const d = parseJson<{ to?: string }>(e.data);
      const a = e.task_id ? assignee.get(e.task_id) : undefined;
      if (a && d.to === "completed") agent(a).completed++;
      if (a && d.to === "escalated") agent(a).escalated++;
    } else if (e.action.startsWith("tool.")) {
      r.toolCalls.total++;
      if (e.outcome === "denied") r.toolCalls.denied++;
      const t = e.action.slice(5);
      r.toolCalls.byTool[t] = (r.toolCalls.byTool[t] ?? 0) + 1;
    } else if (e.action === "approval.requested") r.approvals.requested++;
    else if (e.action === "approval.redeem" && e.outcome === "success") r.approvals.executed++;
    else if (e.action === "approval.expired" || (e.action === "approval.reject" && e.outcome === "success")) r.approvals.rejectedOrExpired++;
    else if (e.action === "escalation.raised") r.escalations++;
    else if (e.action === "agent.usage") {
      const c = Number(parseJson<{ costUsd?: number }>(e.data).costUsd ?? 0);
      r.model.runs++;
      r.model.costUsd += c;
      r.model.byAgent[e.actor_id] = (r.model.byAgent[e.actor_id] ?? 0) + c;
    }
  }
  r.model.costUsd = Math.round(r.model.costUsd * 1e6) / 1e6;
  return r;
}

/** الفترة الافتراضية: الشهر الميلادي الحالي (UTC). */
export function monthRange(now: Date, ym?: string): { from: string; to: string } {
  const [y, m] = ym ? ym.split("-").map(Number) : [now.getUTCFullYear(), now.getUTCMonth() + 1];
  return { from: new Date(Date.UTC(y!, m! - 1, 1)).toISOString(), to: new Date(Date.UTC(y!, m!, 1)).toISOString() };
}
