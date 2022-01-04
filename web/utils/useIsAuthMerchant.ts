import router from "next/router";
import { useEffect } from "react";
import { useMeQuery } from "../src/generated/graphql";

export const useIsAuthMerchant = () => {
  const [{ data, fetching }] = useMeQuery();
  useEffect(() => {
    if (!fetching && !data?.me.merchant) {
      router.push("/loginmerchant?next=" + router.pathname);
    }
  }, [fetching, data, router]);
};
