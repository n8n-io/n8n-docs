import { execFile } from "node:child_process";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { promisify } from "node:util";
import { AuditLog } from "../platform/audit/audit-log.ts";
import { openDatabase, type Database } from "../platform/core/db.ts";
import { systemClock } from "../platform/core/util.ts";

/**
 * اختبار حمل حقيقي: عمليات Node منفصلة تعالج طابورًا مشتركًا (SQLite ملف، أو PostgreSQL مع TEST_POSTGRES_URL).
 * المنفّذ الحتمي، فالقياس لطبقة المنصة نفسها (مطالبة، وحواجز، وaudit، وتثبيت، وقاعدة)، لا لزمن النموذج.
 *   npm run load -- --tasks 600 --workers 1,2,4
 * يطبع: المهام في الثانية، وزمن المهمة p50 وp95، وأحداث audit لكل مهمة، وسلامة السلسلة وعدم التكرار.
 */
const run = promisify(execFile);
const args = new Map(process.argv.slice(2).flatMap((a, i, all) => (a.startsWith("--") ? [[a.slice(2), all[i + 1] ?? ""]] : [])));
const TASKS = Number(args.get("tasks") ?? 600);
const WORKERS = String(args.get("workers") ?? "1,2,4").split(",").map(Number);
const PG = process.env.TEST_POSTGRES_URL;
const WORKER = join(import.meta.dirname, "../tests/fixtures/worker.mts");

function spec(label: string): { spec: string; open: () => Database } {
  if (PG) {
    const schema = `t_load_${label}_${Date.now().toString(36)}`;
    return { spec: `pg:${schema}`, open: () => openDatabase("", { url: PG, schema }) };
  }
  const file = join(mkdtempSync(join(tmpdir(), "ae-load-")), "load.db");
  return { spec: file, open: () => openDatabase(file) };
}

const pct = (xs: number[], p: number) => {
  const s = [...xs].sort((a, b) => a - b);
  return s[Math.min(s.length - 1, Math.floor((p / 100) * s.length))] ?? 0;
};

console.log(`Load test: ${TASKS} sanctions-screening tasks, engine ${PG ? "PostgreSQL" : "SQLite (file, WAL)"}\n`);
console.log("workers | tasks/s | p50 ms | p95 ms | audit events/task | duplicates | chain");
for (const w of WORKERS) {
  const db = spec(`w${w}`);
  const env = { ...process.env, ANCHOR_DIR: tmpdir(), NODE_OPTIONS: "--disable-warning=ExperimentalWarning" };
  await run(process.execPath, ["--import", "tsx", WORKER, "seed", db.spec, String(TASKS)], { env, maxBuffer: 1 << 24 });
  const t0 = performance.now();
  await Promise.all(Array.from({ length: w }, () => run(process.execPath, ["--import", "tsx", WORKER, "drain", db.spec], { env, timeout: 600_000, maxBuffer: 1 << 24 })));
  const seconds = (performance.now() - t0) / 1000;
  const d = db.open();
  const tasks = d.prepare("SELECT created_at, updated_at, status FROM tasks").all() as Array<{ status: string }>;
  const completed = tasks.filter((t) => t.status === "completed").length;
  // زمن المهمة: من أول انتقال إلى running حتى آخر انتقال لها، من audit
  const spans = d.prepare("SELECT task_id, MIN(ts) AS a, MAX(ts) AS b FROM audit_log WHERE task_id IS NOT NULL AND action = 'task.transition' GROUP BY task_id").all() as Array<{ a: string; b: string }>;
  const lat = spans.map((s) => new Date(s.b).getTime() - new Date(s.a).getTime());
  const events = Number((d.prepare("SELECT COUNT(*) AS n FROM audit_log").get() as { n: number }).n);
  const dup = d.prepare("SELECT task_id FROM audit_log WHERE action = 'task.transition' AND data LIKE '%\"to\":\"running\"%' GROUP BY task_id HAVING COUNT(*) > 1").all().length;
  const chain = new AuditLog(d, systemClock).verify().valid ? "intact" : "BROKEN";
  d.close();
  console.log(`${String(w).padStart(7)} | ${(completed / seconds).toFixed(1).padStart(7)} | ${String(pct(lat, 50)).padStart(6)} | ${String(pct(lat, 95)).padStart(6)} | ${(events / TASKS).toFixed(1).padStart(17)} | ${String(dup).padStart(10)} | ${chain}${completed !== TASKS ? `  (completed ${completed}/${TASKS})` : ""}`);
}
