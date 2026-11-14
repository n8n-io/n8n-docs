import { allow, type Guardrail } from "../../../../platform/tools/types.ts";
import { assessInvoice } from "../../shared/invoice-assessment.ts";

/**
 * invoice_decision_matches_assessment: يعيد المطابقة الثلاثية ويمنع أي قرار يخالفها.
 * - matched فقط إذا كانت النتيجة matched. هذا يمنع تمرير فاتورة احتيالية للدفع.
 * - rejected فقط إذا كانت النتيجة rejected.
 * - on_hold مسموح دائمًا، فهو الخيار المتحفظ.
 */
export const invoiceDecisionMatchesAssessment: Guardrail = {
  id: "finance.invoice_decision_matches_assessment",
  description: "Invoice decision must match the deterministic three-way match (on_hold always allowed)",
  appliesTo: ["record_invoice_decision"],
  check: (call, ctx) => {
    const a = assessInvoice(ctx.connectors.erp, String(call.input.invoiceId));
    const d = String(call.input.decision);
    if (d !== "on_hold" && d !== a.verdict) return { action: "block", reason: `Decision "${d}" contradicts verdict "${a.verdict}"${a.primary ? `: ${a.primary.message}` : ""}` };
    const expected = a.primary?.code ?? "WITHIN_TOLERANCE";
    const rc = String(call.input.reasonCode);
    if (rc !== expected && !(d === "on_hold" && rc === "AGENT_JUDGEMENT") && !a.findings.some((f) => f.code === rc))
      return { action: "block", reason: `Reason code ${rc} does not match assessment (expected ${expected})` };
    return allow;
  },
};
