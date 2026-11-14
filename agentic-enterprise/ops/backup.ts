import { createHash } from "node:crypto";
import { copyFileSync, existsSync, mkdirSync, mkdtempSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { backup as sqliteBackup, DatabaseSync } from "node:sqlite";
import { HmacFileAnchor, NoAnchor } from "../platform/audit/anchor.ts";
import { AuditLog, type VerifyResult } from "../platform/audit/audit-log.ts";
import { openDatabase } from "../platform/core/db.ts";
import { systemClock } from "../platform/core/util.ts";
import { deriveTenantKey } from "../platform/tenancy/control-plane.ts";

/**
 * نسخ احتياطي متسق لقواعد SQLite مع ملفات تثبيت audit، وتحقق قابل للأتمتة من النسخة.
 *
 * المشكلة التي يحلها: التثبيت يُكتب بعد الالتزام، فنسخ ملف التثبيت بعد لقطة القاعدة يجعله أحدث منها،
 * والتحقق يعلن حينها "أحداث مثبتة مفقودة" (وهو ما يجب أن يعلنه لو كان حذفًا حقيقيًا). الحل: تُقص أسطر
 * التثبيت عند آخر seq في اللقطة، ويُسجل في manifest رأس السلسلة وSHA-256 لكل ملف.
 * PostgreSQL: النسخ بـ pg_dump لكل schema (DISASTER_RECOVERY.md)، والتحقق نفسه بعد الاستعادة.
 */
export interface BackupUnit {
  name: string;
  db: string;
  anchor?: string;
  anchorKey?: Buffer;
}

export interface Manifest {
  createdAt: string;
  units: Array<{ name: string; db: string; anchor: string | null; lastSeq: number; lastHash: string | null; entries: number; sha256: Record<string, string> }>;
}

const sha = (path: string) => createHash("sha256").update(readFileSync(path)).digest("hex");

export async function backupUnits(units: BackupUnit[], outDir: string): Promise<Manifest> {
  mkdirSync(outDir, { recursive: true });
  const manifest: Manifest = { createdAt: new Date().toISOString(), units: [] };
  for (const u of units) {
    const dbOut = `${u.name}.db`;
    const src = new DatabaseSync(u.db);
    try {
      await sqliteBackup(src, join(outDir, dbOut)); // API النسخ في SQLite: لقطة متسقة رغم WAL والكتّاب المتزامنين
    } finally {
      src.close();
    }
    const snap = new DatabaseSync(join(outDir, dbOut), { readOnly: true });
    const head = snap.prepare("SELECT seq, hash FROM audit_log ORDER BY seq DESC LIMIT 1").get() as { seq: number; hash: string } | undefined;
    const entries = Number((snap.prepare("SELECT COUNT(*) AS n FROM audit_log").get() as { n: number }).n);
    snap.close();
    const lastSeq = head?.seq ?? 0;
    let anchorOut: string | null = null;
    if (u.anchor && existsSync(u.anchor)) {
      anchorOut = `${u.name}.anchor.jsonl`;
      const kept = readFileSync(u.anchor, "utf8").split("\n").filter((l) => {
        if (!l.trim()) return false;
        try {
          return Number((JSON.parse(l) as { seq: number }).seq) <= lastSeq;
        } catch {
          return true; // سطر تالف يُنقل كما هو ليظهر في التحقق، لا يُخفى
        }
      });
      writeFileSync(join(outDir, anchorOut), kept.length ? kept.join("\n") + "\n" : "", { mode: 0o600 });
    }
    const files = [dbOut, ...(anchorOut ? [anchorOut] : [])];
    manifest.units.push({ name: u.name, db: dbOut, anchor: anchorOut, lastSeq, lastHash: head?.hash ?? null, entries, sha256: Object.fromEntries(files.map((f) => [f, sha(join(outDir, f))])) });
  }
  writeFileSync(join(outDir, "manifest.json"), JSON.stringify(manifest, null, 2));
  return manifest;
}

export interface UnitCheck {
  name: string;
  ok: boolean;
  problems: string[];
  audit?: VerifyResult;
}

/** يتحقق من نسخة دون تعديلها: hashes الملفات، ثم سلسلة audit على نسخة مؤقتة من القاعدة مع التثبيت المقصوص. */
export function verifyBackup(outDir: string, keyFor: (unit: string) => Buffer | undefined): UnitCheck[] {
  const manifest = JSON.parse(readFileSync(join(outDir, "manifest.json"), "utf8")) as Manifest;
  return manifest.units.map((u) => {
    const problems: string[] = [];
    for (const [f, h] of Object.entries(u.sha256)) {
      if (!existsSync(join(outDir, f))) problems.push(`${f} missing`);
      else if (sha(join(outDir, f)) !== h) problems.push(`${f} checksum mismatch`);
    }
    if (problems.length) return { name: u.name, ok: false, problems };
    const tmp = mkdtempSync(join(tmpdir(), "ae-verify-"));
    try {
      copyFileSync(join(outDir, u.db), join(tmp, "db"));
      const key = keyFor(u.name);
      const anchor = u.anchor && key ? new HmacFileAnchor(join(outDir, u.anchor), key) : new NoAnchor();
      if (u.anchor && !key) problems.push("anchor present but no key supplied: chain checked without anchoring");
      const db = openDatabase(join(tmp, "db"));
      const audit = new AuditLog(db, systemClock, anchor).verify();
      db.close();
      if (!audit.valid) problems.push(`audit: ${audit.reason ?? "invalid"} at seq ${audit.firstBrokenSeq ?? "?"}`);
      if (audit.entries !== u.entries) problems.push(`entries ${audit.entries} != manifest ${u.entries}`);
      return { name: u.name, ok: audit.valid && audit.entries === u.entries, problems, audit };
    } finally {
      rmSync(tmp, { recursive: true, force: true });
    }
  });
}

/** وحدات النسخ لخادم متعدد المستأجرين: مستوى التحكم وكل مستأجر، بمفاتيح التثبيت المشتقة نفسها. */
export function dataRootUnits(dataRoot: string, master?: Buffer): BackupUnit[] {
  const units: BackupUnit[] = [];
  if (existsSync(join(dataRoot, "control.db")))
    units.push({ name: "control", db: join(dataRoot, "control.db"), anchor: join(dataRoot, "control-anchor.jsonl"), ...(master ? { anchorKey: deriveTenantKey(master, "_control") } : {}) });
  const tdir = join(dataRoot, "tenants");
  if (existsSync(tdir))
    for (const id of readdirSync(tdir).sort())
      if (existsSync(join(tdir, id, "enterprise.db")))
        units.push({ name: `tenant-${id}`, db: join(tdir, id, "enterprise.db"), anchor: join(tdir, id, "audit-anchor.jsonl"), ...(master ? { anchorKey: deriveTenantKey(master, id) } : {}) });
  return units;
}

export function keyForUnit(master: Buffer | undefined, single?: Buffer): (unit: string) => Buffer | undefined {
  return (unit) => {
    if (single) return single;
    if (!master) return undefined;
    if (unit === "control") return deriveTenantKey(master, "_control");
    if (unit.startsWith("tenant-")) return deriveTenantKey(master, unit.slice(7));
    return undefined;
  };
}
