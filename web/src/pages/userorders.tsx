import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import {
  useCompleteOrderMutation,
  useUserOrdersQuery,
} from "../generated/graphql";
import React from "react";
import { Badge, Box, Button, Divider, HStack, VStack } from "@chakra-ui/react";
import { Layout } from "../components/layout";
import { findUserId } from "../functions/findUserId";

const userorders = () => {
  const [{ data }] = useUserOrdersQuery({
    variables: { userId: findUserId() },
  });
  const [, completeOrder] = useCompleteOrderMutation();
  const orders = () => {
    console.log("merchant orders: ", data?.userOrders);
  };
  orders();
  return (
    <Layout title="Review History">
      <VStack spacing={12} paddingBottom={"40px"} borderColor={"grey"}>
        <Box as="span" ml="2" color="gray.600" fontSize="sm">
          {data?.userOrders ? data?.userOrders.length : "NaN"} Orders
        </Box>
        <Badge size={"xl"} colorScheme={"black"} pt={-5}>
          Your User Id: {findUserId()}
        </Badge>
        <Button
          colorScheme={"cyan"}
          size={"sm"}
          onClick={() => {
            completeOrder();
          }}
        >
          Receievd your Orders?
        </Button>
        {data?.userOrders.map((p) => (
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
              {/* <Badge colorScheme={"blue"}>
                Order Complete: {String(p.orderItems?.isComplete)}
              </Badge> */}
              {/* <Badge colorScheme={"green"}>
                User Id: {String(p.order?.userId)}
              </Badge> */}
              <Divider colorScheme={"blue"} variant="dashed"></Divider>
            </VStack>
          </>
        ))}
      </VStack>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(userorders);
