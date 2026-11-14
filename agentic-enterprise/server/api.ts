import { randomUUID } from "node:crypto";
import { createServer, type IncomingMessage, type Server, type ServerResponse } from "node:http";
import { z } from "zod";
import { computeMetrics } from "../ops/metrics.ts";
import { isPlatformError, PlatformError, type PlatformErrorCode } from "../platform/core/errors.ts";
import type { ApprovalRequest } from "../platform/approval/approval-gate.ts";
import type { JsonObject } from "../platform/core/types.ts";
import type { DecisionProof } from "../platform/identity/approver-keys.ts";
import type { ApiPrincipal, ApiScope, ControlPlane } from "../platform/tenancy/control-plane.ts";
import { CONSOLE_HTML } from "./console.ts";
import type { Logger } from "./log.ts";
import type { TenantPlatforms } from "./tenants.ts";

/**
 * HTTP API للمنصة (node:http بلا إطار عمل، لتقليل سطح الاعتماديات).
 *
 * المصادقة: Authorization: Bearer <token> لكل /v1 عدا أحداث n8n الواردة (HMAC لكل مستأجر).
 * التفويض: نطاقات الرمز، والمستأجر مأخوذ من الرمز لا من URL، فلا يمكن لرمز مستأجر أن يصل لآخر.
 * الموافقة: الرمز وحده لا يكفي؛ الطلب يحمل DecisionProof موقّعًا من الإنسان (ADR-009).
 * الحماية: حد لحجم الجسم، وJSON فقط، وحد معدل لكل رمز، ورؤوس أمان، ولا تفاصيل داخلية في أخطاء 500.
 */
export interface ApiDeps {
  control: ControlPlane;
  tenants: TenantPlatforms;
  log: Logger;
  rateLimit?: { perSecond: number; burst: number };
  maxBodyBytes?: number;
}

const STATUS: Partial<Record<PlatformErrorCode, number>> = {
  AUTHENTICATION_FAILED: 401, INVALID_INPUT: 400, NOT_FOUND: 404, UNAUTHORIZED_APPROVER: 403, SOD_VIOLATION: 403,
  INVALID_TRANSITION: 409, APPROVAL_INVALID: 409, KILL_SWITCH_ACTIVE: 503, AUDIT_TAMPERED: 503,
};

class HttpError extends Error {
  constructor(readonly status: number, readonly code: string, message: string) {
    super(message);
  }
}

const SubmitBody = z.strictObject({
  type: z.string().regex(/^[a-z]+\.[a-z_]+$/),
  input: z.record(z.string(), z.unknown()),
  idempotencyKey: z.string().regex(/^[A-Za-z0-9._:-]{1,128}$/).optional(),
});

const DecisionBody = z.strictObject({
  humanId: z.string().min(1).max(64),
  decision: z.enum(["approve", "reject"]),
  comment: z.string().max(2000).default(""),
  proof: z
    .strictObject({
      approvalId: z.string(), humanId: z.string(), decision: z.enum(["approve", "reject"]), payloadHash: z.string(),
      comment: z.string(), issuedAt: z.string(), signature: z.string(),
    })
    .optional(),
});

export function createApi(deps: ApiDeps): Server {
  const buckets = new Map<string, { tokens: number; at: number }>();
  const rl = deps.rateLimit ?? { perSecond: 20, burst: 40 };
  const maxBody = deps.maxBodyBytes ?? 64 * 1024;

  function allow(key: string): boolean {
    const now = Date.now();
    const b = buckets.get(key) ?? { tokens: rl.burst, at: now };
    b.tokens = Math.min(rl.burst, b.tokens + ((now - b.at) / 1000) * rl.perSecond);
    b.at = now;
    if (b.tokens < 1) return buckets.set(key, b), false;
    b.tokens -= 1;
    buckets.set(key, b);
    return true;
  }

  async function readBody(req: IncomingMessage): Promise<string> {
    const chunks: Buffer[] = [];
    let size = 0;
    for await (const c of req) {
      size += (c as Buffer).length;
      if (size > maxBody) throw new HttpError(413, "PAYLOAD_TOO_LARGE", `Body exceeds ${maxBody} bytes`);
      chunks.push(c as Buffer);
    }
    return Buffer.concat(chunks).toString("utf8");
  }

  async function json(req: IncomingMessage): Promise<unknown> {
    if (!String(req.headers["content-type"] ?? "").startsWith("application/json")) throw new HttpError(415, "UNSUPPORTED_MEDIA_TYPE", "Content-Type must be application/json");
    const raw = await readBody(req);
    try {
      return JSON.parse(raw);
    } catch {
      throw new HttpError(400, "INVALID_JSON", "Body is not valid JSON");
    }
  }

  function principal(req: IncomingMessage, scope: ApiScope): ApiPrincipal {
    const auth = String(req.headers.authorization ?? "");
    const p = deps.control.authenticate(auth.startsWith("Bearer ") ? auth.slice(7) : undefined);
    if (!p) throw new HttpError(401, "UNAUTHENTICATED", "Missing, invalid or revoked token");
    if (!allow(p.tokenId)) throw new HttpError(429, "RATE_LIMITED", "Too many requests");
    if (!p.scopes.includes(scope)) throw new HttpError(403, "FORBIDDEN", `Token lacks scope ${scope}`);
    return p;
  }

  function send(res: ServerResponse, status: number, body: unknown, contentType = "application/json"): void {
    res.writeHead(status, {
      "content-type": contentType === "application/json" ? "application/json; charset=utf-8" : contentType,
      "cache-control": "no-store",
      "x-content-type-options": "nosniff",
      "referrer-policy": "no-referrer",
      "x-frame-options": "DENY",
      "content-security-policy": contentType.startsWith("text/html")
        ? "default-src 'none'; script-src 'self' 'unsafe-inline'; style-src 'unsafe-inline'; connect-src 'self'; frame-ancestors 'none'; base-uri 'none'; form-action 'none'"
        : "default-src 'none'; frame-ancestors 'none'",
    });
    res.end(contentType === "application/json" ? JSON.stringify(body) : String(body));
  }

  type Handler = (req: IncomingMessage, m: RegExpMatchArray) => Promise<{ status: number; body: unknown; type?: string }>;
  const routes: Array<[string, RegExp, Handler]> = [
    ["GET", /^\/healthz$/, async () => ({ status: 200, body: { ok: true } })],
    ["GET", /^\/readyz$/, async () => {
      const intact = deps.tenants.loaded().every(([, p]) => p.audit.verify().valid);
      const control = deps.control.audit.verify().valid;
      return { status: intact && control ? 200 : 503, body: { ready: intact && control, tenantsLoaded: deps.tenants.loaded().length } };
    }],
    ["GET", /^\/console\/?$/, async () => ({ status: 200, body: CONSOLE_HTML, type: "text/html; charset=utf-8" })],

    ["POST", /^\/v1\/tasks$/, async (req) => {
      const pr = principal(req, "tasks:write");
      const body = SubmitBody.parse(await json(req));
      const p = deps.tenants.get(pr.tenantId);
      const task = p.orchestrator.submit({
        type: body.type, input: body.input as JsonObject, originator: pr.originator,
        ...(body.idempotencyKey ? { idempotencyKey: `api:${pr.tokenId}:${body.idempotencyKey}` } : {}),
      });
      return { status: 202, body: { id: task.id, status: task.status, type: task.type, assignee: task.assignee } };
    }],
    ["GET", /^\/v1\/tasks\/([A-Za-z0-9_-]{1,64})$/, async (req, m) => {
      const pr = principal(req, "tasks:read");
      const p = deps.tenants.get(pr.tenantId);
      const t = p.orchestrator.get(m[1]!);
      return { status: 200, body: { ...t, approvals: p.gate.list({ taskId: t.id }).map(slimApproval), escalations: p.escalations.list({ taskId: t.id }) } };
    }],
    ["GET", /^\/v1\/tasks$/, async (req) => {
      const pr = principal(req, "tasks:read");
      const status = new URL(req.url ?? "/", "http://x").searchParams.get("status") ?? undefined;
      const list = deps.tenants.get(pr.tenantId).orchestrator.list(status ? { status: status as never } : {});
      return { status: 200, body: list.slice(-200).map((t) => ({ id: t.id, type: t.type, status: t.status, assignee: t.assignee, attempts: t.attempts, updatedAt: t.updatedAt })) };
    }],
    ["GET", /^\/v1\/approvals$/, async (req) => {
      const pr = principal(req, "approvals:read");
      const status = new URL(req.url ?? "/", "http://x").searchParams.get("status") ?? "pending";
      return { status: 200, body: deps.tenants.get(pr.tenantId).gate.list({ status: status as never }).map(slimApproval) };
    }],
    ["POST", /^\/v1\/approvals\/([A-Za-z0-9_-]{1,64})\/decision$/, async (req, m) => {
      const pr = principal(req, "approvals:decide");
      const body = DecisionBody.parse(await json(req));
      const p = deps.tenants.get(pr.tenantId);
      const task = await p.orchestrator.decideApproval(m[1]!, body.humanId, body.decision, body.comment, body.proof as DecisionProof | undefined);
      deps.tenants.persist(pr.tenantId);
      return { status: 200, body: { approval: slimApproval(p.gate.get(m[1]!)), task: { id: task.id, status: task.status } } };
    }],
    ["GET", /^\/v1\/escalations$/, async (req) => {
      const pr = principal(req, "ops:read");
      return { status: 200, body: deps.tenants.get(pr.tenantId).escalations.list({ status: "open" }) };
    }],
    ["GET", /^\/v1\/metrics$/, async (req) => {
      const pr = principal(req, "ops:read");
      return { status: 200, body: computeMetrics(deps.tenants.get(pr.tenantId)) };
    }],
    ["POST", /^\/v1\/tenants\/([a-z][a-z0-9-]{2,31})\/n8n\/([a-z0-9-]{1,64})$/, async (req, m) => {
      // لا رمز Bearer هنا: n8n يوقّع الحدث بسر المستأجر (HMAC)، والتحقق داخل N8nInbound.
      if (!allow(`inbound:${m[1]}`)) throw new HttpError(429, "RATE_LIMITED", "Too many requests");
      const raw = await readBody(req);
      const p = deps.tenants.get(m[1]!);
      if (!p.inbound) throw new HttpError(404, "NOT_FOUND", "Inbound n8n is not configured for this tenant");
      const task = p.inbound.receive(m[2]!, req.headers, raw);
      return { status: 202, body: { taskId: task.id, status: task.status } };
    }],
  ];

  return createServer(async (req, res) => {
    const requestId = randomUUID();
    const started = Date.now();
    const log = deps.log.child({ requestId });
    let status = 500;
    try {
      const path = new URL(req.url ?? "/", "http://x").pathname;
      const route = routes.find(([method, re]) => method === req.method && re.test(path));
      if (!route) throw new HttpError(routes.some(([, re]) => re.test(path)) ? 405 : 404, "NOT_FOUND", "No such route");
      const out = await route[2](req, path.match(route[1])!);
      status = out.status;
      send(res, out.status, out.body, out.type);
    } catch (err) {
      const e = toHttp(err);
      status = e.status;
      if (e.status >= 500 && !isPlatformError(err)) log.log("error", "unhandled", { error: (err as Error).stack ?? String(err) });
      send(res, e.status, { error: { code: e.code, message: e.message, requestId } });
    } finally {
      log.log("info", "http", { method: req.method, path: (req.url ?? "").split("?")[0], status, ms: Date.now() - started });
    }
  });
}

function toHttp(err: unknown): { status: number; code: string; message: string } {
  if (err instanceof HttpError) return { status: err.status, code: err.code, message: err.message };
  if (err instanceof z.ZodError) return { status: 400, code: "INVALID_INPUT", message: err.issues.map((i) => `${i.path.join(".")}: ${i.message}`).join("; ").slice(0, 500) };
  if (err instanceof PlatformError) return { status: STATUS[err.code] ?? 422, code: err.code, message: err.message };
  return { status: 500, code: "INTERNAL", message: "Internal error" };
}

/** ما يحتاجه الموافق فقط. الحمولة الخام لا تُعاد؛ الملخص مبني من النظام المرجعي، وhash يربط القرار بها. */
function slimApproval(a: ApprovalRequest) {
  return {
    id: a.id, taskId: a.taskId, toolName: a.toolName, actionType: a.actionType, summary: a.summary, status: a.status, money: a.money,
    amountUsd: a.amountUsd, payloadHash: a.payloadHash, requiredApprovals: a.requiredApprovals, allowedRoles: a.allowedRoles,
    decisions: a.decisions.map((d) => ({ humanId: d.humanId, decision: d.decision, at: d.at, auth: d.auth, keyFingerprint: d.keyFingerprint })),
    createdAt: a.createdAt, expiresAt: a.expiresAt,
  };
}
