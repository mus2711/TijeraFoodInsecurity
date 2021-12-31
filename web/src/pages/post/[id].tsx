import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React from "react";
import { Text } from "@chakra-ui/react";
import { createUrqlClient } from "../../../utils/createUrqlClient";
import { Layout } from "../../components/layout";
import { useMeQuery } from "../../generated/graphql";

// interface [id]Props {

// }

const review = ({}) => {
  const router = useRouter();
  const intID =
    typeof router.query.id === "string" ? parseInt(router.query.id) : -1;
  const [{ data, fetching }] = useMeQuery({
    pause: intID === -1,
    variables: {},
  });
  return (
    <Layout title="Leave Review">
      <Text>Hello</Text>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(review);
