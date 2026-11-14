import { describe, expect, it } from "vitest";
import { afterCommit, openDatabase, transaction } from "../../platform/core/db.ts";

describe("transactions", () => {
  it("nests with savepoints; afterCommit runs only after the outer commit and is dropped on rollback", () => {
    const db = openDatabase(":memory:");
    db.exec("CREATE TABLE t (v INTEGER)");
    const fired: string[] = [];
    transaction(db, () => {
      db.exec("INSERT INTO t VALUES (1)");
      afterCommit(db, () => fired.push("outer"));
      transaction(db, () => {
        db.exec("INSERT INTO t VALUES (2)");
        afterCommit(db, () => fired.push("inner-kept"));
      });
      expect(() =>
        transaction(db, () => {
          db.exec("INSERT INTO t VALUES (3)");
          afterCommit(db, () => fired.push("inner-rolled-back"));
          throw new Error("boom");
        }),
      ).toThrow("boom");
      expect(fired).toEqual([]); // لا شيء قبل الالتزام الخارجي
    });
    expect(fired).toEqual(["outer", "inner-kept"]);
    expect(db.prepare("SELECT v FROM t ORDER BY v").all().map((r) => (r as { v: number }).v)).toEqual([1, 2]);

    expect(() => transaction(db, () => (afterCommit(db, () => fired.push("outer-rolled-back")), db.exec("INSERT INTO t VALUES (9)"), (() => { throw new Error("x"); })()))).toThrow();
    expect(fired).toEqual(["outer", "inner-kept"]);
    afterCommit(db, () => fired.push("no-tx"));
    expect(fired.at(-1)).toBe("no-tx");
  });
});
