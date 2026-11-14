import { z } from "zod";
import { defineTool } from "../../../../platform/tools/types.ts";
import { screenSupplier } from "../../shared/screening.ts";

/**
 * record_screening_result: يسجّل نتيجة الفحص في سجل الامتثال، وهو السجل الذي تعتمد عليه المالية قبل الدفع.
 * الصلاحية: write. أثر داخلي، ولا يحظر المورد ولا يرسل شيئًا للخارج.
 * - الحالات المسموحة للوكيل: clear وpotential_match فقط. التبرئة (false_positive) والتأكيد بشريان.
 * - المرشحون ونسخة القائمة يُحسبون من جديد هنا، ولا يُقبلون من النموذج.
 * - محمية بالحاجز no_clear_over_threshold.
 */
export const recordScreeningResult = defineTool({
  name: "record_screening_result",
  description: "Record the screening outcome (clear or potential_match). Candidates are recomputed by the engine; you provide only the status and a short note.",
  permission: "write",
  input: z.object({
    partyType: z.enum(["supplier"]),
    partyId: z.string().regex(/^sup-\d+$/),
    status: z.enum(["clear", "potential_match"]),
    note: z.string().min(5).max(800),
  }),
  handler: ({ partyType, partyId, status, note }, ctx) => {
    const s = screenSupplier(ctx.connectors, partyId);
    if (!s.partyName) throw new Error(`Supplier ${partyId} not found`);
    const rec = ctx.connectors.sanctions.recordScreening({
      partyType, partyId, partyName: s.partyName, status, listVersion: s.listVersion, note, screenedBy: ctx.agentId, sourceTaskId: ctx.task.id,
      candidates: s.candidates.map((c) => ({ entryId: c.entryId, entryName: c.entryName, score: c.score })),
    });
    return { screeningId: rec.id, status: rec.status };
  },
});
