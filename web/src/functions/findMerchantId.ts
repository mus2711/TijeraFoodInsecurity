import { useMeQuery } from "../generated/graphql";

export function findMerchantId(): number {
  const [{ data, fetching }] = useMeQuery();
  if (data?.me.merchant) {
    return data?.me?.merchant?.id;
  } else {
    return 0;
  }
}
