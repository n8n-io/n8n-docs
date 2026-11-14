import { z } from "zod";
import { defineAgent, loadPrompt, outcomeSchema, type AgentOutcome, type ToolGateway } from "../../../platform/agent/agent-definition.ts";
import type { Task } from "../../../platform/orchestrator/task.ts";
import { assessPayment, type PaymentAssessment } from "../shared/payment-assessment.ts";
import { paymentSchedulerGuardrails } from "./guardrails/index.ts";
import { paymentSchedulerMemory } from "./memory/policy.ts";
import { paymentSchedulerTools } from "./tools/index.ts";

/** نقطة تشغيل وكيل جدولة المدفوعات. يستلم finance.payment، ويطلب compliance.screen عند الحاجة. */

export const PAYMENT_TASK = "finance.payment";
export const SCREEN_TASK = "compliance.screen";

const Data = z.object({
  invoiceId: z.string(),
  supplierId: z.string().nullable(),
  approvalId: z.string().nullable(),
  reasonCode: z.string(),
  amount: z.number().nullable(),
  currency: z.string().nullable(),
  scheduledFor: z.string().nullable(),
});
type PaymentData = z.infer<typeof Data>;

async function referencePolicy({ task, tools }: { task: Readonly<Task>; tools: ToolGateway }): Promise<AgentOutcome<PaymentData>> {
  const invoiceId = String(task.input.invoiceId);
  const out = (status: AgentOutcome["status"], summary: string, d: Partial<PaymentData>, handoffs: AgentOutcome["handoffs"] = []): AgentOutcome<PaymentData> =>
    ({ status, summary, handoffs, data: { invoiceId, supplierId: null, approvalId: null, reasonCode: "", amount: null, currency: null, scheduledFor: null, ...d } });
  const escalate = async (summary: string, reasonCode: string, extra: Partial<PaymentData> = {}) => {
    await tools.call("escalate_to_human", { reason: "agent_requested", severity: "medium", toRole: reasonCode === "SCREENING_LOOP" ? "compliance_officer" : "finance_controller", summary: `${invoiceId}: ${summary}`.slice(0, 1500) });
    return out("escalated", summary.slice(0, 500), { reasonCode, ...extra });
  };

  const r = await tools.call("assess_payment", { invoiceId });
  if (r.status !== "ok") return escalate(`assess_payment failed: ${JSON.stringify(r)}`, "AGENT_JUDGEMENT");
  const a = r.output as Omit<PaymentAssessment, "invoice">;
  const common = { supplierId: a.supplierId, amount: a.amount, currency: a.currency, scheduledFor: a.scheduledFor };

  if (a.verdict === "rejected") return out("rejected", `No payment: ${a.primary!.message}`, { ...common, reasonCode: a.primary!.code });
  if (a.verdict === "escalated") {
    await tools.call("escalate_to_human", { ...a.primary!.escalation!, summary: `${invoiceId}: ${a.primary!.message}` });
    return out("escalated", `Payment held: ${a.primary!.message}`, { ...common, reasonCode: a.primary!.code });
  }
  if (a.verdict === "needs_screening") {
    if (task.input.afterScreening === true) return escalate(`Screening still not valid after a screening round: ${a.primary!.message}`, "SCREENING_LOOP", common);
    return out("completed", `Sanctions screening required for ${a.supplierId} before paying ${invoiceId}; requested from compliance.`, { ...common, reasonCode: "AWAITING_SCREENING" }, [{
      taskType: SCREEN_TASK, when: "now",
      input: { partyType: "supplier", partyId: a.supplierId!, resume: { taskType: PAYMENT_TASK, input: { invoiceId, afterScreening: true }, when: "now" } },
    }]);
  }

  const p = await tools.call("schedule_payment", { invoiceId });
  if (p.status === "pending_approval")
    return out("needs_approval", `Payment of ${a.amount} ${a.currency} awaiting ${p.requiredApprovals} approval(s).`, { ...common, approvalId: p.approvalId, reasonCode: "PENDING_APPROVAL" });
  if (p.status === "escalated") return out("escalated", `Payment held: ${p.reason}`, { ...common, reasonCode: p.reason });
  return escalate(`schedule_payment returned ${JSON.stringify(p)}`, "AGENT_JUDGEMENT", common);
}

export const paymentSchedulerAgent = defineAgent({
  id: "finance.payment-scheduler",
  version: "1.0.0",
  domain: "finance",
  name: "Payment Scheduler",
  title: "Payments Specialist",
  kpi: "Zero erroneous payments per quarter (duplicate, wrong payee, unscreened or unmatched)",
  handles: [PAYMENT_TASK],
  canHandoffTo: [SCREEN_TASK],
  systemPrompt: loadPrompt(new URL("./system_prompt.md", import.meta.url)),
  tools: paymentSchedulerTools,
  guardrails: paymentSchedulerGuardrails,
  memory: paymentSchedulerMemory,
  outputSchema: outcomeSchema(Data),
  defaultEscalationRole: "finance_controller",
  maxToolCalls: 10,
  referencePolicy: referencePolicy as never,
  /** الإحالة للامتثال فقط لمورد هذه الفاتورة، وفقط عند الحاجة الفعلية للفحص، وبعودة إلى الفاتورة نفسها. */
  outcomeGuard: (outcome, { task, connectors }) => {
    const v: string[] = [];
    const invoiceId = String(task.input.invoiceId);
    for (const h of outcome.handoffs) {
      if (h.taskType !== SCREEN_TASK) continue;
      const a = assessPayment(connectors, invoiceId, new Date(task.updatedAt));
      if (a.verdict !== "needs_screening") v.push(`screening requested but payment verdict is ${a.verdict}`);
      if (h.input.partyId !== a.supplierId) v.push(`screening requested for ${String(h.input.partyId)}, invoice supplier is ${a.supplierId}`);
      const resume = h.input.resume as { taskType?: string; input?: { invoiceId?: string } } | undefined;
      if (resume?.taskType !== PAYMENT_TASK || resume.input?.invoiceId !== invoiceId) v.push("resume must return to this invoice's payment task");
    }
    return v;
  },
});
