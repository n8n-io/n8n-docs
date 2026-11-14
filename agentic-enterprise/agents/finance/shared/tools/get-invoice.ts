import { z } from "zod";
import { defineTool } from "../../../../platform/tools/types.ts";

/** get_invoice: يقرأ الفاتورة من ERP. الصلاحية: read. الحساب البنكي في الفاتورة يُعاد مقنّعًا. */
export const getInvoice = defineTool({
  name: "get_invoice",
  description: "Read a supplier invoice from ERP (lines, totals, PO reference, status). The remit-to IBAN is masked.",
  permission: "read",
  input: z.object({ invoiceId: z.string().regex(/^INV-\d+$/) }),
  handler: ({ invoiceId }, ctx) => {
    const inv = ctx.connectors.erp.getInvoice(invoiceId);
    if (!inv) return { error: "not_found", invoiceId };
    return { ...inv, remitToIban: inv.remitToIban ? `****${inv.remitToIban.slice(-4)}` : null };
  },
});
