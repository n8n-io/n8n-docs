import { z } from "zod";
import { defineTool } from "../../../../platform/tools/types.ts";

export const INVOICE_REASON_CODES = [
  "WITHIN_TOLERANCE", "INV_NOT_FOUND", "INV_ALREADY_PROCESSED", "DUPLICATE_INVOICE", "ARITHMETIC_ERROR", "NO_PO",
  "PO_SUPPLIER_MISMATCH", "CURRENCY_MISMATCH", "LINE_NOT_ON_PO", "QTY_EXCEEDS_RECEIPT", "PRICE_VARIANCE",
  "BANK_DETAILS_MISMATCH", "SUPPLIER_NOT_APPROVED", "AGENT_JUDGEMENT",
] as const;

const STATUS = { matched: "matched", rejected: "rejected", on_hold: "on_hold" } as const;

/**
 * record_invoice_decision: يسجّل نتيجة المطابقة على الفاتورة في ERP.
 * الصلاحية: write. تغيير حالة داخلي قابل للتراجع، ولا يحرّك مالًا.
 * محمية بالحاجز invoice_decision_matches_assessment.
 */
export const recordInvoiceDecision = defineTool({
  name: "record_invoice_decision",
  description: "Record the matching decision on the invoice in ERP: matched, rejected (returned to supplier) or on_hold (human review). Must match the assessment verdict; on_hold is always allowed.",
  permission: "write",
  input: z.object({
    invoiceId: z.string().regex(/^INV-\d+$/),
    decision: z.enum(["matched", "rejected", "on_hold"]),
    reasonCode: z.enum(INVOICE_REASON_CODES),
    note: z.string().min(5).max(1000),
  }),
  handler: ({ invoiceId, decision, reasonCode, note }, ctx) => {
    const inv = ctx.connectors.erp.setInvoiceStatus(invoiceId, STATUS[decision], `[${reasonCode}] ${note}`);
    return { invoiceId: inv.id, status: inv.status };
  },
});
