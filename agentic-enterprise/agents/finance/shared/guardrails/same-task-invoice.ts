import { allow, type Guardrail } from "../../../../platform/tools/types.ts";

/** same_task_invoice: الكتابة والإجراءات على فاتورة المهمة فقط. */
export function sameTaskInvoice(tools: string[]): Guardrail {
  return {
    id: "finance.same_task_invoice",
    description: "Writes and actions are limited to the invoice assigned in the task",
    appliesTo: tools,
    check: (call, ctx) =>
      call.input.invoiceId === ctx.task.input.invoiceId ? allow : { action: "block", reason: `Task is about ${String(ctx.task.input.invoiceId)}, not ${String(call.input.invoiceId)}` },
  };
}
