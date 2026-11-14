import type { ApprovalGate, ApprovalGrant } from "../../approval/approval-gate.ts";
import { PlatformError } from "../../core/errors.ts";
import type { Clock } from "../../core/util.ts";
import { newId } from "../../core/util.ts";
import type { WorkflowConnector, WorkflowRun, WorkflowSpec } from "../types.ts";
import { findSpec, validateWorkflowPayload } from "./catalog.ts";
import { NONCE_HEADER, SIGNATURE_HEADER, TIMESTAMP_HEADER, sign } from "./signing.ts";

export interface N8nConnectorOptions {
  /** مثل https://n8n.example.com. يُسمح بـ http فقط لـ localhost (تطوير واختبار). */
  baseUrl: string;
  /** سر HMAC يتحقق منه سير العمل في n8n. */
  secret: Buffer;
  /** رمز Header Auth الذي يتحقق منه Webhook node في n8n (طبقة ثانية، اختيارية). */
  headerAuth?: { name: string; value: string };
  catalog: WorkflowSpec[];
  timeoutMs?: number;
  fetchImpl?: typeof fetch;
}

const MAX_RESPONSE_BYTES = 64 * 1024;

/**
 * connector حقيقي لتشغيل سير عمل n8n عبر webhook.
 * ضمانات:
 * - العنوان ثابت من الإعدادات، والمسار من الكتالوج فقط؛ لا يتحكم النموذج بأي جزء من URL (لا SSRF).
 * - التفويض يُستهلك قبل الإرسال. فشل الشبكة بعد الاستهلاك لا يسمح بإعادة الإرسال بالتفويض نفسه،
 *   فلا يحدث تشغيل مزدوج؛ يُصعَّد الفشل لإنسان. n8n يتلقى Idempotency-Key = approvalId لإزالة التكرار من جهته.
 * - الرد يُقتطع إلى 64KB ويُعاد كبيانات. لا تُتبع إعادات التوجيه.
 */
export class N8nWorkflowConnector implements WorkflowConnector {
  readonly kind = "n8n" as const;
  private readonly log: WorkflowRun[] = [];
  private readonly base: URL;

  constructor(
    private readonly gate: ApprovalGate,
    private readonly clock: Clock,
    private readonly opts: N8nConnectorOptions,
  ) {
    this.base = new URL(opts.baseUrl);
    const local = ["localhost", "127.0.0.1", "[::1]"].includes(this.base.hostname);
    if (this.base.protocol !== "https:" && !(local && this.base.protocol === "http:"))
      throw new Error("N8N_BASE_URL must use https (http is allowed for localhost only)");
    if (this.base.username || this.base.password || this.base.search || this.base.hash) throw new Error("N8N_BASE_URL must not carry credentials, query or fragment");
  }

  catalog(): WorkflowSpec[] {
    return structuredClone(this.opts.catalog);
  }

  runs(): WorkflowRun[] {
    return structuredClone(this.log);
  }

  async trigger(workflowKey: string, payload: Record<string, string | number | boolean>, grant: ApprovalGrant): Promise<WorkflowRun> {
    const spec = findSpec(this.opts.catalog, workflowKey);
    const body = JSON.stringify({ workflowKey, approvalId: grant.approvalId, payload: validateWorkflowPayload(spec, payload) });
    // الاستهلاك قبل الأثر: بعد هذا السطر لا يمكن استخدام التفويض مرة أخرى.
    this.gate.redeem(grant, spec.action);

    const ts = Math.floor(this.clock.now().getTime() / 1000);
    const url = new URL(`webhook/${spec.webhookPath}`, this.base.href.endsWith("/") ? this.base.href : this.base.href + "/");
    const headers: Record<string, string> = {
      "content-type": "application/json",
      "idempotency-key": grant.approvalId,
      [TIMESTAMP_HEADER]: String(ts),
      [NONCE_HEADER]: newId("n"),
      [SIGNATURE_HEADER]: sign(this.opts.secret, ts, body),
    };
    if (this.opts.headerAuth) headers[this.opts.headerAuth.name] = this.opts.headerAuth.value;

    const run: WorkflowRun = { id: newId("wfr"), workflowKey, approvalId: grant.approvalId, status: "failed", httpStatus: null, response: null, startedAt: this.clock.now().toISOString() };
    this.log.push(run);
    try {
      const res = await (this.opts.fetchImpl ?? fetch)(url, {
        method: "POST", headers, body, redirect: "manual", signal: AbortSignal.timeout(this.opts.timeoutMs ?? 15_000),
      });
      run.httpStatus = res.status;
      run.response = await readBounded(res);
      if (res.status < 200 || res.status >= 300) throw new PlatformError("CONNECTOR_ERROR", `n8n returned HTTP ${res.status} for ${workflowKey}`);
      run.status = "accepted";
      return structuredClone(run);
    } catch (err) {
      if (err instanceof PlatformError) throw err;
      throw new PlatformError("CONNECTOR_ERROR", `n8n call failed for ${workflowKey}: ${(err as Error).message}`);
    }
  }
}

async function readBounded(res: Response): Promise<unknown> {
  const text = (await res.text()).slice(0, MAX_RESPONSE_BYTES);
  try {
    return JSON.parse(text);
  } catch {
    return { text };
  }
}
