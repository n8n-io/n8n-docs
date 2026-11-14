import { chmodSync, existsSync, mkdirSync, readFileSync, renameSync, rmSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";
import { parseArgs } from "node:util";
import { ALL_AGENTS } from "../agents/index.ts";
import { parseAnchorKey } from "../platform/audit/anchor.ts";
import { backupUnits, dataRootUnits, keyForUnit, verifyBackup } from "./backup.ts";
import { runControlCommand } from "./tenants-cli.ts";
import { resolvePotentialMatch } from "../agents/compliance/human-actions.ts";
import { loadConfig } from "../platform/config.ts";
import { defaultFixtures, type Fixtures } from "../platform/connectors/mock/fixtures.ts";
import { isPlatformError } from "../platform/core/errors.ts";
import type { JsonObject } from "../platform/core/types.ts";
import { generateApproverKeyPair, signAction, signDecision, type HumanActionProof, type HumanActionPurpose } from "../platform/identity/approver-keys.ts";
import { createPlatform, type Platform } from "../platform/index.ts";
import { computeMetrics } from "./metrics.ts";

/**
 * أداة المشغّل البشري. كل أمر يفتح المنصة على قاعدة البيانات الدائمة، وينفّذ، ثم يحفظ حالة الأنظمة الوهمية.
 *
 *   npm run ops -- status                                   لوحة الحالة والتنبيهات
 *   npm run ops -- metrics [--json]                         المؤشرات الكاملة
 *   npm run ops -- submit <taskType> '<json>' --as <human>  إنشاء مهمة
 *   npm run ops -- run                                      تشغيل الطابور وتحويل الموافقات المنتهية إلى تصعيد
 *   npm run ops -- approvals                                طابور الموافقات
 *   npm run ops -- approve|reject <approvalId> --as <human> --key <private.pem> [--comment "…"]   (توقيع Ed25519)
 *   npm run ops -- revoke <approvalId> --as <human> --comment "…"     سحب موافقة لم تُنفَّذ
 *   npm run ops -- keys init <humanId> --out <private.pem> --as <operator>    توليد مفتاح موافق وتسجيله
 *   npm run ops -- keys register <humanId> <public.pem> --as <operator>      تسجيل مفتاح عام قائم
 *   npm run ops -- keys list | keys revoke <humanId> --as <human>
 *   npm run ops -- agents list                                                   الحالة والإصدار والاستقلالية
 *   npm run ops -- agents pause <agentId> --as <human> --note "…"                إيقاف وكيل واحد فورًا (بلا توقيع)
 *   npm run ops -- agents activate <agentId> --as <operator> --key <pem> --note "…"
 *   npm run ops -- agents autonomy <agentId> <0-4|reset> --as <human> [--key <pem>] --note "…"   الخفض بلا توقيع، والرفع بتوقيع
 *   npm run ops -- escalations                              التصعيدات المفتوحة
 *   npm run ops -- resolve <taskId> --as <human> --action requeue|complete|reject|cancel --note "…"
 *   npm run ops -- clear-match <screeningId> --as <human> --status false_positive|confirmed_match --note "…"
 *   npm run ops -- kill "<reason>" --as <human>             إيقاف طارئ فوري
 *   npm run ops -- release --as <operator> --key <pem> --note "…"   رفع الإيقاف (لا يستأنف التنفيذ تلقائيًا)
 *   npm run ops -- resume --as <operator> --key <pem>                تنفيذ الموافقات المعلّقة بعد رفع الإيقاف
 *   npm run ops -- audit verify | audit tail [n] | audit task <taskId>
 *   npm run ops -- backup --out <dir> [--data-root <DATA_ROOT>]     نسخة متسقة مع تثبيت مقصوص وmanifest
 *   npm run ops -- backup verify <dir> [--data-root .]               تحقق من النسخة (hashes وسلسلة audit)
 *   npm run ops -- reset-demo --confirm                     حذف البيانات المحلية (بيئة التطوير فقط)
 *
 * الهوية: قرارات الموافقة موقّعة بمفتاح الموافق الخاص (APPROVER_AUTH=signed، الافتراضي)، فـ --as وحده لا يكفي.
 * وكذلك كل قرار يفتح أو يستأنف عملية: resolve وclear-match وrelease وresume (--key).
 * الإيقاف (kill) لا يحتاج توقيعًا عن قصد: الإيقاف يجب أن يكون سهلًا دائمًا (fail-safe).
 * submit ما يزال يعتمد --as، فالطالب لا يملك صلاحية تنفيذ، وأي أثر لطلبه يمر بموافقة موقّعة.
 */

const config = loadConfig();
const STATE_FILE = `${dirname(config.DATABASE_PATH)}/mock-state.json`;

function loadState(): Fixtures {
  return existsSync(STATE_FILE) ? (JSON.parse(readFileSync(STATE_FILE, "utf8")) as Fixtures) : defaultFixtures();
}

function saveState(p: Platform): void {
  mkdirSync(dirname(STATE_FILE), { recursive: true });
  const tmp = `${STATE_FILE}.tmp`;
  writeFileSync(tmp, JSON.stringify(p.connectors.state, null, 2));
  renameSync(tmp, STATE_FILE); // كتابة ذرية: لا ملف حالة نصف مكتوب عند الانقطاع
}

const { positionals, values } = parseArgs({
  allowPositionals: true,
  options: {
    as: { type: "string" },
    comment: { type: "string", default: "" },
    note: { type: "string", default: "" },
    action: { type: "string" },
    status: { type: "string" },
    json: { type: "boolean", default: false },
    key: { type: "string" },
    out: { type: "string" },
    confirm: { type: "boolean", default: false },
    name: { type: "string" },
    scopes: { type: "string" },
    originator: { type: "string" },
    label: { type: "string" },
    "n8n-secret-env": { type: "string" },
    "ttl-days": { type: "string" },
    "data-root": { type: "string" },
  },
});
const [cmd, ...args] = positionals;

function requireHuman(p: Platform): string {
  if (!values.as) throw new Error("--as <humanId> is required for this command");
  p.directory.get(values.as);
  return values.as;
}

/** يوقّع قرارًا بشريًا بالمفتاح الخاص للمستخدم، إن كان وضع التوثيق signed. */
function signIfRequired(p: Platform, humanId: string, purpose: HumanActionPurpose, subject: string, details: unknown): HumanActionProof | undefined {
  if (p.config.APPROVER_AUTH !== "signed") return undefined;
  const keyFile = values.key ?? process.env.APPROVER_KEY_FILE;
  if (!keyFile) throw new Error(`${purpose} requires a signature: pass --key <private.pem> or set APPROVER_KEY_FILE`);
  return signAction(readFileSync(keyFile, "utf8"), { purpose, humanId, subject, details, issuedAt: new Date().toISOString() });
}

function table(rows: Array<Record<string, unknown>>): void {
  if (rows.length === 0) return console.log("  (none)");
  console.table(rows);
}

async function main(): Promise<void> {
  if (cmd === "tenants" || cmd === "tokens") return runControlCommand(cmd, args, values);
  if (cmd === "backup") {
    const master = config.AUDIT_ANCHOR_KEY ? parseAnchorKey(config.AUDIT_ANCHOR_KEY) : undefined;
    const server = values["data-root"];
    if (args[0] === "verify") {
      const dir = args[1];
      if (!dir) throw new Error("backup verify <dir>");
      const checks = verifyBackup(dir, keyForUnit(master, values["data-root"] ? undefined : master));
      for (const c of checks) console.log(`${c.ok ? "OK  " : "FAIL"}  ${c.name.padEnd(24)} ${c.audit ? `${c.audit.entries} entries, anchoring ${c.audit.anchoring}` : ""} ${c.problems.join("; ")}`);
      if (checks.some((c) => !c.ok)) process.exitCode = 1;
      return;
    }
    if (!values.out) throw new Error("backup --out <dir> [--data-root <DATA_ROOT>]");
    const units = server
      ? dataRootUnits(server, master)
      : [{ name: "enterprise", db: config.DATABASE_PATH, anchor: config.AUDIT_ANCHOR_FILE, ...(master ? { anchorKey: master } : {}) }];
    const m = await backupUnits(units, values.out);
    for (const u of m.units) console.log(`backed up ${u.name.padEnd(24)} seq ${u.lastSeq}, ${u.entries} audit entries${u.anchor ? ", anchor trimmed to snapshot" : ""}`);
    console.log(`Manifest: ${values.out}/manifest.json. Verify with: npm run ops -- backup verify ${values.out}${server ? " --data-root ." : ""}`);
    return;
  }
  if (cmd === "reset-demo") {
    if (!values.confirm) throw new Error("reset-demo deletes local data; pass --confirm");
    for (const f of [config.DATABASE_PATH, `${config.DATABASE_PATH}-wal`, `${config.DATABASE_PATH}-shm`, STATE_FILE]) if (existsSync(f)) rmSync(f);
    return console.log("Local database and mock state removed.");
  }

  // أوامر القراءة والإيقاف تعمل حتى مع سجل تالف، للتشخيص. كل ما عداها يرفض الإقلاع.
  const forensic = ["status", "metrics", "audit", "kill"].includes(cmd ?? "");
  const p = createPlatform({ fixtures: loadState(), forensic }).register(...ALL_AGENTS);
  try {
    switch (cmd) {
      case "status": {
        const m = computeMetrics(p);
        console.log(`\nKill switch: ${m.killSwitch ? "ENGAGED" : "off"}   Audit: ${m.audit.valid ? "intact" : "BROKEN"} (${m.audit.entries} entries)   Runtime: ${p.runtime.kind}`);
        console.log("\nTasks by status:"), table([m.tasks.byStatus]);
        console.log(`Approvals: ${m.approvals.pending} pending (oldest ${m.approvals.oldestPendingHours ?? "-"}h), ${m.approvals.approvedNotExecuted} approved-not-executed`);
        console.log(`Escalations: ${m.escalations.open} open, ${m.escalations.overdue} overdue`);
        console.log("\nAlerts:");
        if (m.alerts.length === 0) console.log("  none");
        for (const a of m.alerts) console.log(`  [${a.level.toUpperCase()}] ${a.code}: ${a.message}\n      → ${a.action}`);
        break;
      }
      case "metrics": {
        const m = computeMetrics(p);
        console.log(values.json ? JSON.stringify(m, null, 2) : m);
        break;
      }
      case "submit": {
        const [type, json] = args;
        if (!type || !json) throw new Error("usage: submit <taskType> '<json input>' --as <human>");
        const t = p.orchestrator.submit({ type, input: JSON.parse(json) as JsonObject, originator: requireHuman(p) });
        console.log(`Submitted ${t.id} (${t.type}) → ${t.assignee}`);
        break;
      }
      case "run": {
        const expired = p.orchestrator.sweepExpiredApprovals();
        const done = await p.orchestrator.drain();
        console.log(`Expired approvals escalated: ${expired}`);
        table(done.map((t) => ({ task: t.id, type: t.type, status: t.status, summary: String(t.output?.summary ?? t.lastError ?? "").slice(0, 90) })));
        break;
      }
      case "approvals":
        table(p.gate.list({ status: "pending" }).map((a) => ({ id: a.id, action: a.actionType, required: a.requiredApprovals, have: a.decisions.length, roles: a.allowedRoles.join("|"), expires: a.expiresAt.slice(0, 16), summary: a.summary.slice(0, 110) })));
        break;
      case "approve":
      case "reject": {
        const id = args[0];
        if (!id) throw new Error(`usage: ${cmd} <approvalId> --as <human>`);
        if (cmd === "reject" && !values.comment) throw new Error("A rejection needs --comment explaining why");
        const who = requireHuman(p);
        let proof;
        if (p.config.APPROVER_AUTH === "signed") {
          const keyFile = values.key ?? process.env.APPROVER_KEY_FILE;
          if (!keyFile) throw new Error("Signed approvals require --key <private.pem> or APPROVER_KEY_FILE");
          proof = signDecision(readFileSync(keyFile, "utf8"), { approvalId: id, humanId: who, decision: cmd, payloadHash: p.gate.get(id).payloadHash, comment: values.comment, issuedAt: new Date().toISOString() });
        }
        const t = await p.orchestrator.decideApproval(id, who, cmd, values.comment, proof);
        console.log(`Approval ${id}: ${p.gate.get(id).status}. Task ${t.id}: ${t.status}`);
        break;
      }
      case "revoke": {
        if (!args[0] || !values.comment) throw new Error("usage: revoke <approvalId> --as <human> --comment '<reason>'");
        const t = p.orchestrator.revokeApproval(args[0], requireHuman(p), values.comment);
        console.log(`Approval ${args[0]} revoked. Task ${t.id}: ${t.status}`);
        break;
      }
      case "keys": {
        const [sub, humanId, pubFile] = args;
        if (sub === "list") {
          table(p.keys.list().map((k) => ({ human: k.humanId, fingerprint: k.fingerprint, registeredBy: k.registeredBy, registeredAt: k.registeredAt.slice(0, 19), revokedAt: k.revokedAt?.slice(0, 19) ?? "" })));
        } else if (sub === "init" && humanId) {
          if (!values.out) throw new Error("keys init requires --out <private.pem> (deliver this file to the approver only)");
          if (existsSync(values.out)) throw new Error(`${values.out} already exists; refusing to overwrite a private key`);
          const kp = generateApproverKeyPair();
          const reg = p.keys.register(humanId, kp.publicKeyPem, requireHuman(p));
          mkdirSync(dirname(values.out), { recursive: true });
          writeFileSync(values.out, kp.privateKeyPem, { mode: 0o600 });
          chmodSync(values.out, 0o600);
          console.log(`Registered key for ${humanId}: ${reg.fingerprint}\nPrivate key written to ${values.out} (mode 600). Hand it to ${humanId} only; the platform keeps only the public key.`);
        } else if (sub === "register" && humanId && pubFile) {
          const reg = p.keys.register(humanId, readFileSync(pubFile, "utf8"), requireHuman(p));
          console.log(`Registered key for ${humanId}: ${reg.fingerprint}`);
        } else if (sub === "revoke" && humanId) {
          console.log(`Revoked ${p.keys.revoke(humanId, requireHuman(p))} key(s) for ${humanId}`);
        } else throw new Error("usage: keys list | keys init <humanId> --out <file> --as <operator> | keys register <humanId> <public.pem> --as <operator> | keys revoke <humanId> --as <human>");
        break;
      }
      case "agents": {
        const [sub, agentId, level] = args;
        if (sub === "list") {
          table(p.agents.list().map((a) => {
            const def = p.orchestrator.listAgents().find((d) => d.id === a.agentId);
            return { agent: a.agentId, version: a.version, status: a.status, autonomy: def ? p.agents.effectiveAutonomy(def) : "-", hash: a.definitionHash.slice(0, 12), updatedBy: a.updatedBy, note: a.note.slice(0, 40) };
          }));
        } else if (sub === "pause" && agentId) {
          console.log(p.agents.setStatus(agentId, "PAUSED", requireHuman(p), values.note));
        } else if ((sub === "activate" || sub === "deploy") && agentId) {
          const who = requireHuman(p);
          const to = sub === "deploy" ? "DEPLOYED" : "ACTIVE";
          console.log(p.agents.setStatus(agentId, to, who, values.note, signIfRequired(p, who, "agent.activate/v1", agentId, { to, note: values.note })));
        } else if (sub === "autonomy" && agentId && level !== undefined) {
          const who = requireHuman(p);
          const lvl = level === "reset" ? null : (Number(level) as 0 | 1 | 2 | 3 | 4);
          if (lvl !== null && ![0, 1, 2, 3, 4].includes(lvl)) throw new Error("autonomy level must be 0-4 or reset");
          const current = p.agents.find(agentId)?.autonomyOverride ?? null;
          const lowering = lvl !== null && (current === null || lvl < current);
          const proof = lowering ? undefined : signIfRequired(p, who, "agent.activate/v1", agentId, { autonomy: lvl, note: values.note });
          console.log(p.agents.setAutonomy(agentId, lvl, who, values.note, proof));
        } else throw new Error("usage: agents list | agents pause <id> --note | agents activate|deploy <id> --key --note | agents autonomy <id> <0-4|reset> --note");
        break;
      }
      case "escalations":
        table(p.escalations.list({ status: "open" }).map((e) => ({ id: e.id, task: e.taskId, severity: e.severity, role: e.toRole, reason: e.reason, due: e.dueAt.slice(0, 16), summary: e.summary.slice(0, 100) })));
        break;
      case "resolve": {
        const action = values.action as "requeue" | "complete" | "reject" | "cancel";
        if (!args[0] || !["requeue", "complete", "reject", "cancel"].includes(action) || !values.note) throw new Error("usage: resolve <taskId> --as <human> --action requeue|complete|reject|cancel --note '…'");
        const who = requireHuman(p);
        const proof = signIfRequired(p, who, "task.resolve_escalation/v1", args[0], { action, note: values.note });
        console.log(`Task ${args[0]} → ${p.orchestrator.resolveEscalated(args[0], who, action, values.note, proof).status}`);
        break;
      }
      case "clear-match": {
        const status = values.status as "false_positive" | "confirmed_match";
        if (!args[0] || !["false_positive", "confirmed_match"].includes(status) || !values.note) throw new Error("usage: clear-match <screeningId> --as <human> --status false_positive|confirmed_match --note '…'");
        const who = requireHuman(p);
        console.log(resolvePotentialMatch(p, args[0], who, status, values.note, signIfRequired(p, who, "compliance.resolve_match/v1", args[0], { status, note: values.note })));
        break;
      }
      case "kill": {
        const who = requireHuman(p);
        const reason = args.join(" ") || "unspecified";
        p.killSwitch.engage(`${who}: ${reason}`);
        p.audit.append({ actor: { type: "human", id: who }, action: "ops.kill_switch.engage", outcome: "success", data: { reason } });
        console.log(`EMERGENCY STOP ENGAGED by ${who}: ${reason}\nFlag file: ${config.KILL_SWITCH_FILE}`);
        break;
      }
      case "release": {
        const who = requireHuman(p);
        p.orchestrator.releaseEmergencyStop(who, values.note, signIfRequired(p, who, "ops.release_stop/v1", "emergency-stop", { note: values.note }));
        console.log("Emergency stop released. Queued tasks resume on the next `run`; approved actions need an explicit, signed `resume`.");
        break;
      }
      case "resume": {
        const who = requireHuman(p);
        const ids = p.gate.list({ status: "approved" }).map((a) => a.id).sort();
        const done = await p.orchestrator.executePendingApproved(who, signIfRequired(p, who, "ops.resume_approved/v1", "pending-approved", { approvalIds: ids }));
        table(done.map((t) => ({ task: t.id, type: t.type, status: t.status })));
        break;
      }
      case "audit": {
        const [sub, arg] = args;
        if (sub === "verify") {
          const v = p.audit.verify();
          console.log(v.valid ? `Audit chain intact: ${v.entries} entries (anchoring: ${v.anchoring}${v.anchoring === "none" ? " — truncation/rewrite NOT detectable" : `, pending ${v.pendingAnchors}`})` : `AUDIT CHAIN BROKEN at seq ${v.firstBrokenSeq}: ${v.reason}`);
          if (!v.valid) process.exitCode = 3;
        } else if (sub === "tail" || sub === "task") {
          const all = sub === "task" ? p.audit.query({ taskId: arg }) : p.audit.query().slice(-Number(arg ?? 20));
          table(all.map((e) => ({ seq: e.seq, ts: e.ts.slice(0, 19), actor: `${e.actor.type}:${e.actor.id}`, action: e.action, outcome: e.outcome, data: JSON.stringify(e.data).slice(0, 80) })));
        } else throw new Error("usage: audit verify | audit tail [n] | audit task <taskId>");
        break;
      }
      default:
        console.log(readFileSync(new URL(import.meta.url), "utf8").split("\n").filter((l) => l.includes("npm run ops")).map((l) => l.replace(/^ \* {2}/, "")).join("\n"));
    }
  } finally {
    saveState(p);
    p.close();
  }
}

main().catch((err) => {
  console.error(isPlatformError(err) ? `${err.code}: ${err.message}` : `Error: ${(err as Error).message}`);
  process.exit(1);
});
