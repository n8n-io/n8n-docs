import type { AgentDefinition, AgentOutcome, ToolGateway } from "../agent/agent-definition.ts";
import type { Task } from "../orchestrator/task.ts";

/**
 * منفّذ الوكيل: يحوّل مهمة إلى مخرج نهائي عبر استدعاء الأدوات.
 * المنصة لا تثق بالمنفّذ: كل أداة تمر بـ ToolExecutor، والمخرج يُتحقق منه بـ outputSchema.
 * لذلك تختبر evals الحتمية (ScriptedRuntime) مسار الإنفاذ نفسه الذي يمر به Claude في الوضع الحي.
 */
export interface RunRequest {
  agent: AgentDefinition;
  task: Readonly<Task>;
  tools: ToolGateway;
  /** الأدوات كما تُعرض للنموذج: أدوات الوكيل مع الأدوات المدمجة. */
  toolList: AgentDefinition["tools"];
  /** يُطلق عند انتهاء المهلة. المنفّذ الحي يمرره إلى Agent SDK لإلغاء الطلب فعليًا. */
  signal?: AbortSignal;
  /** ما تبقى من ميزانية الوكيل اليومية. المنفّذ الحي يأخذ الأدنى بينه وبين سقف التشغيل الواحد. */
  maxBudgetUsd?: number;
}

export interface RunResult {
  outcome: unknown;
  usage?: { costUsd: number; turns: number; durationMs: number };
}

export interface AgentRuntime {
  readonly kind: "scripted" | "live";
  run(req: RunRequest): Promise<RunResult>;
}

/**
 * منفّذ حتمي بلا نموذج. يشغّل السياسة المرجعية للوكيل، أو سياسة بديلة تُمرَّر له.
 * السياسة البديلة تُستخدم في evals لمحاكاة نموذج مخترَق أو مخطئ، مثل محاولة الدفع دون موافقة.
 */
export class ScriptedRuntime implements AgentRuntime {
  readonly kind = "scripted" as const;
  constructor(private readonly overrides: Map<string, (ctx: { task: Readonly<Task>; tools: ToolGateway }) => Promise<AgentOutcome>> = new Map()) {}

  override(agentId: string, policy: (ctx: { task: Readonly<Task>; tools: ToolGateway }) => Promise<AgentOutcome>): void {
    this.overrides.set(agentId, policy);
  }

  async run(req: RunRequest): Promise<RunResult> {
    const policy = this.overrides.get(req.agent.id) ?? req.agent.referencePolicy;
    const started = Date.now();
    const outcome = await policy({ task: req.task, tools: req.tools });
    return { outcome, usage: { costUsd: 0, turns: 0, durationMs: Date.now() - started } };
  }
}
