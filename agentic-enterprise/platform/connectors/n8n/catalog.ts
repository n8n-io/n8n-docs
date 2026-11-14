import { readFileSync } from "node:fs";
import { z } from "zod";
import { PlatformError } from "../../core/errors.ts";
import type { WorkflowSpec } from "../types.ts";

/**
 * كتالوج سير العمل المسموح به. يُحمَّل من ملف يملكه المشغّل (N8N_WORKFLOWS_FILE)، لا من النموذج.
 * التحقق صارم: مفتاح snake_case، ومسار webhook بحروف آمنة فقط (لا "..")، وحقول محدودة الأنواع.
 */
const FieldSchema = z.strictObject({
  type: z.enum(["string", "number", "boolean"]),
  maxLength: z.number().int().positive().max(10_000).optional(),
  pattern: z.string().optional(),
  required: z.boolean().optional(),
});

export const WorkflowSpecSchema = z.strictObject({
  key: z.string().regex(/^[a-z][a-z0-9_]{2,63}$/),
  description: z.string().min(1).max(500),
  webhookPath: z.string().regex(/^[a-z0-9][a-z0-9-]*(\/[a-z0-9][a-z0-9-]*)*$/, "webhookPath: lowercase segments only"),
  action: z.enum(["external_send", "contract", "master_data_change"]),
  fields: z.record(z.string().regex(/^[a-zA-Z][a-zA-Z0-9_]{0,63}$/), FieldSchema).refine((f) => Object.keys(f).length <= 30, "at most 30 fields"),
});

export function parseCatalog(raw: unknown): WorkflowSpec[] {
  const list = z.array(WorkflowSpecSchema).max(200).parse(raw);
  const keys = new Set<string>();
  for (const w of list) {
    if (keys.has(w.key)) throw new Error(`Duplicate workflow key ${w.key}`);
    keys.add(w.key);
    for (const f of Object.values(w.fields)) if (f.pattern) new RegExp(f.pattern);
  }
  return list as WorkflowSpec[];
}

export function loadCatalogFile(path: string): WorkflowSpec[] {
  return parseCatalog(JSON.parse(readFileSync(path, "utf8")));
}

/** يتحقق من الحمولة مقابل الحقول المعلنة. يرمي INVALID_INPUT عند أي مخالفة؛ لا يحاول الإصلاح. */
export function validateWorkflowPayload(spec: WorkflowSpec, payload: Record<string, unknown>): Record<string, string | number | boolean> {
  const out: Record<string, string | number | boolean> = {};
  const fail = (m: string): never => {
    throw new PlatformError("INVALID_INPUT", `Workflow ${spec.key}: ${m}`);
  };
  for (const k of Object.keys(payload)) if (!(k in spec.fields)) fail(`unknown field "${k}"`);
  for (const [name, f] of Object.entries(spec.fields)) {
    const v = payload[name];
    if (v === undefined || v === null) {
      if (f.required !== false) fail(`missing field "${name}"`);
      continue;
    }
    if (typeof v !== f.type) fail(`field "${name}" must be ${f.type}`);
    if (typeof v === "number" && !Number.isFinite(v)) fail(`field "${name}" must be finite`);
    if (typeof v === "string") {
      if (v.length > (f.maxLength ?? 2000)) fail(`field "${name}" exceeds ${f.maxLength ?? 2000} chars`);
      if (f.pattern && !new RegExp(`^(?:${f.pattern})$`).test(v)) fail(`field "${name}" does not match pattern`);
    }
    out[name] = v as string | number | boolean;
  }
  return out;
}

export function findSpec(catalog: WorkflowSpec[], key: string): WorkflowSpec {
  const spec = catalog.find((w) => w.key === key);
  if (!spec) throw new PlatformError("NOT_FOUND", `Workflow "${key}" is not in the approved catalog`);
  return spec;
}
