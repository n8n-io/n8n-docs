import pg from "pg";

/** قبل تشغيل الاختبارات على PostgreSQL: حذف schemas الاختبار المتبقية من تشغيلات سابقة (t_*). */
export default async function setup(): Promise<() => Promise<void>> {
  const url = process.env.TEST_POSTGRES_URL;
  const drop = async () => {
    if (!url) return;
    const c = new pg.Client({ connectionString: url });
    await c.connect();
    const { rows } = await c.query<{ nspname: string }>("SELECT nspname FROM pg_namespace WHERE nspname LIKE 't\\_%' OR nspname LIKE 'ae\\_%'");
    for (const r of rows) await c.query(`DROP SCHEMA "${r.nspname}" CASCADE`);
    await c.end();
  };
  await drop();
  return drop;
}
