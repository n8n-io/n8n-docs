import { assessRequisitionTool } from "../../shared/tools/assess-requisition.ts";
import { getRequisition } from "../../shared/tools/get-requisition.ts";
import { getSupplier } from "../../../common/tools/get-supplier.ts";
import { searchCatalog } from "../../shared/tools/search-catalog.ts";
import { recordRequisitionDecision } from "./record-requisition-decision.ts";

/**
 * أدوات وكيل فرز الطلبات وصلاحياتها:
 *
 * | الأداة                        | الصلاحية | الملف                                        |
 * |-------------------------------|----------|----------------------------------------------|
 * | get_requisition               | read     | shared/tools/get-requisition.ts              |
 * | assess_requisition            | read     | shared/tools/assess-requisition.ts           |
 * | get_supplier                  | read     | common/tools/get-supplier.ts                 |
 * | search_catalog                | read     | shared/tools/search-catalog.ts               |
 * | record_requisition_decision   | write    | tools/record-requisition-decision.ts         |
 *
 * لا يملك هذا الوكيل أي أداة approval: لا يستطيع إلزام الشركة ماليًا. الإلزام عند po-issuer وبموافقة بشرية.
 * إضافة إلى ذلك، الأدوات المدمجة من المنصة: escalate_to_human وmemory_recall وmemory_remember.
 */
export const intakeTools = [getRequisition, assessRequisitionTool, getSupplier, searchCatalog, recordRequisitionDecision];
