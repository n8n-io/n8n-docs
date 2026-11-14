import { allow, type Guardrail } from "../../../../platform/tools/types.ts";
import { assessRequisition } from "../../shared/assessment.ts";

/**
 * decision_matches_assessment: يعيد التقييم الحتمي عند كل محاولة تسجيل قرار، ويمنع أي قرار يخالفه.
 * - approved_for_po مسموح فقط إذا كان التقييم approved_for_po.
 * - rejected مسموح فقط إذا كان التقييم rejected. لا يُرفض طلب يستحق التصعيد، لأن الرفض يحرم
 *   الإنسان من فرصة منح استثناء.
 * - escalated مسموح دائمًا، فهو الخيار المتحفظ.
 * - رمز السبب يجب أن يطابق النتيجة الأساسية للتقييم، أو AGENT_JUDGEMENT مع escalated فقط.
 * هذا يجعل اختراق النموذج أو هلوسته عاجزًا عن تمرير طلب يخالف السياسة.
 */
export const decisionMatchesAssessment: Guardrail = {
  id: "procurement.decision_matches_assessment",
  description: "A requisition decision must match the deterministic policy assessment (escalation always allowed)",
  appliesTo: ["record_requisition_decision"],
  check: (call, ctx) => {
    const decision = String(call.input.decision);
    const reasonCode = String(call.input.reasonCode);
    const a = assessRequisition(ctx.connectors.erp, String(call.input.requisitionId), { now: ctx.clock.now(), stage: "intake" });
    if (decision !== "escalated" && decision !== a.verdict)
      return { action: "block", reason: `Decision "${decision}" contradicts assessment verdict "${a.verdict}"${a.primary ? `: ${a.primary.message}` : ""}` };
    const expected = a.primary?.code ?? "WITHIN_POLICY";
    if (reasonCode !== expected && !(decision === "escalated" && reasonCode === "AGENT_JUDGEMENT") && !a.findings.some((f) => f.code === reasonCode))
      return { action: "block", reason: `Reason code ${reasonCode} does not match assessment (expected ${expected})` };
    return allow;
  },
};
