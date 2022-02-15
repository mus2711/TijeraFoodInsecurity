import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { useMerchantOrdersQuery } from "../generated/graphql";
import React from "react";
import { Box, Divider, HStack, VStack } from "@chakra-ui/react";
import { Layout } from "../components/layout";
import { findMerchantId } from "../functions/findMerchantId";

const orders = () => {
  const [{ data }] = useMerchantOrdersQuery();
  const orders = () => {
    console.log("merchant orders: ", data?.merchantOrders);
  };
  orders();
  return (
    <Layout title="Review History">
      <VStack spacing={12} paddingBottom={"40px"} borderColor={"grey"}>
        <Box as="span" ml="2" color="gray.600" fontSize="sm">
          {data?.merchantOrders ? data?.merchantOrders.length : "NaN"} Orders
        </Box>
        {data?.merchantOrders.map((p) => (
          <>
            <VStack>
              <HStack>
                {p.orderItems
                  ? p.orderItems.map((p) => (
                      <>
                        <VStack
                        //   hidden={
                        //     p.foodItem.merchantId == findMerchantId()
                        //       ? false
                        //       : true
                        //   }
                        >
                          <h1>Item Name: {p.foodItem.itemName}</h1>
                          <h1>Order Id: {p.orderId}</h1>
                          <h1>Food Item Id: {p.foodItemId}</h1>
                          <h1>Merchant Id: {p.foodItem.merchantId}</h1>
                          <Divider></Divider>
                        </VStack>
                      </>
                    ))
                  : null}
              </HStack>
              <h1>Order Complete: {String(p.order?.isComplete)}</h1>
              <h1>User Id: {String(p.order?.userId)}</h1>
              <Divider colorScheme={"cyan"} variant="dashed"></Divider>
            </VStack>
          </>
        ))}
      </VStack>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(orders);
