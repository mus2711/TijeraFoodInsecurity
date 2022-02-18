import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import React, { useState } from "react";
import {
  Button,
  Flex,
  Heading,
  HStack,
  IconButton,
  Text,
  VStack,
  Stat,
  StatHelpText,
  StatLabel,
  StatNumber,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { Layout } from "../components/layout";
import { setGlobalState, useGlobalState } from "../state/state";
import { HiMinus } from "react-icons/hi";
import {
  useAddToOrderMutation,
  useCompleteOrderMutation,
  useMerchantQuery,
} from "../generated/graphql";

const Checkout = () => {
  const [currentBasket] = useGlobalState("userBasket");
  const [, completeOrder] = useCompleteOrderMutation();
  const [currentMerchant] = useGlobalState("basketMerchant");
  const [, addToOrder] = useAddToOrderMutation();
  const [{ data }] = useMerchantQuery({ variables: { id: currentMerchant } });

  function totalPrice() {
    let totalPr = 0;
    currentBasket.map((p) => {
      totalPr = totalPr + p.cost;
    });
    return totalPr;
  }

  function delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  const pushCheckout = async () => {
    for (let step = 0; step < currentBasket.length; step++) {
      addToOrder({ foodItemId: currentBasket[step].itemID });
      console.log("dn1");
      await delay(100);
    }
    await delay(100);
    completeOrder();
  };

  let [currentPrice, setCurrentPrice] = useState(totalPrice());

  const removeFromBasket = (id: number) => {
    currentBasket.splice(id, 1);
    setGlobalState("userBasket", currentBasket);
    setCurrentPrice(totalPrice());
    if (currentBasket.length == 0) {
      setGlobalState("userBasket", []);
      setGlobalState("basketMerchant", 0);
      setCurrentPrice((currentPrice = 0));
    }
  };

  return (
    <Layout title="Checkout">
      <Flex direction="column" justifyContent="center" alignItems="center">
        <Heading>Your Basket</Heading>
        {data?.merchant !== null ? (
          <Text>
            You are current ordering from: <span>{data?.merchant?.cpname}</span>
          </Text>
        ) : null}

        <VStack pt={10} pb={10}>
          <Table size="sm">
            <Thead>
              <Tr>
                <Th>Item Name</Th>
                <Th>Description</Th>
                <Th isNumeric>Cost</Th>
                <Th isNumeric>Remove?</Th>
              </Tr>
            </Thead>
            <Tbody>
              {currentBasket.map((p, value) => (
                <>
                  <Tr>
                    <Td>{p.itemName}</Td>
                    <Td>{p.description}</Td>
                    <Td isNumeric>{p.cost}</Td>
                    <Td>
                      {" "}
                      <HStack alignContent={"center"} justifyContent={"center"}>
                        <IconButton
                          colorScheme={"red"}
                          value={p.itemName}
                          aria-label="Menu"
                          icon={<HiMinus size={"15px"} />}
                          size={"sm"}
                          // width={"80px"}
                          // height={"30px"}
                          padding={"5px"}
                          variant={"outline"}
                          onClick={() => {
                            console.log(value);
                            removeFromBasket(value);
                          }}
                        />
                      </HStack>
                    </Td>
                  </Tr>
                </>
              ))}
            </Tbody>
          </Table>

          <Stat pt={5} pb={5}>
            <StatLabel>Total Fees</StatLabel>
            <StatNumber>£{currentPrice}</StatNumber>
            <StatHelpText>from {data?.merchant?.cpname}</StatHelpText>
          </Stat>
          <HStack>
            <Button colorScheme={"teal"} onClick={() => pushCheckout()}>
              Checkout
            </Button>
            <Button
              colorScheme={"red"}
              onClick={() => {
                setGlobalState("userBasket", []);
                setGlobalState("basketMerchant", 0);
                setCurrentPrice((currentPrice = 0));
              }}
            >
              Delete All
            </Button>
          </HStack>
        </VStack>
      </Flex>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Checkout);
