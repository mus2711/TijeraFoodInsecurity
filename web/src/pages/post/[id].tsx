import { withUrqlClient } from "next-urql";
import React from "react";
import { useRouter } from "next/dist/client/router";
import { createUrqlClient } from "../../../utils/createUrqlClient";
import {
  useMeQuery,
  usePostQuery,
  usePostsQuery,
} from "../../generated/graphql";
import { Layout } from "../../components/layout";
import { Heading } from "@chakra-ui/layout";
import { Box } from "@chakra-ui/react";
import { DeleteSection } from "../../components/deletesection";
import { EditSection } from "../../components/EditSection";

export const Post = ({}) => {
  const router = useRouter();
  const [{ data: meData }] = useMeQuery();
  const intId =
    typeof router.query.id === "string" ? parseInt(router.query.id) : -1;
  const [{ data, fetching }] = usePostQuery({
    pause: intId === -1,
    variables: {
      id: intId,
    },
  });

  if (fetching) {
    return (
      <Layout>
        <div>...Loading</div>
      </Layout>
    );
  }

  if (!data?.post) {
    <Layout>
      <div>Could not find post.</div>
    </Layout>;
  }

  return (
    <Layout>
      <Heading paddingBottom={5}>{data?.post?.title}</Heading>
      {data?.post?.text}
      {meData?.me?.id === data?.post?.creator.id ? (
        <Box paddingTop={7} ml="auto" mt="auto" flexDirection="row">
          <EditSection post={data?.post} />
          <DeleteSection post={data?.post} />{" "}
        </Box>
      ) : (
        <div>nothing</div>
      )}
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Post);
