import { randomBytes } from "node:crypto";
import { mkdtempSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { HmacFileAnchor, MemoryAnchor, type AuditAnchor } from "../../platform/audit/anchor.ts";
import { AuditLog } from "../../platform/audit/audit-log.ts";
import { dialectOf, openDatabase, type Database } from "../../platform/core/db.ts";
import { canonicalJson, ManualClock, sha256 } from "../../platform/core/util.ts";

const INTERVAL = 10 * 60_000;
function setup(n: number, anchor: AuditAnchor = new MemoryAnchor(randomBytes(32))) {
  const db = openDatabase(":memory:");
  const clock = new ManualClock();
  const log = new AuditLog(db, clock, anchor, INTERVAL);
  const add = (k: number) => {
    for (let i = 0; i < k; i++) log.append({ actor: { type: "system", id: "t" }, action: "probe", outcome: "info", data: { i } });
  };
  add(n);
  return { db, clock, log, add };
}
const dropGuards = (db: Database) =>
  db.exec(dialectOf(db) === "postgres" ? "DROP TRIGGER IF EXISTS audit_no_update_delete ON audit_log" : "DROP TRIGGER IF EXISTS audit_no_update; DROP TRIGGER IF EXISTS audit_no_delete");

/** إعادة كتابة السلسلة كاملة من seq معيّن (المهاجم يملك القاعدة ويعيد حساب الـ hashes). */
function rewriteFrom(db: Database, fromSeq: number) {
  dropGuards(db);
  const rows = db.prepare("SELECT * FROM audit_log ORDER BY seq").all() as Array<Record<string, any>>; // eslint-disable-line @typescript-eslint/no-explicit-any
  let prev = "0".repeat(64);
  for (const r of rows) {
    const actorId = r.seq === fromSeq ? "u-attacker" : r.actor_id;
    const body = { seq: r.seq, ts: r.ts, actor: { type: r.actor_type, id: actorId }, action: r.action, target: r.target, taskId: r.task_id, outcome: r.outcome, data: JSON.parse(r.data), prevHash: prev };
    const h = r.seq >= fromSeq ? sha256(canonicalJson(body)) : r.hash;
    if (r.seq >= fromSeq) db.prepare("UPDATE audit_log SET actor_id = ?, prev_hash = ?, hash = ? WHERE seq = ?").run(actorId, prev, h, r.seq);
    prev = h;
  }
}

describe("incremental audit verification", () => {
  it("is valid on a healthy log and keeps working as events are appended", () => {
    const { log, add } = setup(50);
    expect(log.verifyFast()).toMatchObject({ valid: true, entries: 50 });
    add(30);
    expect(log.verifyFast()).toMatchObject({ valid: true, entries: 80 });
  });

  it("detects a full-chain rewrite (R6) immediately, without waiting for the next full verify", () => {
    const { db, log } = setup(100);
    log.verifyFast();
    rewriteFrom(db, 10);
    expect(log.verifyFast()).toMatchObject({ valid: false });
  });

  it("detects a surgical rewrite of exactly the trust-point row (content and its own hash), later rows untouched", () => {
    const { db, log } = setup(100);
    log.verifyFast(); // نقطة الثقة = 100 - 8 = 92
    dropGuards(db);
    const r = db.prepare("SELECT * FROM audit_log WHERE seq = 92").get() as Record<string, any>; // eslint-disable-line @typescript-eslint/no-explicit-any
    const body = { seq: 92, ts: r.ts, actor: { type: r.actor_type, id: "u-attacker" }, action: r.action, target: r.target, taskId: r.task_id, outcome: r.outcome, data: JSON.parse(r.data), prevHash: r.prev_hash };
    db.prepare("UPDATE audit_log SET actor_id = 'u-attacker', hash = ? WHERE seq = 92").run(sha256(canonicalJson(body)));
    expect(log.verifyFast()).toMatchObject({ valid: false, firstBrokenSeq: 92, reason: expect.stringMatching(/trusted checkpoint hash changed/) });
  });

  it("detects tail truncation, deletion before the checkpoint, and tampering in new events immediately", () => {
    const a = setup(100);
    a.log.verifyFast();
    dropGuards(a.db);
    a.db.exec("DELETE FROM audit_log WHERE seq > 95");
    expect(a.log.verifyFast()).toMatchObject({ valid: false });

    const b = setup(100);
    b.log.verifyFast();
    dropGuards(b.db);
    b.db.exec("DELETE FROM audit_log WHERE seq = 20");
    expect(b.log.verifyFast().reason).toMatch(/deleted or inserted|checkpoint/);

    const c = setup(100);
    c.log.verifyFast();
    c.add(5);
    dropGuards(c.db);
    c.db.exec("UPDATE audit_log SET actor_id = 'u-attacker' WHERE seq = 104");
    expect(c.log.verifyFast().reason).toMatch(/content hash mismatch/);
  });

  it("documented residual: an in-place edit of an OLD row's content is caught at the next full verify, at most one interval later", () => {
    const { db, clock, log } = setup(100);
    log.verifyFast();
    dropGuards(db);
    db.exec("UPDATE audit_log SET actor_id = 'u-attacker' WHERE seq = 5"); // المحتوى تغيّر وعمود hash لم يتغير
    expect(log.verifyFast().valid).toBe(true); // الحد المعلن: لا يُكشف في المسار السريع
    clock.advanceHours(1);
    expect(log.verifyFast()).toMatchObject({ valid: false, firstBrokenSeq: 5, reason: "content hash mismatch" });
  });

  it("detects a truncated or replaced anchor file between full verifies", () => {
    const file = join(mkdtempSync(join(tmpdir(), "ae-anc-")), "anchor.jsonl");
    const { log, add } = setup(60, new HmacFileAnchor(file, randomBytes(32)));
    expect(log.verifyFast().valid).toBe(true);
    add(5);
    expect(log.verifyFast().valid).toBe(true);
    const lines = readFileSync(file, "utf8").trim().split("\n");
    writeFileSync(file, lines.slice(0, 30).join("\n") + "\n");
    expect(log.verifyFast()).toMatchObject({ valid: false, reason: expect.stringMatching(/truncated|replaced/) });
  });

  it("cost scales with new events, not with log size", () => {
    const { log, add } = setup(30_000);
    let t = performance.now();
    expect(log.verifyFast().valid).toBe(true); // تحقق كامل أول
    const full = performance.now() - t;
    add(20);
    t = performance.now();
    for (let i = 0; i < 10; i++) expect(log.verifyFast().valid).toBe(true);
    const fast = (performance.now() - t) / 10;
    expect(fast).toBeLessThan(full / 10);
  }, 60_000);
});
