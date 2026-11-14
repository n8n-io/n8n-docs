import { z } from "zod";
import { defineTool } from "../../../../platform/tools/types.ts";

/**
 * get_requisition: يقرأ طلب الشراء من ERP.
 * الصلاحية: read. لا أثر جانبي.
 */
export const getRequisition = defineTool({
  name: "get_requisition",
  description: "Read a purchase requisition from ERP (the system of record): requester, cost center, lines, status and any prior decision.",
  permission: "read",
  input: z.object({ requisitionId: z.string().regex(/^REQ-\d+$/) }),
  handler: ({ requisitionId }, ctx) => ctx.connectors.erp.getRequisition(requisitionId) ?? { error: "not_found", requisitionId },
});
