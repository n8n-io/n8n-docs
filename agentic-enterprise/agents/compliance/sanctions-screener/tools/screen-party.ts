import { z } from "zod";
import { defineTool } from "../../../../platform/tools/types.ts";
import { screenSupplier } from "../../shared/screening.ts";

/**
 * screen_party: يطابق أسماء الطرف من السجل الرئيسي (اللاتيني والعربي) مع قوائم العقوبات.
 * الصلاحية: read. المطابقة خوارزمية حتمية، والنموذج يقرأ النتيجة ولا يحسبها.
 */
export const screenParty = defineTool({
  name: "screen_party",
  description:
    "Screen a supplier's master-data names (Latin and Arabic) against the current sanctions lists. Returns candidates scored 0..1 and the suggested status (potential_match if any score ≥ 0.85).",
  permission: "read",
  input: z.object({ partyType: z.enum(["supplier"]), partyId: z.string().regex(/^sup-\d+$/) }),
  handler: ({ partyId }, ctx) => screenSupplier(ctx.connectors, partyId),
});
