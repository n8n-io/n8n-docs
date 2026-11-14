import { createSdkMcpServer, query, tool, type CanUseTool } from "@anthropic-ai/claude-agent-sdk";
import { z } from "zod";
import type { Task } from "../orchestrator/task.ts";
import { wrapUntrusted } from "../security/untrusted.ts";
import type { AgentRuntime, RunRequest, RunResult } from "./runtime.ts";

/**
 * منفّذ حي يستخدم Claude Agent SDK.
 *
 * قرارات الأمان:
 * - tools: [] يعطّل كل الأدوات المدمجة في Claude Code (Bash وRead وWrite وWebFetch…)، فلا يرى الوكيل إلا أدواته.
 * - كل أداة تُسجَّل في خادم MCP داخل العملية، ومعالجها يستدعي ToolExecutor، فتسري الحواجز والموافقات نفسها.
 * - canUseTool يرفض أي أداة خارج القائمة، كطبقة ثانية فوق allowedTools.
 * - settingSources: [] يمنع تحميل إعدادات أو CLAUDE.md من القرص، فلا يتأثر الوكيل بملفات المستودع.
 * - المخرج النهائي مقيّد بـ JSON Schema مشتق من outputSchema، ثم يُتحقق منه مرة أخرى في Orchestrator.
 * - المحتوى الخارجي في المهمة (الحقل untrusted) يُغلَّف بـ wrapUntrusted.
 */
export interface ClaudeRuntimeOptions {
  model: string;
  maxTurns: number;
  maxBudgetUsd: number;
}

const SERVER = "enterprise";

export class ClaudeAgentRuntime implements AgentRuntime {
  readonly kind = "live" as const;
  constructor(private readonly opts: ClaudeRuntimeOptions) {}

  async run(req: RunRequest): Promise<RunResult> {
    const mcpTools = req.toolList.map((t) =>
      tool(t.name, `[permission: ${t.permission}] ${t.description}`, t.input.shape, async (args) => {
        const result = await req.tools.call(t.name, args as Record<string, unknown>);
        return {
          content: [{ type: "text" as const, text: JSON.stringify(result) }],
          isError: result.status === "error" || result.status === "denied",
        };
      }),
    );
    const server = createSdkMcpServer({ name: SERVER, version: "1.0.0", tools: mcpTools });
    const allowed = new Set(req.toolList.map((t) => `mcp__${SERVER}__${t.name}`));

    const canUseTool: CanUseTool = async (toolName) =>
      allowed.has(toolName)
        ? { behavior: "allow" }
        : { behavior: "deny", message: `Tool ${toolName} is not permitted for this agent` };

    const started = Date.now();
    let outcome: unknown;
    let costUsd = 0;
    let turns = 0;

    const abortController = new AbortController();
    req.signal?.addEventListener("abort", () => abortController.abort(), { once: true });
    for await (const msg of query({
      prompt: renderTaskPrompt(req.task),
      options: {
        abortController,
        model: this.opts.model,
        systemPrompt: req.agent.systemPrompt,
        tools: [],
        mcpServers: { [SERVER]: server },
        allowedTools: [...allowed],
        canUseTool,
        settingSources: [],
        persistSession: false,
        maxTurns: this.opts.maxTurns,
        maxBudgetUsd: Math.min(this.opts.maxBudgetUsd, req.maxBudgetUsd ?? Infinity),
        outputFormat: { type: "json_schema", schema: z.toJSONSchema(req.agent.outputSchema, { io: "input" }) as Record<string, unknown> },
      },
    })) {
      if (msg.type === "result") {
        costUsd = msg.total_cost_usd;
        turns = msg.num_turns;
        if (msg.subtype !== "success") throw new Error(`Agent run ended with ${msg.subtype}`);
        outcome = msg.structured_output ?? safeJson(msg.result);
      }
    }
    return { outcome, usage: { costUsd, turns, durationMs: Date.now() - started } };
  }
}

/** يبني رسالة المهمة. الحقل untrusted (إن وجد) يُغلَّف كبيانات خارجية، وباقي الحقول بيانات نظام موثوقة. */
export function renderTaskPrompt(task: Readonly<Task>): string {
  const { untrusted, ...trusted } = task.input as Record<string, unknown>;
  const parts = [
    `Task ${task.id} (type: ${task.type}). Originator: ${task.originator}.`,
    `Task input (from internal systems):\n${JSON.stringify(trusted, null, 2)}`,
  ];
  if (Array.isArray(untrusted)) {
    for (const u of untrusted as Array<{ source: string; text: string }>) parts.push(wrapUntrusted(u));
  }
  parts.push("Use your tools, then return the final outcome object.");
  return parts.join("\n\n");
}

function safeJson(text: string): unknown {
  try {
    return JSON.parse(text);
  } catch {
    return undefined;
  }
}
