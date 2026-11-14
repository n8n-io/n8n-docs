import { ephemeralDbConfig } from "../platform/core/db.ts";
import { z } from "zod";
import { defineAgent, outcomeSchema, type AgentDefinition, type AgentOutcome, type ReferencePolicy } from "../platform/agent/agent-definition.ts";
import { randomBytes } from "node:crypto";
import { MemoryAnchor } from "../platform/audit/anchor.ts";
import { ManualClock } from "../platform/core/util.ts";
import { createPlatform, type Platform } from "../platform/index.ts";
import { ScriptedRuntime } from "../platform/runtime/runtime.ts";
import { defineTool, type Guardrail } from "../platform/tools/types.ts";

export function testPlatform(): { p: Platform; clock: ManualClock; runtime: ScriptedRuntime } {
  const clock = new ManualClock();
  const runtime = new ScriptedRuntime();
  const p = createPlatform({ config: { ...ephemeralDbConfig(), KILL_SWITCH: false }, clock, runtime, isolated: true, anchor: new MemoryAnchor(randomBytes(32)), devKeys: true });
  return { p, clock, runtime };
}

export const echoTool = defineTool({
  name: "echo",
  description: "Echo input",
  permission: "read",
  input: z.object({ text: z.string() }),
  handler: ({ text }) => ({ text }),
});

export const sendTool = defineTool({
  name: "send_email",
  description: "Send an external email",
  permission: "approval",
  input: z.object({ to: z.string(), body: z.string() }),
  irreversible: {
    action: "external_send",
    describe: ({ to }) => ({ summary: `Email to ${to}` }),
    roles: ["cs_supervisor"],
  },
  handler: ({ to, body }, ctx) => ctx.connectors.email.send({ from: "agent@company.example", to: [to], subject: "Test", body }, ctx.grant!),
});

export const Output = outcomeSchema(z.object({ note: z.string().optional() }));

export const done = (summary = "ok", extra: Partial<AgentOutcome> = {}): AgentOutcome => ({ status: "completed", summary, data: {}, handoffs: [], ...extra });

export function testAgent(overrides: Partial<AgentDefinition> & { policy?: ReferencePolicy; guardrails?: Guardrail[] } = {}): AgentDefinition {
  const { policy, ...rest } = overrides;
  return defineAgent({
    id: "test.agent",
    domain: "test",
    name: "Test",
    title: "Test agent",
    kpi: "n/a",
    handles: ["test.run"],
    canHandoffTo: [],
    systemPrompt: "test",
    tools: [echoTool, sendTool],
    guardrails: [],
    memory: {
      remember: [
        { namespace: "notes", scope: "task", maxTtlDays: 0, allowPii: false, description: "task notes" },
        { namespace: "prefs", scope: "agent", maxTtlDays: 30, allowPii: false, description: "prefs" },
        { namespace: "contacts", scope: "shared", maxTtlDays: 365, allowPii: true, description: "contacts" },
      ],
      forget: [],
    },
    outputSchema: Output,
    defaultEscalationRole: "cs_supervisor",
    maxToolCalls: 5,
    referencePolicy: policy ?? (async () => done()),
    ...rest,
  });
}

/** قرار على مستوى البوابة مباشرة، موقّع بمفاتيح التطوير (وضع signed الافتراضي). */
export const gd = (p: Platform, id: string, humanId: string, decision: "approve" | "reject", comment = "") =>
  p.gate.decide(id, humanId, decision, comment, p.signDecision(id, humanId, decision, comment));
