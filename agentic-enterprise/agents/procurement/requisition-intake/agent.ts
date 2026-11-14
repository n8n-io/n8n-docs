import { z } from "zod";
import { defineAgent, loadPrompt, outcomeSchema, type AgentOutcome, type ToolGateway } from "../../../platform/agent/agent-definition.ts";
import type { HumanRole } from "../../../platform/core/types.ts";
import type { EscalationReason, Severity } from "../../../platform/escalation/escalation.ts";
import type { Assessment, Finding } from "../shared/assessment.ts";
import { intakeGuardrails } from "./guardrails/index.ts";
import { intakeMemory } from "./memory/policy.ts";
import { intakeTools } from "./tools/index.ts";

/**
 * نقطة تشغيل وكيل فرز طلبات الشراء.
 * يستلم المهام من النوع procurement.requisition، ويحيل الطلبات المعتمدة إلى procurement.po.
 */

export const INTAKE_TASK = "procurement.requisition";
export const PO_TASK = "procurement.po";

const Data = z.object({
  requisitionId: z.string(),
  decision: z.enum(["approved_for_po", "rejected", "escalated"]).nullable(),
  reasonCode: z.string(),
  totalUsd: z.number().nullable(),
  suppliers: z.array(z.string()),
  findings: z.array(z.object({ code: z.string(), message: z.string() })),
});
type IntakeData = z.infer<typeof Data>;

/**
 * السياسة المرجعية: تنفيذ حتمي لقواعد system_prompt.md خطوة بخطوة، عبر الأدوات فقط كما يفعل النموذج.
 */
async function referencePolicy({ task, tools }: { task: { input: Record<string, unknown> }; tools: ToolGateway }): Promise<AgentOutcome<IntakeData>> {
  const requisitionId = String(task.input.requisitionId);
  const ar = (task.input.language ?? "ar") === "ar";
  const base: IntakeData = { requisitionId, decision: null, reasonCode: "", totalUsd: null, suppliers: [], findings: [] };
  const out = (status: AgentOutcome["status"], summary: string, data: Partial<IntakeData>, handoffs: AgentOutcome["handoffs"] = []) =>
    ({ status, summary, data: { ...base, ...data }, handoffs });

  await tools.call("get_requisition", { requisitionId });
  const assessed = await tools.call("assess_requisition", { requisitionId, stage: "intake" });
  if (assessed.status !== "ok") return escalateMissing(tools, requisitionId, `assess_requisition failed: ${JSON.stringify(assessed)}`, out);
  const a = assessed.output as Omit<Assessment, "requisition">;
  const findings = a.findings.map((f) => ({ code: f.code, message: f.message }));
  const common = { totalUsd: a.totalUsd, suppliers: a.groups.map((g) => g.supplierId), findings };

  if (a.primary && (a.primary.code === "REQ_NOT_FOUND" || a.primary.code === "REQ_ALREADY_DECIDED"))
    return out("rejected", ar ? `لم يُتخذ إجراء: ${a.primary.message}` : `No action taken: ${a.primary.message}`, { ...common, reasonCode: a.primary.code });

  const reasonCode = a.primary?.code ?? "WITHIN_POLICY";
  const note = noteFor(a.verdict, a.primary, ar);
  const recorded = await tools.call("record_requisition_decision", { requisitionId, decision: a.verdict, reasonCode, note });
  if (recorded.status !== "ok") return escalateMissing(tools, requisitionId, `Could not record decision: ${JSON.stringify(recorded)}`, out);

  if (a.verdict === "approved_for_po")
    return out("completed", note, { ...common, decision: a.verdict, reasonCode }, a.groups.map((g) => ({ taskType: PO_TASK, input: { requisitionId, supplierId: g.supplierId }, when: "now" as const })));

  if (a.verdict === "rejected") return out("rejected", note, { ...common, decision: a.verdict, reasonCode });

  const e = a.primary!.escalation!;
  const others = a.findings.filter((f) => f !== a.primary && f.action !== "info").map((f) => f.code);
  await tools.call("escalate_to_human", {
    reason: e.reason, severity: e.severity, toRole: e.toRole,
    summary: `${requisitionId}: ${a.primary!.message}. Total ${a.totalUsd} USD.${others.length ? ` Other findings: ${others.join(", ")}.` : ""}`,
  });
  return out("escalated", note, { ...common, decision: a.verdict, reasonCode });
}

async function escalateMissing<T>(tools: ToolGateway, requisitionId: string, detail: string, out: (s: AgentOutcome["status"], m: string, d: Partial<IntakeData>) => T): Promise<T> {
  await tools.call("escalate_to_human", { reason: "missing_data" satisfies EscalationReason, severity: "medium" satisfies Severity, toRole: "procurement_lead" satisfies HumanRole, summary: `${requisitionId}: ${detail}`.slice(0, 1500) });
  return out("escalated", `${requisitionId} escalated: ${detail}`.slice(0, 500), { reasonCode: "AGENT_JUDGEMENT" });
}

function noteFor(verdict: Assessment["verdict"], primary: Finding | null, ar: boolean): string {
  if (verdict === "approved_for_po")
    return ar ? "طلبك مطابق للسياسة والميزانية، وأُحيل لإصدار أمر الشراء. سيصلك إشعار بعد اعتماد الأمر." : "Your requisition is within policy and budget and has been sent for purchase order issuance.";
  if (verdict === "rejected")
    return ar ? `تعذّر قبول الطلب: ${primary?.message}. يرجى تصحيحه وإعادة تقديمه.` : `Requisition cannot be accepted: ${primary?.message}. Please correct and resubmit.`;
  return ar ? `أُحيل طلبك لمراجعة بشرية: ${primary?.message}.` : `Your requisition was referred for human review: ${primary?.message}.`;
}

export const requisitionIntakeAgent = defineAgent({
  id: "procurement.requisition-intake",
  version: "1.0.0",
  domain: "procurement",
  name: "Requisition Intake",
  title: "Requisition Intake Specialist",
  kpi: "First-pass decision accuracy ≥ 95% on the weekly human-audited sample",
  handles: [INTAKE_TASK],
  canHandoffTo: [PO_TASK],
  systemPrompt: loadPrompt(new URL("./system_prompt.md", import.meta.url)),
  tools: intakeTools,
  guardrails: intakeGuardrails,
  memory: intakeMemory,
  outputSchema: outcomeSchema(Data),
  defaultEscalationRole: "procurement_lead",
  maxToolCalls: 15,
  referencePolicy: referencePolicy as never,
  /** لا إحالة ولا "اكتمال" إلا إذا كان قرار الموافقة مسجلًا فعلًا في ERP. */
  outcomeGuard: (outcome, { task, connectors }) => {
    const requisitionId = String(task.input.requisitionId);
    const req = connectors.erp.getRequisition(requisitionId);
    const v: string[] = [];
    for (const h of outcome.handoffs) {
      if (h.taskType !== PO_TASK) continue;
      if (h.input.requisitionId !== requisitionId) v.push(`handoff references ${String(h.input.requisitionId)} instead of ${requisitionId}`);
      if (req?.status !== "approved_for_po") v.push(`handoff to ${PO_TASK} but ERP status is ${req?.status ?? "missing"}`);
    }
    if (outcome.status === "completed" && req?.status !== "approved_for_po") v.push(`outcome completed but ERP status is ${req?.status ?? "missing"}`);
    if (outcome.status === "rejected" && req?.status === "submitted") v.push("outcome rejected but no decision recorded in ERP");
    return v;
  },
});
