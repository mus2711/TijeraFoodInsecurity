import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import React from "react";
import { Box, Flex, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { Layout } from "../components/layout";
import { Carousel, Image } from "grommet";
import { LogInButton } from "../components/LogInButton";
import { Ahac } from "../components/AHAC";
import { StandardButton } from "../components/StandardButton";

const Index = () => {
  return (
    <Layout title="ONBOARDING">
      <SimpleGrid columns={[1, null, 2]} spacing="50px" overflowY={"hidden"}>
        <Box>
          <VStack
            // paddingTop="3vw"
            justifyContent="center"
            // m="auto"
            minH={["300px", "80vh"]}
          >
            <Box
              height="25vw"
              width="25vw"
              minW={"300px"}
              minH={"300px"}
              // maxWidth={"700px"}
              // maxHeight={"700px"}
              overflow="hidden"
              borderRadius={20}
            >
              <Carousel
                play={5000}
                alignSelf="center"
                fill={true}
                controls={false}
              >
                <Image
                  fit="cover"
                  src="https://i.ibb.co/1XtW1z5/bdc016d5dcf93c09464df8c3c7fe4016.jpg"
                />
                <Image
                  fit="cover"
                  src="https://i.ibb.co/ZYYqy2x/f0b1b4305b287bf541822022e1883694.jpg"
                />
                <Image
                  fit="cover"
                  src="https://i.ibb.co/tX9HRGN/3059a41473dbe3d770fa03ce69aaaec5.jpg"
                />
              </Carousel>
            </Box>
          </VStack>
        </Box>
        <Box>
          <VStack justifyContent="center" minH={["300px", "80vh"]} spacing={5}>
            <Box
              width={"30vw"}
              maxWidth={"250px"}
              // marginTop={"5vw"}
              justifyContent={"center"}
              alignItems={"center"}
              // paddingTop={["0px", "80px"]}
            >
              <Image
                fill={true}
                fit="cover"
                src="https://i.ibb.co/C8bKrfp/tijera.png"
              />
            </Box>
            {/* <Text
              textAlign={"center"}
              fontSize={"20px"}
              textColor={"#5998A0"}
              fontWeight={"bold"}
              marginTop={["-20px", "-60px"]}
            >
              Yellow Basket
            </Text> */}

            <Text
              maxWidth={"300px"}
              textAlign={"center"}
              fontSize={"15px"}
              textColor={"cyan.800"}
            >
              Find a meal in Barbados from amazing food suppliers, without
              spending a cent.
            </Text>

            <StandardButton title="Let's Start" route="/register_1" />
            <Ahac />
            <LogInButton />
          </VStack>
        </Box>
      </SimpleGrid>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
