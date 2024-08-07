// params jei value guli diye amra dei jodi kono filed er name vul dei tahole sei vul filed bade baki gulir deped kore data fatch korbe r jodi sob filed vul dei tahole all data show korbe kono error dibena
import { Record } from "@prisma/client/runtime/library";
const pick = <T extends Record<string, unknown>, k extends keyof T>(
  obj: T,
  keys: k[]
) => {
  const finalObj: Partial<T> = {};
  for (const key of keys) {
    if (obj && Object.hasOwnProperty.call(obj, key)) {
      finalObj[key] = obj[key];
    }
  }
  return finalObj;
};
export default pick;