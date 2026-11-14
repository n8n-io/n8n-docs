import type { HumanRole } from "../core/types.ts";
import { allow, type Guardrail } from "../tools/types.ts";
import { detectInjection } from "./untrusted.ts";

/**
 * حواجز مشتركة يمكن لأي وكيل تضمينها. الحواجز الخاصة بكل مجال تعيش في agents/<domain>/<agent>/guardrails/.
 */

/**
 * إذا احتوى المحتوى الخارجي للمهمة على علامات حقن تعليمات، يُمنع طلب أي إجراء لا رجعة فيه ويُصعَّد لإنسان.
 * القرار متحفظ عن قصد: كلفة مراجعة بشرية إضافية أقل بكثير من كلفة دفعة احتيالية.
 */
export function injectionGuard(approvalTools: string[], toRole: HumanRole): Guardrail {
  return {
    id: "platform.injection_guard",
    description: "Escalates irreversible actions on tasks whose external content shows prompt-injection markers",
    appliesTo: approvalTools,
    check: (_call, ctx) => {
      const items = Array.isArray(ctx.task.input.untrusted) ? (ctx.task.input.untrusted as Array<{ source?: string; text?: string }>) : [];
      const findings = items.flatMap((u) => detectInjection(String(u.text ?? "")));
      if (findings.length === 0) return allow;
      return {
        action: "escalate",
        reason: "suspected_prompt_injection",
        severity: "high",
        toRole,
        summary: `External content contains manipulation markers (${[...new Set(findings.map((f) => f.pattern))].join(", ")}). Irreversible action held for human review.`,
      };
    },
  };
}
