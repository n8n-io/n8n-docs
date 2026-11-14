import { randomBytes } from "node:crypto";
import type { AuditLog } from "../audit/audit-log.ts";
import type { Database } from "../core/db.ts";
import { parseJson, transaction } from "../core/db.ts";
import type { HumanDirectory } from "../core/directory.ts";
import type { ApproverKeyRegistry, DecisionProof } from "../identity/approver-keys.ts";
import { PlatformError } from "../core/errors.ts";
import { toUsd } from "../core/fx.ts";
import type { HumanRole, IrreversibleAction, JsonObject, Money } from "../core/types.ts";
import { hashObject, newId, type Clock } from "../core/util.ts";

/**
 * بوابة الموافقة البشرية. كل إجراء لا رجعة فيه يمر بها، ويُفرض ذلك في الكود على مستويين:
 * 1. ToolExecutor لا يشغّل أداة صلاحيتها "approval" إلا بالحمولة (payload) نفسها التي وافق عليها الإنسان.
 * 2. الـ connectors التي تنفّذ إجراءات لا رجعة فيها تطلب ApprovalGrant صالحًا وتستهلكه، فيُستخدم مرة واحدة.
 *
 * القواعد:
 * - فصل الصلاحيات (SoD): لا يوافق من أنشأ المهمة، ولا يوافق الشخص نفسه مرتين.
 * - الموافق يجب أن يحمل أحد الأدوار المسموح بها لنوع الإجراء.
 * - المبلغ فوق الحد (الافتراضي 50,000 دولار) يحتاج موافقين مختلفين اثنين.
 * - تغيير البيانات الرئيسية الحساسة، مثل الحساب البنكي للمورد، يحتاج موافقين اثنين دائمًا.
 * - الطلب تنتهي صلاحيته بعد TTL (الافتراضي 24 ساعة)، ولا يُنفَّذ بعدها.
 */

export type ApprovalStatus = "pending" | "approved" | "rejected" | "expired" | "revoked" | "executed" | "execution_failed";

export interface ApprovalDecision {
  humanId: string;
  decision: "approve" | "reject";
  comment: string;
  at: string;
  /** كيف ثبتت هوية صاحب القرار: signed بتوقيع Ed25519، أو trusted دون توثيق (تطوير واختبار فقط). */
  auth?: "signed" | "trusted";
  keyFingerprint?: string;
  signature?: string;
  issuedAt?: string;
}

export interface ApproverAuth {
  mode: "signed" | "trusted";
  keys: ApproverKeyRegistry;
}

export interface ApprovalRequest {
  id: string;
  taskId: string;
  actionType: IrreversibleAction;
  toolName: string;
  requestedBy: string;
  originator: string;
  payload: JsonObject;
  payloadHash: string;
  summary: string;
  money: Money | null;
  amountUsd: number | null;
  requiredApprovals: number;
  allowedRoles: HumanRole[];
  status: ApprovalStatus;
  decisions: ApprovalDecision[];
  createdAt: string;
  expiresAt: string;
  result: JsonObject | null;
}

/** تفويض تنفيذ يُصدر بعد الموافقة ويُستهلك مرة واحدة داخل الـ connector. */
export interface ApprovalGrant {
  readonly approvalId: string;
  readonly actionType: IrreversibleAction;
  readonly payloadHash: string;
  readonly nonce: string;
}

export interface ApprovalPolicy {
  ttlHours: number;
  dualApprovalThresholdUsd: number;
  rolesFor(action: IrreversibleAction): HumanRole[];
  /** إجراءات تحتاج موافقين اثنين بغض النظر عن المبلغ */
  alwaysDual: IrreversibleAction[];
}

export const DEFAULT_ROLES: Record<IrreversibleAction, HumanRole[]> = {
  payment: ["finance_controller", "cfo"],
  commit_spend: ["procurement_manager", "procurement_lead", "cfo"],
  external_send: ["cs_supervisor", "procurement_lead", "finance_controller", "compliance_officer"],
  contract: ["legal_counsel", "cfo"],
  delete: ["platform_operator", "compliance_officer"],
  master_data_change: ["ap_supervisor", "procurement_manager", "finance_controller"],
};

export function defaultPolicy(ttlHours = 24, dualApprovalThresholdUsd = 50_000): ApprovalPolicy {
  return {
    ttlHours,
    dualApprovalThresholdUsd,
    rolesFor: (a) => DEFAULT_ROLES[a],
    alwaysDual: ["master_data_change"],
  };
}

export interface CreateApprovalInput {
  taskId: string;
  actionType: IrreversibleAction;
  toolName: string;
  requestedBy: string;
  originator: string;
  payload: JsonObject;
  summary: string;
  money?: Money | undefined;
  /** تخصيص الأدوار لهذه الأداة. يجب أن يكون مجموعة جزئية من أدوار السياسة، فلا يمكن توسيعها. */
  roles?: HumanRole[] | undefined;
}

export class ApprovalGate {
  constructor(
    private readonly db: Database,
    private readonly audit: AuditLog,
    private readonly directory: HumanDirectory,
    private readonly policy: ApprovalPolicy,
    private readonly clock: Clock,
    private readonly auth: ApproverAuth,
  ) {
    db.exec(`
      CREATE TABLE IF NOT EXISTS approvals (
        id TEXT PRIMARY KEY,
        task_id TEXT NOT NULL,
        action_type TEXT NOT NULL,
        tool_name TEXT NOT NULL,
        requested_by TEXT NOT NULL,
        originator TEXT NOT NULL,
        payload TEXT NOT NULL,
        payload_hash TEXT NOT NULL,
        summary TEXT NOT NULL,
        money TEXT,
        amount_usd REAL,
        required_approvals INTEGER NOT NULL,
        allowed_roles TEXT NOT NULL,
        status TEXT NOT NULL,
        decisions TEXT NOT NULL,
        created_at TEXT NOT NULL,
        expires_at TEXT NOT NULL,
        grant_nonce TEXT,
        result TEXT
      );
      CREATE INDEX IF NOT EXISTS idx_approvals_status ON approvals(status);
      CREATE INDEX IF NOT EXISTS idx_approvals_task ON approvals(task_id);
    `);
  }

  /**
   * ينشئ طلب موافقة، أو يعيد الطلب القائم لنفس المهمة والأداة والحمولة (pending أو approved).
   * هذا يجعل إعادة تشغيل المهمة بعد انهيار أو مهلة آمنة: لا يرى الموافق طلبين للإجراء نفسه (R9).
   */
  request(input: CreateApprovalInput): ApprovalRequest {
    return transaction(this.db, () => {
      const payloadHash = hashObject(input.payload);
      const existing = this.list({ taskId: input.taskId }).find(
        (a) => a.toolName === input.toolName && a.payloadHash === payloadHash && (a.status === "pending" || a.status === "approved"),
      );
      if (existing) {
        this.audit.append({ actor: { type: "agent", id: input.requestedBy }, action: "approval.request_deduplicated", target: existing.id, taskId: input.taskId, outcome: "info", data: { status: existing.status } });
        return existing;
      }
      return this.createRequest(input);
    });
  }

  private createRequest(input: CreateApprovalInput): ApprovalRequest {
    const policyRoles = this.policy.rolesFor(input.actionType);
    const roles = input.roles ? input.roles.filter((r) => policyRoles.includes(r)) : policyRoles;
    if (roles.length === 0) throw new PlatformError("UNAUTHORIZED_APPROVER", "No permitted approver roles for this action");

    const amountUsd = input.money ? toUsd(input.money.amount, input.money.currency) : null;
    const dual =
      this.policy.alwaysDual.includes(input.actionType) ||
      (amountUsd !== null && amountUsd > this.policy.dualApprovalThresholdUsd);
    const now = this.clock.now();
    const req: ApprovalRequest = {
      id: newId("apr"),
      taskId: input.taskId,
      actionType: input.actionType,
      toolName: input.toolName,
      requestedBy: input.requestedBy,
      originator: input.originator,
      payload: input.payload,
      payloadHash: hashObject(input.payload),
      summary: input.summary,
      money: input.money ?? null,
      amountUsd,
      requiredApprovals: dual ? 2 : 1,
      allowedRoles: roles,
      status: "pending",
      decisions: [],
      createdAt: now.toISOString(),
      expiresAt: new Date(now.getTime() + this.policy.ttlHours * 3_600_000).toISOString(),
      result: null,
    };
    this.db
      .prepare(
        `INSERT INTO approvals (id, task_id, action_type, tool_name, requested_by, originator, payload, payload_hash, summary,
          money, amount_usd, required_approvals, allowed_roles, status, decisions, created_at, expires_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      )
      .run(
        req.id, req.taskId, req.actionType, req.toolName, req.requestedBy, req.originator,
        JSON.stringify(req.payload), req.payloadHash, req.summary,
        req.money ? JSON.stringify(req.money) : null, req.amountUsd === null ? null : Number.isFinite(req.amountUsd) ? req.amountUsd : -1,
        req.requiredApprovals, JSON.stringify(req.allowedRoles), req.status, "[]", req.createdAt, req.expiresAt,
      );
    this.audit.append({
      actor: { type: "agent", id: input.requestedBy },
      action: "approval.requested",
      target: req.id,
      taskId: req.taskId,
      outcome: "pending",
      data: {
        actionType: req.actionType,
        tool: req.toolName,
        payloadHash: req.payloadHash,
        requiredApprovals: req.requiredApprovals,
        amountUsd: req.amountUsd === null ? null : Number.isFinite(req.amountUsd) ? req.amountUsd : "unknown_currency",
        summary: req.summary,
      },
    });
    return req;
  }

  get(id: string): ApprovalRequest {
    const row = this.db.prepare("SELECT * FROM approvals WHERE id = ?").get(id);
    if (!row) throw new PlatformError("NOT_FOUND", `Approval ${id} not found`);
    return rowToApproval(row as Record<string, unknown>);
  }

  list(filter: { status?: ApprovalStatus; taskId?: string } = {}): ApprovalRequest[] {
    const clauses: string[] = [];
    const params: string[] = [];
    if (filter.status) (clauses.push("status = ?"), params.push(filter.status));
    if (filter.taskId) (clauses.push("task_id = ?"), params.push(filter.taskId));
    const where = clauses.length ? `WHERE ${clauses.join(" AND ")}` : "";
    return this.db
      .prepare(`SELECT * FROM approvals ${where} ORDER BY created_at`)
      .all(...params)
      .map((r) => rowToApproval(r as Record<string, unknown>));
  }

  /** قرار بشري. يفرض الدور، وفصل الصلاحيات، وعدم التكرار، وانتهاء الصلاحية. */
  decide(id: string, humanId: string, decision: "approve" | "reject", comment = "", proof?: DecisionProof): ApprovalRequest {
    const before = this.get(id);
    if (before.status === "pending" && this.isExpired(before)) {
      this.setStatus(id, "expired");
      this.audit.append({ actor: { type: "system", id: "approval-gate" }, action: "approval.expired", target: id, taskId: before.taskId, outcome: "info" });
    }
    // التحقق والكتابة داخل معاملة واحدة. تسجيل الرفض يتم بعد التراجع عن المعاملة،
    // وإلا لمحا ROLLBACK سجل الرفض نفسه من audit log.
    try {
      return transaction(this.db, () => {
        const req = this.get(id);
        const human = this.directory.get(humanId);
        if (req.status !== "pending") throw new PlatformError("APPROVAL_INVALID", `Approval is ${req.status}, not pending`);
        if (!human.roles.some((r) => req.allowedRoles.includes(r)))
          throw new PlatformError("UNAUTHORIZED_APPROVER", `Role(s) [${human.roles.join(",")}] cannot decide ${req.actionType}`);
        if (humanId === req.originator) throw new PlatformError("SOD_VIOLATION", "The task originator cannot approve their own request");
        if (req.decisions.some((d) => d.humanId === humanId)) throw new PlatformError("SOD_VIOLATION", "The same person cannot decide twice");
        if (decision === "reject" && !comment.trim()) throw new PlatformError("INVALID_INPUT", "A rejection requires a reason");

        // إثبات الهوية والربط بالإجراء الدقيق: التوقيع يغطي hash الحمولة، فأي تغيير فيها يُبطل القرار.
        let provenance: Pick<ApprovalDecision, "auth" | "keyFingerprint" | "signature" | "issuedAt"> = { auth: "trusted" };
        if (this.auth.mode === "signed") {
          const keyFingerprint = this.auth.keys.verifyDecision(proof, { approvalId: id, humanId, decision, payloadHash: req.payloadHash, comment, issuedAt: proof?.issuedAt ?? "" });
          provenance = { auth: "signed", keyFingerprint, signature: proof!.signature, issuedAt: proof!.issuedAt };
        }

        const decisions: ApprovalDecision[] = [...req.decisions, { humanId, decision, comment, at: this.clock.now().toISOString(), ...provenance }];
        const approvals = decisions.filter((d) => d.decision === "approve").length;
        const status: ApprovalStatus =
          decision === "reject" ? "rejected" : approvals >= req.requiredApprovals ? "approved" : "pending";
        this.db.prepare("UPDATE approvals SET decisions = ?, status = ? WHERE id = ?").run(JSON.stringify(decisions), status, id);
        this.audit.append({
          actor: { type: "human", id: humanId },
          action: `approval.${decision}`,
          target: id,
          taskId: req.taskId,
          outcome: "success",
          data: { status, approvals, required: req.requiredApprovals, comment, auth: provenance.auth!, ...(provenance.keyFingerprint ? { keyFingerprint: provenance.keyFingerprint } : {}) },
        });
        return { ...req, decisions, status };
      });
    } catch (err) {
      if (err instanceof PlatformError) {
        this.audit.append({
          actor: { type: "human", id: humanId },
          action: `approval.${decision}`,
          target: id,
          taskId: before.taskId,
          outcome: "denied",
          data: { code: err.code, reason: err.message },
        });
      }
      throw err;
    }
  }

  /**
   * سحب موافقة قبل تنفيذها (pending أو approved). يملكه من يحمل دورًا مسموحًا لهذا الإجراء.
   * بعد السحب لا يمكن إصدار تفويض، فلا يُنفَّذ الإجراء أبدًا.
   */
  revoke(id: string, humanId: string, reason: string): ApprovalRequest {
    if (!reason.trim()) throw new PlatformError("INVALID_INPUT", "Revocation requires a reason");
    return transaction(this.db, () => {
      const req = this.get(id);
      const human = this.directory.get(humanId);
      if (!human.roles.some((r) => req.allowedRoles.includes(r)) && !human.roles.includes("platform_operator"))
        throw new PlatformError("UNAUTHORIZED_APPROVER", `Role(s) [${human.roles.join(",")}] cannot revoke ${req.actionType}`);
      if (req.status !== "pending" && req.status !== "approved") throw new PlatformError("APPROVAL_INVALID", `Approval is ${req.status}; only pending or approved can be revoked`);
      this.db.prepare("UPDATE approvals SET status = 'revoked' WHERE id = ? AND status IN ('pending','approved') AND grant_nonce IS NULL").run(id);
      if (this.get(id).status !== "revoked") throw new PlatformError("APPROVAL_INVALID", "Execution already started; cannot revoke");
      this.audit.append({ actor: { type: "human", id: humanId }, action: "approval.revoke", target: id, taskId: req.taskId, outcome: "success", data: { reason, previous: req.status } });
      return { ...req, status: "revoked" as const };
    });
  }

  /** يصدر تفويض تنفيذ لطلب موافق عليه. يستدعيه ToolExecutor فقط. */
  issueGrant(id: string): ApprovalGrant {
    const req = this.get(id);
    if (req.status !== "approved") throw new PlatformError("APPROVAL_INVALID", `Cannot issue grant: approval is ${req.status}`);
    if (this.isExpired(req)) {
      this.setStatus(id, "expired");
      throw new PlatformError("APPROVAL_INVALID", "Approval expired before execution");
    }
    const nonce = randomBytes(16).toString("hex");
    this.db.prepare("UPDATE approvals SET grant_nonce = ? WHERE id = ? AND grant_nonce IS NULL").run(nonce, id);
    const stored = this.db.prepare("SELECT grant_nonce FROM approvals WHERE id = ?").get(id) as { grant_nonce: string };
    if (stored.grant_nonce !== nonce) throw new PlatformError("APPROVAL_INVALID", "Grant already issued for this approval");
    return Object.freeze({ approvalId: id, actionType: req.actionType, payloadHash: req.payloadHash, nonce });
  }

  /**
   * يستهلك التفويض داخل الـ connector قبل تنفيذ الأثر مباشرة.
   * يتحقق من: صحة الـ nonce، ونوع الإجراء، وأن المبلغ المنفَّذ لا يتجاوز المبلغ الموافق عليه، وأنه لم يُستخدم من قبل.
   */
  redeem(grant: ApprovalGrant | undefined, actionType: IrreversibleAction, money?: Money): ApprovalRequest {
    if (!grant) throw new PlatformError("APPROVAL_REQUIRED", `${actionType} requires an approval grant`);
    try {
      return transaction(this.db, () => {
        const row = this.db.prepare("SELECT * FROM approvals WHERE id = ?").get(grant.approvalId) as Record<string, unknown> | undefined;
        if (!row) throw new PlatformError("APPROVAL_INVALID", "Unknown approval");
        const req = rowToApproval(row);
        const fail = (reason: string): never => {
          throw new PlatformError("APPROVAL_INVALID", reason);
        };
        if (row.grant_nonce !== grant.nonce) fail("Grant nonce mismatch");
        if (req.status !== "approved") fail(`Approval is ${req.status}`);
        if (req.actionType !== actionType || grant.actionType !== actionType) fail("Action type mismatch");
        if (req.payloadHash !== grant.payloadHash) fail("Payload hash mismatch");
        if (money) {
          if (!req.money) fail("Approved request carries no amount");
          if (req.money!.currency !== money.currency || money.amount > req.money!.amount + 1e-9)
            fail(`Executed amount ${money.amount} ${money.currency} exceeds approved ${req.money!.amount} ${req.money!.currency}`);
        }
        this.setStatus(req.id, "executed");
        this.audit.append({ actor: { type: "system", id: "approval-gate" }, action: "approval.redeem", target: req.id, taskId: req.taskId, outcome: "success", data: { actionType } });
        return { ...req, status: "executed" as const };
      });
    } catch (err) {
      if (err instanceof PlatformError)
        this.audit.append({ actor: { type: "system", id: "approval-gate" }, action: "approval.redeem", target: grant.approvalId, outcome: "denied", data: { reason: err.message } });
      throw err;
    }
  }

  recordResult(id: string, result: JsonObject, failed = false): void {
    this.db.prepare("UPDATE approvals SET result = ?, status = CASE WHEN ? = 1 THEN 'execution_failed' ELSE status END WHERE id = ?").run(JSON.stringify(result), failed ? 1 : 0, id);
  }

  /** يُستدعى دوريًا: يحوّل الطلبات المنتهية إلى expired ويعيدها لتُصعَّد. */
  expireStale(): ApprovalRequest[] {
    const expired = this.list({ status: "pending" }).filter((r) => this.isExpired(r));
    for (const r of expired) {
      this.setStatus(r.id, "expired");
      this.audit.append({ actor: { type: "system", id: "approval-gate" }, action: "approval.expired", target: r.id, taskId: r.taskId, outcome: "info" });
    }
    return expired.map((r) => ({ ...r, status: "expired" as const }));
  }

  private isExpired(req: ApprovalRequest): boolean {
    return this.clock.now().getTime() > new Date(req.expiresAt).getTime();
  }

  private setStatus(id: string, status: ApprovalStatus): void {
    this.db.prepare("UPDATE approvals SET status = ? WHERE id = ?").run(status, id);
  }
}

function rowToApproval(r: Record<string, unknown>): ApprovalRequest {
  const amountUsd = r.amount_usd === null ? null : Number(r.amount_usd) < 0 ? Number.POSITIVE_INFINITY : Number(r.amount_usd);
  return {
    id: String(r.id),
    taskId: String(r.task_id),
    actionType: r.action_type as IrreversibleAction,
    toolName: String(r.tool_name),
    requestedBy: String(r.requested_by),
    originator: String(r.originator),
    payload: parseJson<JsonObject>(r.payload),
    payloadHash: String(r.payload_hash),
    summary: String(r.summary),
    money: r.money ? parseJson<Money>(r.money) : null,
    amountUsd,
    requiredApprovals: Number(r.required_approvals),
    allowedRoles: parseJson<HumanRole[]>(r.allowed_roles),
    status: r.status as ApprovalStatus,
    decisions: parseJson<ApprovalDecision[]>(r.decisions),
    createdAt: String(r.created_at),
    expiresAt: String(r.expires_at),
    result: r.result ? parseJson<JsonObject>(r.result) : null,
  };
}
