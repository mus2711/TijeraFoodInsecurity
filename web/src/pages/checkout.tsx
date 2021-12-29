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

const bl = "#5998A0";

const Search = () => {
  const [currentBasket] = useGlobalState("userBasket");
  function totalPrice() {
    let totalPr = 0;
    currentBasket.map((p) => {
      totalPr = totalPr + p.price;
    });
    return totalPr;
  }
  const [currentPrice, setCurrentPrice] = useState(totalPrice());
  let currentLength: number = useGlobalState("userBasket").length;

  const removeFromBasket = (
    picture: string,
    title: string,
    desc: string,
    price: number,
    itemID: string
  ) => {
    const removedItem = {
      picture: picture,
      title: title,
      desc: desc,
      price: price,
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
        <VStack>
          {currentBasket.map((p) => (
            <HStack>
              <Box
                maxW="80px"
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
                id={p.itemID}
              >
                <Image
                  maxHeight={"80px"}
                  width={"10vw"}
                  fit={"cover"}
                  src={p.picture}
                ></Image>
              </Box>
              <Stack textAlign={"left"}>
                <Text fontWeight={"bold"} maxWidth={"200px"}>
                  {p.title}
                </Text>
                <Text fontSize={"12px"} maxWidth={"200px"}>
                  {p.desc}
                </Text>
              </Stack>
              <Spacer />
              <Text>${p.price}</Text>
              <IconButton
                colorScheme={"red"}
                value={p.title}
                aria-label="Menu"
                icon={<HiMinus size={"20px"} />}
                padding={"5px"}
                onClick={() => {
                  removeFromBasket(
                    p.picture,
                    p.title,
                    p.desc,
                    p.price,
                    p.itemID
                  );
                }}
              />
            </HStack>
          ))}
          <Box>
            <Text>Total: ${currentPrice}</Text>
          </Box>
          <Button colorScheme={"teal"}>Checkout</Button>
          <Button
            colorScheme={"red"}
            onClick={() => {
              setGlobalState("userBasket", []);
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
