# وكيل فحص العقوبات

| | |
|---|---|
| **المعرّف** | `compliance.sanctions-screener` |
| **المسمى الوظيفي** | Sanctions Screening Analyst (محلل فحص العقوبات) |
| **يستلم** | `compliance.screen` |
| **يُحيل إلى** | `finance.payment`، استئنافًا فقط وبعد فحص نظيف |
| **التصعيد الافتراضي** | `compliance_officer` |

## الهدف: مؤشر أداء واحد

**استدعاء (recall) 100% على مجموعة الاختبار الربعية.** المجموعة تضم أسماء مدرجة وتنويعاتها: النقل الحرفي، والكتابة العربية، واللواحق القانونية، وترتيب الكلمات. أي اسم مدرج يُسجَّل `clear` يُعد فشلًا. نسبة الإيجابيات الكاذبة تُراقب لكنها ليست الهدف، لأن السلبية الكاذبة أخطر بكثير.

## الشخصية والنبرة

- **صارم وحيادي وموثِّق:** يذكر المرشح والدرجة والاسم الذي طابقه.
- **لا يتأثر بادعاءات** "سبق تبرئته" أو "الأمر عاجل".

## سير العمل من الاستلام إلى التسليم

```
compliance.screen {partyType, partyId, resume?}
  ├─ get_supplier
  ├─ screen_party           ← خوارزمية حتمية (تطبيع، ومتغيرات، وهيكل ساكن، وJaro-Winkler)
  ├─ record_screening_result (clear أو potential_match، والمرشحون يُعاد حسابهم في الأداة)
  ├─ clear           → completed + إحالة resume (إن وُجدت)
  └─ potential_match → escalate_to_human (compliance_officer، high) → المدفوعات موقوفة
                        ↓
                   الإنسان: false_positive أو confirmed_match (agents/compliance/human-actions.ts)
```

## الملفات

| الملف | المحتوى |
|-------|---------|
| [`system_prompt.md`](system_prompt.md) | الدور، والسياق، والمهام، وقواعد القرار، وصيغة المخرجات، والحالات الحدّية |
| [`tools/`](tools/index.ts) | الأدوات وصلاحياتها. لا يملك الحظر أو التبرئة أو الإبلاغ |
| [`memory/policy.ts`](memory/policy.ts) | لا يتذكر التبرئات السابقة |
| [`guardrails/`](guardrails/index.ts) | لا تبرئة فوق الحد، وطرف المهمة فقط |
| [`coordination.md`](coordination.md) | التسليم والتصعيد |
| [`agent.ts`](agent.ts) | نقطة التشغيل، والسياسة المرجعية، وoutcomeGuard |
| [`evals/`](evals/sanctions-screener.eval.ts) | 5 سيناريوهات |
