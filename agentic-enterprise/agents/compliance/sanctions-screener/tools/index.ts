import { getScreeningStatus } from "../../../common/tools/get-screening-status.ts";
import { getSupplier } from "../../../common/tools/get-supplier.ts";
import { recordScreeningResult } from "./record-screening-result.ts";
import { screenParty } from "./screen-party.ts";

/**
 * أدوات وكيل فحص العقوبات وصلاحياتها:
 *
 * | الأداة                   | الصلاحية | الملف                                   |
 * |--------------------------|----------|-----------------------------------------|
 * | get_supplier             | read     | common/tools/get-supplier.ts            |
 * | get_screening_status     | read     | common/tools/get-screening-status.ts    |
 * | screen_party             | read     | tools/screen-party.ts                   |
 * | record_screening_result  | write    | tools/record-screening-result.ts        |
 *
 * لا يملك أداة لحظر مورد أو تبرئته أو إبلاغ جهة رقابية. هذه قرارات بشرية لمسؤول الامتثال.
 */
export const screenerTools = [getSupplier, getScreeningStatus, screenParty, recordScreeningResult];
