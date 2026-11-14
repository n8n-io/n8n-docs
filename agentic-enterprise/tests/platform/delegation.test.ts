import { describe, expect, it } from "vitest";
import { done, testAgent, testPlatform } from "../helpers.ts";

/** حد عمق التفويض وكشف الحلقات بين الوكلاء. */
describe("delegation limits", () => {
  it("a self-delegating chain stops at the configured depth and escalates", async () => {
    const { p } = testPlatform();
    p.register(testAgent({
      handles: ["test.run"], canHandoffTo: ["test.run"],
      policy: async ({ task }) => done("next", { handoffs: [{ taskType: "test.run", input: { n: Number(task.input.n ?? 0) + 1 }, when: "now" }] }),
    }));
    p.orchestrator.submit({ type: "test.run", input: { n: 0 }, originator: "u-requester" });
    for (let i = 0; i < 20; i++) await p.orchestrator.drain();
    const tasks = p.orchestrator.list();
    expect(tasks).toHaveLength(7); // الجذر + 6 مستويات
    expect(p.escalations.list({ status: "open" }).filter((e) => e.reason === "delegation_limit")).toHaveLength(1);
    expect(p.audit.query({ action: "task.handoff" }).filter((e) => e.outcome === "denied")[0]!.data).toMatchObject({ reason: expect.stringMatching(/depth 7 exceeds 6/) });
  });

  it("detects a ping-pong loop with identical input, while allowing one legitimate resume", async () => {
    const { p } = testPlatform();
    const bounce = (to: string) => async ({ task }: { task: { input: Record<string, unknown> } }) => done("bounce", { handoffs: [{ taskType: to, input: { invoiceId: task.input.invoiceId }, when: "now" as const }] });
    p.register(
      testAgent({ id: "a.pay", handles: ["a.pay"], canHandoffTo: ["a.screen"], policy: bounce("a.screen") as never }),
      testAgent({ id: "a.screen", handles: ["a.screen"], canHandoffTo: ["a.pay"], policy: bounce("a.pay") as never }),
    );
    p.orchestrator.submit({ type: "a.pay", input: { invoiceId: "INV-1" }, originator: "u-requester" });
    for (let i = 0; i < 20; i++) await p.orchestrator.drain();
    const types = p.orchestrator.list().map((t) => t.type);
    // pay → screen → pay (استئناف مشروع) → screen → رفض الدورة الثالثة لـ pay
    expect(types).toEqual(["a.pay", "a.screen", "a.pay", "a.screen"]);
    const esc = p.escalations.list({ status: "open" });
    expect(esc).toHaveLength(1);
    expect(esc[0]!.summary).toMatch(/handoff loop/);
  });

  it("the depth limit is configurable", async () => {
    const { p } = testPlatform();
    expect(p.config.AGENT_MAX_HANDOFF_DEPTH).toBe(6);
  });
});
