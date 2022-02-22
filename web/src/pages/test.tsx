import { Button, SimpleGrid } from "@chakra-ui/react";

import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../../utils/createUrqlClient";

import React, { useRef } from "react";
import { Box } from "@chakra-ui/react";
import { Layout } from "../components/layout";
import { useState } from "react";
import {
  useIndividiualMerchantsQuery,
  useMeQuery,
  useMerchantQuery,
  useMerchantsQuery,
  useUserWatchedVideosQuery,
  useVideosQuery,
} from "../generated/graphql";

const Index = () => {
  const [{ data, error }] = useUserWatchedVideosQuery();
  console.log(data);
  console.log(error);

  return (
    <Layout title="ONBOARDING">
      <label>
        {/* <input
          style={{ display: "none" }}
          type="file"
          accept="image/*"
          capture="environment"
          onChange={handleImageChange}
        /> */}
        <Button>hello</Button>
      </label>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
