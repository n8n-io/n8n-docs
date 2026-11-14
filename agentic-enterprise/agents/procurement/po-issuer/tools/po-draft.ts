import type { ErpConnector, PurchaseOrder } from "../../../../platform/connectors/types.ts";
import { assessRequisition, verdictFor } from "../../shared/assessment.ts";

/**
 * يبني مسودة أمر الشراء حتميًا من ERP والكتالوج. تُستدعى مرتين:
 * عند طلب الموافقة لعرض المبلغ على الإنسان، وعند التنفيذ بعد الموافقة.
 * لا يدخل فيها أي سعر أو كمية من النموذج أو من المرفقات. إن تغيّر سعر الكتالوج بعد الموافقة
 * وارتفع المبلغ، يرفض الـ connector التنفيذ لأن المبلغ تجاوز المبلغ الموافق عليه.
 */
export function buildPoDraft(erp: ErpConnector, requisitionId: string, supplierId: string, now: Date): Omit<PurchaseOrder, "id" | "status" | "createdAt" | "total" | "sourceTaskId"> & { total: number } {
  const a = assessRequisition(erp, requisitionId, { now, stage: "po" });
  const { verdict, primary, group } = verdictFor(a, supplierId);
  if (verdict !== "approved_for_po" || !group || !a.requisition) throw new Error(`Cannot draft PO: ${primary?.message ?? "requisition not eligible"}`);
  return {
    supplierId,
    costCenter: a.requisition.costCenter,
    requesterId: a.requisition.requesterId,
    requisitionId,
    currency: group.currency,
    lines: group.lines.map((l) => ({ sku: l.sku, description: l.description, quantity: l.quantity, unitPrice: l.unitPrice })),
    total: group.total,
  };
}
