import { assessRequisitionTool } from "../../shared/tools/assess-requisition.ts";
import { getRequisition } from "../../shared/tools/get-requisition.ts";
import { getSupplier } from "../../../common/tools/get-supplier.ts";
import { createPurchaseOrder } from "./create-purchase-order.ts";

/**
 * أدوات وكيل إصدار أوامر الشراء وصلاحياتها:
 *
 * | الأداة                 | الصلاحية                       | الملف                                |
 * |------------------------|--------------------------------|--------------------------------------|
 * | get_requisition        | read                           | shared/tools/get-requisition.ts      |
 * | assess_requisition     | read                           | shared/tools/assess-requisition.ts   |
 * | get_supplier           | read                           | common/tools/get-supplier.ts         |
 * | create_purchase_order  | approval (commit_spend)        | tools/create-purchase-order.ts       |
 *
 * إضافة إلى ذلك، الأدوات المدمجة من المنصة: escalate_to_human وmemory_recall وmemory_remember.
 */
export const poIssuerTools = [getRequisition, assessRequisitionTool, getSupplier, createPurchaseOrder];
