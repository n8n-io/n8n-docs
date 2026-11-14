import type { AgentDefinition } from "./agent/agent-definition.ts";
import { AgentRegistry } from "./agent/registry.ts";
import { ApprovalGate, defaultPolicy } from "./approval/approval-gate.ts";
import { HmacFileAnchor, NoAnchor, parseAnchorKey, type AuditAnchor } from "./audit/anchor.ts";
import { AuditLog } from "./audit/audit-log.ts";
import type { Fixtures } from "./connectors/mock/fixtures.ts";
import { createMockConnectors, type MockConnectors, type WriteRecord } from "./connectors/mock/mock-connectors.ts";
import { loadCatalogFile } from "./connectors/n8n/catalog.ts";
import { DEFAULT_WORKFLOW_CATALOG } from "./connectors/n8n/default-catalog.ts";
import { N8nWorkflowConnector } from "./connectors/n8n/n8n-connector.ts";
import { parseSecret } from "./connectors/n8n/signing.ts";
import type { WorkflowConnector } from "./connectors/types.ts";
import { N8nInbound } from "./integrations/n8n-inbound.ts";
import { loadConfig, type PlatformConfig } from "./config.ts";
import { openDatabase, type Database } from "./core/db.ts";
import { DEFAULT_HUMANS, HumanDirectory } from "./core/directory.ts";
import { KillSwitch } from "./core/kill-switch.ts";
import type { Human } from "./core/types.ts";
import type { Task } from "./orchestrator/task.ts";
import { systemClock, type Clock } from "./core/util.ts";
import { EscalationService, InMemoryNotifier } from "./escalation/escalation.ts";
import { ApproverKeyRegistry, DevSigner, type DecisionProof, type HumanActionProof, type HumanActionPurpose } from "./identity/approver-keys.ts";
import { MemoryStore } from "./memory/memory-store.ts";
import { Orchestrator } from "./orchestrator/orchestrator.ts";
import { ClaudeAgentRuntime } from "./runtime/claude-runtime.ts";
import { ScriptedRuntime, type AgentRuntime } from "./runtime/runtime.ts";
import { ToolExecutor } from "./tools/executor.ts";

/**
 * حاوية المنصة: تبني كل المكونات وتربطها. نقطة الدخول الوحيدة لتشغيل النظام أو اختباره.
 */
export interface Platform {
  config: PlatformConfig;
  db: Database;
  clock: Clock;
  audit: AuditLog;
  gate: ApprovalGate;
  escalations: EscalationService;
  notifier: InMemoryNotifier;
  memory: MemoryStore;
  killSwitch: KillSwitch;
  directory: HumanDirectory;
  connectors: MockConnectors;
  executor: ToolExecutor;
  orchestrator: Orchestrator;
  runtime: AgentRuntime;
  keys: ApproverKeyRegistry;
  agents: AgentRegistry;
  /** مستقبل أحداث n8n. null إذا لم يُضبط N8N_INBOUND_SECRET. */
  inbound: N8nInbound | null;
  register(...agents: AgentDefinition[]): Platform;
  /** يبني إثبات قرار موقّعًا بمفاتيح التطوير (يتطلب devKeys). */
  signDecision(approvalId: string, humanId: string, decision: "approve" | "reject", comment?: string): DecisionProof;
  /** إثبات موقّع لقرار بشري غير الموافقة بمفاتيح التطوير (يتطلب devKeys). */
  signAction(humanId: string, purpose: HumanActionPurpose, subject: string, details: unknown): HumanActionProof | undefined;
  /** حل تصعيد، موقّع تلقائيًا بمفاتيح التطوير. */
  resolveEscalated(taskId: string, humanId: string, action: "requeue" | "complete" | "reject" | "cancel", note: string): Task;
  /** استئناف الموافقات المعتمدة بعد رفع الإيقاف، موقّع تلقائيًا بمفاتيح التطوير. */
  resume(humanId: string): Promise<Task[]>;
  /** رفع الإيقاف الطارئ، موقّع تلقائيًا بمفاتيح التطوير. */
  release(humanId: string, note: string): void;
  /** قرار بشري كامل عبر المنسق، موقّع تلقائيًا في وضع signed عند توفر مفاتيح التطوير. */
  decide(approvalId: string, humanId: string, decision: "approve" | "reject", comment?: string): Promise<Task>;
  close(): void;
}

export interface CreatePlatformOptions {
  config?: Partial<PlatformConfig>;
  clock?: Clock;
  fixtures?: Fixtures;
  humans?: Human[];
  runtime?: AgentRuntime;
  /** لا يُقرأ ملف علَم الإيقاف من القرص (للاختبارات المعزولة). */
  isolated?: boolean;
  /** فتح المنصة رغم تلف audit log للتشخيص فقط. يُفعّل الإيقاف الطارئ في الذاكرة، فلا يعمل أي وكيل. */
  forensic?: boolean;
  /** تثبيت audit صريح (للاختبارات). الافتراضي: ملف HMAC إن وُجد المفتاح، وإلا بلا تثبيت. */
  anchor?: AuditAnchor;
  /** connector سير عمل صريح (للاختبارات). الافتراضي من WORKFLOW_CONNECTOR. */
  workflows?: (deps: { gate: ApprovalGate; clock: Clock; writes: WriteRecord[] }) => WorkflowConnector;
  /** يولّد مفاتيح موافقين في الذاكرة ويسجلها (اختبارات وتطوير فقط). يتيح p.decide بتوقيع حقيقي. */
  devKeys?: boolean;
}

export function createPlatform(opts: CreatePlatformOptions = {}): Platform {
  const config = loadConfig(process.env, opts.config);
  const clock = opts.clock ?? systemClock;
  const db = openDatabase(config.DATABASE_PATH, config.DATABASE_URL ? { url: config.DATABASE_URL, schema: config.DATABASE_SCHEMA } : {});
  const anchor: AuditAnchor =
    opts.anchor ??
    (config.AUDIT_ANCHOR_KEY ? new HmacFileAnchor(config.AUDIT_ANCHOR_FILE, parseAnchorKey(config.AUDIT_ANCHOR_KEY)) : new NoAnchor());
  if (config.AUDIT_ANCHOR_REQUIRED && anchor.kind === "none") throw new Error("AUDIT_ANCHOR_REQUIRED=true but AUDIT_ANCHOR_KEY is not set");
  const audit = new AuditLog(db, clock, anchor);
  // الإقلاع يرفض سجلًا تالفًا (fail-closed). الوضع الجنائي يسمح بالفتح للتشخيص فقط، مع إيقاف طارئ إلزامي.
  if (!opts.forensic) audit.assertIntact();
  const directory = new HumanDirectory(opts.humans ?? DEFAULT_HUMANS);
  const keys = new ApproverKeyRegistry(db, audit, directory, clock);
  const gate = new ApprovalGate(db, audit, directory, defaultPolicy(config.APPROVAL_TTL_HOURS, config.DUAL_APPROVAL_THRESHOLD_USD), clock, { mode: config.APPROVER_AUTH, keys });
  const devSigner = opts.devKeys ? new DevSigner(keys, (opts.humans ?? DEFAULT_HUMANS).map((h) => h.id)) : null;
  const notifier = new InMemoryNotifier();
  const escalations = new EscalationService(db, audit, clock, notifier);
  const memory = new MemoryStore(db, audit, clock);
  const killSwitch = new KillSwitch({ envFlag: config.KILL_SWITCH, ...(opts.isolated ? {} : { flagFile: config.KILL_SWITCH_FILE }) });
  if (opts.forensic && !audit.verify().valid) killSwitch.engage("forensic mode: audit chain broken", false);
  const connectors = createMockConnectors(gate, clock, opts.fixtures, workflowFactory(opts.workflows, config, gate, clock));
  const runtime =
    opts.runtime ??
    (config.AGENT_RUNTIME === "live"
      ? new ClaudeAgentRuntime({ model: config.AGENT_MODEL, maxTurns: config.AGENT_MAX_TURNS, maxBudgetUsd: config.AGENT_MAX_BUDGET_USD })
      : new ScriptedRuntime());

  const agentRegistry = new AgentRegistry(db, audit, directory, clock, { mode: config.APPROVER_AUTH, keys });
  let executor: ToolExecutor;
  const orchestrator = new Orchestrator({
    db, audit, gate, escalations, memory, killSwitch, directory, clock, runtime,
    executor: () => executor, connectors, maxAttempts: 3, defaultTimeoutMs: config.AGENT_TIMEOUT_MS, humanAuth: { mode: config.APPROVER_AUTH, keys }, registry: agentRegistry, requireDeploy: config.AGENT_REQUIRE_DEPLOY, maxHandoffDepth: config.AGENT_MAX_HANDOFF_DEPTH, dailyBudgetUsd: config.AGENT_DAILY_BUDGET_USD,
  });
  executor = new ToolExecutor({
    audit, gate, escalations, memory, killSwitch, connectors, clock,
    getTask: (id) => orchestrator.get(id),
    getAgent: (id) => orchestrator.agent(id),
    registry: agentRegistry,
  });

  const inbound = config.N8N_INBOUND_SECRET
    ? new N8nInbound(db, audit, clock, orchestrator, parseSecret(config.N8N_INBOUND_SECRET, "N8N_INBOUND_SECRET"))
    : null;

  const platform: Platform = {
    inbound,
    config, db, clock, audit, gate, escalations, notifier, memory, killSwitch, directory, connectors, executor, orchestrator, runtime,
    keys,
    agents: agentRegistry,
    register(...agents) {
      for (const a of agents) orchestrator.register(a);
      return platform;
    },
    signDecision(approvalId, humanId, decision, comment = "") {
      if (!devSigner) throw new Error("signDecision requires createPlatform({ devKeys: true })");
      return devSigner.sign({ approvalId, humanId, decision, comment, payloadHash: gate.get(approvalId).payloadHash, issuedAt: clock.now().toISOString() });
    },
    signAction(humanId, purpose, subject, details) {
      if (config.APPROVER_AUTH !== "signed" || !devSigner) return undefined;
      return devSigner.signAction({ purpose, humanId, subject, details, issuedAt: clock.now().toISOString() });
    },
    resolveEscalated(taskId, humanId, action, note) {
      return orchestrator.resolveEscalated(taskId, humanId, action, note, platform.signAction(humanId, "task.resolve_escalation/v1", taskId, { action, note }));
    },
    resume(humanId) {
      const ids = gate.list({ status: "approved" }).map((a) => a.id).sort();
      return orchestrator.executePendingApproved(humanId, platform.signAction(humanId, "ops.resume_approved/v1", "pending-approved", { approvalIds: ids }));
    },
    release(humanId, note) {
      orchestrator.releaseEmergencyStop(humanId, note, platform.signAction(humanId, "ops.release_stop/v1", "emergency-stop", { note }));
    },
    decide(approvalId, humanId, decision, comment = "") {
      const proof = config.APPROVER_AUTH === "signed" && devSigner ? platform.signDecision(approvalId, humanId, decision, comment) : undefined;
      return orchestrator.decideApproval(approvalId, humanId, decision, comment, proof);
    },
    close() {
      db.close();
    },
  };
  return platform;
}

export { defineAgent, outcomeSchema, loadPrompt, type AgentDefinition, type AgentOutcome, type ToolGateway } from "./agent/agent-definition.ts";
export { defineTool, allow, type Guardrail, type ToolContext, type ToolCallResult } from "./tools/types.ts";

function workflowFactory(
  explicit: CreatePlatformOptions["workflows"], config: PlatformConfig, gate: ApprovalGate, clock: Clock,
): ((writes: WriteRecord[]) => WorkflowConnector) | undefined {
  if (explicit) return (writes) => explicit({ gate, clock, writes });
  if (config.WORKFLOW_CONNECTOR !== "n8n") return undefined;
  if (!config.N8N_BASE_URL || !config.N8N_OUTBOUND_SECRET) throw new Error("WORKFLOW_CONNECTOR=n8n requires N8N_BASE_URL and N8N_OUTBOUND_SECRET");
  const catalog = config.N8N_WORKFLOWS_FILE ? loadCatalogFile(config.N8N_WORKFLOWS_FILE) : DEFAULT_WORKFLOW_CATALOG;
  const headerAuth = config.N8N_HEADER_AUTH_NAME && config.N8N_HEADER_AUTH_VALUE ? { name: config.N8N_HEADER_AUTH_NAME, value: config.N8N_HEADER_AUTH_VALUE } : undefined;
  return () =>
    new N8nWorkflowConnector(gate, clock, {
      baseUrl: config.N8N_BASE_URL!, secret: parseSecret(config.N8N_OUTBOUND_SECRET!, "N8N_OUTBOUND_SECRET"), catalog, timeoutMs: config.N8N_TIMEOUT_MS,
      ...(headerAuth ? { headerAuth } : {}),
    });
}
