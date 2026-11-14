import { z } from "zod";
import { defineTool } from "../../../../platform/tools/types.ts";

export const DECISION_REASON_CODES = [
  "WITHIN_POLICY",
  "REQ_NOT_FOUND",
  "REQ_ALREADY_DECIDED",
  "INVALID_QUANTITY",
  "NON_CATALOG_ITEM",
  "SUPPLIER_BLOCKED",
  "SUPPLIER_NOT_APPROVED",
  "BUDGET_UNKNOWN",
  "BUDGET_INSUFFICIENT",
  "QUOTES_REQUIRED",
  "SPLIT_SUSPECTED",
  "AGENT_JUDGEMENT",
] as const;

/**
 * record_requisition_decision: يسجّل قرار الفرز على الطلب في ERP.
 * الصلاحية: write. أثر داخلي قابل للتراجع (تغيير حالة الطلب)، ولا يُلزم الشركة ماليًا.
 * محمية بالحاجز decision_matches_assessment: لا يُقبل قرار يخالف التقييم الحتمي.
 */
export const recordRequisitionDecision = defineTool({
  name: "record_requisition_decision",
  description:
    "Record your triage decision on the requisition in ERP. decision must match the assessment verdict, except that you may always choose 'escalated' when in doubt. The note is shown to the requester, in their language.",
  permission: "write",
  input: z.object({
    requisitionId: z.string().regex(/^REQ-\d+$/),
    decision: z.enum(["approved_for_po", "rejected", "escalated"]),
    reasonCode: z.enum(DECISION_REASON_CODES),
    note: z.string().min(5).max(1000),
  }),
  handler: ({ requisitionId, decision, reasonCode, note }, ctx) =>
    ctx.connectors.erp.recordRequisitionDecision(requisitionId, decision, { by: ctx.agentId, reasonCode, note }),
});
