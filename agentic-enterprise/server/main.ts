import { join } from "node:path";
import { HmacFileAnchor, parseAnchorKey } from "../platform/audit/anchor.ts";
import { loadConfig } from "../platform/config.ts";
import { systemClock } from "../platform/core/util.ts";
import { deriveTenantKey, ControlPlane } from "../platform/tenancy/control-plane.ts";
import { createApi } from "./api.ts";
import { createLogger } from "./log.ts";
import { TenantPlatforms } from "./tenants.ts";

/**
 * تشغيل الخادم: API + عامل خلفي (worker) يعالج طوابير المستأجرين النشطين دوريًا.
 *   npm run serve
 * الإعدادات: DATA_ROOT، وHOST (الافتراضي 127.0.0.1)، وPORT (الافتراضي 8080)، وWORKER_INTERVAL_MS (الافتراضي 2000؛ 0 يعطّل العامل).
 * عدة نسخ ممكنة على القاعدة نفسها: المطالبة الذرية بالمهام والإيجارات تمنع التشغيل المزدوج (ADR-007).
 */
const config = loadConfig();
const log = createLogger({ base: { service: "agentic-enterprise" } });
const DATA_ROOT = process.env.DATA_ROOT ?? "./data";
const HOST = process.env.HOST ?? "127.0.0.1";
const PORT = Number(process.env.PORT ?? 8080);
const WORKER_INTERVAL_MS = Number(process.env.WORKER_INTERVAL_MS ?? 2000);

const master = config.AUDIT_ANCHOR_KEY ? parseAnchorKey(config.AUDIT_ANCHOR_KEY) : undefined;
if (config.AUDIT_ANCHOR_REQUIRED && !master) throw new Error("AUDIT_ANCHOR_REQUIRED=true but AUDIT_ANCHOR_KEY is not set");
if (!master) log.log("warn", "audit anchoring disabled: set AUDIT_ANCHOR_KEY (and AUDIT_ANCHOR_REQUIRED=true in production)");

const control = new ControlPlane(
  DATA_ROOT, systemClock, master ? new HmacFileAnchor(join(DATA_ROOT, "control-anchor.jsonl"), deriveTenantKey(master, "_control")) : undefined,
  config.DATABASE_URL ? { url: config.DATABASE_URL } : {},
);
const tenants = new TenantPlatforms(control, { ...(master ? { anchorMasterKey: master } : {}) });
const server = createApi({ control, tenants, log });

let stopping = false;
let lastPrune = 0;
let working = false;
async function workOnce(): Promise<void> {
  if (working || stopping) return;
  working = true;
  try {
    for (const t of control.listTenants().filter((x) => x.status === "active")) {
      try {
        const p = tenants.get(t.id);
        if (Date.now() - lastPrune > 10 * 60_000) p.inbound?.pruneNonces();
        const done = await p.orchestrator.drain(25);
        if (done.length) {
          tenants.persist(t.id);
          log.log("info", "worker.drained", { tenant: t.id, tasks: done.length });
        }
      } catch (err) {
        log.log("error", "worker.tenant_failed", { tenant: t.id, error: (err as Error).message });
      }
    }
  } finally {
    if (Date.now() - lastPrune > 10 * 60_000) lastPrune = Date.now();
    working = false;
  }
}
const timer = WORKER_INTERVAL_MS > 0 ? setInterval(() => void workOnce(), WORKER_INTERVAL_MS) : null;

server.listen(PORT, HOST, () => log.log("info", "listening", { host: HOST, port: PORT, runtime: config.AGENT_RUNTIME, workflowConnector: config.WORKFLOW_CONNECTOR }));

function shutdown(signal: string): void {
  if (stopping) return;
  stopping = true;
  log.log("info", "shutdown", { signal });
  if (timer) clearInterval(timer);
  server.close(() => {
    const wait = setInterval(() => {
      if (working) return;
      clearInterval(wait);
      tenants.closeAll();
      control.close();
      process.exit(0);
    }, 50);
  });
  setTimeout(() => process.exit(1), 15_000).unref();
}
process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("SIGINT", () => shutdown("SIGINT"));
