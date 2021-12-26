import { FieldMerchantError } from "../src/generated/graphql";

export const toMerchErrorMap = (errors: FieldMerchantError[]) => {
  const errorMap: Record<string, string> = {};
  errors.forEach(({ field, merchantmsg }) => {
    errorMap[field] = merchantmsg;
  });

  return errorMap;
};
