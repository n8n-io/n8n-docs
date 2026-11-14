# ضوابط الأمن المنفّذة (Security Controls)

كل ضابط هنا **منفّذ ومختبر**. ما ليس منفّذًا مذكور في §5 كمخطط. الربط بالأطر (NIST SP 800-53 وOWASP ASVS وOWASP LLM Top 10) مرجعي هندسي، لا ادعاء امتثال أو شهادة.

## 1. التحكم في الوصول والتنفيذ

| الضابط | التنفيذ | الاختبار | مرجع |
|--------|---------|----------|------|
| allowlist أدوات لكل وكيل | `ToolExecutor.call`: الأداة غير المدرجة تُرفض بالرمز `TOOL_NOT_ALLOWED` | طفرة `tool allowlist` | AC-3، وLLM06 |
| schema صارم للمدخلات (strict: لا حقول إضافية) | `tool.input.strict()` | طفرة `strict input schema` | ASVS V5 |
| حواجز حتمية لكل مجال | `agents/*/guardrails` | 9 evals لنموذج مخترق، وطفرات | AC-3، وLLM06 |
| أدوات بمعرّفات فقط، والقيم من النظام المرجعي | `create_purchase_order` و`schedule_payment` | evals الحقن | LLM01 |
| outcomeGuard | `Orchestrator.settle` | طفرات المجالات | SI-10 |
| حد استدعاءات ومهلة تشغيل | `maxToolCalls` و`timeoutMs` | hardening وطفرة | LLM10 |
| إيقاف طارئ | ملف علَم، وبيئة، وCLI. يُفحص قبل كل أداة وكل مهمة | e2e وطفرة | IR-4 |
| إيقاف وكيل بعينه (PAUSED) يسري على التشغيل الجاري | `AgentRegistry`، والمنفّذ، و`claim` | `agent-registry.test.ts`، و6 طفرات | IR-4، وAC-3 |
| مستويات استقلالية 0 إلى 4 مفروضة وقت التشغيل، وخفضها فوري | `permittedByAutonomy` | الاختبار نفسه | LLM06 |
| بصمة تعريف كل وكيل في audit عند أي تغيير | `definitionFingerprint` | الاختبار نفسه | CM-3 |

## 2. الموافقة البشرية والهوية

| الضابط | التنفيذ | الاختبار | مرجع |
|--------|---------|----------|------|
| موافقة إلزامية لكل إجراء لا رجعة فيه، في طبقتين (المنفّذ والـ connector) | ADR-006 | طفرات | AC-3(2) |
| فصل الصلاحيات: المنشئ لا يوافق، ولا قرار مكرر، والدور مسموح | `ApprovalGate.decide` | طفرات | AC-5 |
| موافقة مزدوجة فوق 50 ألف دولار، ودائمًا لتغيير البيانات الرئيسية | `defaultPolicy` | طفرة وevals | AC-3(2) |
| انتهاء الطلب بعد 24 ساعة، والسحب قبل التنفيذ | `expireStale` و`revoke` | identity tests | AC-3 |
| قرار موقّع Ed25519 مربوط بالحمولة | ADR-009 | identity tests، و6 طفرات | IA-2، وIA-5، وAU-10 |
| تفويض للاستخدام الواحد مع سقف المبلغ | `issueGrant` و`redeem` | طفرات | — |
| سبب إلزامي للرفض والسحب | `decide` و`revoke` | identity tests | AU-3 |
| قرارات بشرية موقّعة تفتح أو تستأنف عملية: تبرئة عقوبات، وحل تصعيد، ورفع إيقاف، واستئناف | `verifyHumanAction` | `human-actions.test.ts`، و5 طفرات | IA-2، وAU-10 |
| الإيقاف الطارئ دون توقيع (fail-safe)، ورفعه بتوقيع platform_operator مع سجل سليم | `releaseEmergencyStop` | human-actions test | IR-4، وAC-5 |
| منع تكرار طلبات الموافقة لنفس الإجراء | `ApprovalGate.request` | identity tests | — |

## 3. سلامة السجل والبيانات

| الضابط | التنفيذ | الاختبار | مرجع |
|--------|---------|----------|------|
| audit append-only (triggers) | `AuditLog` | audit tests | AU-9 |
| سلسلة hash | `verify()` | طفرة | AU-9(3) |
| تثبيت خارجي موقّع HMAC | ADR-008 | `audit-anchor.test.ts` وتجربة CLI | AU-9(3)، وAU-10 |
| كتابة audit متسلسلة بلا فقد تحت التزامن | ADR-007 | hardening (متعدد العمليات) | AU-12 |
| حارس سلامة يوقف العمليات المميزة | `assertAuditIntegrity` | audit-anchor test وطفرة | AU-5، وSI-7 |
| وضع جنائي للقراءة فقط عند التلف | `createPlatform({ forensic })` | تجربة CLI | IR-4 |
| حجب PII، ونسيان المهمة، ومحو الموضوع | `MemoryStore` | memory tests | SC-28، وPDPL |
| انتقالات حالة ذرية | ADR-007 | hardening وطفرات | SI-10 |

## 4. الأسرار والإعداد

- لا أسرار في الكود. `.env.example` بقيم فارغة.
- مفتاح التثبيت والمفاتيح الخاصة تُقرأ من البيئة أو من ملفات بصلاحية 600.
- `APPROVER_AUTH=signed` افتراضيًا.
- `AUDIT_ANCHOR_REQUIRED` لإلزام التثبيت في الإنتاج.
- الوكلاء في الوضع الحي بلا أدوات Claude Code المدمجة (`tools: []`)، وبلا إعدادات من القرص (`settingSources: []`).

## 5. الواجهات الخارجية وتعدد المستأجرين

| الضابط | التنفيذ | الدليل |
|--------|---------|--------|
| رموز API مقيدة النطاق، ومخزنة كـ hash، وتُلغى فورًا | `platform/tenancy/control-plane.ts` | `api.test.ts`، وطفرات `api:` |
| المستأجر يُؤخذ من الرمز، وقاعدة أو schema منفصلة لكل مستأجر | `server/tenants.ts`، و`ControlPlane.tenantSchema` | `api.test.ts` (عزل) |
| الموافقة عبر API تتطلب توقيع الإنسان، لا الرمز | `server/api.ts` → `decideApproval(…, proof)` | `api.test.ts` (unsigned → 401، ومفتاح آخر → 401) |
| حد حجم الجسم، وJSON فقط، وحد معدل لكل رمز، ورؤوس أمان، وأخطاء بلا تفاصيل داخلية | `server/api.ts` | `api.test.ts` |
| سجلات تشغيل منظمة مع requestId وحجب أسماء الحقول الحساسة | `server/log.ts` | `api.test.ts` |
| n8n صادر: كتالوج، وموافقة، واستهلاك قبل الإرسال، وHMAC، وhttps | `platform/connectors/n8n/` | `n8n.test.ts`، و`e2e:n8n`، وطفرات `n8n:` |
| n8n وارد: HMAC لكل مستأجر، ونافذة زمنية، وnonce، ومعرّفات فقط | `platform/integrations/n8n-inbound.ts` | الاختبارات نفسها |
| وحدة التحكم: textContent فقط، وCSP، وتوقيع داخل المتصفح | `server/console.ts` | `e2e:console` |
| PostgreSQL: محفزات تمنع UPDATE وDELETE وTRUNCATE على audit، وكاتب واحد لكل مستأجر | `platform/core/postgres.ts`، و`audit-log.ts` | `test:pg` (112 اختبارًا و34 eval) |

| حد عمق التفويض (6 افتراضيًا) وكشف حلقات الإحالة، مع تصعيد | `Orchestrator.allowHandoff` | `delegation.test.ts`، وطفرتان |
| ميزانية تكلفة تراكمية لكل وكيل خلال 24 ساعة، تُفرض عند المطالبة، والمتبقي يُمرر كسقف للتشغيل الحي | `Orchestrator.budgetRemaining` | `budget.test.ts`، وطفرتان |
| رموز API تنتهي (90 يومًا افتراضيًا، 365 حدًا أقصى)، والرموز بلا انتهاء تُرفض | `ControlPlane.issueToken/authenticate` | `api.test.ts`، وطفرة |
| نسخة احتياطية قابلة للتحقق: لقطة متسقة، وتثبيت مقصوص عند رأس اللقطة، وmanifest بـ SHA-256 | `ops/backup.ts` | `ops/backup.test.ts` (تمرين استعادة كامل) |
| CI على كل push: typecheck، واختبارات، وevals، وفحص أسرار، و`npm audit` (high)، وSBOM، وPostgreSQL حقيقي | `.github/workflows/agentic-enterprise.yml` | تشغيل GitHub Actions رقم 1: نجح |

## 6. ضوابط مخططة (غير منفّذة)

| الضابط | الأولوية | المرجع |
|--------|----------|--------|
| SSO أو WebAuthn لمفاتيح الموافقين | P2 | ADR-009 |
| تصدير رأس audit لطرف ثالث | P2 | ADR-008 |
| تشفير القاعدة عند السكون | P2 | SC-28 |
| قيود اتصال الشبكة الصادرة (egress) | P2 | SC-7 |
