import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { useMerchantOrdersQuery } from "../generated/graphql";
import React from "react";
import { Box, HStack, VStack } from "@chakra-ui/react";
import { Layout } from "../components/layout";

const orders = () => {
  const [{ data }] = useMerchantOrdersQuery();
  const orders = () => {
    console.log(data?.merchantOrders[0].order);
  };
  orders();
  return (
    <Layout title="Review History">
      <VStack spacing={12} paddingBottom={"40px"} borderColor={"grey"}>
        <Box as="span" ml="2" color="gray.600" fontSize="sm">
          {data?.merchantOrders[0].orderItems
            ? data?.merchantOrders[0].orderItems.length
            : "NaN"}{" "}
          Orders
        </Box>
        {data?.merchantOrders[0].orderItems?.map((p) => (
          <>
            <VStack>
              <HStack>
                <h1>{p.foodItem.itemName}</h1>
                <h1>{p.foodItem.id}</h1>
                <h1>{p.orderId}</h1>
              </HStack>
              <h1>{String(data.merchantOrders[0].order?.isComplete)}</h1>
            </VStack>
          </>
        ))}
      </VStack>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(orders);
