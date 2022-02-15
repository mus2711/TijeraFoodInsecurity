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
  useMerchantQuery,
  useUserOrdersQuery,
} from "../generated/graphql";
import { findUserId } from "../functions/findUserId";
import { findMerchantId } from "../functions/findMerchantId";

const Search = () => {
  const [currentBasket] = useGlobalState("userBasket");
  const [currentMerchant] = useGlobalState("basketMerchant");
  const [, addToOrder] = useAddToOrderMutation();
  const [{ data }] = useMerchantQuery({ variables: { id: currentMerchant } });
  console.log(data);

  // const [{ data }] = useUserOrdersQuery({
  //   variables: { userId: Number(findUserId()) },
  // });
  // console.log("user orders: ", data);

  function totalPrice() {
    let totalPr = 0;
    currentBasket.map((p) => {
      totalPr = totalPr + p.cost;
    });
    return totalPr;
  }

  let [currentPrice, setCurrentPrice] = useState(totalPrice());
  let currentLength: number = useGlobalState("userBasket").length;

  const removeFromBasket = (
    imageURL: string,
    itenName: string,
    description: string,
    cost: number,
    itemID: number
  ) => {
    const removedItem = {
      imageURL: imageURL,
      itenName: itenName,
      description: description,
      cost: cost,
      itemID: itemID,
    };
    let c = -1;
    currentBasket.map((p) => {
      //   console.log(p);
      c += 1;
      if (JSON.stringify(p) === JSON.stringify(removedItem)) {
        currentBasket.splice(c, 1);
        setGlobalState("userBasket", [...currentBasket]);
        setCurrentPrice(totalPrice());
      }
    });
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
          {currentBasket.map((p) => (
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
              <IconButton
                colorScheme={"red"}
                value={p.itemName}
                aria-label="Menu"
                icon={<HiMinus size={"20px"} />}
                padding={"5px"}
                onClick={() => {
                  removeFromBasket(
                    p.imageUrl,
                    p.itemName,
                    p.description,
                    p.cost,
                    p.itemID
                  );
                }}
              />
            </HStack>
          ))}
          <Box pt={5} pb={10}>
            <Text>Total: ${currentPrice}</Text>
          </Box>
          <Button
            colorScheme={"teal"}
            onClick={() => {
              currentBasket.map((p) => {
                console.log(p.itemID);
                addToOrder({ foodItemId: p.itemID });
              });
            }}
          >
            Checkout
          </Button>
          <Button
            colorScheme={"red"}
            onClick={() => {
              setGlobalState("userBasket", []);
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

export default withUrqlClient(createUrqlClient, { ssr: true })(Search);
