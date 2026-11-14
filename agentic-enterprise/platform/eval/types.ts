import type { AgentDefinition, ReferencePolicy } from "../agent/agent-definition.ts";
import type { ApprovalRequest } from "../approval/approval-gate.ts";
import type { AuditEntry } from "../audit/audit-log.ts";
import type { WriteRecord } from "../connectors/mock/mock-connectors.ts";
import type { JsonObject } from "../core/types.ts";
import type { Escalation } from "../escalation/escalation.ts";
import type { Platform } from "../index.ts";
import type { Task } from "../orchestrator/task.ts";

/**
 * سيناريو اختبار. كل سيناريو يبني منصة معزولة جديدة (قاعدة بيانات في الذاكرة وساعة يدوية)،
 * فلا تتأثر السيناريوهات ببعضها، وتعطي النتيجة نفسها في كل تشغيل.
 */
export type EvalCategory = "happy_path" | "edge_case" | "policy" | "adversarial" | "failure";

export interface EvalScenario {
  id: string;
  title: string;
  category: EvalCategory;
  /** اسم يظهر في التقرير بدل معرّف الوكيل الأول، للسيناريوهات متعددة الوكلاء. */
  owner?: string;
  /** الوكيل الأول هو الوكيل المُختبَر. الباقون يُسجَّلون لاستقبال الإحالات. */
  agents: AgentDefinition[];
  task: { type: string; input: JsonObject; originator: string };
  setup?(p: Platform): void | Promise<void>;
  /** سياسة بديلة في وضع scripted، لمحاكاة نموذج مخترَق أو مخطئ. */
  policyOverride?: Record<string, ReferencePolicy>;
  /** أفعال بشرية بعد التشغيل الأول، مثل الموافقة أو الرفض أو تقديم الساعة. */
  humans?(p: Platform, ctx: { task: Task }): void | Promise<void>;
  /** هل يصلح للوضع الحي؟ السيناريوهات التي تحاكي نموذجًا مخترقًا تعمل في scripted فقط. */
  liveCompatible?: boolean;
  expect: Check[];
}

export interface EvalContext {
  p: Platform;
  task: Task;
  tasks: Task[];
  approvals: ApprovalRequest[];
  escalations: Escalation[];
  audit: AuditEntry[];
  writes: WriteRecord[];
}

export interface Check {
  name: string;
  /** يعيد true عند النجاح، أو رسالة تشرح سبب الفشل. */
  check(ctx: EvalContext): true | string;
}

export interface CheckResult {
  name: string;
  pass: boolean;
  message?: string;
}

export interface ScenarioResult {
  id: string;
  title: string;
  agent: string;
  category: EvalCategory;
  mode: "scripted" | "live";
  passed: boolean;
  skipped?: string;
  checks: CheckResult[];
  error?: string;
  durationMs: number;
  costUsd: number;
}

export function defineEval(s: EvalScenario): EvalScenario {
  if (s.expect.length === 0) throw new Error(`Eval ${s.id} has no expectations`);
  return s;
}
