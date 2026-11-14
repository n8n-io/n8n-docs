import { existsSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";
import { PlatformError } from "./errors.ts";

/**
 * مفتاح الإيقاف الطارئ. يُفعَّل بإحدى ثلاث طرق:
 * 1. متغير البيئة KILL_SWITCH=true عند الإقلاع.
 * 2. وجود ملف العلَم (KILL_SWITCH_FILE). يُفحص عند كل استدعاء أداة، فيسري فورًا دون إعادة تشغيل.
 * 3. استدعاء engage() برمجيًا، مثلًا من لوحة المشغّل.
 *
 * يفحصه ToolExecutor قبل أي أداة، ويفحصه Orchestrator قبل أي مهمة.
 */
export class KillSwitch {
  private engagedInMemory: boolean;

  constructor(
    private readonly options: { envFlag: boolean; flagFile?: string },
  ) {
    this.engagedInMemory = options.envFlag;
  }

  isEngaged(): boolean {
    return this.engagedInMemory || (this.options.flagFile !== undefined && existsSync(this.options.flagFile));
  }

  engage(reason: string, persist = true): void {
    this.engagedInMemory = true;
    if (persist && this.options.flagFile) {
      mkdirSync(dirname(this.options.flagFile), { recursive: true });
      writeFileSync(this.options.flagFile, `${new Date().toISOString()} ${reason}\n`);
    }
  }

  /** الرفع يدوي فقط ومن مشغّل بشري. لا يملك أي وكيل أداة تستدعي هذه الدالة. */
  release(): void {
    this.engagedInMemory = false;
    if (this.options.flagFile && existsSync(this.options.flagFile)) rmSync(this.options.flagFile);
  }

  assertNotEngaged(): void {
    if (this.isEngaged()) throw new PlatformError("KILL_SWITCH_ACTIVE", "Emergency stop is engaged; all agent actions are halted");
  }
}
