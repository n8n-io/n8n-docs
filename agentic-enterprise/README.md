# Agentic Enterprise

منظومة وكلاء ذكاء اصطناعي يعملون كموظفين فعليين في سلسلة "من الشراء إلى الدفع" (Procure-to-Pay)، تحت إشراف بشري، ومبنية على Claude Agent SDK بلغة TypeScript.

## الحالة

| المرحلة | المحتوى | الحالة |
|---------|---------|--------|
| 0 | الأسئلة والافتراضات | ✅ |
| 1 | تحليل المجالات: [`docs/domains.md`](docs/domains.md) | ✅ |
| 2 | البنية المشتركة: [`platform/`](platform/README.md) | ✅ |
| 3 | الوكلاء: [المشتريات](agents/procurement/README.md)، [المالية](agents/finance/README.md)، [الامتثال](agents/compliance/README.md) | ✅ |
| 4 | التكامل والتشغيل: [`scenarios/`](scenarios/evals/procure-to-pay.eval.ts)، [`ops/`](ops/cli.ts)، [`docs/operations/RUNBOOK.md`](docs/operations/RUNBOOK.md) | ✅ |
| 5 | التقوية المؤسسية: [`docs/architecture/CURRENT_STATE.md`](docs/architecture/CURRENT_STATE.md) | ✅ (P0 وP1 الأساسية) |
| 6 | الأساس المؤسسي: PostgreSQL، وتعدد المستأجرين، وAPI، ووحدة التحكم، وn8n | ✅ ([ADR-013 إلى ADR-016](docs/architecture/DECISIONS.md)) |
| — | الوضع الحي بنموذج فعلي | ⛔ ينتظر `ANTHROPIC_API_KEY` |
| — | CI | مسودة غير مفعّلة: [`ci/`](ci/README.md) |

## الوكلاء

| الوكيل | المسمى | يلزم الشركة؟ | مؤشر الأداء |
|--------|--------|--------------|-------------|
| `procurement.requisition-intake` | أخصائي فرز طلبات الشراء | لا | دقة القرار من أول مرة ≥ 95% |
| `procurement.po-issuer` | أخصائي إصدار أوامر الشراء | بموافقة بشرية | أوامر خالية من العيوب ≥ 99% |
| `finance.invoice-processor` | أخصائي معالجة الفواتير | لا | دقة ≥ 98%، وصفر احتيال يصل للدفع |
| `finance.payment-scheduler` | أخصائي المدفوعات | بموافقة بشرية | صفر دفعات خاطئة في الربع |
| `compliance.sanctions-screener` | محلل فحص العقوبات | لا | استدعاء 100% على مجموعة الاختبار |

```
طلب شراء → فرز → أمر شراء [موافقة بشرية] → استلام → فاتورة → مطابقة ثلاثية
        → فحص عقوبات → دفع [موافقة بشرية] → الحساب المسجل في السجل الرئيسي فقط
```

## التشغيل السريع

```bash
npm ci
npm run check        # typecheck ثم unit tests ثم evals (حتمي، بلا مفتاح API)
npm run mutation     # اختبار الطفرات: كل حماية يكشف تعطيلَها اختبارٌ واحد على الأقل
npm run ops -- status
npm run serve        # خادم API + عامل خلفي + وحدة تحكم على http://127.0.0.1:8080/console
TEST_POSTGRES_URL=postgres://… npm run test:pg   # الاختبارات نفسها على PostgreSQL
npm run eval:live    # الوضع الحي بـ Claude، يتطلب ANTHROPIC_API_KEY، بسقف تكلفة
```

المتطلبات: Node 22.13 أو أحدث، لأن المنصة تستخدم `node:sqlite` المدمج. التشغيل والمراقبة والإيقاف الطارئ في [`docs/operations/RUNBOOK.md`](docs/operations/RUNBOOK.md).

## هيكل المشروع

```
platform/        البنية المشتركة: orchestrator، وapproval gate، وaudit، وmemory، وconnectors، وexecutor، وeval
agents/          الوكلاء حسب المجال، ولكل وكيل: README، وsystem_prompt، وtools، وmemory، وguardrails، وcoordination، وagent.ts، وevals
  common/        أدوات مشتركة بين المجالات
scenarios/       السيناريوهات الشاملة عبر الوكلاء الخمسة
ops/             أداة المشغّل (CLI)، والمستأجرون والرموز، والمؤشرات والتنبيهات
server/          HTTP API، والعامل الخلفي، ووحدة التحكم، والسجلات المنظمة
integrations/    سير عمل n8n الجاهزة للاستيراد ودليلها
ci/              مسودة CI (غير مفعّلة)
scripts/         اختبار الطفرات، واختبارات المتصفح وn8n الحقيقية
docs/            المجالات، والبنية والقرارات، والأمن، والتشغيل، والاختبار، والخارطة
tests/           اختبارات المنصة
```

## مبادئ غير قابلة للتفاوض

1. **كل إجراء لا رجعة فيه يمر بموافقة بشرية، في الكود.** ToolExecutor لا ينفّذ أدوات `approval` إلا بعد الموافقة وبالحمولة نفسها. والـ connectors ترفض أي أثر دون تفويض صالح يُستهلك مرة واحدة.
2. **المحتوى الخارجي بيانات لا تعليمات.** يُغلَّف ويُفحص، والأدوات ذات الأثر لا تأخذ أسعارًا أو حسابات أو كميات من النموذج، بل من النظام المرجعي.
3. **الحالة من الوقائع، لا من ادعاء الوكيل.** outcomeGuard يطابق المخرج مع ERP، ويصعّد أي تناقض.
4. **audit غير قابل للتعديل.** سلسلة hash، وtriggers تمنع التعديل والحذف، والنظام يرفض الإقلاع على سلسلة تالفة.
5. **لا أسرار في الكود.** متغيرات بيئة فقط، والقيم الافتراضية في [`.env.example`](.env.example).
