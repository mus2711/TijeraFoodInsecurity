import { useMeQuery } from "../generated/graphql";

export function findUserId(): number {
  const [{ data, fetching }] = useMeQuery();
  if (data?.me.user) {
    return data?.me?.user?.id;
  } else {
    return 0;
  }
}
