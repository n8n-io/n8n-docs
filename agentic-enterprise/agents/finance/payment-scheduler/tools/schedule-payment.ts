import { z } from "zod";
import { toUsd } from "../../../../platform/core/fx.ts";
import { defineTool } from "../../../../platform/tools/types.ts";
import { assessPayment } from "../../shared/payment-assessment.ts";

/**
 * schedule_payment: يحرّك مالًا إلى المورد. لا رجعة فيه.
 * الصلاحية: approval، والإجراء payment.
 * - المدخل معرّف الفاتورة فقط. المبلغ والعملة من الفاتورة، والمستفيد من السجل الرئيسي للمورد.
 *   لا يقبل الوكيل حسابًا بنكيًا ولا مبلغًا، فلا يمكن توجيه الدفع لحساب آخر من خلاله.
 * - الموافقون: finance_controller أو cfo، وموافقتان فوق 50 ألف دولار.
 * - جاهزية الدفع تُعاد عند التنفيذ بعد الموافقة. إن ظهر خلل جديد (تطابق عقوبات، أو دفع مسبق)، يفشل التنفيذ ويُصعَّد.
 */
export const schedulePayment = defineTool({
  name: "schedule_payment",
  description:
    "Request payment of a matched invoice to the supplier's master-data bank account. Amount, currency and payee come from ERP; you pass only the invoice id. Does NOT execute until a human approves.",
  permission: "approval",
  input: z.object({ invoiceId: z.string().regex(/^INV-\d+$/) }),
  irreversible: {
    action: "payment",
    roles: ["finance_controller", "cfo"],
    describe: ({ invoiceId }, ctx) => {
      const a = assessPayment(ctx.connectors, invoiceId, ctx.clock.now());
      if (a.verdict !== "ready") throw new Error(`Invoice not payable: ${a.primary?.message}`);
      const inv = a.invoice!;
      const s = ctx.connectors.erp.getSupplier(inv.supplierId)!;
      return {
        summary: `Pay ${inv.total} ${inv.currency} (≈ ${toUsd(inv.total, inv.currency)} USD) to ${s.name} at ${s.bankAccount.bankName} ****${s.bankAccount.iban.slice(-4)} for invoice ${inv.invoiceNumber} (${inv.id}, PO ${inv.poId}), due ${inv.dueDate}. Sanctions screening: clear.`,
        money: { amount: inv.total, currency: inv.currency },
      };
    },
  },
  handler: ({ invoiceId }, ctx) => {
    const a = assessPayment(ctx.connectors, invoiceId, ctx.clock.now());
    if (a.verdict !== "ready") throw new Error(`Invoice no longer payable at execution: ${a.primary?.code} ${a.primary?.message}`);
    const inv = a.invoice!;
    const s = ctx.connectors.erp.getSupplier(inv.supplierId)!;
    const p = ctx.connectors.payments.execute({ invoiceIds: [inv.id], supplierId: s.id, iban: s.bankAccount.iban, amount: inv.total, currency: inv.currency }, ctx.grant!);
    return { paymentId: p.id, amount: p.amount, currency: p.currency, ibanLast4: p.iban.slice(-4) };
  },
});
