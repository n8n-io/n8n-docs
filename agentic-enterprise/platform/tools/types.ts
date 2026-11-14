import type { z } from "zod";
import type { ApprovalGrant } from "../approval/approval-gate.ts";
import type { Connectors } from "../connectors/types.ts";
import type { HumanRole, IrreversibleAction, JsonObject, Money, ToolPermission } from "../core/types.ts";
import type { Clock } from "../core/util.ts";
import type { EscalationReason, Severity } from "../escalation/escalation.ts";
import type { AgentMemory } from "../memory/memory-store.ts";
import type { Task } from "../orchestrator/task.ts";

/** السياق الذي تتلقاه كل أداة. لا تصل الأداة إلى المنصة الخام، بل إلى واجهات مقيّدة فقط. */
export interface ToolContext {
  agentId: string;
  task: Readonly<Task>;
  connectors: Connectors;
  memory: AgentMemory;
  clock: Clock;
  /** يوجد فقط عند تنفيذ أداة "approval" بعد الموافقة البشرية. */
  grant?: ApprovalGrant;
}

export interface IrreversibleSpec<I> {
  action: IrreversibleAction;
  /**
   * يصف الأثر للموافق البشري. يُحسب من النظام المرجعي (ctx.connectors)، لا من نص أرسله النموذج.
   * إذا رمت هذه الدالة خطأ فلا يُنشأ طلب موافقة.
   */
  describe(input: I, ctx: ToolContext): { summary: string; money?: Money };
  /** تضييق أدوار الموافقين لهذه الأداة. لا يمكن توسيعها خارج سياسة البوابة. */
  roles?: HumanRole[];
}

export interface ToolDefinition<S extends z.ZodObject = z.ZodObject, O = unknown> {
  name: string;
  description: string;
  permission: ToolPermission;
  input: S;
  /** إلزامي عندما تكون الصلاحية approval، ويُتحقق من ذلك عند التسجيل. */
  irreversible?: IrreversibleSpec<z.infer<S>>;
  handler(input: z.infer<S>, ctx: ToolContext): O | Promise<O>;
}

export function defineTool<S extends z.ZodObject, O>(def: ToolDefinition<S, O>): ToolDefinition<S, O> {
  if (def.permission === "approval" && !def.irreversible)
    throw new Error(`Tool ${def.name}: permission "approval" requires an irreversible spec`);
  if (def.permission !== "approval" && def.irreversible)
    throw new Error(`Tool ${def.name}: an irreversible action must use permission "approval"`);
  if (!/^[a-z][a-z0-9_]{2,63}$/.test(def.name)) throw new Error(`Tool name must be snake_case: ${def.name}`);
  return def;
}

// إزالة معاملات النوع عند التخزين في سجلات غير متجانسة.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyTool = ToolDefinition<z.ZodObject, any>;

/** حكم الحاجز (guardrail) على استدعاء أداة. */
export type GuardrailVerdict =
  | { action: "allow" }
  | { action: "block"; reason: string }
  | { action: "escalate"; reason: EscalationReason; severity: Severity; toRole: HumanRole; summary: string };

export interface ToolCall {
  tool: string;
  input: JsonObject;
}

export interface Guardrail {
  id: string;
  description: string;
  /** الأدوات التي يُطبَّق عليها. "*" تعني كل الأدوات. */
  appliesTo: string[] | "*";
  check(call: ToolCall, ctx: ToolContext): GuardrailVerdict | Promise<GuardrailVerdict>;
}

export const allow: GuardrailVerdict = { action: "allow" };

/** نتيجة استدعاء أداة كما تُعاد للنموذج. لا ترمي استثناءات للنموذج، بل تعيد حالة واضحة. */
export type ToolCallResult =
  | { status: "ok"; output: unknown }
  | { status: "denied"; code: string; reason: string }
  | { status: "pending_approval"; approvalId: string; summary: string; requiredApprovals: number; note: string }
  | { status: "escalated"; escalationId: string; reason: EscalationReason; note: string }
  | { status: "error"; code: string; message: string };
