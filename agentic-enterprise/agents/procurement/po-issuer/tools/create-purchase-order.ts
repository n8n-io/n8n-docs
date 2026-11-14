import { z } from "zod";
import { toUsd } from "../../../../platform/core/fx.ts";
import { defineTool } from "../../../../platform/tools/types.ts";
import { buildPoDraft } from "./po-draft.ts";

/**
 * create_purchase_order: يصدر أمر شراء في ERP، ويُرسل للمورد عبر قناة ERP المعتمدة.
 * الصلاحية: approval، والإجراء commit_spend. يلزم الشركة ماليًا أمام المورد، فلا رجعة فيه دون تكلفة.
 * - المدخلات معرّفات فقط (requisitionId وsupplierId). السطور والأسعار تُبنى من ERP، لا من النموذج.
 * - الموافقون: procurement_manager أو procurement_lead أو cfo، وموافقتان فوق 50 ألف دولار.
 */
export const createPurchaseOrder = defineTool({
  name: "create_purchase_order",
  description:
    "Request issuance of a purchase order for one supplier of an approved requisition. Lines and prices are built from ERP and the catalog; you only pass identifiers. Does NOT execute until a human approves.",
  permission: "approval",
  input: z.object({
    requisitionId: z.string().regex(/^REQ-\d+$/),
    supplierId: z.string().regex(/^sup-\d+$/),
  }),
  irreversible: {
    action: "commit_spend",
    roles: ["procurement_manager", "procurement_lead", "cfo"],
    describe: ({ requisitionId, supplierId }, ctx) => {
      const d = buildPoDraft(ctx.connectors.erp, requisitionId, supplierId, ctx.clock.now());
      const s = ctx.connectors.erp.getSupplier(supplierId);
      const lines = d.lines.map((l) => `${l.quantity} × ${l.sku} @ ${l.unitPrice}`).join("; ");
      return {
        summary: `PO for ${requisitionId} to ${s?.name} (${supplierId}), cost center ${d.costCenter}: ${lines}. Total ${d.total} ${d.currency} (≈ ${toUsd(d.total, d.currency)} USD).`,
        money: { amount: d.total, currency: d.currency },
      };
    },
  },
  handler: ({ requisitionId, supplierId }, ctx) => {
    const { total: _t, ...draft } = buildPoDraft(ctx.connectors.erp, requisitionId, supplierId, ctx.clock.now());
    const po = ctx.connectors.erp.createPurchaseOrder({ ...draft, sourceTaskId: ctx.task.id }, ctx.grant!);
    return { poId: po.id, total: po.total, currency: po.currency, status: po.status };
  },
});
