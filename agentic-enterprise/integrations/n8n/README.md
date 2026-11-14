# تكامل n8n

n8n يعمل **خلف** المنصة، لا بجانبها: كل تشغيل لسير عمل ذي أثر يمر بالمنفّذ والسياسة وبوابة الموافقة. وكل حدث من n8n يدخل كبيانات (معرّفات فقط)، لا كتعليمات.

## الاتجاهان

| الاتجاه | المسار | الحماية |
|---------|--------|---------|
| صادر: المنصة → n8n | أداة approval (مثل `request_remittance_notice`) → موافقة بشرية موقّعة → `N8nWorkflowConnector` → `POST {N8N_BASE_URL}/webhook/<path>` | كتالوج سماح يملكه المشغّل، والمسار لا يأتي من النموذج، وحقول معلنة الأنواع، واستهلاك التفويض قبل الإرسال (لا تشغيل مزدوج)، وتوقيع HMAC مع طابع زمني، و`Idempotency-Key = approvalId`، وhttps فقط (http لـ localhost)، ولا تتبع لإعادة التوجيه، ورد مقتطع إلى 64KB |
| وارد: n8n → المنصة | `POST /v1/tenants/<tenant>/n8n/<route>` | HMAC بسر خاص بالمستأجر، ونافذة ±5 دقائق، وnonce يمنع إعادة الإرسال، ومسارات سماح بمخطط معرّفات فقط (لا نص حر)، و`eventId` كمفتاح idempotency |

## سيرا العمل المرفقان

- [`ae-notify-supplier-remittance.json`](ae-notify-supplier-remittance.json): يستقبل طلب المنصة، ويتحقق من التوقيع ونافذة الوقت **داخل n8n**، ثم يجهز الإشعار. في نشر حقيقي يُضاف بعده node الإرسال (Outlook أو SMTP).
- [`ae-invoice-received.json`](ae-invoice-received.json): يمثل وصول فاتورة (webhook بديل لمشغّل ERP أو IMAP)، ويبني حدثًا بمعرّفات فقط، ويوقّعه، ويرسله إلى المنصة.

## الإعداد

في n8n (متغيرات بيئة؛ في الإنتاج يُفضَّل مدير أسرار n8n):

```bash
AE_N8N_OUTBOUND_SECRET=<hex ≥32 bytes>    # نفس N8N_OUTBOUND_SECRET في المنصة
AE_N8N_INBOUND_SECRET=<hex ≥32 bytes>     # نفس سر المستأجر الوارد في المنصة
AE_PLATFORM_URL=https://agents.example.com
AE_TENANT_ID=acme
NODE_FUNCTION_ALLOW_BUILTIN=crypto        # لعقدة Code التي تحسب HMAC
N8N_BLOCK_ENV_ACCESS_IN_NODE=false        # لقراءة الأسرار من البيئة داخل Code
```

```bash
n8n import:workflow --input=integrations/n8n/ae-notify-supplier-remittance.json
n8n import:workflow --input=integrations/n8n/ae-invoice-received.json
n8n publish:workflow --id=aeNotifyRemit0001
n8n publish:workflow --id=aeInvoiceRecv0001
```

في المنصة:

```bash
WORKFLOW_CONNECTOR=n8n
N8N_BASE_URL=https://n8n.example.com
N8N_OUTBOUND_SECRET=<hex>
N8N_WORKFLOWS_FILE=./config/n8n-workflows.json   # اختياري؛ الافتراضي الكتالوج المدمج
npm run ops -- tenants create acme --name "Acme" --as u-ops --n8n-secret-env ACME_N8N_INBOUND_SECRET
export ACME_N8N_INBOUND_SECRET=<hex>
```

## التحقق

```bash
N8N_E2E_URL=http://127.0.0.1:5678 AE_N8N_OUTBOUND_SECRET=… AE_N8N_INBOUND_SECRET=… npm run e2e:n8n
```

نتيجة التشغيل الفعلي بتاريخ 2026-10-15 على n8n 2.43.6 (Node 24): **8 من 8 PASS**. الاتجاهان كلاهما، ورفض التوقيع المزوّر داخل n8n، وسلامة audit.

## حدود معروفة

- **التحقق داخل n8n يعيد تسلسل JSON** (`JSON.stringify(body)`) بدل البايتات الخام. ينجح لأن المنصة ترسل JSON مضغوطًا بترتيب ثابت. أي وسيط يعيد تنسيق JSON سيُفشل التحقق، وهذا فشل آمن.
- **فشل التحقق في n8n يعيد HTTP 500** (استثناء من عقدة Code)، لا 401. المنصة تعامل أي رد غير 2xx كفشل وتصعّد.
- **n8n 2.x يتطلب Node 24**، والمنصة تعمل على Node 22. هما عمليتان منفصلتان.
