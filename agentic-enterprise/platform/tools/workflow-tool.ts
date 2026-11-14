import { z } from "zod";
import { PlatformError } from "../core/errors.ts";
import { findSpec, validateWorkflowPayload } from "../connectors/n8n/catalog.ts";
import type { WorkflowSpec } from "../connectors/types.ts";
import { defineTool, type AnyTool } from "./types.ts";

/**
 * يبني أداة approval تشغّل سير عمل n8n من قائمة مفاتيح محددة لهذا الوكيل فقط.
 * - كل المفاتيح يجب أن تشترك في نوع الإجراء نفسه، لأن نوع الإجراء يحدد أدوار الموافقين.
 * - الحمولة تُتحقق مرتين: عند طلب الموافقة (فلا يرى الموافق حمولة لن تُقبل)، وداخل الـ connector عند التنفيذ.
 * - الملخص للموافق يُبنى من الكتالوج والحمولة المتحقق منها، لا من نص كتبه النموذج.
 */
export function workflowTool(opts: { name: string; action: WorkflowSpec["action"]; keys: [string, ...string[]] }): AnyTool {
  return defineTool({
    name: opts.name,
    description: `Request a human-approved run of one of these n8n workflows: ${opts.keys.join(", ")}. Pass the workflow key and its declared fields only. Does NOT run until a human approves.`,
    permission: "approval",
    input: z.object({
      workflowKey: z.enum(opts.keys),
      payload: z.record(z.string(), z.union([z.string(), z.number(), z.boolean()])),
    }),
    irreversible: {
      action: opts.action,
      describe: ({ workflowKey, payload }, ctx) => {
        const spec = findSpec(ctx.connectors.workflows.catalog(), workflowKey);
        if (spec.action !== opts.action) throw new PlatformError("INVALID_INPUT", `Workflow ${workflowKey} is a ${spec.action} action, not ${opts.action}`);
        const clean = validateWorkflowPayload(spec, payload);
        const fields = Object.entries(clean).map(([k, v]) => `${k}=${JSON.stringify(v)}`).join(", ");
        return { summary: `Run n8n workflow "${spec.key}" (${spec.description}) with ${fields || "no fields"}.` };
      },
    },
    handler: async ({ workflowKey, payload }, ctx) => {
      const run = await ctx.connectors.workflows.trigger(workflowKey, payload, ctx.grant!);
      return { runId: run.id, workflowKey: run.workflowKey, status: run.status, httpStatus: run.httpStatus };
    },
  });
}
