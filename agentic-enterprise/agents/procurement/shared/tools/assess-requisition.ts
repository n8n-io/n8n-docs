import { z } from "zod";
import { defineTool } from "../../../../platform/tools/types.ts";
import { assessRequisition } from "../assessment.ts";

/**
 * assess_requisition: يقيّم الطلب مقابل الكتالوج والميزانية وحالة المورد وكشف التقسيم.
 * الصلاحية: read. النتيجة نفسها التي تستخدمها الحواجز، فلا فائدة من محاولة تجاوزها.
 */
export const assessRequisitionTool = defineTool({
  name: "assess_requisition",
  description:
    "Price the requisition from the catalog, group lines by supplier, and check budget, supplier status, competitive-quote rule and split purchasing. Returns findings with action reject/escalate/info and the derived verdict. Prices always come from the catalog, never from attachments.",
  permission: "read",
  input: z.object({ requisitionId: z.string().regex(/^REQ-\d+$/), stage: z.enum(["intake", "po"]) }),
  handler: ({ requisitionId, stage }, ctx) => {
    const a = assessRequisition(ctx.connectors.erp, requisitionId, { now: ctx.clock.now(), stage });
    const { requisition: _omit, ...rest } = a;
    return rest;
  },
});
