import { createSdkMcpServer, tool } from "@anthropic-ai/claude-agent-sdk";
import { describe, expect, it } from "vitest";
import { z } from "zod";
import { selfcheckAgent } from "../../platform/eval/selfcheck/agent.ts";
import { testPlatform } from "../helpers.ts";

/** لا يوجد مفتاح API في CI، فنختبر هنا فقط أن تعريفات الأدوات والمخرج متوافقة مع Agent SDK. */
describe("Claude Agent SDK wiring (offline)", () => {
  it("builds an in-process MCP server from every agent tool and a JSON schema for the outcome", () => {
    const { p } = testPlatform();
    p.register(selfcheckAgent);
    const tools = p.executor.toolsFor(selfcheckAgent);
    const warnings: string[] = [];
    const onWarn = (w: Error) => warnings.push(w.message);
    process.on("warning", onWarn);
    const server = createSdkMcpServer({ name: "enterprise", tools: tools.map((t) => tool(t.name, t.description, t.input.shape, async () => ({ content: [] }))) });
    process.off("warning", onWarn);
    expect(server.type).toBe("sdk");
    expect(warnings.filter((w) => /schema/i.test(w))).toEqual([]);
    const schema = z.toJSONSchema(selfcheckAgent.outputSchema, { io: "input" }) as { properties: Record<string, unknown> };
    expect(Object.keys(schema.properties)).toEqual(expect.arrayContaining(["status", "summary", "data", "handoffs"]));
  });
});
