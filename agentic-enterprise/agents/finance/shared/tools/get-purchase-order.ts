import { z } from "zod";
import { defineTool } from "../../../../platform/tools/types.ts";

/** get_purchase_order: يقرأ أمر الشراء وإيصالات استلامه. الصلاحية: read. */
export const getPurchaseOrder = defineTool({
  name: "get_purchase_order",
  description: "Read a purchase order and its goods receipts from ERP.",
  permission: "read",
  input: z.object({ poId: z.string().regex(/^PO-\d+$/) }),
  handler: ({ poId }, ctx) => {
    const po = ctx.connectors.erp.getPurchaseOrder(poId);
    return po ? { ...po, goodsReceipts: ctx.connectors.erp.getGoodsReceipts(poId) } : { error: "not_found", poId };
  },
});
