import { ephemeralDbConfig } from "../core/db.ts";
import { randomBytes } from "node:crypto";
import { MemoryAnchor } from "../audit/anchor.ts";
import { ManualClock } from "../core/util.ts";
import { createPlatform } from "../index.ts";
import { ClaudeAgentRuntime } from "../runtime/claude-runtime.ts";
import { ScriptedRuntime } from "../runtime/runtime.ts";
import { auditIntact } from "./expect.ts";
import type { EvalContext, EvalScenario, ScenarioResult } from "./types.ts";

export type EvalMode = "scripted" | "live";

/** يشغّل سيناريو واحدًا في منصة معزولة، ثم يقيّم كل المعايير مع معيار سلامة audit الإلزامي. */
export async function runScenario(s: EvalScenario, mode: EvalMode): Promise<ScenarioResult> {
  const started = Date.now();
  const base: Omit<ScenarioResult, "passed" | "checks" | "durationMs" | "costUsd"> = {
    id: s.id, title: s.title, agent: s.owner ?? s.agents[0]!.id, category: s.category, mode,
  };
  if (mode === "live" && s.liveCompatible === false)
    return { ...base, passed: true, skipped: "scripted-only (simulates a compromised model)", checks: [], durationMs: 0, costUsd: 0 };

  const scripted = new ScriptedRuntime();
  if (mode === "scripted") for (const [id, policy] of Object.entries(s.policyOverride ?? {})) scripted.override(id, policy);

  const p = createPlatform({
    config: { ...ephemeralDbConfig(), KILL_SWITCH: false },
    clock: new ManualClock(),
    isolated: true,
    anchor: new MemoryAnchor(randomBytes(32)),
    devKeys: true,
    runtime:
      mode === "live"
        ? new ClaudeAgentRuntime({ model: process.env.AGENT_MODEL ?? "claude-opus-5-5", maxTurns: 20, maxBudgetUsd: 2 })
        : scripted,
  });

  try {
    p.register(...s.agents);
    await s.setup?.(p);
    const submitted = p.orchestrator.submit(s.task);
    await p.orchestrator.drain();
    await s.humans?.(p, { task: p.orchestrator.get(submitted.id) });
    await p.orchestrator.drain();

    const ctx: EvalContext = {
      p,
      task: p.orchestrator.get(submitted.id),
      tasks: p.orchestrator.list(),
      approvals: p.gate.list(),
      escalations: p.escalations.list(),
      audit: p.audit.query(),
      writes: p.connectors.writes,
    };
    const checks = [...s.expect, auditIntact()].map((c) => {
      try {
        const r = c.check(ctx);
        return r === true ? { name: c.name, pass: true } : { name: c.name, pass: false, message: r };
      } catch (err) {
        return { name: c.name, pass: false, message: `check threw: ${(err as Error).message}` };
      }
    });
    const costUsd = ctx.audit.filter((e) => e.action === "agent.usage").reduce((sum, e) => sum + Number(e.data.costUsd ?? 0), 0);
    return { ...base, passed: checks.every((c) => c.pass), checks, durationMs: Date.now() - started, costUsd };
  } catch (err) {
    return { ...base, passed: false, checks: [], error: (err as Error).stack ?? String(err), durationMs: Date.now() - started, costUsd: 0 };
  } finally {
    p.close();
  }
}
