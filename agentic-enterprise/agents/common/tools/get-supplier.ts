import { z } from "zod";
import { defineTool } from "../../../platform/tools/types.ts";

/**
 * get_supplier: يقرأ بيانات المورد الرئيسية.
 * الصلاحية: read. الحساب البنكي يُعاد مقنّعًا، لأن الوكيل لا يحتاجه ولا يجب أن يتداوله.
 */
export const getSupplier = defineTool({
  name: "get_supplier",
  description: "Read supplier master data (status, categories, payment terms, risk rating). Bank details are masked.",
  permission: "read",
  input: z.object({ supplierId: z.string().regex(/^sup-\d+$/) }),
  handler: ({ supplierId }, ctx) => {
    const s = ctx.connectors.erp.getSupplier(supplierId);
    if (!s) return { error: "not_found", supplierId };
    return { ...s, bankAccount: { bankName: s.bankAccount.bankName, iban: `****${s.bankAccount.iban.slice(-4)}` } };
  },
});
