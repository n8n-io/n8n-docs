import { randomBytes } from "node:crypto";
import { describe, expect, it } from "vitest";
import { computeMetrics } from "../../ops/metrics.ts";
import { MemoryAnchor } from "../../platform/audit/anchor.ts";
import { ephemeralDbConfig } from "../../platform/core/db.ts";
import { ManualClock } from "../../platform/core/util.ts";
import { createPlatform } from "../../platform/index.ts";
import type { AgentRuntime, RunRequest } from "../../platform/runtime/runtime.ts";
import { done, testAgent } from "../helpers.ts";

/** منفّذ يحاكي نموذجًا يكلّف مبلغًا ثابتًا لكل تشغيل، ويسجل السقف الذي مُرر له. */
class CostlyRuntime implements AgentRuntime {
  readonly kind = "live" as const;
  budgets: Array<number | undefined> = [];
  constructor(private readonly perRun: number) {}
  async run(req: RunRequest) {
    this.budgets.push(req.maxBudgetUsd);
    return { outcome: done(), usage: { costUsd: this.perRun, turns: 1, durationMs: 1 } };
  }
}

function setup(perRun: number, dailyBudget: number) {
  const clock = new ManualClock();
  const runtime = new CostlyRuntime(perRun);
  const p = createPlatform({ config: { ...ephemeralDbConfig(), KILL_SWITCH: false, AGENT_DAILY_BUDGET_USD: dailyBudget }, clock, runtime, isolated: true, anchor: new MemoryAnchor(randomBytes(32)), devKeys: true });
  return { p, clock, runtime };
}

describe("cumulative cost budget per agent", () => {
  it("stops claiming once the 24h budget is spent, alerts, and resumes when the window rolls", async () => {
    const { p, clock, runtime } = setup(4, 10);
    p.register(testAgent());
    for (let i = 0; i < 5; i++) p.orchestrator.submit({ type: "test.run", input: { i }, originator: "u-requester" });
    await p.orchestrator.drain();
    const byStatus = (s: string) => p.orchestrator.list().filter((t) => t.status === s).length;
    expect(byStatus("completed")).toBe(3); // 0 → 4 → 8 → 12: الثالث يُسمح به لأن المتبقي كان موجبًا
    expect(byStatus("queued")).toBe(2);
    expect(p.orchestrator.spentLast24h("test.agent")).toBe(12);
    expect(runtime.budgets.slice(0, 3)).toEqual([10, 6, 2]); // السقف المُمرر للمنفّذ هو المتبقي
    // المسار المباشر (run لمهمة بعينها، أو عامل آخر سبق الفحص) يمر بـ claim، ولا يتجاوز السقف
    const waiting = p.orchestrator.list({ status: "queued" })[0]!;
    expect(await p.orchestrator.run(waiting.id)).toMatchObject({ status: "queued", attempts: 0 });
    expect(runtime.budgets).toHaveLength(3);
    await p.orchestrator.drain();
    expect(p.audit.query({ action: "agent.budget_exhausted" })).toHaveLength(1);
    expect(computeMetrics(p).alerts.map((a) => a.code)).toContain("BUDGET_EXHAUSTED");

    clock.advanceHours(25);
    await p.orchestrator.drain();
    expect(byStatus("queued")).toBe(0);
  });

  it("an agent-level budget overrides the global one, and other agents keep working", async () => {
    const { p } = setup(3, 100);
    p.register(testAgent({ dailyBudgetUsd: 5 }), testAgent({ id: "test.other", handles: ["other.run"] }));
    for (let i = 0; i < 3; i++) {
      p.orchestrator.submit({ type: "test.run", input: { i }, originator: "u-requester" });
      p.orchestrator.submit({ type: "other.run", input: { i }, originator: "u-requester" });
    }
    await p.orchestrator.drain();
    const done = (type: string) => p.orchestrator.list().filter((t) => t.type === type && t.status === "completed").length;
    expect(done("test.run")).toBe(2);
    expect(done("other.run")).toBe(3);
  });
});
