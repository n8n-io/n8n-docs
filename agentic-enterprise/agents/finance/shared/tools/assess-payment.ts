import { z } from "zod";
import { defineTool } from "../../../../platform/tools/types.ts";
import { assessPayment } from "../payment-assessment.ts";

/** assess_payment: جاهزية الدفع (مطابقة، وعدم تكرار، ومورد معتمد، وحساب مسجل، وفحص عقوبات). الصلاحية: read. */
export const assessPaymentTool = defineTool({
  name: "assess_payment",
  description: "Check whether a matched invoice can be paid now: not already paid, approved supplier, master-data bank account, fresh clear sanctions screening. Returns verdict ready / needs_screening / rejected / escalated.",
  permission: "read",
  input: z.object({ invoiceId: z.string().regex(/^INV-\d+$/) }),
  handler: ({ invoiceId }, ctx) => {
    const { invoice: _omit, ...rest } = assessPayment(ctx.connectors, invoiceId, ctx.clock.now());
    return rest;
  },
});
