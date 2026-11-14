// عامل (worker thread) يملك اتصال PostgreSQL واحدًا، وينفذ الاستعلامات بالتسلسل نيابة عن الخيط الرئيسي.
// الخيط الرئيسي ينتظر النتيجة بـ Atomics.wait، فتبقى واجهة قاعدة البيانات متزامنة كما في SQLite.
// ملف JavaScript عادي (لا TypeScript) لأن العامل لا يرث محمّل tsx.
import { workerData } from "node:worker_threads";
import pg from "pg";

const { url, schema, shared, port } = workerData;
const flag = new Int32Array(shared);
pg.types.setTypeParser(20, (v) => Number(v)); // BIGINT → number (القيم في هذا النظام ضمن المدى الآمن)

const client = new pg.Client({ connectionString: url, application_name: "agentic-enterprise" });
let ready = null;

function reply(msg) {
  port.postMessage(msg);
  Atomics.store(flag, 0, 1);
  Atomics.notify(flag, 0);
}

port.on("message", async (msg) => {
  try {
    if (msg.op === "connect") {
      ready ??= (async () => {
        await client.connect();
        if (schema) {
          // CREATE SCHEMA متزامن من عدة عمليات قد يتعارض؛ يُسلسل بالقفل نفسه المستخدم لـ DDL (postgres.ts).
          try {
            await client.query(`BEGIN; SELECT pg_advisory_xact_lock(727410031); CREATE SCHEMA IF NOT EXISTS "${schema}"; COMMIT;`);
          } catch (err) {
            await client.query("ROLLBACK").catch(() => {});
            throw err;
          }
          await client.query(`SET search_path TO "${schema}"`);
        }
      })();
      await ready;
      return reply({ result: null });
    }
    if (msg.op === "close") {
      await client.end();
      return reply({ result: null });
    }
    const res = await client.query({ text: msg.text, values: msg.values ?? [], rowMode: undefined });
    const last = Array.isArray(res) ? res[res.length - 1] : res;
    reply({ result: { rows: last?.rows ?? [], rowCount: last?.rowCount ?? 0 } });
  } catch (err) {
    reply({ error: { message: err.message, code: err.code ?? null } });
  }
});
