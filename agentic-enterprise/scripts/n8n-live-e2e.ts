import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { N8nWorkflowConnector } from "../platform/connectors/n8n/n8n-connector.ts";
import { DEFAULT_WORKFLOW_CATALOG } from "../platform/connectors/n8n/default-catalog.ts";
import { systemClock } from "../platform/core/util.ts";
import { generateApproverKeyPair, signDecision } from "../platform/identity/approver-keys.ts";
import { ControlPlane } from "../platform/tenancy/control-plane.ts";
import { workflowTool } from "../platform/tools/workflow-tool.ts";
import { createApi } from "../server/api.ts";
import { createLogger } from "../server/log.ts";
import { TenantPlatforms } from "../server/tenants.ts";

/**
 * اختبار تكامل حقيقي مع نسخة n8n تعمل فعلًا (لا محاكاة)، في الاتجاهين:
 * 1) صادر: وكيل يطلب تشغيل سير عمل → موافقة بشرية موقّعة عبر HTTP API → المنصة تستدعي n8n،
 *    وn8n نفسه يتحقق من توقيع HMAC ويعيد النتيجة.
 * 2) وارد: حدث في n8n → n8n يوقّع الحدث ويرسله إلى API المنصة → مهمة تُنشأ للمستأجر الصحيح.
 *
 * المتطلبات: n8n على N8N_E2E_URL مع سيري العمل في integrations/n8n/ منشورين، والأسرار نفسها في البيئتين:
 *   AE_N8N_OUTBOUND_SECRET وAE_N8N_INBOUND_SECRET (hex)، وn8n يرسل إلى http://127.0.0.1:18090 للمستأجر acme.
 *   N8N_E2E_URL=http://127.0.0.1:5678 npm run e2e:n8n
 */
const N8N = process.env.N8N_E2E_URL ?? "http://127.0.0.1:5678";
const OUT = process.env.AE_N8N_OUTBOUND_SECRET;
const IN = process.env.AE_N8N_INBOUND_SECRET;
if (!OUT || !IN) throw new Error("Set AE_N8N_OUTBOUND_SECRET and AE_N8N_INBOUND_SECRET (same values as the n8n instance)");
process.env.ACME_N8N_INBOUND_SECRET = IN;

const root = mkdtempSync(join(tmpdir(), "ae-n8n-e2e-"));
const control = new ControlPlane(root, systemClock);
const tenants = new TenantPlatforms(control, {
  config: { KILL_SWITCH: false },
  extra: { workflows: ({ gate, clock }) => new N8nWorkflowConnector(gate, clock, { baseUrl: N8N, secret: Buffer.from(OUT, "hex"), catalog: DEFAULT_WORKFLOW_CATALOG }) },
});
const server = createApi({ control, tenants, log: createLogger({ sink: () => {} }) });
await new Promise<void>((r) => server.listen(18090, "127.0.0.1", r));
const results: string[] = [];
const check = (ok: boolean, name: string, detail = "") => {
  results.push(`${ok ? "PASS" : "FAIL"}  ${name}${detail ? ` — ${detail}` : ""}`);
  if (!ok) process.exitCode = 1;
};

try {
  control.createTenant("acme", "Acme", "u-ops", { n8nInboundSecretEnv: "ACME_N8N_INBOUND_SECRET" });
  const { token } = control.issueToken("acme", { scopes: ["tasks:read", "approvals:read", "approvals:decide"], originator: "u-ap-sup", label: "e2e" }, "u-ops");
  const p = tenants.get("acme");

  // ---- 1) صادر ----
  const remit = workflowTool({ name: "request_remittance_notice", action: "external_send", keys: ["notify_supplier_remittance"] });
  let requested: { status: string; approvalId?: string } = { status: "none" };
  p.register({
    ...p.orchestrator.agent("finance.payment-scheduler"),
    id: "e2e.remittance", handles: ["e2e.remit"], tools: [remit], guardrails: [],
    referencePolicy: async ({ tools }) => {
      requested = (await tools.call("request_remittance_notice", { workflowKey: "notify_supplier_remittance", payload: { supplierId: "sup-001", invoiceId: "INV-9001", language: "ar" } })) as typeof requested;
      return { status: "needs_approval", summary: "remittance requested", data: { invoiceId: "INV-9001", supplierId: "sup-001", approvalId: requested.approvalId ?? null, reasonCode: "E2E", amount: 0, currency: null, scheduledFor: null }, handoffs: [] };
    },
  });
  p.orchestrator.submit({ type: "e2e.remit", input: {}, originator: "u-ap-sup" });
  await p.orchestrator.drain();
  check(requested.status === "pending_approval", "outbound: n8n call waits for human approval", requested.status);
  const apr = p.gate.get(requested.approvalId!);
  const keys = generateApproverKeyPair();
  p.keys.register("u-cs-sup", keys.publicKeyPem, "system:bootstrap");
  const d = { approvalId: apr.id, humanId: "u-cs-sup", decision: "approve" as const, payloadHash: apr.payloadHash, comment: "send it", issuedAt: new Date().toISOString() };
  const res = await fetch(`http://127.0.0.1:18090/v1/approvals/${apr.id}/decision`, {
    method: "POST", headers: { authorization: `Bearer ${token}`, "content-type": "application/json" },
    body: JSON.stringify({ humanId: "u-cs-sup", decision: "approve", comment: "send it", proof: signDecision(keys.privateKeyPem, d) }),
  });
  const after = p.gate.get(apr.id);
  // المنفّذ يخزن المخرج نصًا مقتطعًا (truncate)، فيُفك هنا.
  const rawOut = (after.result as { output?: unknown } | null)?.output;
  const out = (typeof rawOut === "string" ? JSON.parse(rawOut) : rawOut) as { httpStatus?: number; status?: string } | undefined;
  check(res.status === 200 && after.status === "executed", "outbound: signed approval executed", `${res.status} ${after.status}`);
  check(out?.httpStatus === 200 && out?.status === "accepted", "outbound: real n8n accepted and verified the HMAC signature", JSON.stringify(out));
  const run = p.connectors.workflows.runs()[0];
  const n8nSaid = run?.response as { verified?: boolean; approvalId?: string; idempotencyKey?: string } | undefined;
  check(n8nSaid?.verified === true && n8nSaid.approvalId === apr.id && n8nSaid.idempotencyKey === apr.id, "outbound: n8n response confirms verification and approval binding", JSON.stringify(n8nSaid));

  // التوقيع الخاطئ يجب أن يُرفض داخل n8n نفسه
  const forged = await fetch(`${N8N}/webhook/ae/notify-supplier-remittance`, {
    method: "POST", headers: { "content-type": "application/json", "x-ae-timestamp": String(Math.floor(Date.now() / 1000)), "x-ae-signature": "v1=" + "0".repeat(64) },
    body: JSON.stringify({ workflowKey: "notify_supplier_remittance", approvalId: "apr_forged", payload: { supplierId: "sup-005", invoiceId: "INV-9001" } }),
  });
  check(forged.status >= 400, "outbound: n8n rejects a forged signature", `HTTP ${forged.status}`);

  // ---- 2) وارد ----
  const before = p.orchestrator.list({}).filter((t) => t.type === "finance.invoice").length;
  const trig = await fetch(`${N8N}/webhook/ae/simulate-invoice-received`, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ eventId: `evt-${Date.now()}`, invoiceId: "INV-9002" }) });
  const trigBody = await trig.text();
  const created = p.orchestrator.list({}).filter((t) => t.type === "finance.invoice");
  check(trig.status === 200 && created.length === before + 1, "inbound: n8n-signed event created exactly one task", `n8n HTTP ${trig.status}: ${trigBody.slice(0, 200)}`);
  check(created.at(-1)?.input.invoiceId === "INV-9002" && (created.at(-1)?.input.source as { system?: string })?.system === "n8n", "inbound: task carries ids only, tagged with source n8n");
  check(p.audit.verify().valid, "audit chain intact after the round trip");
} finally {
  console.log(results.join("\n"));
  server.close();
  tenants.closeAll();
  control.close();
  rmSync(root, { recursive: true, force: true });
}
