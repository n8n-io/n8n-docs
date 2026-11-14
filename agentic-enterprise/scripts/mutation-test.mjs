#!/usr/bin/env node
/**
 * اختبار الطفرات (mutation testing) لطبقات الحماية: يعطّل كل حماية على حدة في الكود،
 * ثم يتأكد أن اختبارًا واحدًا على الأقل (unit أو eval) يفشل. الحماية التي "تنجو" طفرتها
 * لا يغطيها أي اختبار فعلي.
 *
 *   npm run mutation              كل الطفرات
 *   npm run mutation -- approval  الطفرات التي يحتوي اسمها على "approval"
 *
 * كل ملف يُستعاد بعد كل طفرة، حتى عند المقاطعة (SIGINT).
 */
import { execSync } from "node:child_process";
import { copyFileSync, readFileSync, renameSync, writeFileSync } from "node:fs";

const A = "agents/";
/** [الاسم، الملف، النص الأصلي، النص البديل، equivalent؟] */
const MUTATIONS = [
  // المنصة
  ["platform: originator SoD", "platform/approval/approval-gate.ts", "if (humanId === req.originator) throw", "if (false) throw"],
  ["platform: same approver twice", "platform/approval/approval-gate.ts", "if (req.decisions.some((d) => d.humanId === humanId)) throw", "if (false) throw"],
  ["platform: dual approval threshold", "platform/approval/approval-gate.ts", "(amountUsd !== null && amountUsd > this.policy.dualApprovalThresholdUsd)", "false"],
  ["platform: approval TTL", "platform/approval/approval-gate.ts", "return this.clock.now().getTime() > new Date(req.expiresAt).getTime();", "return false;"],
  ["platform: grant nonce", "platform/approval/approval-gate.ts", 'if (row.grant_nonce !== grant.nonce) fail("Grant nonce mismatch");', ""],
  ["platform: grant amount cap", "platform/approval/approval-gate.ts", "money.amount > req.money!.amount + 1e-9", "false"],
  ["platform: audit hash verify", "platform/audit/audit-log.ts", 'if (sha256(canonicalJson(body)) !== hash) return { ...broken(rows.length, e.seq, "content hash mismatch"), anchoring };', ""],
  ["hardening: conflicting anchors", "platform/audit/audit-log.ts", 'if (prior !== undefined && prior !== e.hash) return', "if (false) return"],
  ["platform: executor kill switch", "platform/tools/executor.ts", "if (killSwitch.isEngaged()) {\n      log(\"denied\", { code: \"KILL_SWITCH_ACTIVE\" });\n      return { status: \"denied\", code: \"KILL_SWITCH_ACTIVE\", reason: \"Emergency stop is engaged. Stop all work.\" };", "if (false) {\n      log(\"denied\", { code: \"KILL_SWITCH_ACTIVE\" });\n      return { status: \"denied\", code: \"KILL_SWITCH_ACTIVE\", reason: \"Emergency stop is engaged. Stop all work.\" };"],
  ["platform: tool allowlist", "platform/tools/executor.ts", "const tool = this.toolsFor(agent).find((t) => t.name === name);", "const tool = this.toolsFor(agent).find((t) => t.name === name) ?? this.toolsFor(agent)[0];"],
  ["platform: strict input schema", "platform/tools/executor.ts", "const parsed = tool.input.strict().safeParse(rawInput);", "const parsed = tool.input.safeParse(rawInput);"],
  ["platform: approval tools gated", "platform/tools/executor.ts", 'if (tool.permission === "approval") {', 'if (tool.permission === "approval" && false) {'],
  ["platform: payload tamper check", "platform/tools/executor.ts", "if (hashObject(approval.payload) !== approval.payloadHash) {", "if (false) {"],
  ["platform: max tool calls", "platform/tools/executor.ts", "if (count > agent.maxToolCalls) {", "if (false) {"],
  ["platform: status from facts", "platform/orchestrator/orchestrator.ts", 'else if (outcome.status === "needs_approval") {', 'else if (false) {'],
  ["platform: handoff allowlist", "platform/orchestrator/orchestrator.ts", "if (!(agent.canHandoffTo.includes(h.taskType) && this.routes.has(h.taskType))) {", "if (!this.routes.has(h.taskType)) {"],
  ["platform: injection guard", "platform/security/guardrails.ts", "if (findings.length === 0) return allow;", "return allow;"],
  ["platform: PII redaction", "platform/memory/memory-store.ts", "const { value, count } = allowPii ? { value: record.value, count: 0 } : redactPii(record.value);", "const { value, count } = { value: record.value, count: 0 };"],
  ["platform: connector IBAN check", "platform/connectors/mock/mock-connectors.ts", 'if (supplier.bankAccount.iban !== instr.iban) throw new PlatformError("CONNECTOR_ERROR", "IBAN does not match supplier master data");', ""],
  // التقوية (CURRENT_STATE.md R1–R9)
  ["hardening: audit append serialized (R1)", "platform/audit/audit-log.ts", "return transaction(this.db, () => {\n      const entry = this.appendUnsafe(input);", "return ((f) => f())(() => {\n      const entry = this.appendUnsafe(input);"],
  ["hardening: atomic claim (R4)", "platform/orchestrator/orchestrator.ts", 'if (task.status !== "queued" || (task.notBefore && task.notBefore > now.toISOString())) return null;', 'if (task.status === "completed") return null;'],
  ["hardening: CAS transition (R4)", "platform/orchestrator/orchestrator.ts", "WHERE id = ? AND status = ? AND lease_id IS ?`,", "WHERE id = ? AND ? IS NOT NULL AND ? IS NOT ?`,"],
  ["hardening: stale-run rejection (R8)", "platform/tools/executor.ts", 'if (t.status !== "running" || t.leaseId !== leaseId) {', "if (false) {"],
  ["hardening: lease recovery (R3)", "platform/orchestrator/orchestrator.ts", "const stale = this.list({ status: \"running\" }).filter((t) => t.leaseExpiresAt && t.leaseExpiresAt < now);", "const stale: Task[] = [];"],
  ["hardening: run timeout", "platform/orchestrator/orchestrator.ts", "timer = setTimeout(() => (abort.abort(), reject(new Error(`Agent run exceeded timeout of ${timeoutMs} ms`))), timeoutMs);", "timer = undefined;"],
  ["hardening: retry backoff", "platform/orchestrator/orchestrator.ts", "return Math.min(30_000 * 2 ** Math.max(0, attempts - 1), 15 * 60_000);", "return 0;"],
  ["hardening: anchor missing-event check (R5)", "platform/audit/audit-log.ts", 'if (dbHash === undefined) return { ...broken(lastSeq, seq, "anchored event missing from audit log (deletion or truncation)"), anchoring };', ""],
  ["hardening: anchor hash check (R6)", "platform/audit/audit-log.ts", 'if (dbHash !== hash) return { ...broken(lastSeq, seq, "anchored hash differs from audit log (rewritten history)"), anchoring };', ""],
  ["hardening: anchor signatures", "platform/audit/anchor.ts", "return got.length === expected.length && timingSafeEqual(got, expected);", "return true;"],
  ["hardening: anchor after commit only", "platform/audit/audit-log.ts", "afterCommit(this.db, () => this.anchor.record(entry.seq, entry.hash, entry.ts));", "this.anchor.record(entry.seq, entry.hash, entry.ts);"],
  ["hardening: integrity guard", "platform/audit/integrity.ts", "if (v.valid) return;", "return;"],
  ["hardening: decision signature (R7)", "platform/identity/approver-keys.ts", 'if (!ok) fail("invalid signature");', ""],
  ["hardening: decision bound to payload (R7)", "platform/identity/approver-keys.ts", "if (proof[k] !== expected[k]) fail(`${k} does not match the request being decided`);", ""],
  ["hardening: decision freshness (R7)", "platform/identity/approver-keys.ts", "if (!Number.isFinite(skew) || skew > MAX_CLOCK_SKEW_MS) fail", "if (false) fail"],
  ["hardening: key registration role (R7)", "platform/identity/approver-keys.ts", 'if (registeredBy !== "system:bootstrap" && !this.directory.get(registeredBy).roles.includes("platform_operator"))', "if (false)"],
  ["hardening: approval request dedupe (R9)", "platform/approval/approval-gate.ts", "if (existing) {", "if (false) {"],
  ["hardening: rejection reason", "platform/approval/approval-gate.ts", 'if (decision === "reject" && !comment.trim()) throw', "if (false) throw"],
  ["hardening: revoke blocks grant", "platform/approval/approval-gate.ts", "this.db.prepare(\"UPDATE approvals SET status = 'revoked' WHERE id = ? AND status IN ('pending','approved') AND grant_nonce IS NULL\").run(id);", ""],
  ["T17: human action bound to details", "platform/identity/approver-keys.ts", 'if (proof.detailsHash !== hashObject(expected.details)) fail("details do not match what was signed");', ""],
  ["T17: human action signature", "platform/identity/approver-keys.ts", "  if (!ok) fail(\"invalid signature\");\n  return key.fingerprint;\n}\n\n/**\n * موقِّع", "  return key.fingerprint;\n}\n\n/**\n * موقِّع"],
  ["T17: resolve escalation authenticated", "platform/orchestrator/orchestrator.ts", 'this.authenticate("task.resolve_escalation/v1", humanId, taskId, { action, note }, proof);', ""],
  ["T17: release authenticated", "platform/orchestrator/orchestrator.ts", 'const fp = this.authenticate("ops.release_stop/v1", humanId, "emergency-stop", { note }, proof);', "const fp = {};"],
  ["T17: sanctions clearance authenticated", "agents/compliance/human-actions.ts", 'if (p.config.APPROVER_AUTH === "signed") {', "if (false) {"],
  ["registry: paused agent tool calls", "platform/tools/executor.ts", "if (!this.deps.registry.isActive(agent.id)) {", "if (false) {"],
  ["registry: paused agent claims", "platform/orchestrator/orchestrator.ts", "if (!this.deps.registry.isActive(task.assignee)) return null;", ""],
  ["registry: autonomy enforcement", "platform/tools/executor.ts", "if (!permittedByAutonomy(autonomy, tool.permission, tool.name)) {", "if (false) {"],
  ["registry: activation authenticated", "platform/agent/registry.ts", "        this.authenticate(humanId, agentId, { to, note }, proof);", ""],
  ["registry: autonomy raise authenticated", "platform/agent/registry.ts", "        this.authenticate(humanId, agentId, { autonomy: level, note }, proof);", ""],
  ["registry: autonomy declared limit", "platform/agent/agent-definition.ts", "if ((t.permission === \"approval\" && level < 3) || (t.permission === \"write\" && level < 2))", "if (false)"],
  // n8n والتكامل
  ["n8n: inbound signature verified", "platform/integrations/n8n-inbound.ts", 'if (!verifySignature(this.secret, ts, rawBody, sig!)) deny("AUTHENTICATION_FAILED", "Invalid signature");', ""],
  ["n8n: inbound timestamp window", "platform/integrations/n8n-inbound.ts", "if (Math.abs(this.clock.now().getTime() / 1000 - ts) > MAX_SKEW_SECONDS)", "if (false)"],
  ["n8n: inbound replay (nonce)", "platform/integrations/n8n-inbound.ts", 'if (this.db.prepare("SELECT 1 FROM inbound_nonces WHERE nonce = ?").get(nonce!)) return null;', ""],
  ["n8n: inbound ids-only schema", "platform/integrations/n8n-inbound.ts", "const parsed = spec!.data.safeParse(body.data);", "const parsed = spec!.data.passthrough().safeParse(body.data);"],
  ["n8n: outbound grant redeemed", "platform/connectors/n8n/n8n-connector.ts", "    this.gate.redeem(grant, spec.action);", ""],
  ["n8n: outbound payload validated", "platform/connectors/n8n/n8n-connector.ts", "payload: validateWorkflowPayload(spec, payload) });", "payload });"],
  ["n8n: outbound https only", "platform/connectors/n8n/n8n-connector.ts", 'if (this.base.protocol !== "https:" && !(local && this.base.protocol === "http:"))', "if (false)"],
  ["n8n: catalog path pattern", "platform/connectors/n8n/catalog.ts", '/^[a-z0-9][a-z0-9-]*(\\/[a-z0-9][a-z0-9-]*)*$/', "/^.*$/"],
  ["n8n: unknown payload fields", "platform/connectors/n8n/catalog.ts", "for (const k of Object.keys(payload)) if (!(k in spec.fields)) fail(`unknown field \"${k}\"`);", ""],
  // مستوى التحكم وAPI
  ["api: revoked token", "platform/tenancy/control-plane.ts", "if (!r || r.revoked_at) return null;", "if (!r) return null;"],
  ["api: suspended tenant", "platform/tenancy/control-plane.ts", 'if (!t || t.status !== "active") return null;', "if (!t) return null;"],
  ["api: token hash compared", "platform/tenancy/control-plane.ts", "if (a.length !== b.length || !timingSafeEqual(a, b)) return null;", ""],
  ["api: scope enforced", "server/api.ts", "if (!p.scopes.includes(scope)) throw", "if (false) throw"],
  ["api: tenant from token", "server/api.ts", "const t = p.orchestrator.get(m[1]!);", "const t = (deps.tenants.loaded().find(([, x]) => { try { x.orchestrator.get(m[1]!); return true; } catch { return false; } })?.[1] ?? p).orchestrator.get(m[1]!);"],
  ["api: body size limit", "server/api.ts", "if (size > maxBody) throw", "if (false) throw"],
  ["api: rate limit", "server/api.ts", "if (!allow(p.tokenId)) throw", "if (false) throw"],
  ["api: tenant id validated", "platform/tenancy/control-plane.ts", 'return join(this.dataRoot, "tenants", TenantIdSchema.parse(tenantId));', 'return join(this.dataRoot, "tenants", tenantId);'],
  ["api: token expiry", "platform/tenancy/control-plane.ts", "if (!r.expires_at || String(r.expires_at) <= this.clock.now().toISOString()) return null;", ""],
  ["delegation: depth limit", "platform/orchestrator/orchestrator.ts", "const reason = depth + 1 > maxDepth ?", "const reason = false ?"],
  ["delegation: loop detection", "platform/orchestrator/orchestrator.ts", ": repeats >= MAX_SAME_HANDOFF_IN_CHAIN ?", ": false ?"],
  ["budget: claim blocked when exhausted", "platform/orchestrator/orchestrator.ts", "      if (this.budgetRemaining(task.assignee) <= 0) {", "      if (false) {"],
  ["budget: remaining passed to runtime", "platform/orchestrator/orchestrator.ts", "maxBudgetUsd: this.budgetRemaining(agent.id) }", "maxBudgetUsd: undefined }"],
  // المشتريات
  ["procurement: decision guard", A + "procurement/requisition-intake/guardrails/decision-matches-assessment.ts", "check: (call, ctx) => {", "check: (call, ctx) => { if (1) return allow;"],
  ["procurement: split detection", A + "procurement/shared/assessment.ts", "if (prior.length > 0 && g.totalUsd", "if (false && g.totalUsd"],
  ["procurement: budget check", A + "procurement/shared/assessment.ts", "else if (totalUsd > budget.availableUsd)", "else if (false)"],
  ["procurement: PO preconditions", A + "procurement/po-issuer/guardrails/po-preconditions.ts", "check: (call, ctx) => {", "check: (call, ctx) => { if (1) return allow;"],
  ["procurement: task scope", A + "procurement/shared/guardrails/same-task-scope.ts", "check: (call, ctx) => {", "check: (call, ctx) => { if (1) return allow;"],
  ["procurement: intake outcome guard", A + "procurement/requisition-intake/agent.ts", "const v: string[] = [];\n    for (const h", "const v: string[] = []; return v;\n    for (const h"],
  ["procurement: duplicate PO", A + "procurement/shared/assessment.ts", "if (existing.length)", "if (false)"],
  // المالية
  ["finance: invoice decision guard", A + "finance/invoice-processor/guardrails/invoice-decision-matches-assessment.ts", "check: (call, ctx) => {", "check: (call, ctx) => { if (1) return allow;"],
  ["finance: BEC detection", A + "finance/shared/invoice-assessment.ts", "if (supplier && inv.remitToIban && inv.remitToIban", "if (false && inv.remitToIban"],
  ["finance: qty vs receipt", A + "finance/shared/invoice-assessment.ts", "if (qtyPreviouslyInvoiced + l.quantity > qtyReceived)", "if (false)"],
  ["finance: duplicate invoice", A + "finance/shared/invoice-assessment.ts", "if (dup.length)", "if (false)"],
  ["finance: invoice outcome guard", A + "finance/invoice-processor/agent.ts", "const v: string[] = [];\n    for (const h", "const v: string[] = []; return v;\n    for (const h"],
  ["finance: payment preconditions", A + "finance/payment-scheduler/guardrails/payment-preconditions.ts", "check: (call, ctx) => {", "check: (call, ctx) => { if (1) return allow;"],
  ["finance: already paid", A + "finance/shared/payment-assessment.ts", 'if (inv.status === "paid" ||', "if (false &&"],
  ["finance: screening required", A + "finance/shared/payment-assessment.ts", "else if (!scr.ok) f.push", "else if (false) f.push"],
  ["finance: screening hit", A + "finance/shared/payment-assessment.ts", 'if (scr.code === "SCREENING_HIT")', "if (false)"],
  ["finance: pay invoice IBAN (equivalent: masked by 3 layers)", A + "finance/payment-scheduler/tools/schedule-payment.ts", "iban: s.bankAccount.iban, amount", "iban: inv.remitToIban ?? s.bankAccount.iban, amount", true],
  // الامتثال
  ["compliance: no clear over threshold", A + "compliance/sanctions-screener/guardrails/no-clear-over-threshold.ts", "check: (call, ctx) => {", "check: (call, ctx) => { if (1) return allow;"],
  ["compliance: party scope", A + "compliance/sanctions-screener/guardrails/same-task-party.ts", "check: (call, ctx) =>\n", "check: (call, ctx) => allow ??\n"],
  ["compliance: screener outcome guard", A + "compliance/sanctions-screener/agent.ts", "if (outcome.handoffs.length === 0) return v;", "return v;"],
  ["compliance: skeleton matching", A + "compliance/shared/name-matching.ts", "jaroWinkler(sx, sy) * 0.97", "0"],
  ["compliance: name variants", A + "compliance/shared/name-matching.ts", '[/^(mohammed|mohammad|mohamed|mohamad|muhammed|mohamud|mohd|muhamad)$/, "muhammad"],', ""],
  ["compliance: human-only clearance role", A + "compliance/human-actions.ts", 'if (!human.roles.includes("compliance_officer")) {', "if (false) {"],
];

const filter = process.argv[2];
const env = { ...process.env, NODE_OPTIONS: "--disable-warning=ExperimentalWarning" };
let active = null;
const restore = () => active && (renameSync(`${active}.mutbak`, active), (active = null));
process.on("SIGINT", () => (restore(), process.exit(130)));

let caught = 0, missed = 0, equivalent = 0;
for (const [name, file, from, to, isEquivalent] of MUTATIONS.filter((m) => !filter || m[0].includes(filter))) {
  const src = readFileSync(file, "utf8");
  if (!src.includes(from)) {
    console.log(`STALE   ${name}: pattern not found in ${file}`);
    missed++;
    continue;
  }
  copyFileSync(file, `${file}.mutbak`);
  active = file;
  writeFileSync(file, src.replace(from, to));
  let failing = "";
  try {
    execSync("npx vitest run --reporter=dot && npx tsx platform/eval/cli.ts", { env, stdio: "pipe" });
  } catch (e) {
    const out = `${e.stdout ?? ""}`;
    failing = [...out.matchAll(/FAIL\s+\S+\s+(\S+)/g)].map((m) => m[1]).slice(0, 3).join(", ") || "unit tests";
  } finally {
    restore();
  }
  if (failing) caught++;
  else if (isEquivalent) equivalent++;
  else missed++;
  console.log(`${failing ? "CAUGHT " : isEquivalent ? "EQUIV  " : "MISSED "} ${name.padEnd(58)} ${failing}`);
}
console.log(`\nMutations: ${caught} caught, ${missed} missed, ${equivalent} equivalent (unreachable by design)`);
process.exit(missed > 0 ? 1 : 0);
