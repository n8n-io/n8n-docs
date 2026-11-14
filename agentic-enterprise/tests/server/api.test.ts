import { mkdtempSync, rmSync } from "node:fs";
import type { AddressInfo } from "node:net";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { randomBytes } from "node:crypto";
import { afterEach, describe, expect, it } from "vitest";
import { NONCE_HEADER, SIGNATURE_HEADER, TIMESTAMP_HEADER, sign } from "../../platform/connectors/n8n/signing.ts";
import { ManualClock } from "../../platform/core/util.ts";
import { generateApproverKeyPair, signDecision } from "../../platform/identity/approver-keys.ts";
import { ControlPlane } from "../../platform/tenancy/control-plane.ts";
import { createApi } from "../../server/api.ts";
import { createLogger } from "../../server/log.ts";
import { TenantPlatforms } from "../../server/tenants.ts";

const cleanups: Array<() => Promise<void> | void> = [];
afterEach(async () => {
  while (cleanups.length) await cleanups.pop()!();
});

async function start(opts: { rateLimit?: { perSecond: number; burst: number } } = {}) {
  const root = mkdtempSync(join(tmpdir(), "ae-api-"));
  const clock = new ManualClock();
  // على PostgreSQL (TEST_POSTGRES_URL): schema تحكم وschemas مستأجرين فريدة لكل اختبار.
  const pg = process.env.TEST_POSTGRES_URL;
  const tag = `t_${randomBytes(4).toString("hex")}_`;
  const control = new ControlPlane(root, clock, undefined, pg ? { url: pg, schema: `${tag}control` } : {});
  const tenants = new TenantPlatforms(control, { clock, config: { KILL_SWITCH: false, ...(pg ? { DATABASE_URL: pg } : {}) }, schemaPrefix: tag });
  const lines: string[] = [];
  const server = createApi({ control, tenants, log: createLogger({ sink: (l) => lines.push(l) }), ...opts });
  await new Promise<void>((r) => server.listen(0, "127.0.0.1", r));
  const base = `http://127.0.0.1:${(server.address() as AddressInfo).port}`;
  cleanups.push(() => rmSync(root, { recursive: true, force: true }));
  cleanups.push(() => control.close());
  cleanups.push(() => tenants.closeAll());
  cleanups.push(() => new Promise<void>((r) => server.close(() => r())));
  const call = async (method: string, path: string, token?: string, body?: unknown, headers: Record<string, string> = {}) => {
    const res = await fetch(base + path, {
      method,
      headers: { ...(token ? { authorization: `Bearer ${token}` } : {}), ...(body !== undefined ? { "content-type": "application/json" } : {}), ...headers },
      ...(body !== undefined ? { body: typeof body === "string" ? body : JSON.stringify(body) } : {}),
    });
    const text = await res.text();
    let json: any = null; // eslint-disable-line @typescript-eslint/no-explicit-any
    try {
      json = JSON.parse(text);
    } catch {
      json = text;
    }
    return { status: res.status, json, headers: res.headers };
  };
  return { root, clock, control, tenants, call, lines, base };
}

const ALL = ["tasks:write", "tasks:read", "approvals:read", "approvals:decide", "ops:read"] as const;

describe("HTTP API: authentication, scopes and tenant isolation", () => {
  it("rejects missing, malformed, revoked and out-of-scope tokens", async () => {
    const s = await start();
    s.control.createTenant("acme", "Acme", "u-ops");
    const ro = s.control.issueToken("acme", { scopes: ["tasks:read"], originator: "u-requester", label: "ro" }, "u-ops");
    expect((await s.call("GET", "/healthz")).status).toBe(200);
    expect((await s.call("GET", "/v1/tasks")).status).toBe(401);
    expect((await s.call("GET", "/v1/tasks", "aet_nope")).status).toBe(401);
    expect((await s.call("GET", "/v1/tasks", ro.token.slice(0, -1) + (ro.token.endsWith("A") ? "B" : "A"))).status).toBe(401);
    expect((await s.call("GET", "/v1/tasks", ro.token)).status).toBe(200);
    expect((await s.call("POST", "/v1/tasks", ro.token, { type: "compliance.screen", input: {} })).status).toBe(403);
    s.control.revokeToken(ro.tokenId, "u-ops", "rotated");
    expect((await s.call("GET", "/v1/tasks", ro.token)).status).toBe(401);
    expect(s.control.listTokens("acme")[0]!.revokedAt).not.toBeNull();
    // الجزء السري بعد "aet_<id>_" (قد يحتوي "_" نفسه، فلا يُستخرج بـ split)
    const secret = ro.token.slice(`aet_${ro.tokenId}_`.length);
    expect(secret).toHaveLength(43);
    expect(JSON.stringify(s.control.listTokens())).not.toContain(secret); // الرمز الخام لا يُخزَّن
  });

  it("a token for one tenant can never see another tenant's data", async () => {
    const s = await start();
    s.control.createTenant("acme", "Acme", "u-ops");
    s.control.createTenant("globex", "Globex", "u-ops");
    const a = s.control.issueToken("acme", { scopes: [...ALL], originator: "u-compliance", label: "a" }, "u-ops").token;
    const g = s.control.issueToken("globex", { scopes: [...ALL], originator: "u-compliance", label: "g" }, "u-ops").token;
    const created = await s.call("POST", "/v1/tasks", a, { type: "compliance.screen", input: { partyType: "supplier", partyId: "sup-001" } });
    expect(created.status).toBe(202);
    expect((await s.call("GET", `/v1/tasks/${created.json.id}`, a)).status).toBe(200);
    expect((await s.call("GET", `/v1/tasks/${created.json.id}`, g)).status).toBe(404);
    expect((await s.call("GET", "/v1/tasks", g)).json).toEqual([]);
    expect(s.control.tenantDir("acme")).not.toBe(s.control.tenantDir("globex"));
    expect(() => s.control.tenantDir("../etc")).toThrow();
  });

  it("tokens expire: default 90 days, capped at 365, and an expired token is rejected", async () => {
    const s = await start();
    s.control.createTenant("acme", "Acme", "u-ops");
    const short = s.control.issueToken("acme", { scopes: ["tasks:read"], originator: "u-requester", label: "short", ttlDays: 1 }, "u-ops");
    const dflt = s.control.issueToken("acme", { scopes: ["tasks:read"], originator: "u-requester", label: "default" }, "u-ops");
    expect(new Date(dflt.expiresAt).getTime() - s.clock.now().getTime()).toBe(90 * 86_400_000);
    expect(() => s.control.issueToken("acme", { scopes: ["tasks:read"], originator: "u-requester", label: "forever", ttlDays: 10_000 }, "u-ops")).toThrow();
    expect((await s.call("GET", "/v1/tasks", short.token)).status).toBe(200);
    s.clock.advanceHours(25);
    expect((await s.call("GET", "/v1/tasks", short.token)).status).toBe(401);
    expect((await s.call("GET", "/v1/tasks", dflt.token)).status).toBe(200);
  });

  it("suspending a tenant cuts off its tokens immediately", async () => {
    const s = await start();
    s.control.createTenant("acme", "Acme", "u-ops");
    const a = s.control.issueToken("acme", { scopes: ["tasks:read"], originator: "u-requester", label: "a" }, "u-ops").token;
    expect((await s.call("GET", "/v1/tasks", a)).status).toBe(200);
    s.control.setTenantStatus("acme", "suspended", "u-ops", "contract ended");
    expect((await s.call("GET", "/v1/tasks", a)).status).toBe(401);
    expect(s.control.audit.query({ action: "tenant.status" })).toHaveLength(1);
  });

  it("enforces content type, body size, rate limits and returns no internals on errors", async () => {
    const s = await start({ rateLimit: { perSecond: 0.001, burst: 3 } });
    s.control.createTenant("acme", "Acme", "u-ops");
    const t = s.control.issueToken("acme", { scopes: [...ALL], originator: "u-requester", label: "t" }, "u-ops").token;
    expect((await s.call("POST", "/v1/tasks", t, "x", { "content-type": "text/plain" })).status).toBe(415);
    const big = await s.call("POST", "/v1/tasks", t, { type: "compliance.screen", input: { pad: "x".repeat(70_000) } });
    expect(big.status).toBe(413);
    const unknown = await s.call("POST", "/v1/tasks", t, { type: "nobody.handles", input: {} });
    expect(unknown.status).toBe(404);
    expect(unknown.json.error).toMatchObject({ code: "NOT_FOUND" });
    expect(unknown.json.error.requestId).toBeTruthy();
    expect(JSON.stringify(unknown.json)).not.toMatch(/at \w+ \(|\.ts:\d+/); // لا stack trace
    expect(unknown.headers.get("x-content-type-options")).toBe("nosniff");
    expect((await s.call("GET", "/v1/tasks", t)).status).toBe(429); // الحد (3) استُهلك
    expect(s.lines.some((l) => JSON.parse(l).status === 429)).toBe(true);
  });
});

describe("HTTP API: end-to-end approval over HTTP requires the human's signature", () => {
  it("requisition → PO approval → signed decision via API → PO issued", async () => {
    const s = await start();
    s.control.createTenant("acme", "Acme", "u-ops");
    const t = s.control.issueToken("acme", { scopes: [...ALL], originator: "u-requester", label: "portal" }, "u-ops").token;
    const created = await s.call("POST", "/v1/tasks", t, { type: "procurement.requisition", input: { requisitionId: "REQ-2001" }, idempotencyKey: "req-2001" });
    expect(created.status).toBe(202);
    expect((await s.call("POST", "/v1/tasks", t, { type: "procurement.requisition", input: { requisitionId: "REQ-2001" }, idempotencyKey: "req-2001" })).json.id).toBe(created.json.id);
    const p = s.tenants.get("acme");
    await p.orchestrator.drain();

    const pending = await s.call("GET", "/v1/approvals", t);
    expect(pending.json).toHaveLength(1);
    const apr = pending.json[0];
    expect(apr).not.toHaveProperty("payload");
    expect(apr.actionType).toBe("commit_spend");

    // الرمز وحده لا يكفي
    const unsigned = await s.call("POST", `/v1/approvals/${apr.id}/decision`, t, { humanId: "u-proc-mgr", decision: "approve" });
    expect(unsigned.status).toBe(401);
    // توقيع بمفتاح شخص آخر يُرفض
    const mgr = generateApproverKeyPair();
    const other = generateApproverKeyPair();
    p.keys.register("u-proc-mgr", mgr.publicKeyPem, "system:bootstrap");
    const d = { approvalId: apr.id, humanId: "u-proc-mgr", decision: "approve" as const, payloadHash: apr.payloadHash, comment: "ok", issuedAt: s.clock.now().toISOString() };
    expect((await s.call("POST", `/v1/approvals/${apr.id}/decision`, t, { humanId: "u-proc-mgr", decision: "approve", comment: "ok", proof: signDecision(other.privateKeyPem, d) })).status).toBe(401);

    const ok = await s.call("POST", `/v1/approvals/${apr.id}/decision`, t, { humanId: "u-proc-mgr", decision: "approve", comment: "ok", proof: signDecision(mgr.privateKeyPem, d) });
    expect(ok.status).toBe(200);
    expect(ok.json.approval.status).toBe("executed");
    expect(ok.json.approval.decisions[0]).toMatchObject({ humanId: "u-proc-mgr", auth: "signed" });
    expect(p.connectors.state.purchaseOrders.some((po) => po.requisitionId === "REQ-2001")).toBe(true);

    const task = await s.call("GET", `/v1/tasks/${created.json.id}`, t);
    expect(task.json.status).toBe("completed");
    expect((await s.call("GET", "/v1/metrics", t)).json.audit.valid).toBe(true);
  });
});

describe("HTTP API: inbound n8n events per tenant", () => {
  it("accepts a correctly signed event for the right tenant only", async () => {
    const secret = randomBytes(32).toString("hex");
    process.env.TEST_ACME_N8N_SECRET = secret;
    cleanups.push(() => void delete process.env.TEST_ACME_N8N_SECRET);
    const s = await start();
    s.control.createTenant("acme", "Acme", "u-ops", { n8nInboundSecretEnv: "TEST_ACME_N8N_SECRET" });
    s.control.createTenant("globex", "Globex", "u-ops");
    const ts = Math.floor(s.clock.now().getTime() / 1000);
    const raw = JSON.stringify({ eventId: "evt-100", data: { invoiceId: "INV-9001" } });
    const headers = { "content-type": "application/json", [TIMESTAMP_HEADER]: String(ts), [NONCE_HEADER]: "nonce-http-0001", [SIGNATURE_HEADER]: sign(Buffer.from(secret, "hex"), ts, raw) };
    const r = await s.call("POST", "/v1/tenants/acme/n8n/invoice-received", undefined, raw, headers);
    expect(r.status).toBe(202);
    expect(s.tenants.get("acme").orchestrator.get(r.json.taskId).type).toBe("finance.invoice");
    expect((await s.call("POST", "/v1/tenants/acme/n8n/invoice-received", undefined, raw, headers)).status).toBe(401); // replay
    expect((await s.call("POST", "/v1/tenants/globex/n8n/invoice-received", undefined, raw, { ...headers, [NONCE_HEADER]: "nonce-http-0002" })).status).toBe(404);
  });
});

describe("web console", () => {
  it("is served with a restrictive CSP and renders server data as text only", async () => {
    const s = await start();
    const r = await s.call("GET", "/console");
    expect(r.status).toBe(200);
    expect(r.headers.get("content-security-policy")).toContain("frame-ancestors 'none'");
    expect(r.json).not.toMatch(/innerHTML|insertAdjacentHTML|document\.write|localStorage/);
  });
});
