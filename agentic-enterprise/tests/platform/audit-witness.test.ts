import { randomBytes } from "node:crypto";
import { createServer } from "node:http";
import type { AddressInfo } from "node:net";
import { describe, expect, it } from "vitest";
import { MemoryAnchor } from "../../platform/audit/anchor.ts";
import { AuditLog } from "../../platform/audit/audit-log.ts";
import { HttpCheckpointSink, makeCheckpoint, verifyAgainstCheckpoints, type Checkpoint } from "../../platform/audit/checkpoint.ts";
import { openDatabase } from "../../platform/core/db.ts";
import { canonicalJson, ManualClock, sha256 } from "../../platform/core/util.ts";
import { generateApproverKeyPair } from "../../platform/identity/approver-keys.ts";

function setup() {
  const db = openDatabase(":memory:");
  const key = randomBytes(32);
  const anchor = new MemoryAnchor(key);
  const log = new AuditLog(db, new ManualClock(), anchor);
  const add = (k: number) => {
    for (let i = 0; i < k; i++) log.append({ actor: { type: "system", id: "t" }, action: "payment.executed", outcome: "success", data: { i } });
  };
  return { db, key, anchor, log, add, cp: generateApproverKeyPair() };
}

/** مهاجم يملك القاعدة وملف التثبيت ومفتاحه: يعيد كتابة التاريخ ويعيد توليد التثبيتات كلها. */
function fullCompromiseRewrite(s: ReturnType<typeof setup>, seqToForge: number) {
  s.db.exec("DROP TRIGGER IF EXISTS audit_no_update; DROP TRIGGER IF EXISTS audit_no_delete");
  const rows = s.db.prepare("SELECT * FROM audit_log ORDER BY seq").all() as Array<Record<string, any>>; // eslint-disable-line @typescript-eslint/no-explicit-any
  let prev = "0".repeat(64);
  s.anchor.lines.length = 0;
  for (const r of rows) {
    const actorId = r.seq === seqToForge ? "u-attacker" : r.actor_id;
    const body = { seq: r.seq, ts: r.ts, actor: { type: r.actor_type, id: actorId }, action: r.action, target: r.target, taskId: r.task_id, outcome: r.outcome, data: JSON.parse(r.data), prevHash: prev };
    const h = sha256(canonicalJson(body));
    s.db.prepare("UPDATE audit_log SET actor_id = ?, prev_hash = ?, hash = ? WHERE seq = ?").run(actorId, prev, h, r.seq);
    s.anchor.record(r.seq, h, r.ts);
    prev = h;
  }
}

describe("external witness checkpoints", () => {
  it("catch a full-compromise rewrite that local verification (chain + anchors) cannot", () => {
    const s = setup();
    s.add(30);
    const witness: Checkpoint[] = [makeCheckpoint(s.db, "tenant:acme", s.cp.privateKeyPem, new Date())];
    s.add(10);
    witness.push(makeCheckpoint(s.db, "tenant:acme", s.cp.privateKeyPem, new Date()));
    expect(verifyAgainstCheckpoints(s.db, witness, s.cp.publicKeyPem)).toMatchObject({ ok: true, checked: 2 });

    fullCompromiseRewrite(s, 12);
    expect(s.log.verify().valid).toBe(true); // الحد المعروف لـ ADR-008: محليًا يبدو كل شيء سليمًا
    const r = verifyAgainstCheckpoints(s.db, witness, s.cp.publicKeyPem);
    expect(r.ok).toBe(false);
    expect(r.problems.join()).toMatch(/history rewritten/);
  });

  it("catch truncation below an exported head, and reject forged or re-signed checkpoints", () => {
    const s = setup();
    s.add(20);
    const c = makeCheckpoint(s.db, "tenant:acme", s.cp.privateKeyPem, new Date());
    s.db.exec("DROP TRIGGER IF EXISTS audit_no_delete; DELETE FROM audit_log WHERE seq > 15");
    expect(verifyAgainstCheckpoints(s.db, [c], s.cp.publicKeyPem).problems.join()).toMatch(/truncation/);

    const forged = { ...c, hash: "f".repeat(64) };
    expect(verifyAgainstCheckpoints(s.db, [forged], s.cp.publicKeyPem).problems.join()).toMatch(/invalid signature/);
    const attackerKey = generateApproverKeyPair();
    const resigned = makeCheckpoint(s.db, "tenant:acme", attackerKey.privateKeyPem, new Date());
    expect(verifyAgainstCheckpoints(s.db, [resigned], s.cp.publicKeyPem).problems.join()).toMatch(/invalid signature/);
  });

  it("publishes to an HTTP witness and refuses plain http to remote hosts", async () => {
    const received: string[] = [];
    const server = createServer((req, res) => {
      let b = "";
      req.on("data", (c) => (b += c)).on("end", () => (received.push(b), res.writeHead(201).end()));
    });
    await new Promise<void>((r) => server.listen(0, "127.0.0.1", r));
    const s = setup();
    s.add(5);
    const c = makeCheckpoint(s.db, "tenant:acme", s.cp.privateKeyPem, new Date());
    await new HttpCheckpointSink(`http://127.0.0.1:${(server.address() as AddressInfo).port}/checkpoints`).publish(c);
    server.close();
    expect(JSON.parse(received[0]!)).toEqual(c);
    expect(() => new HttpCheckpointSink("http://witness.example.com/x")).toThrow(/https/);
  });
});
