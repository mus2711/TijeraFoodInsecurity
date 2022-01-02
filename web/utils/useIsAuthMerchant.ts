import router from "next/router";
import { useEffect } from "react";
import { useMemQuery } from "../src/generated/graphql";

export const useIsAuthMerchant = () => {
  const [{ data, fetching }] = useMemQuery();
  useEffect(() => {
    console.log("data.mem", data?.mem);
    if (!fetching && !data?.mem) {
      router.push("/loginmerchant?next=" + router.pathname);
    }
  }, [fetching, data, router]);
};
