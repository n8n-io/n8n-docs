import type { AuditLog } from "../audit/audit-log.ts";
import type { Connectors } from "../connectors/types.ts";
import { transaction, type Database } from "../core/db.ts";
import type { HumanDirectory } from "../core/directory.ts";
import { PlatformError } from "../core/errors.ts";
import type { JsonValue } from "../core/types.ts";
import type { Clock } from "../core/util.ts";
import type { MemoryStore } from "../memory/memory-store.ts";
import { verifyHumanAction, type ApproverKeyRegistry, type HumanActionProof } from "../identity/approver-keys.ts";
import type { Orchestrator } from "../orchestrator/orchestrator.ts";
import { classRank } from "../policy/data-routing.ts";
import type { SubjectVault } from "./vault.ts";

/**
 * حق المحو (PDPL المادة 18، GDPR المادة 17) مع سجل audit لا يُعدَّل.
 *
 * - **الختم:** مخرجات أدوات الوكلاء ذوي البيانات الشخصية (dataClass ≥ personal)، وملخصات تصعيداتهم، تُختم في audit
 *   بمفتاح صاحب البيانات (SubjectVault).
 * - **المحو:**
 *   - قرار بشري موقّع من مسؤول الامتثال (privacy.erase_subject/v1)، لأنه لا رجعة فيه.
 *   - يحذف المفتاح، ويمحو الذاكرة المرتبطة، ويحجب مخرجات المهام وملخصات التصعيدات في الجداول القابلة للتعديل.
 *   - يُسجَّل في audit بالمعرّف المستعار فقط.
 * - **التعليق القانوني (legal hold):** تطابق عقوبات مؤكد يخضع لاشتراطات الاحتفاظ بسجلات مكافحة غسل الأموال، فيُرفض محوه.
 *   القرار هنا تقني محافظ؛ تحديد مدد الاحتفاظ النظامية مسؤولية الامتثال القانوني.
 */
export class PrivacyService {
  constructor(
    private readonly deps: {
      db: Database;
      audit: AuditLog;
      vault: SubjectVault;
      memory: MemoryStore;
      orchestrator: Orchestrator;
      connectors: Connectors;
      directory: HumanDirectory;
      clock: Clock;
      humanAuth: { mode: "signed" | "trusted"; keys: ApproverKeyRegistry };
    },
  ) {}

  /** صاحب البيانات لمهمة، أو null إن لم يكن وكيلها يعالج بيانات شخصية. */
  subjectFor(taskId: string): string | null {
    let task;
    try {
      task = this.deps.orchestrator.get(taskId);
    } catch {
      return null;
    }
    let agent;
    try {
      agent = this.deps.orchestrator.agent(task.assignee);
    } catch {
      return null;
    }
    if (classRank(agent.dataClass ?? "confidential") < classRank("personal")) return null;
    return agent.dataSubject?.(task) ?? `task:${task.id}`;
  }

  /** دالة الختم لمهمة، أو null إن لم تكن بياناتها شخصية. */
  sealFor(taskId: string): ((value: JsonValue) => JsonValue) | null {
    const subject = this.subjectFor(taskId);
    return subject ? (value) => this.deps.vault.seal(subject, value) as unknown as JsonValue : null;
  }

  legalHold(subject: string): string | null {
    const screening = this.deps.connectors.sanctions.latestScreening(subject);
    if (screening?.status === "confirmed_match") return "confirmed sanctions match: AML record-retention obligations apply";
    return null;
  }

  erase(subject: string, humanId: string, note: string, proof?: HumanActionProof): { memoryDeleted: number; tasksRedacted: number; escalationsRedacted: number } {
    const human = this.deps.directory.get(humanId);
    const deny = (code: "UNAUTHORIZED_APPROVER" | "INVALID_INPUT" | "INVALID_TRANSITION", reason: string): never => {
      this.deps.audit.append({ actor: { type: "human", id: humanId }, action: "privacy.erase_subject", target: subject, outcome: "denied", data: { code, reason } });
      throw new PlatformError(code, reason);
    };
    if (!human.roles.includes("compliance_officer")) deny("UNAUTHORIZED_APPROVER", "Only a compliance officer can erase a data subject");
    if (!note.trim()) deny("INVALID_INPUT", "A legal basis or request reference is required");
    const hold = this.legalHold(subject);
    if (hold) deny("INVALID_TRANSITION", `Legal hold: ${hold}`);
    let auth: { auth: string; keyFingerprint?: string } = { auth: "trusted" };
    if (this.deps.humanAuth.mode === "signed") {
      try {
        auth = { auth: "signed", keyFingerprint: verifyHumanAction(this.deps.humanAuth.keys, this.deps.clock, proof, { purpose: "privacy.erase_subject/v1", humanId, subject, details: { note } }) };
      } catch (err) {
        this.deps.audit.append({ actor: { type: "human", id: humanId }, action: "privacy.erase_subject", target: subject, outcome: "denied", data: { code: "AUTHENTICATION_FAILED", reason: (err as Error).message } });
        throw err;
      }
    }

    return transaction(this.deps.db, () => {
      this.deps.vault.shred(subject);
      const memoryDeleted = this.deps.memory.eraseSubject(subject, humanId);
      const taskIds = this.deps.orchestrator.list().filter((t) => this.subjectFor(t.id) === subject).map((t) => t.id);
      for (const id of taskIds) this.deps.db.prepare("UPDATE tasks SET output = ? WHERE id = ? AND output IS NOT NULL").run(JSON.stringify({ $erased: true, subject }), id);
      let escalationsRedacted = 0;
      for (const id of taskIds)
        escalationsRedacted += Number(this.deps.db.prepare("UPDATE escalations SET summary = ?, context = '{}' WHERE task_id = ?").run(`[erased: ${subject}]`, id).changes);
      this.deps.audit.append({
        actor: { type: "human", id: humanId }, action: "privacy.erase_subject", target: subject, outcome: "success",
        data: { note, memoryDeleted, tasksRedacted: taskIds.length, escalationsRedacted, ...auth },
      });
      return { memoryDeleted, tasksRedacted: taskIds.length, escalationsRedacted };
    });
  }
}
