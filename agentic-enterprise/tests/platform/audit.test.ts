import { describe, expect, it } from "vitest";
import { AuditLog } from "../../platform/audit/audit-log.ts";
import { openDatabase } from "../../platform/core/db.ts";
import { ManualClock } from "../../platform/core/util.ts";

function setup() {
  const db = openDatabase(":memory:");
  return { db, log: new AuditLog(db, new ManualClock()) };
}

describe("AuditLog", () => {
  it("chains entries and verifies an intact log", () => {
    const { log } = setup();
    const a = log.append({ actor: { type: "agent", id: "a1" }, action: "x", outcome: "success", data: { n: 1 } });
    const b = log.append({ actor: { type: "human", id: "u1" }, action: "y", outcome: "denied" });
    expect(b.prevHash).toBe(a.hash);
    expect(log.verify()).toMatchObject({ valid: true, entries: 2, anchoring: "none" });
  });

  it("rejects UPDATE and DELETE at the database level", () => {
    const { db, log } = setup();
    log.append({ actor: { type: "agent", id: "a1" }, action: "x", outcome: "success" });
    expect(() => db.exec("UPDATE audit_log SET action = 'forged'")).toThrow(/append-only/);
    expect(() => db.exec("DELETE FROM audit_log")).toThrow(/append-only/);
  });

  it("detects tampering even if the triggers are dropped", () => {
    const { db, log } = setup();
    for (let i = 0; i < 3; i++) log.append({ actor: { type: "agent", id: "a1" }, action: `x${i}`, outcome: "success", data: { amount: 100 } });
    db.exec("DROP TRIGGER audit_no_update");
    db.exec(`UPDATE audit_log SET data = '{"amount":1}' WHERE seq = 2`);
    const r = log.verify();
    expect(r.valid).toBe(false);
    expect(r.firstBrokenSeq).toBe(2);
    expect(() => log.assertIntact()).toThrow(/AUDIT|broken/i);
  });

  it("filters by task and action", () => {
    const { log } = setup();
    log.append({ actor: { type: "agent", id: "a1" }, action: "tool.a", taskId: "t1", outcome: "success" });
    log.append({ actor: { type: "agent", id: "a1" }, action: "tool.b", taskId: "t2", outcome: "success" });
    expect(log.query({ taskId: "t1" })).toHaveLength(1);
    expect(log.query({ action: "tool.b" })[0]!.taskId).toBe("t2");
  });
});
