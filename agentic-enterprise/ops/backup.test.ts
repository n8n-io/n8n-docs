import { randomBytes } from "node:crypto";
import { mkdtempSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { DatabaseSync } from "node:sqlite";
import { describe, expect, it } from "vitest";
import { ALL_AGENTS } from "../agents/index.ts";
import { HmacFileAnchor } from "../platform/audit/anchor.ts";
import { ManualClock } from "../platform/core/util.ts";
import { createPlatform } from "../platform/index.ts";
import { backupUnits, keyForUnit, verifyBackup } from "./backup.ts";

/** تمرين نسخ واستعادة فعلي: نسخة أثناء نشاط، ثم تحقق، ثم استعادة وتشغيل المنصة منها. */
function live() {
  const dir = mkdtempSync(join(tmpdir(), "ae-bk-"));
  const key = randomBytes(32);
  const dbPath = join(dir, "enterprise.db");
  const anchorPath = join(dir, "anchor.jsonl");
  const open = (path = dbPath, anchor = anchorPath) =>
    createPlatform({ config: { DATABASE_PATH: path, KILL_SWITCH: false, APPROVER_AUTH: "trusted" }, clock: new ManualClock(), isolated: true, anchor: new HmacFileAnchor(anchor, key) }).register(...ALL_AGENTS);
  return { dir, key, dbPath, anchorPath, open };
}

describe("backup and restore drill", () => {
  it("a backup taken while the system keeps writing verifies, restores and runs", async () => {
    const env = live();
    const p = env.open();
    p.orchestrator.submit({ type: "compliance.screen", input: { partyType: "supplier", partyId: "sup-001" }, originator: "u-requester" });
    await p.orchestrator.drain();
    const out = join(env.dir, "backup");
    const m = await backupUnits([{ name: "enterprise", db: env.dbPath, anchor: env.anchorPath, anchorKey: env.key }], out);
    // النشاط يستمر بعد اللقطة: التثبيت الحي يتقدم على النسخة
    p.orchestrator.submit({ type: "compliance.screen", input: { partyType: "supplier", partyId: "sup-003" }, originator: "u-requester" });
    await p.orchestrator.drain();
    p.close();

    const [check] = verifyBackup(out, keyForUnit(undefined, env.key));
    expect(check).toMatchObject({ ok: true, problems: [] });
    expect(check!.audit).toMatchObject({ valid: true, anchoring: "file", entries: m.units[0]!.entries });

    // الاستعادة: المنصة تُقلع من النسخة مع تثبيتها، والسلسلة سليمة، والعمل يستمر
    const restored = env.open(join(out, "enterprise.db"), join(out, "enterprise.anchor.jsonl"));
    expect(restored.audit.verify().valid).toBe(true);
    restored.orchestrator.submit({ type: "compliance.screen", input: { partyType: "supplier", partyId: "sup-004" }, originator: "u-requester" });
    await restored.orchestrator.drain();
    expect(restored.orchestrator.list().every((t) => t.status === "completed")).toBe(true);
    expect(restored.audit.verify().valid).toBe(true);
    restored.close();
  });

  it("detects a tampered, truncated or incomplete backup", async () => {
    const env = live();
    const p = env.open();
    p.orchestrator.submit({ type: "compliance.screen", input: { partyType: "supplier", partyId: "sup-001" }, originator: "u-requester" });
    await p.orchestrator.drain();
    p.close();
    const out = join(env.dir, "backup");
    await backupUnits([{ name: "enterprise", db: env.dbPath, anchor: env.anchorPath, anchorKey: env.key }], out);

    // 1) ملف معدّل: الـ checksum يفشل
    const db = new DatabaseSync(join(out, "enterprise.db"));
    db.exec("DROP TRIGGER audit_no_update; UPDATE audit_log SET actor_id = 'u-attacker' WHERE seq = 2");
    db.close();
    expect(verifyBackup(out, keyForUnit(undefined, env.key))[0]!.problems.join()).toMatch(/checksum mismatch/);

    // 2) المهاجم يحدّث الـ manifest أيضًا: سلسلة audit والتثبيت يكشفان التعديل
    const manifest = JSON.parse(readFileSync(join(out, "manifest.json"), "utf8"));
    manifest.units[0].sha256["enterprise.db"] = (await import("node:crypto")).createHash("sha256").update(readFileSync(join(out, "enterprise.db"))).digest("hex");
    writeFileSync(join(out, "manifest.json"), JSON.stringify(manifest));
    const c = verifyBackup(out, keyForUnit(undefined, env.key))[0]!;
    expect(c.ok).toBe(false);
    expect(c.problems.join()).toMatch(/audit/);

    // 3) بلا مفتاح التثبيت: تحذير صريح، لا نجاح صامت
    const again = await backupUnits([{ name: "enterprise", db: env.dbPath, anchor: env.anchorPath }], join(env.dir, "b2"));
    expect(again.units[0]!.anchor).not.toBeNull();
    expect(verifyBackup(join(env.dir, "b2"), () => undefined)[0]!.problems.join()).toMatch(/no key supplied/);
  });
});
