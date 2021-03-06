import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import {
  MerchantOrdersQuery,
  useMerchantOrdersQuery,
} from "../generated/graphql";
import React from "react";
import { Badge, Box, Divider, HStack, VStack } from "@chakra-ui/react";
import { Layout } from "../components/layout";

const orders = () => {
  const [{ data }] = useMerchantOrdersQuery();
  let rData: any[] = [];
  if (data?.merchantOrders) {
    rData = [...data?.merchantOrders].reverse();
  }

  return (
    <Layout title="Review History">
      <VStack spacing={12} paddingBottom={"40px"} borderColor={"grey"}>
        <Box as="span" ml="2" color="gray.600" fontSize="sm">
          {data?.merchantOrders ? data?.merchantOrders.length : "NaN"} Orders
        </Box>

        {rData?.map((p) => (
          <>
            <VStack>
              <HStack>
                {p.orderItems
                  ? p.orderItems.map((p: any) => (
                      <>
                        <VStack
                        //   hidden={
                        //     p.foodItem.merchantId == findMerchantId()
                        //       ? false
                        //       : true
                        //   }
                        >
                          <Badge colorScheme={"blue"}>
                            Item Name: {p.foodItem.itemName}
                          </Badge>
                          <Badge colorScheme={"blue"}>
                            Order Id: {p.orderId}
                          </Badge>
                          <Badge colorScheme={"blue"}>
                            Food Item Id: {p.foodItemId}
                          </Badge>
                          {/* <h1>Merchant Id: {p.foodItem.merchantId}</h1> */}
                          <Divider></Divider>
                        </VStack>
                      </>
                    ))
                  : null}
              </HStack>
              <Badge colorScheme={"blue"}>
                Order Complete: {String(p.order?.isComplete)}
              </Badge>
              <Badge colorScheme={"green"}>
                User Id: {String(p.order?.userId)}
              </Badge>
              <Badge colorScheme={"orange"}>
                Customer Name: {p.order?.user.firstname}{" "}
                {p.order?.user.lastname}
              </Badge>
              <Badge colorScheme={"red"}>
                {String(new Date(Number(p.order?.createdAt))).substring(0, 21)}
              </Badge>
              <Divider colorScheme={"blue"} variant="dashed"></Divider>
            </VStack>
          </>
        ))}
      </VStack>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(orders);
