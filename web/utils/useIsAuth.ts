import router from "next/router";
import { useEffect } from "react";
import { useMeQuery } from "../src/generated/graphql";

export const useIsAuth = () => {
  const [{ data, fetching }] = useMeQuery();
  useEffect(() => {
    if (!fetching && !data?.me.user) {
      router.push("/login?next=" + router.pathname);
    }
  }, [fetching, data, router]);
};
