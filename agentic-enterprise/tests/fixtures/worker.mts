/**
 * عامل مستقل يُشغَّل كعملية منفصلة في اختبارات التزامن (tests/platform/hardening.test.ts).
 *   append <db> <n>   يكتب n حدثًا في audit
 *   seed <db> <n>     ينشئ n مهمة فحص عقوبات
 *   drain <db>        يشغّل الطابور حتى يفرغ
 */
import { ALL_AGENTS } from "../../agents/index.ts";
import { HmacFileAnchor, NoAnchor, parseAnchorKey } from "../../platform/audit/anchor.ts";
import { AuditLog } from "../../platform/audit/audit-log.ts";
import { openDatabase } from "../../platform/core/db.ts";
import { systemClock } from "../../platform/core/util.ts";
import { createPlatform } from "../../platform/index.ts";

const [mode, db, n] = process.argv.slice(2);
// "pg:<schema>" يعني PostgreSQL على TEST_POSTGRES_URL؛ غير ذلك مسار ملف SQLite.
const pgSchema = db!.startsWith("pg:") ? db!.slice(3) : null;
const dbConfig = pgSchema ? { DATABASE_PATH: ":memory:", DATABASE_URL: process.env.TEST_POSTGRES_URL!, DATABASE_SCHEMA: pgSchema } : { DATABASE_PATH: db! };
const anchorFile = pgSchema ? `${process.env.ANCHOR_DIR}/${pgSchema}.anchor.jsonl` : `${db}.anchor.jsonl`;
if (mode === "append") {
  const key = process.env.AUDIT_ANCHOR_KEY;
  const handle = pgSchema ? openDatabase("", { url: process.env.TEST_POSTGRES_URL!, schema: pgSchema }) : openDatabase(db!);
  const log = new AuditLog(handle, systemClock, key ? new HmacFileAnchor(anchorFile, parseAnchorKey(key)) : new NoAnchor());
  for (let i = 0; i < Number(n); i++) log.append({ actor: { type: "system", id: `pid-${process.pid}` }, action: "probe", outcome: "info", data: { i } });
  handle.close();
} else {
  const p = createPlatform({ config: { ...dbConfig, KILL_SWITCH: false, APPROVER_AUTH: "trusted" } as never, isolated: true }).register(...ALL_AGENTS);
  if (mode === "seed") for (let i = 0; i < Number(n); i++) p.orchestrator.submit({ type: "compliance.screen", input: { partyType: "supplier", partyId: "sup-001" }, originator: "u-requester" });
  if (mode === "drain") await p.orchestrator.drain(1000);
  p.close();
}
