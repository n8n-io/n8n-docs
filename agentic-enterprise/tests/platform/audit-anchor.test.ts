import { dialectOf, ephemeralDbConfig } from "../../platform/core/db.ts";
import { randomBytes } from "node:crypto";
import { existsSync, mkdtempSync, readFileSync, renameSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { HmacFileAnchor, MemoryAnchor } from "../../platform/audit/anchor.ts";
import { ANCHOR_PENDING_WINDOW, AuditLog } from "../../platform/audit/audit-log.ts";
import { openDatabase, transaction } from "../../platform/core/db.ts";
import { canonicalJson, ManualClock, sha256 } from "../../platform/core/util.ts";
import { createPlatform } from "../../platform/index.ts";
import { ScriptedRuntime } from "../../platform/runtime/runtime.ts";
import { done, testAgent } from "../helpers.ts";

/** R5 وR6: كشف الحذف من الذيل وإعادة الكتابة الكاملة عبر التثبيت الخارجي الموقّع. */

function setup(n = 20) {
  const db = openDatabase(":memory:");
  const anchor = new MemoryAnchor(randomBytes(32));
  const log = new AuditLog(db, new ManualClock(), anchor);
  for (let i = 0; i < n; i++) log.append({ actor: { type: "system", id: "t" }, action: `a${i}`, outcome: "info", data: { amount: i } });
  return { db, anchor, log };
}

/** المهاجم يملك القاعدة: يُسقط الـ triggers ويعيد حساب السلسلة بعد تعديل سجل. */
function rewriteChain(db: ReturnType<typeof openDatabase>, mutateSeq: number) {
  db.exec(dialectOf(db) === "postgres" ? "DROP TRIGGER IF EXISTS audit_no_update_delete ON audit_log" : "DROP TRIGGER IF EXISTS audit_no_update");
  let prev = "0".repeat(64);
  for (const r of db.prepare("SELECT * FROM audit_log ORDER BY seq").all() as Array<Record<string, any>>) {
    const actorId = r.seq === mutateSeq ? "u-attacker" : r.actor_id;
    const body = { seq: r.seq, ts: r.ts, actor: { type: r.actor_type, id: actorId }, action: r.action, target: r.target, taskId: r.task_id, outcome: r.outcome, data: JSON.parse(r.data), prevHash: prev };
    const h = sha256(canonicalJson(body));
    db.prepare("UPDATE audit_log SET actor_id = ?, prev_hash = ?, hash = ? WHERE seq = ?").run(actorId, prev, h, r.seq);
    prev = h;
  }
}

describe("external audit anchoring", () => {
  it("an intact anchored log verifies", () => {
    expect(setup().log.verify()).toMatchObject({ valid: true, entries: 20, anchoring: "memory", pendingAnchors: 0 });
  });

  it("R5: detects truncation of the tail", () => {
    const { db, log } = setup();
    db.exec("DROP TRIGGER audit_no_delete; DELETE FROM audit_log WHERE seq > 12");
    expect(log.verify()).toMatchObject({ valid: false, firstBrokenSeq: 13, reason: expect.stringMatching(/missing/) });
  });

  it("R6: detects a full-chain rewrite that a hash chain alone cannot see", () => {
    const { db, log } = setup();
    rewriteChain(db, 5);
    expect(log.verify()).toMatchObject({ valid: false, firstBrokenSeq: 5, reason: expect.stringMatching(/rewritten/) });
  });

  it("detects forged anchor entries (wrong key) and events inserted outside the API", () => {
    const { db, log, anchor } = setup();
    anchor.lines.push({ ...anchor.lines[0]!, sig: "00".repeat(32) });
    expect(log.verify()).toMatchObject({ valid: false, reason: expect.stringMatching(/invalid signature/) });
    anchor.lines.pop();
    // إدراج حدث بسلسلة صحيحة لكن دون تثبيت، ثم أحداث شرعية بعده تتجاوز نافذة الانتظار
    const last = db.prepare("SELECT seq, hash FROM audit_log ORDER BY seq DESC LIMIT 1").get() as { seq: number; hash: string };
    const body = { seq: last.seq + 1, ts: "2029-03-01T08:00:00.000Z", actor: { type: "human", id: "u-cfo" }, action: "approval.approve", target: null, taskId: null, outcome: "success", data: {}, prevHash: last.hash };
    db.prepare("INSERT INTO audit_log VALUES (?, ?, 'human', 'u-cfo', 'approval.approve', NULL, NULL, 'success', '{}', ?, ?)").run(body.seq, body.ts, last.hash, sha256(canonicalJson(body)));
    expect(log.verify()).toMatchObject({ valid: true, pendingAnchors: 1 }); // داخل نافذة الانتظار
    for (let i = 0; i < ANCHOR_PENDING_WINDOW; i++) log.append({ actor: { type: "system", id: "t" }, action: "later", outcome: "info" });
    expect(log.verify()).toMatchObject({ valid: false, firstBrokenSeq: body.seq, reason: expect.stringMatching(/no anchor/) });
  });

  it("treats two different anchors for the same event as tampering", () => {
    const { log, anchor } = setup(3);
    anchor.lines.push({ ...anchor.lines[1]! }); // تكرار مطابق: مقبول
    expect(log.verify().valid).toBe(true);
    // تثبيت متعارض موقّع بالمفتاح الصحيح: ما كان سيحدث لو ثُبِّت حدث تراجعت معاملته
    anchor.record(2, "e".repeat(64), "2029-03-01T08:00:00.000Z");
    expect(log.verify()).toMatchObject({ valid: false, firstBrokenSeq: 2, reason: expect.stringMatching(/conflicting anchors/) });
  });

  it("does not anchor events whose transaction rolled back (no false alarms)", () => {
    const { db, log } = setup(3);
    expect(() => transaction(db, () => (log.append({ actor: { type: "system", id: "t" }, action: "rolled-back", outcome: "info" }), (() => { throw new Error("abort"); })()))).toThrow("abort");
    log.append({ actor: { type: "system", id: "t" }, action: "after", outcome: "info" });
    expect(log.verify()).toMatchObject({ valid: true, entries: 4, pendingAnchors: 0 });
  });

  it("file anchor: deleting or replacing the anchor file is detected", () => {
    const dir = mkdtempSync(join(tmpdir(), "anchor-"));
    const key = randomBytes(32);
    const db = openDatabase(join(dir, "a.db"));
    const log = new AuditLog(db, new ManualClock(), new HmacFileAnchor(join(dir, "anchor.jsonl"), key));
    for (let i = 0; i < 5; i++) log.append({ actor: { type: "system", id: "t" }, action: "x", outcome: "info" });
    expect(log.verify().valid).toBe(true);
    const content = readFileSync(join(dir, "anchor.jsonl"), "utf8");
    renameSync(join(dir, "anchor.jsonl"), join(dir, "moved.jsonl"));
    expect(existsSync(join(dir, "anchor.jsonl"))).toBe(false);
    expect(log.verify()).toMatchObject({ valid: false, reason: expect.stringMatching(/anchor store missing/) });
    // ملف بديل موقّع بمفتاح آخر
    const forged = new HmacFileAnchor(join(dir, "anchor.jsonl"), randomBytes(32));
    for (const line of content.trim().split("\n")) { const e = JSON.parse(line); forged.record(e.seq, e.hash, e.ts); }
    expect(log.verify()).toMatchObject({ valid: false, reason: expect.stringMatching(/invalid signature/) });
    writeFileSync(join(dir, "anchor.jsonl"), content);
    expect(log.verify().valid).toBe(true);
  });

  it("integrity failure blocks approvals, executions and queue runs, and engages the emergency stop", async () => {
    const anchor = new MemoryAnchor(randomBytes(32));
    const p = createPlatform({ config: { ...ephemeralDbConfig(), KILL_SWITCH: false }, clock: new ManualClock(), runtime: new ScriptedRuntime(), isolated: true, anchor });
    p.register(testAgent({ policy: async ({ tools }) => (await tools.call("send_email", { to: "a@example.com", body: "x" }), done("waiting", { status: "needs_approval" })) }));
    const t = p.orchestrator.submit({ type: "test.run", input: {}, originator: "u-requester" });
    await p.orchestrator.drain();
    const [a] = p.gate.list({ status: "pending" });
    rewriteChain(p.db, 2);
    await expect(p.decide(a!.id, "u-cs-sup", "approve")).rejects.toThrow(/AUDIT|audit chain broken/i);
    expect(p.killSwitch.isEngaged()).toBe(true);
    expect(p.gate.get(a!.id).status).toBe("pending");
    expect(p.connectors.email.outbox()).toHaveLength(0);
    expect(await p.orchestrator.drain()).toEqual([]);
    expect(p.orchestrator.get(t.id).status).toBe("awaiting_approval");
  });
});
