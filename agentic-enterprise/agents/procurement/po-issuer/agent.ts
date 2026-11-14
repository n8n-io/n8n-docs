import { z } from "zod";
import { defineAgent, loadPrompt, outcomeSchema, type AgentOutcome, type ToolGateway } from "../../../platform/agent/agent-definition.ts";
import type { Task } from "../../../platform/orchestrator/task.ts";
import { verdictFor, type Assessment } from "../shared/assessment.ts";
import { poIssuerGuardrails } from "./guardrails/index.ts";
import { poIssuerMemory } from "./memory/policy.ts";
import { poIssuerTools } from "./tools/index.ts";

/**
 * نقطة تشغيل وكيل إصدار أوامر الشراء. يستلم المهام من النوع procurement.po (من وكيل الفرز).
 */

export const PO_TASK = "procurement.po";

const Data = z.object({
  requisitionId: z.string(),
  supplierId: z.string(),
  approvalId: z.string().nullable(),
  reasonCode: z.string(),
  draftTotal: z.number().nullable(),
  currency: z.string().nullable(),
});
type PoData = z.infer<typeof Data>;

async function referencePolicy({ task, tools }: { task: Readonly<Task>; tools: ToolGateway }): Promise<AgentOutcome<PoData>> {
  const requisitionId = String(task.input.requisitionId);
  const supplierId = String(task.input.supplierId);
  const out = (status: AgentOutcome["status"], summary: string, d: Partial<PoData>): AgentOutcome<PoData> => ({
    status, summary, handoffs: [],
    data: { requisitionId, supplierId, approvalId: null, reasonCode: "", draftTotal: null, currency: null, ...d },
  });
  const escalate = async (summary: string, reasonCode: string) => {
    await tools.call("escalate_to_human", { reason: "agent_requested", severity: "medium", toRole: "procurement_manager", summary: `${requisitionId}/${supplierId}: ${summary}`.slice(0, 1500) });
    return out("escalated", summary.slice(0, 500), { reasonCode });
  };

  const req = await tools.call("get_requisition", { requisitionId });
  if (req.status !== "ok") return escalate(`get_requisition failed: ${JSON.stringify(req)}`, "AGENT_JUDGEMENT");

  const assessed = await tools.call("assess_requisition", { requisitionId, stage: "po" });
  if (assessed.status !== "ok") return escalate(`assess_requisition failed: ${JSON.stringify(assessed)}`, "AGENT_JUDGEMENT");
  const a = assessed.output as Omit<Assessment, "requisition">;
  const { verdict, primary, group } = verdictFor(a, supplierId);
  const amounts = { draftTotal: group?.total ?? null, currency: group?.currency ?? null };

  if (verdict === "rejected") return out("rejected", `No PO issued: ${primary!.message}`, { reasonCode: primary!.code, ...amounts });
  if (verdict === "escalated") {
    const e = primary!.escalation!;
    await tools.call("escalate_to_human", { ...e, summary: `${requisitionId}/${supplierId}: ${primary!.message}` });
    return out("escalated", `PO held for review: ${primary!.message}`, { reasonCode: primary!.code, ...amounts });
  }

  const r = await tools.call("create_purchase_order", { requisitionId, supplierId });
  if (r.status === "pending_approval")
    return out("needs_approval", `PO for ${group!.total} ${group!.currency} awaiting ${r.requiredApprovals} approval(s): ${r.summary}`, { approvalId: r.approvalId, reasonCode: "PENDING_APPROVAL", ...amounts });
  if (r.status === "escalated") return out("escalated", `PO held: ${r.reason}`, { reasonCode: r.reason, ...amounts });
  return escalate(`create_purchase_order returned ${JSON.stringify(r)}`, "AGENT_JUDGEMENT");
}

export const poIssuerAgent = defineAgent({
  id: "procurement.po-issuer",
  version: "1.0.0",
  domain: "procurement",
  name: "PO Issuer",
  title: "Purchase Order Specialist",
  kpi: "Zero-defect PO rate ≥ 99% (no PO amended or cancelled for an agent error within 30 days)",
  handles: [PO_TASK],
  canHandoffTo: [],
  systemPrompt: loadPrompt(new URL("./system_prompt.md", import.meta.url)),
  tools: poIssuerTools,
  guardrails: poIssuerGuardrails,
  memory: poIssuerMemory,
  outputSchema: outcomeSchema(Data),
  defaultEscalationRole: "procurement_manager",
  maxToolCalls: 10,
  referencePolicy: referencePolicy as never,
  /** المخرج يجب أن يخص طلب المهمة ومورّدها، لا غيرهما. */
  outcomeGuard: (outcome, { task }) => {
    const d = outcome.data as Partial<PoData>;
    const v: string[] = [];
    if (d.requisitionId !== task.input.requisitionId) v.push(`output requisition ${d.requisitionId} ≠ task ${String(task.input.requisitionId)}`);
    if (d.supplierId !== task.input.supplierId) v.push(`output supplier ${d.supplierId} ≠ task ${String(task.input.supplierId)}`);
    return v;
  },
});
