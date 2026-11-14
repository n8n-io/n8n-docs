import { allow, type Guardrail } from "../../../../platform/tools/types.ts";

/** same_task_party: الكتابة على الطرف المسند في المهمة فقط. */
export const sameTaskParty: Guardrail = {
  id: "compliance.same_task_party",
  description: "Writes are limited to the party assigned in the task",
  appliesTo: ["record_screening_result"],
  check: (call, ctx) =>
    call.input.partyId === ctx.task.input.partyId ? allow : { action: "block", reason: `Task is about ${String(ctx.task.input.partyId)}, not ${String(call.input.partyId)}` },
};
