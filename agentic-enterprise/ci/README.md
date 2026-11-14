# CI

**مفعّل** منذ 2026-10-26 بتفويض صاحب المستودع: `.github/workflows/agentic-enterprise.yml` نسخة من `github-workflow.yml` هنا. عند التعديل حدّث الملفين معًا:

```bash
cp agentic-enterprise/ci/github-workflow.yml .github/workflows/agentic-enterprise.yml
```

ما يفعله:
- `check`: typecheck وtests وevals (حتمية بلا مفتاح)، وفحص أسرار بسيط. يعمل على كل push وPR يمس `agentic-enterprise/`.
- `postgres`: الاختبارات وevals على PostgreSQL 16 حقيقي (خدمة في CI).
- `mutation`: اختبار الطفرات على PR وعند التشغيل اليدوي.
- `live-eval`: يدوي فقط (`workflow_dispatch` مع `live=true`)، يستخدم السر `ANTHROPIC_API_KEY` في بيئة GitHub اسمها `live-model` (يمكن اشتراط موافقة مراجع عليها)، وبسقف تكلفة `EVAL_LIVE_MAX_TOTAL_USD`.
