import { allow, type Guardrail } from "../../../../platform/tools/types.ts";

/**
 * same_task_scope: يحصر الكتابة والإجراءات في الطلب (والمورد، إن حُدد) المسند في المهمة.
 * يحمي من الخلط بين المهام، ومن محتوى مرفق يطلب "اعتمد أيضًا الطلب REQ-xxxx" أو "أصدر الأمر لمورد آخر".
 */
export function sameTaskScope(tools: string[]): Guardrail {
  return {
    id: "procurement.same_task_scope",
    description: "Writes are limited to the requisition (and supplier) assigned in the task",
    appliesTo: tools,
    check: (call, ctx) => {
      if (call.input.requisitionId !== ctx.task.input.requisitionId)
        return { action: "block", reason: `Task is about ${String(ctx.task.input.requisitionId)}, not ${String(call.input.requisitionId)}` };
      if (ctx.task.input.supplierId !== undefined && call.input.supplierId !== undefined && call.input.supplierId !== ctx.task.input.supplierId)
        return { action: "block", reason: `Task is for supplier ${String(ctx.task.input.supplierId)}, not ${String(call.input.supplierId)}` };
      return allow;
    },
  };
}
