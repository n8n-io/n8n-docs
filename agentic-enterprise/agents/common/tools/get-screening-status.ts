import { z } from "zod";
import { defineTool } from "../../../platform/tools/types.ts";
import { screeningAllowsPayment } from "../../compliance/shared/screening.ts";

/**
 * get_screening_status: يقرأ آخر نتيجة فحص عقوبات لطرف، ويحكم هل تسمح بالدفع.
 * الصلاحية: read. تستخدمه المالية قبل أي دفعة.
 */
export const getScreeningStatus = defineTool({
  name: "get_screening_status",
  description: "Read the latest sanctions screening for a party and whether it currently allows payment (clear or human-cleared, fresh, current list).",
  permission: "read",
  input: z.object({ partyId: z.string().regex(/^sup-\d+$/) }),
  handler: ({ partyId }, ctx) => {
    const rec = ctx.connectors.sanctions.latestScreening(partyId);
    return { latest: rec && { id: rec.id, status: rec.status, screenedAt: rec.screenedAt, listVersion: rec.listVersion }, ...screeningAllowsPayment(rec, ctx.clock.now(), ctx.connectors.sanctions.listVersion()) };
  },
});
