import { z } from "zod";
import { defineTool } from "../../../../platform/tools/types.ts";
import { assessInvoice } from "../invoice-assessment.ts";

/**
 * assess_invoice: المطابقة الثلاثية وكشف التكرار والاحتيال البنكي. الصلاحية: read.
 * النتيجة نفسها التي يستخدمها الحاجز على record_invoice_decision.
 */
export const assessInvoiceTool = defineTool({
  name: "assess_invoice",
  description: "Three-way match the invoice against its PO and goods receipts; check duplicates, arithmetic, supplier status and bank details. Returns findings and the verdict (matched / rejected / on_hold).",
  permission: "read",
  input: z.object({ invoiceId: z.string().regex(/^INV-\d+$/) }),
  handler: ({ invoiceId }, ctx) => {
    const { invoice: _omit, ...rest } = assessInvoice(ctx.connectors.erp, invoiceId);
    return rest;
  },
});
