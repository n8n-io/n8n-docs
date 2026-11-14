import { allow, type Guardrail } from "../../../../platform/tools/types.ts";
import { COMPLIANCE_POLICY } from "../../shared/policy.ts";
import { screenSupplier } from "../../shared/screening.ts";

/**
 * no_clear_over_threshold: يعيد المطابقة عند كل تسجيل، ويمنع تسجيل "clear" لطرف له مرشح
 * درجته ≥ حد التطابق. التبرئة من تطابق محتمل قرار بشري حصري (false_positive).
 * تسجيل potential_match مسموح دائمًا، فهو الخيار المتحفظ.
 */
export const noClearOverThreshold: Guardrail = {
  id: "compliance.no_clear_over_threshold",
  description: "Automated screening cannot clear a party with a candidate at or above the match threshold",
  appliesTo: ["record_screening_result"],
  check: (call, ctx) => {
    if (call.input.status !== "clear") return allow;
    const s = screenSupplier(ctx.connectors, String(call.input.partyId));
    const top = s.candidates[0];
    if (top && top.score >= COMPLIANCE_POLICY.matchThreshold)
      return { action: "block", reason: `Cannot clear: ${top.entryName} (${top.entryId}) scores ${top.score} ≥ ${COMPLIANCE_POLICY.matchThreshold}. Record potential_match and escalate.` };
    return allow;
  },
};
