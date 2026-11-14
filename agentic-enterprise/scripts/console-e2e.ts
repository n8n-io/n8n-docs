import { execSync } from "node:child_process";
import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import type { AddressInfo } from "node:net";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { ManualClock } from "../platform/core/util.ts";
import { generateApproverKeyPair } from "../platform/identity/approver-keys.ts";
import { ControlPlane } from "../platform/tenancy/control-plane.ts";
import { createApi } from "../server/api.ts";
import { createLogger } from "../server/log.ts";
import { TenantPlatforms } from "../server/tenants.ts";

/**
 * اختبار متصفح حقيقي لوحدة التحكم: Chromium يوقّع قرار الموافقة بـ WebCrypto Ed25519، والخادم يتحقق منه.
 * ويتحقق أيضًا من أن نصًا خبيثًا في ملخص موافقة يُعرض كنص ولا يُنفَّذ.
 *   npm run e2e:console   (يتطلب playwright مثبتًا عالميًا أو محليًا، وChromium)
 */
const req = createRequire(join(execSync("npm root -g").toString().trim(), "noop.js"));
// أنواع دنيا لما نستخدمه من playwright، كي لا يصبح اعتمادية للمشروع.
interface Page {
  on(ev: "pageerror", cb: (e: Error) => void): void;
  goto(url: string): Promise<unknown>;
  fill(sel: string, v: string): Promise<void>;
  click(sel: string): Promise<void>;
  waitForSelector(sel: string, o?: { timeout: number }): Promise<unknown>;
  setInputFiles(sel: string, file: string): Promise<void>;
  textContent(sel: string): Promise<string | null>;
  evaluate<T>(fn: () => T): Promise<T>;
}
interface Browser {
  newPage(): Promise<Page>;
  close(): Promise<void>;
}
const { chromium } = req("playwright") as { chromium: { launch(): Promise<Browser> } };

const root = mkdtempSync(join(tmpdir(), "ae-console-"));
const clock = new ManualClock(new Date().toISOString());
const control = new ControlPlane(root, clock);
const tenants = new TenantPlatforms(control, { clock, config: { KILL_SWITCH: false } });
const server = createApi({ control, tenants, log: createLogger({ sink: () => {} }) });
await new Promise<void>((r) => server.listen(0, "127.0.0.1", r));
const base = `http://127.0.0.1:${(server.address() as AddressInfo).port}`;
const fail = (m: string): never => {
  throw new Error(m);
};
let browser: Browser | null = null;
try {
  control.createTenant("acme", "Acme", "u-ops");
  const { token } = control.issueToken("acme", { scopes: ["tasks:write", "tasks:read", "approvals:read", "approvals:decide", "ops:read"], originator: "u-requester", label: "e2e" }, "u-ops");
  const p = tenants.get("acme");
  // ملخص بمحتوى خبيث يحاكي نصًا قادمًا من مستند خارجي
  const XSS = '<img src=x onerror="window.__xss=1">';
  p.connectors.state.suppliers.find((x) => x.id === "sup-001")!.name = `Gulf Office ${XSS}`;
  p.orchestrator.submit({ type: "procurement.requisition", input: { requisitionId: "REQ-2001" }, originator: "u-requester" });
  await p.orchestrator.drain();
  const pending = p.gate.list({ status: "pending" });
  if (pending.length !== 1) fail(`expected 1 pending approval, got ${pending.length}`);
  const keys = generateApproverKeyPair();
  p.keys.register("u-proc-mgr", keys.publicKeyPem, "system:bootstrap");
  const keyFile = join(root, "u-proc-mgr.pem");
  writeFileSync(keyFile, keys.privateKeyPem);

  browser = await chromium.launch();
  const page = await browser.newPage();
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto(`${base}/console`);
  await page.fill("#token", token);
  await page.click("#connect");
  await page.waitForSelector("text=Pending approvals");
  await page.waitForSelector("text=Approve (sign)");
  if (!(await page.textContent("main"))?.includes(XSS)) fail("untrusted text not shown literally in the approval card");
  await page.setInputFiles('input[type="file"]', keyFile);
  await page.waitForSelector("text=Key loaded locally");
  await page.fill('input[placeholder^="your human id"]', "u-proc-mgr");
  await page.fill('input[placeholder^="comment"]', "approved from console");
  await page.click("text=Approve (sign)");
  await page.waitForSelector("text=Decision recorded", { timeout: 5000 }).catch(async () => fail(`console status: ${await page.textContent("#status")}`));
  const status = p.gate.get(pending[0]!.id).status;
  const decision = p.gate.get(pending[0]!.id).decisions[0];
  const xss = await page.evaluate(() => (globalThis as { __xss?: number }).__xss ?? 0);
  if (status !== "executed") fail(`approval status ${status}`);
  if (!decision || decision.auth !== "signed" || decision.comment !== "approved from console") throw new Error(`decision ${JSON.stringify(decision)}`);
  if (xss) fail("XSS payload executed in console");
  if (errors.length) fail(`page errors: ${errors.join("; ")}`);
  console.log(`PASS console e2e: browser-signed approval verified by server (status=${status}, key=${decision.keyFingerprint}); no script execution from untrusted text`);
} finally {
  await browser?.close();
  server.close();
  tenants.closeAll();
  control.close();
  rmSync(root, { recursive: true, force: true });
}
