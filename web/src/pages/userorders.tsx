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
  // let datastamps: string[] = [];
  // if (data?.userOrders) {
  //   for (let i = 0; i < data?.userOrders.length; i++) {
  //     var date = new Date(Number(data.userOrders[i].order?.createdAt) * 1000);
  //     // Hours part from the timestamp
  //     var hours = date.getHours();
  //     // Minutes part from the timestamp
  //     var minutes = "0" + date.getMinutes();
  //     // Seconds part from the timestamp
  //     var seconds = "0" + date.getSeconds();

  //     // Will display time in 10:30:23 format
  //     var formattedTime =
  //       hours + ":" + minutes.substr(-2) + ":" + seconds.substr(-2);
  //     datastamps.push(formattedTime);
  //   }
  // }
  return (
    <Layout title="Review History">
      <VStack spacing={12} paddingBottom={"40px"} borderColor={"grey"}>
        <Box as="span" ml="2" color="gray.600" fontSize="sm">
          {data?.userOrders ? data?.userOrders.length : "NaN"} Orders
        </Box>
        <Badge size={"xl"} colorScheme={"black"} pt={-5}>
          Your User Id: {findUserId()}
        </Badge>

        {data?.userOrders.reverse().map((p, value) => (
          <>
            <VStack>
              <Badge size={"md"} colorScheme={"pink"}>
                {p.order?.merchant.cpname}
              </Badge>
              {/* <Badge colorScheme={"red"}>{datastamps[value]}</Badge> */}
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
                          <Badge colorScheme={"blue"}>
                            Quantity: {p.quantity}
                          </Badge>
                          <Divider></Divider>
                        </VStack>
                      </>
                    ))
                  : null}
              </HStack>
              <Badge
                colorScheme={Boolean(p.order?.isComplete) ? "blue" : "red"}
              >
                Order Complete: {String(p.order?.isComplete)}
              </Badge>

              <Divider colorScheme={"blue"} variant="dashed"></Divider>
            </VStack>
          </>
        ))}
      </VStack>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(userorders);
