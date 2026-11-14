import { mkdirSync, readdirSync, writeFileSync } from "node:fs";
import { join, relative, resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { runScenario, type EvalMode } from "./runner.ts";
import type { EvalScenario, ScenarioResult } from "./types.ts";

/**
 * تشغيل اختبارات كل الوكلاء بأمر واحد:
 *   npm run eval                     ← كل السيناريوهات، وضع scripted (بلا نموذج ولا مفتاح)
 *   npm run eval -- --live           ← الوضع الحي بـ Claude (يتطلب ANTHROPIC_API_KEY)
 *   npm run eval -- --filter=finance ← تصفية بالمسار أو بمعرّف السيناريو
 * يكتب تقريرًا في reports/eval-report.json، ويخرج برمز 1 إن فشل أي سيناريو (مناسب لـ CI).
 */

const ROOT = resolve(import.meta.dirname, "../..");
const args = process.argv.slice(2);
const mode: EvalMode = args.includes("--live") ? "live" : "scripted";
const filter = args.find((a) => a.startsWith("--filter="))?.split("=")[1];

function discover(): string[] {
  const roots = ["agents", "platform", "scenarios"].map((d) => join(ROOT, d));
  const files: string[] = [];
  for (const r of roots) {
    let entries: string[] = [];
    try {
      entries = readdirSync(r, { recursive: true }) as string[];
    } catch {
      continue;
    }
    for (const e of entries) if (/(^|[\\/])evals[\\/][^\\/]+\.eval\.ts$/.test(e)) files.push(join(r, e));
  }
  return files.sort();
}

async function main(): Promise<void> {
  if (mode === "live" && !process.env.ANTHROPIC_API_KEY) {
    console.error("Live mode requires ANTHROPIC_API_KEY. Run without --live for deterministic evals.");
    process.exit(2);
  }
  const files = discover();
  const scenarios: Array<{ file: string; s: EvalScenario }> = [];
  for (const f of files) {
    const mod = (await import(pathToFileURL(f).href)) as { default: EvalScenario | EvalScenario[] };
    for (const s of [mod.default].flat()) {
      const rel = relative(ROOT, f);
      if (!filter || rel.includes(filter) || s.id.includes(filter)) scenarios.push({ file: rel, s });
    }
  }
  const ids = new Set<string>();
  for (const { s } of scenarios) {
    if (ids.has(s.id)) throw new Error(`Duplicate eval id: ${s.id}`);
    ids.add(s.id);
  }

  console.log(`\nRunning ${scenarios.length} eval scenario(s) in ${mode} mode from ${files.length} file(s)\n`);
  const results: ScenarioResult[] = [];
  // سقف تكلفة إجمالي للوضع الحي: يتوقف قبل أي سيناريو جديد إذا بلغت التكلفة المتراكمة السقف.
  const maxTotalUsd = Number(process.env.EVAL_LIVE_MAX_TOTAL_USD ?? 5);
  for (const { s } of scenarios) {
    const spent = results.reduce((n, r) => n + r.costUsd, 0);
    if (mode === "live" && spent >= maxTotalUsd) {
      console.error(`\nStopping: live cost $${spent.toFixed(4)} reached EVAL_LIVE_MAX_TOTAL_USD=${maxTotalUsd}. Remaining scenarios not run.`);
      process.exitCode = 1;
      break;
    }
    const r = await runScenario(s, mode);
    results.push(r);
    const mark = r.skipped ? "SKIP" : r.passed ? "PASS" : "FAIL";
    console.log(`  ${mark}  ${r.agent.padEnd(38)} ${r.id.padEnd(44)} ${r.durationMs}ms`);
    if (!r.passed) {
      for (const c of r.checks.filter((c) => !c.pass)) console.log(`          ✗ ${c.name}: ${c.message}`);
      if (r.error) console.log(`          ! ${r.error.split("\n").slice(0, 4).join("\n            ")}`);
    }
  }

  const byAgent = new Map<string, { pass: number; fail: number; skip: number }>();
  for (const r of results) {
    const a = byAgent.get(r.agent) ?? { pass: 0, fail: 0, skip: 0 };
    r.skipped ? a.skip++ : r.passed ? a.pass++ : a.fail++;
    byAgent.set(r.agent, a);
  }
  console.log("\nSummary by agent:");
  for (const [agent, c] of byAgent) console.log(`  ${agent.padEnd(38)} pass ${c.pass}  fail ${c.fail}  skip ${c.skip}`);
  const failed = results.filter((r) => !r.passed && !r.skipped).length;
  const checks = results.reduce((n, r) => n + r.checks.length, 0);
  const cost = results.reduce((n, r) => n + r.costUsd, 0);
  console.log(`\nTotal: ${results.length} scenarios, ${checks} checks, ${failed} failed${mode === "live" ? `, cost $${cost.toFixed(4)}` : ""}\n`);

  mkdirSync(join(ROOT, "reports"), { recursive: true });
  writeFileSync(join(ROOT, "reports", "eval-report.json"), JSON.stringify({ mode, generatedAt: new Date().toISOString(), results }, null, 2));
  process.exit(failed > 0 || process.exitCode === 1 ? 1 : 0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
