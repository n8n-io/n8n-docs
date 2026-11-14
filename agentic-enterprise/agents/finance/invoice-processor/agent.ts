import { z } from "zod";
import { defineAgent, loadPrompt, outcomeSchema, type AgentOutcome, type ToolGateway } from "../../../platform/agent/agent-definition.ts";
import type { Task } from "../../../platform/orchestrator/task.ts";
import type { InvoiceAssessment } from "../shared/invoice-assessment.ts";
import { invoiceProcessorGuardrails } from "./guardrails/index.ts";
import { invoiceProcessorMemory } from "./memory/policy.ts";
import { invoiceProcessorTools } from "./tools/index.ts";

/** نقطة تشغيل وكيل معالجة الفواتير. يستلم finance.invoice، ويُحيل الفواتير المطابقة إلى finance.payment. */

export const INVOICE_TASK = "finance.invoice";
export const PAYMENT_TASK = "finance.payment";

const Data = z.object({
  invoiceId: z.string(),
  decision: z.enum(["matched", "rejected", "on_hold"]).nullable(),
  reasonCode: z.string(),
  poId: z.string().nullable(),
  findings: z.array(z.object({ code: z.string(), message: z.string() })),
});
type InvoiceData = z.infer<typeof Data>;

async function referencePolicy({ task, tools }: { task: Readonly<Task>; tools: ToolGateway }): Promise<AgentOutcome<InvoiceData>> {
  const invoiceId = String(task.input.invoiceId);
  const out = (status: AgentOutcome["status"], summary: string, d: Partial<InvoiceData>, handoffs: AgentOutcome["handoffs"] = []): AgentOutcome<InvoiceData> =>
    ({ status, summary, handoffs, data: { invoiceId, decision: null, reasonCode: "", poId: null, findings: [], ...d } });
  const hold = async (summary: string) => {
    await tools.call("escalate_to_human", { reason: "missing_data", severity: "medium", toRole: "ap_supervisor", summary: `${invoiceId}: ${summary}`.slice(0, 1500) });
    return out("escalated", summary.slice(0, 500), { reasonCode: "AGENT_JUDGEMENT" });
  };

  await tools.call("get_invoice", { invoiceId });
  const r = await tools.call("assess_invoice", { invoiceId });
  if (r.status !== "ok") return hold(`assess_invoice failed: ${JSON.stringify(r)}`);
  const a = r.output as Omit<InvoiceAssessment, "invoice">;
  const common = { poId: a.poId, findings: a.findings.map((f) => ({ code: f.code, message: f.message })) };
  const reasonCode = a.primary?.code ?? "WITHIN_TOLERANCE";

  if (reasonCode === "INV_NOT_FOUND" || reasonCode === "INV_ALREADY_PROCESSED")
    return out("rejected", `No action: ${a.primary!.message}`, { ...common, reasonCode });

  const note = a.verdict === "matched" ? "Three-way match within tolerance; released for payment scheduling." : a.primary!.message;
  const rec = await tools.call("record_invoice_decision", { invoiceId, decision: a.verdict, reasonCode, note: note.slice(0, 1000) });
  if (rec.status !== "ok") return hold(`Could not record decision: ${JSON.stringify(rec)}`);

  if (a.verdict === "matched")
    return out("completed", `Invoice ${invoiceId} matched to ${a.poId}; sent to payment scheduling.`, { ...common, decision: "matched", reasonCode }, [{ taskType: PAYMENT_TASK, input: { invoiceId }, when: "now" }]);
  if (a.verdict === "rejected") return out("rejected", `Invoice ${invoiceId} rejected: ${a.primary!.message}`, { ...common, decision: "rejected", reasonCode });

  const e = a.primary!.escalation!;
  const others = a.findings.filter((f) => f !== a.primary).map((f) => f.code);
  await tools.call("escalate_to_human", { ...e, summary: `${invoiceId}: ${a.primary!.message}${others.length ? ` Also: ${others.join(", ")}.` : ""}`.slice(0, 1500) });
  return out("escalated", `Invoice ${invoiceId} on hold: ${a.primary!.message}`.slice(0, 500), { ...common, decision: "on_hold", reasonCode });
}

export const invoiceProcessorAgent = defineAgent({
  id: "finance.invoice-processor",
  version: "1.0.0",
  domain: "finance",
  name: "Invoice Processor",
  title: "Accounts Payable Invoice Specialist",
  kpi: "Decision accuracy ≥ 98% on the weekly audited sample, with zero fraudulent invoices released to payment",
  handles: [INVOICE_TASK],
  canHandoffTo: [PAYMENT_TASK],
  systemPrompt: loadPrompt(new URL("./system_prompt.md", import.meta.url)),
  tools: invoiceProcessorTools,
  guardrails: invoiceProcessorGuardrails,
  memory: invoiceProcessorMemory,
  outputSchema: outcomeSchema(Data),
  defaultEscalationRole: "ap_supervisor",
  maxToolCalls: 12,
  referencePolicy: referencePolicy as never,
  /** لا إحالة للدفع ولا "اكتمال" إلا إذا كانت الفاتورة matched في ERP. */
  outcomeGuard: (outcome, { task, connectors }) => {
    const invoiceId = String(task.input.invoiceId);
    const status = connectors.erp.getInvoice(invoiceId)?.status;
    const v: string[] = [];
    for (const h of outcome.handoffs)
      if (h.taskType === PAYMENT_TASK && (h.input.invoiceId !== invoiceId || status !== "matched")) v.push(`payment handoff for ${String(h.input.invoiceId)} but ERP status is ${status}`);
    if (outcome.status === "completed" && status !== "matched") v.push(`outcome completed but ERP status is ${status}`);
    return v;
  },
});
