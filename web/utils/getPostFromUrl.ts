import { useRouter } from "next/router";
import { usePostQuery, useUpdatePostMutation } from "../src/generated/graphql";

export const getPostFromUrl = () => {
  const router = useRouter();
  const intId =
    typeof router.query.id === "string" ? parseInt(router.query.id) : -1;
  return usePostQuery({
    pause: intId === -1,
    variables: {
      id: intId,
    },
  });
};
