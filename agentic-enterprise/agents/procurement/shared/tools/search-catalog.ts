import { z } from "zod";
import { defineTool } from "../../../../platform/tools/types.ts";

/**
 * search_catalog: يبحث في الكتالوج المعتمد، لاقتراح بديل متعاقد عليه لصنف غير موجود في الكتالوج.
 * الصلاحية: read.
 */
export const searchCatalog = defineTool({
  name: "search_catalog",
  description: "Search the approved catalog by free text and/or category, to suggest a contracted alternative for a non-catalog line.",
  permission: "read",
  input: z.object({ query: z.string().max(100).optional(), category: z.string().max(50).optional() }),
  handler: (input, ctx) => ctx.connectors.erp.searchCatalog(input).slice(0, 10),
});
