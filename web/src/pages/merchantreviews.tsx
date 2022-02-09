import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { useReviewsQuery } from "../generated/graphql";
import React from "react";
import { Box, VStack, Text, Divider, HStack } from "@chakra-ui/react";
import { Layout } from "../components/layout";
import { StarIcon } from "evergreen-ui";
import { findMerchantId } from "../functions/findMerchantId";

const merchantReviews = () => {
  const [{ data, fetching }] = useReviewsQuery({
    variables: { merchantId: findMerchantId() },
  });

  return (
    <Layout title="Review History">
      <VStack spacing={12} paddingBottom={"40px"} borderColor={"grey"}>
        <Box as="span" ml="2" color="gray.600" fontSize="sm">
          {data?.reviews.length} reviews
        </Box>
        {data?.reviews.map((p) => (
          <>
            <VStack>
              <Text fontWeight={"medium"}>
                {p.user.firstname} {p.user.lastname}
              </Text>

              <Text>{p.comment}</Text>
              <HStack>
                {Array(5)
                  .fill("")
                  .map((_, i) => (
                    <StarIcon key={i} color={i < p.rating ? "teal" : "gray"} />
                  ))}
              </HStack>
            </VStack>
            <Divider />
          </>
        ))}
        )
      </VStack>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(merchantReviews);
