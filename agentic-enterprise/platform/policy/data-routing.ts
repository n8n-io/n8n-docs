import { z } from "zod";

/**
 * توجيه النماذج بحسب حساسية البيانات وإقامتها (data residency).
 *
 * المبدأ (fail-closed): لا تُرسل بيانات مهمة إلى نموذج إلا عبر مسار (route) وافق عليه المشغّل صراحةً
 * لفئة حساسية تلك البيانات ولمنطقة الإقامة المطلوبة للمستأجر. إن لم يوجد مسار مطابق، لا يُستدعى أي نموذج،
 * ويُصعَّد الأمر لإنسان. لا إعادة توجيه صامتة إلى مزوّد أو منطقة غير معتمدة عند الفشل.
 *
 * الفئات مرتبة تصاعديًا:
 * - public: منشور أصلًا.
 * - internal: داخلي غير حساس.
 * - confidential: بيانات أعمال سرية (أسعار، وعقود، وحسابات بنكية لكيانات).
 * - personal: بيانات شخصية لأفراد (أسماء أشخاص في فحص العقوبات مثلًا).
 * - regulated: بيانات خاضعة لاشتراط إقامة أو قطاعي (مثل PDPL في السعودية، أو بيانات القطاع المالي المنظم).
 *
 * ما يقرره هذا الملف تقني فقط: هل المسار المعتمد يطابق. **اعتماد المسار نفسه قرار قانوني وتعاقدي**
 * (اتفاقية معالجة بيانات، وموقع المعالجة، وتقييم الأثر)، يوثقه المشغّل في MODEL_ROUTES ولا تدّعيه المنصة.
 */
export const DATA_CLASSES = ["public", "internal", "confidential", "personal", "regulated"] as const;
export type DataClass = (typeof DATA_CLASSES)[number];
export const classRank = (c: DataClass) => DATA_CLASSES.indexOf(c);

export const ModelRouteSchema = z.strictObject({
  id: z.string().regex(/^[a-z0-9][a-z0-9-]{1,47}$/),
  provider: z.string().min(1).max(40),
  model: z.string().min(1).max(100),
  /** المنطقة التي تُعالج فيها البيانات فعليًا وفق العقد (مثل "us" أو "eu" أو "sa"). */
  region: z.string().regex(/^[a-z]{2,10}$/),
  /** أعلى فئة حساسية اعتمدها المشغّل لهذا المسار. */
  maxClass: z.enum(DATA_CLASSES),
  /** مرجع الاعتماد (رقم اتفاقية المعالجة أو تقييم الأثر). إلزامي لما فوق confidential. */
  approvalRef: z.string().max(200).optional(),
});
export type ModelRoute = z.infer<typeof ModelRouteSchema>;

export function parseRoutes(raw: string | undefined, defaultModel: string): ModelRoute[] {
  // الافتراضي آمن: مسار واحد حتى confidential فقط. البيانات الشخصية والمنظمة تتطلب مسارًا معتمدًا صريحًا.
  if (!raw) return [{ id: "default", provider: "anthropic", model: defaultModel, region: "us", maxClass: "confidential" }];
  const routes = z.array(ModelRouteSchema).min(1).max(50).parse(JSON.parse(raw));
  const ids = new Set<string>();
  for (const r of routes) {
    if (ids.has(r.id)) throw new Error(`Duplicate model route ${r.id}`);
    ids.add(r.id);
    if (classRank(r.maxClass) > classRank("confidential") && !r.approvalRef)
      throw new Error(`Model route ${r.id} allows ${r.maxClass} data but has no approvalRef`);
  }
  return routes;
}

export interface RoutingRequest {
  dataClass: DataClass;
  /** منطقة الإقامة المطلوبة للمستأجر ("any" = لا اشتراط). تُفرض على personal وregulated. */
  residency: string;
}

export type RoutingDecision = { ok: true; route: ModelRoute } | { ok: false; reason: string };

/** يختار أول مسار مطابق بترتيب الإعداد (المشغّل يرتب الأفضلية). */
export function selectRoute(routes: ModelRoute[], req: RoutingRequest): RoutingDecision {
  const residencyApplies = classRank(req.dataClass) >= classRank("personal") && req.residency !== "any";
  for (const r of routes) {
    if (classRank(r.maxClass) < classRank(req.dataClass)) continue;
    if (residencyApplies && r.region !== req.residency) continue;
    return { ok: true, route: r };
  }
  return {
    ok: false,
    reason: `No approved model route for ${req.dataClass} data${residencyApplies ? ` with residency ${req.residency}` : ""}`,
  };
}
