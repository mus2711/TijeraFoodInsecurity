import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import React, { useState } from "react";
import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  IconButton,
  Spacer,
  Stack,
  Text,
  VStack,
  Image,
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
          {currentBasket.map((p, value) => (
            <HStack>
              <Box
                maxW="80px"
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
                id={String(p.itemID)}
              >
                <Image
                  maxHeight={"80px"}
                  width={"10vw"}
                  fit={"cover"}
                  src={p.imageUrl}
                ></Image>
              </Box>
              <Spacer />
              <Stack textAlign={"left"}>
                <Text fontWeight={"bold"} maxWidth={"200px"}>
                  {p.itemName}
                </Text>
                <Text fontSize={"12px"} maxWidth={"200px"}>
                  {p.description}
                </Text>
              </Stack>
              <Spacer />
              <Text>${p.cost}</Text>
              <Spacer />
              <IconButton
                colorScheme={"red"}
                value={p.itemName}
                aria-label="Menu"
                icon={<HiMinus size={"20px"} />}
                padding={"5px"}
                onClick={() => {
                  console.log(value);
                  removeFromBasket(value);
                }}
              />
            </HStack>
          ))}

          <Box pt={5} pb={10}>
            <Text>Total: ${currentPrice}</Text>
          </Box>
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
        </VStack>
      </Flex>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Checkout);
