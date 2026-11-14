import { z } from "zod";
import type { AgentDefinition, ToolGateway } from "../agent/agent-definition.ts";
import { permittedByAutonomy, type AgentRegistry } from "../agent/registry.ts";
import type { ApprovalGate } from "../approval/approval-gate.ts";
import type { AuditLog } from "../audit/audit-log.ts";
import { assertAuditIntegrity } from "../audit/integrity.ts";
import type { Connectors } from "../connectors/types.ts";
import { isPlatformError } from "../core/errors.ts";
import type { KillSwitch } from "../core/kill-switch.ts";
import { HUMAN_ROLES, type JsonObject } from "../core/types.ts";
import { hashObject, type Clock } from "../core/util.ts";
import { ESCALATION_REASONS, type EscalationService } from "../escalation/escalation.ts";
import type { MemoryStore } from "../memory/memory-store.ts";
import type { Task } from "../orchestrator/task.ts";
import { defineTool, type AnyTool, type ToolCallResult, type ToolContext } from "./types.ts";

/**
 * نقطة الإنفاذ الوحيدة (single choke point) لكل استدعاء أداة، من أي وكيل وفي أي وضع تشغيل.
 * الترتيب ثابت ومقصود:
 *   1. مفتاح الإيقاف الطارئ
 *   2. حد عدد الاستدعاءات (حماية من الحلقات)
 *   3. قائمة الأدوات المسموحة للوكيل (allowlist)
 *   4. التحقق من المدخلات بالـ schema
 *   5. الحواجز (guardrails): تمنع أو تصعّد
 *   6. الصلاحية: approval ← طلب موافقة ولا تنفيذ؛ read/write ← تنفيذ
 *   7. تسجيل النتيجة في audit log
 * لا يوجد مسار آخر يصل منه الوكيل إلى الـ connectors.
 */

export interface ExecutorDeps {
  audit: AuditLog;
  gate: ApprovalGate;
  escalations: EscalationService;
  memory: MemoryStore;
  killSwitch: KillSwitch;
  connectors: Connectors;
  clock: Clock;
  getTask(id: string): Task;
  getAgent(id: string): AgentDefinition;
  registry: AgentRegistry;
}

export class ToolExecutor {
  private readonly callCounts = new Map<string, number>();

  constructor(private readonly deps: ExecutorDeps) {}

  /**
   * بوابة الأدوات لتشغيل واحد. إن مُرِّر leaseId فكل استدعاء يتحقق أن المهمة ما تزال running بالإيجار نفسه،
   * فاستدعاءات تشغيل انتهت مهلته أو استعاده عامل آخر تُرفض (R8).
   */
  gatewayFor(agent: AgentDefinition, taskId: string, leaseId?: string): ToolGateway {
    return { call: (name, input) => this.call(agent, taskId, name, input, leaseId) };
  }

  /** الأدوات المتاحة فعليًا للوكيل: أدواته الخاصة مع الأدوات المدمجة المشتركة. */
  toolsFor(agent: AgentDefinition): AnyTool[] {
    return [...agent.tools, ...BUILTIN_TOOLS(this.deps)];
  }

  async call(agent: AgentDefinition, taskId: string, name: string, rawInput: Record<string, unknown>, leaseId?: string): Promise<ToolCallResult> {
    const { audit, killSwitch, gate, escalations } = this.deps;
    const actor = { type: "agent" as const, id: agent.id };
    const log = (outcome: "success" | "denied" | "pending" | "failure", data: JsonObject) =>
      audit.append({ actor, action: `tool.${name}`, taskId, outcome, data });

    if (killSwitch.isEngaged()) {
      log("denied", { code: "KILL_SWITCH_ACTIVE" });
      return { status: "denied", code: "KILL_SWITCH_ACTIVE", reason: "Emergency stop is engaged. Stop all work." };
    }

    if (leaseId !== undefined) {
      const t = this.deps.getTask(taskId);
      if (t.status !== "running" || t.leaseId !== leaseId) {
        log("denied", { code: "STALE_RUN", leaseId, currentLease: t.leaseId, status: t.status });
        return { status: "denied", code: "STALE_RUN", reason: "This run no longer owns the task (timed out or recovered). Stop." };
      }
    }

    const countKey = `${taskId}:${agent.id}`;
    const count = (this.callCounts.get(countKey) ?? 0) + 1;
    this.callCounts.set(countKey, count);
    if (count > agent.maxToolCalls) {
      const esc = escalations.raise({
        taskId, raisedBy: "tool-executor", reason: "max_attempts_exceeded", severity: "medium",
        toRole: agent.defaultEscalationRole, summary: `Agent exceeded ${agent.maxToolCalls} tool calls on one task`,
      });
      log("denied", { code: "MAX_TOOL_CALLS" });
      return { status: "escalated", escalationId: esc.id, reason: "max_attempts_exceeded", note: "Tool call limit reached. Stop and report." };
    }

    // وكيل أوقفه إنسان يتوقف عند استدعاء الأداة التالي، حتى لو كان تشغيله قد بدأ قبل الإيقاف.
    if (!this.deps.registry.isActive(agent.id)) {
      log("denied", { code: "AGENT_NOT_ACTIVE", status: this.deps.registry.find(agent.id)?.status ?? "unregistered" });
      return { status: "denied", code: "AGENT_NOT_ACTIVE", reason: "This agent has been paused or stopped by an operator. Stop now." };
    }

    const tool = this.toolsFor(agent).find((t) => t.name === name);
    if (!tool) {
      log("denied", { code: "TOOL_NOT_ALLOWED" });
      return { status: "denied", code: "TOOL_NOT_ALLOWED", reason: `Tool "${name}" is not available to this agent` };
    }
    const autonomy = this.deps.registry.effectiveAutonomy(agent);
    if (!permittedByAutonomy(autonomy, tool.permission, tool.name)) {
      log("denied", { code: "AUTONOMY_LIMIT", autonomy, permission: tool.permission });
      return { status: "denied", code: "AUTONOMY_LIMIT", reason: `Autonomy level ${autonomy} does not permit ${tool.permission} tools. Recommend the action and escalate instead.` };
    }

    const parsed = tool.input.strict().safeParse(rawInput);
    if (!parsed.success) {
      log("denied", { code: "INVALID_INPUT", issues: z.prettifyError(parsed.error) });
      return { status: "error", code: "INVALID_INPUT", message: z.prettifyError(parsed.error) };
    }
    const input = parsed.data as JsonObject;
    const ctx = this.context(agent, taskId);

    for (const g of agent.guardrails) {
      if (g.appliesTo !== "*" && !g.appliesTo.includes(name)) continue;
      const verdict = await g.check({ tool: name, input }, ctx);
      if (verdict.action === "block") {
        log("denied", { code: "GUARDRAIL_BLOCKED", guardrail: g.id, reason: verdict.reason });
        return { status: "denied", code: "GUARDRAIL_BLOCKED", reason: `[${g.id}] ${verdict.reason}` };
      }
      if (verdict.action === "escalate") {
        const esc = escalations.raise({
          taskId, raisedBy: agent.id, reason: verdict.reason, severity: verdict.severity, toRole: verdict.toRole,
          summary: verdict.summary, context: { guardrail: g.id, tool: name, input },
        });
        log("denied", { code: "GUARDRAIL_ESCALATED", guardrail: g.id, escalationId: esc.id });
        return { status: "escalated", escalationId: esc.id, reason: verdict.reason, note: "A human now owns this decision. Do not retry; finish with status escalated." };
      }
    }

    if (tool.permission === "approval") {
      try {
        const { summary, money } = tool.irreversible!.describe(input, ctx);
        const req = gate.request({
          taskId, actionType: tool.irreversible!.action, toolName: name, requestedBy: agent.id,
          originator: ctx.task.originator, payload: input, summary, money, roles: tool.irreversible!.roles,
        });
        log("pending", { approvalId: req.id });
        return {
          status: "pending_approval", approvalId: req.id, summary, requiredApprovals: req.requiredApprovals,
          note: "Not executed. It will run only after human approval. Finish with status needs_approval.",
        };
      } catch (err) {
        return this.failure(log, err);
      }
    }

    try {
      const output = await tool.handler(input, ctx);
      log("success", { permission: tool.permission, output: truncate(output) });
      return { status: "ok", output };
    } catch (err) {
      return this.failure(log, err);
    }
  }

  /**
   * ينفّذ إجراءً بعد الموافقة البشرية، بالحمولة المخزنة نفسها التي رآها الموافق، لا بأي مدخل جديد.
   * يُستدعى من Orchestrator فقط، ولا يملك أي وكيل وصولًا إليه.
   */
  async executeApproved(approvalId: string): Promise<ToolCallResult> {
    const { audit, gate, escalations, killSwitch } = this.deps;
    const approval = gate.get(approvalId);
    const sys = { type: "system" as const, id: "tool-executor" };
    const log = (outcome: "success" | "denied" | "failure", data: JsonObject) =>
      audit.append({ actor: sys, action: `execute.${approval.toolName}`, target: approvalId, taskId: approval.taskId, outcome, data });

    if (killSwitch.isEngaged()) {
      log("denied", { code: "KILL_SWITCH_ACTIVE" });
      return { status: "denied", code: "KILL_SWITCH_ACTIVE", reason: "Emergency stop is engaged" };
    }
    try {
      assertAuditIntegrity(audit, killSwitch, `execution of ${approval.toolName}`);
    } catch (err) {
      return { status: "denied", code: "AUDIT_TAMPERED", reason: (err as Error).message };
    }
    if (approval.status !== "approved") {
      log("denied", { code: "APPROVAL_INVALID", status: approval.status });
      return { status: "denied", code: "APPROVAL_INVALID", reason: `Approval is ${approval.status}` };
    }
    if (hashObject(approval.payload) !== approval.payloadHash) {
      log("denied", { code: "PAYLOAD_TAMPERED" });
      escalations.raise({ taskId: approval.taskId, raisedBy: "tool-executor", reason: "suspected_fraud", severity: "critical", toRole: "ciso", summary: `Approved payload for ${approvalId} was modified after approval` });
      return { status: "denied", code: "PAYLOAD_TAMPERED", reason: "Stored payload does not match approved hash" };
    }

    const agent = this.deps.getAgent(approval.requestedBy);
    const tool = agent.tools.find((t) => t.name === approval.toolName && t.permission === "approval");
    if (!tool) {
      log("denied", { code: "TOOL_NOT_FOUND" });
      return { status: "denied", code: "TOOL_NOT_FOUND", reason: "Approved tool no longer registered" };
    }

    try {
      const input = tool.input.strict().parse(approval.payload);
      const grant = gate.issueGrant(approvalId);
      const output = await tool.handler(input, { ...this.context(agent, approval.taskId), grant });
      if (gate.get(approvalId).status !== "executed") {
        // الأداة لم تستهلك التفويض، أي أنها لم تمر بالـ connector المحمي: خلل في الأداة، فيُعامل كفشل.
        throw new Error(`Tool ${tool.name} completed without redeeming its approval grant`);
      }
      gate.recordResult(approvalId, { output: truncate(output) });
      log("success", { output: truncate(output) });
      return { status: "ok", output };
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      gate.recordResult(approvalId, { error: message }, true);
      log("failure", { error: message });
      const esc = escalations.raise({
        taskId: approval.taskId, raisedBy: "tool-executor", reason: "execution_failed", severity: "high",
        toRole: agent.defaultEscalationRole, summary: `Approved action ${approval.toolName} failed: ${message}`,
      });
      return { status: "escalated", escalationId: esc.id, reason: "execution_failed", note: message };
    }
  }

  private context(agent: AgentDefinition, taskId: string): ToolContext {
    const task = this.deps.getTask(taskId);
    return {
      agentId: agent.id,
      task: Object.freeze(structuredClone(task)),
      connectors: this.deps.connectors,
      memory: this.deps.memory.forAgent(agent.id, taskId, agent.memory),
      clock: this.deps.clock,
    };
  }

  private failure(log: (o: "failure", d: JsonObject) => unknown, err: unknown): ToolCallResult {
    const code = isPlatformError(err) ? err.code : "TOOL_ERROR";
    const message = err instanceof Error ? err.message : String(err);
    log("failure", { code, error: message });
    return { status: "error", code, message };
  }
}

/** أدوات مدمجة متاحة لكل وكيل: التصعيد والذاكرة. تمر بالمسار نفسه (allowlist وschema وaudit). */
function BUILTIN_TOOLS(deps: ExecutorDeps): AnyTool[] {
  return [
    defineTool({
      name: "escalate_to_human",
      description:
        "Hand this task to a human when you are uncertain, data is missing or contradictory, a policy exception is needed, or you suspect fraud or manipulation. After calling it, stop and finish with status escalated.",
      permission: "write",
      input: z.object({
        reason: z.enum(ESCALATION_REASONS),
        severity: z.enum(["low", "medium", "high", "critical"]),
        toRole: z.enum(HUMAN_ROLES),
        summary: z.string().min(10).max(1500),
      }),
      handler: (input, ctx) => {
        const e = deps.escalations.raise({ taskId: ctx.task.id, raisedBy: ctx.agentId, ...input });
        return { escalationId: e.id, dueAt: e.dueAt };
      },
    }),
    defineTool({
      name: "memory_recall",
      description: "Read your long-term or task memory for an allowed namespace.",
      permission: "read",
      input: z.object({ namespace: z.string(), key: z.string().optional() }),
      handler: (input, ctx) => ctx.memory.recall(input.namespace, input.key).map((r) => ({ key: r.key, value: r.value, createdAt: r.createdAt })),
    }),
    defineTool({
      name: "memory_remember",
      description: "Store a fact in an allowed memory namespace. PII is redacted automatically unless policy allows it.",
      permission: "write",
      input: z.object({ namespace: z.string(), key: z.string().max(200), value: z.any(), subjectIds: z.array(z.string()).optional() }),
      handler: (input, ctx) => {
        const r = ctx.memory.remember(input.namespace, input.key, input.value, { subjectIds: input.subjectIds ?? [] });
        return { stored: true, redactions: r.redactions, expiresAt: r.expiresAt };
      },
    }),
  ];
}

function truncate(value: unknown, max = 2000): string {
  const s = JSON.stringify(value) ?? "null";
  return s.length > max ? `${s.slice(0, max)}…[truncated]` : s;
}
