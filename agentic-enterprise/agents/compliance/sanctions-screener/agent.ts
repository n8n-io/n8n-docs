import { z } from "zod";
import { defineAgent, HandoffSchema, loadPrompt, outcomeSchema, type AgentOutcome, type ToolGateway } from "../../../platform/agent/agent-definition.ts";
import type { Task } from "../../../platform/orchestrator/task.ts";
import { canonicalJson } from "../../../platform/core/util.ts";
import { COMPLIANCE_POLICY } from "../shared/policy.ts";
import type { PartyScreening } from "../shared/screening.ts";
import { screenerGuardrails } from "./guardrails/index.ts";
import { screenerMemory } from "./memory/policy.ts";
import { screenerTools } from "./tools/index.ts";

/**
 * نقطة تشغيل وكيل فحص العقوبات. يستلم compliance.screen، ويستأنف مهمة الدفع عند فحص نظيف.
 * مدخلات المهمة: { partyType: "supplier", partyId, resume?: { taskType, input, when } }
 */

export const SCREEN_TASK = "compliance.screen";

const Data = z.object({
  partyId: z.string(),
  screeningId: z.string().nullable(),
  result: z.enum(["clear", "potential_match"]).nullable(),
  topCandidate: z.object({ entryId: z.string(), score: z.number() }).nullable(),
  listVersion: z.string().nullable(),
});
type ScreenData = z.infer<typeof Data>;

async function referencePolicy({ task, tools }: { task: Readonly<Task>; tools: ToolGateway }): Promise<AgentOutcome<ScreenData>> {
  const partyId = String(task.input.partyId);
  const base: ScreenData = { partyId, screeningId: null, result: null, topCandidate: null, listVersion: null };
  const out = (status: AgentOutcome["status"], summary: string, d: Partial<ScreenData>, handoffs: AgentOutcome["handoffs"] = []): AgentOutcome<ScreenData> =>
    ({ status, summary, data: { ...base, ...d }, handoffs });
  const escalate = async (reason: "missing_data" | "agent_requested", summary: string) => {
    await tools.call("escalate_to_human", { reason, severity: "medium", toRole: "compliance_officer", summary: `${partyId}: ${summary}`.slice(0, 1500) });
    return out("escalated", summary.slice(0, 500), {});
  };

  const sup = await tools.call("get_supplier", { supplierId: partyId });
  if (sup.status !== "ok" || (sup.output as { error?: string }).error) return escalate("missing_data", "Supplier not found in master data");

  const sr = await tools.call("screen_party", { partyType: "supplier", partyId });
  if (sr.status !== "ok") return escalate("agent_requested", `screen_party failed: ${JSON.stringify(sr)}`);
  const s = sr.output as PartyScreening;
  const top = s.candidates[0] ? { entryId: s.candidates[0].entryId, score: s.candidates[0].score } : null;
  const status = s.suggested!;
  const note = top ? `Top candidate ${s.candidates[0]!.entryName} (${top.entryId}) score ${top.score} on "${s.candidates[0]!.matchedOn}"` : "No candidates ≥ 0.75";

  const rec = await tools.call("record_screening_result", { partyType: "supplier", partyId, status, note });
  if (rec.status !== "ok") return escalate("agent_requested", `Could not record screening: ${JSON.stringify(rec)}`);
  const screeningId = (rec.output as { screeningId: string }).screeningId;
  const data = { screeningId, result: status, topCandidate: top, listVersion: s.listVersion };

  if (status === "potential_match") {
    const list = s.candidates.filter((c) => c.score >= COMPLIANCE_POLICY.matchThreshold).map((c) => `${c.entryName} [${c.list} ${c.entryId}] ${c.score} via "${c.matchedOn}"`).join("; ");
    await tools.call("escalate_to_human", { reason: "sanctions_potential_match", severity: "high", toRole: "compliance_officer", summary: `${s.partyName} (${partyId}) potential match: ${list}. Payments are blocked until resolved.` });
    return out("escalated", `Potential sanctions match for ${s.partyName}; referred to the compliance officer.`, data);
  }
  const resume = HandoffSchema.safeParse(task.input.resume);
  return out("completed", `${s.partyName} screened clear against ${s.listVersion}.`, data, resume.success ? [resume.data] : []);
}

export const sanctionsScreenerAgent = defineAgent({
  id: "compliance.sanctions-screener",
  version: "1.0.0",
  domain: "compliance",
  name: "Sanctions Screener",
  title: "Sanctions Screening Analyst",
  kpi: "100% recall on the quarterly back-test set of listed names and their transliteration variants",
  handles: [SCREEN_TASK],
  canHandoffTo: COMPLIANCE_POLICY.resumableTaskTypes,
  systemPrompt: loadPrompt(new URL("./system_prompt.md", import.meta.url)),
  tools: screenerTools,
  guardrails: screenerGuardrails,
  memory: screenerMemory,
  outputSchema: outcomeSchema(Data),
  defaultEscalationRole: "compliance_officer",
  maxToolCalls: 10,
  referencePolicy: referencePolicy as never,
  /** الاستئناف فقط بعد فحص نظيف سُجِّل في هذه المهمة، وفقط بالمهمة المطلوبة في resume كما هي. */
  outcomeGuard: (outcome, { task, connectors }) => {
    const v: string[] = [];
    if (outcome.handoffs.length === 0) return v;
    const rec = connectors.sanctions.latestScreening(String(task.input.partyId));
    if (!rec || rec.sourceTaskId !== task.id || rec.status !== "clear") v.push(`handoff without a clear screening recorded by this task (latest: ${rec?.status ?? "none"})`);
    const expected = task.input.resume ? canonicalJson(HandoffSchema.parse(task.input.resume)) : null;
    for (const h of outcome.handoffs) if (canonicalJson(h) !== expected) v.push(`handoff ${h.taskType} does not match the requested resume`);
    return v;
  },
});
