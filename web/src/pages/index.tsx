import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { useMeQuery, usePostsQuery } from "../generated/graphql";
import React from "react";
import { Box, Flex, SimpleGrid, Text } from "@chakra-ui/react";
import { Layout } from "../components/layout";
import { useState } from "react";
import { Carousel, Image } from "grommet";
import { LogInButton } from "../components/LogInButton";
import { Ahac } from "../components/AHAC";
import { StandardButton } from "../components/StandardButton";

const Index = () => {
  // const [variables, setVariables] = useState({
  //   limit: 15,
  //   cursor: null as null | string,
  // });
  // const [{ data: meData }] = useMeQuery();

  // const [{ data, fetching }] = usePostsQuery({ variables });

  return (
    <Layout title="ONBOARDING">
      <SimpleGrid columns={[1, null, 2]} spacing="40px" overflowY={"hidden"}>
        <Box>
          <Flex paddingTop="3vw" justifyContent="center" m="auto">
            <Box
              height="80vw"
              width="80vw"
              maxWidth={"600px"}
              maxHeight={"600px"}
              overflow="hidden"
            >
              <Carousel play={5000} alignSelf="center" fill={true}>
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
          </Flex>
        </Box>
        <Box justifyContent={"center"} justifyItems={"center"}>
          <Flex direction="column" justifyContent="center" alignItems="center">
            <Box
              width={"30vw"}
              maxWidth={"250px"}
              marginTop={"-5vw"}
              justifyContent={"center"}
              alignItems={"center"}
              paddingTop={["0px", "80px"]}
            >
              <Image
                fill={true}
                fit="cover"
                src="https://i.ibb.co/NxbSvnB/8d6c0ff554d73e7efd109677d9e0857c.png"
              />
            </Box>
            <Text
              textAlign={"center"}
              fontSize={"20px"}
              textColor={"#5998A0"}
              fontWeight={"bold"}
              marginTop={["-20px", "-60px"]}
            >
              Yellow Basket
            </Text>

            <Text
              maxWidth={"300px"}
              textAlign={"center"}
              fontSize={"15px"}
              textColor={"#5998A0"}
              marginTop={"20px"}
            >
              Find a meal in Barbados from amazing food suppliers, without
              spending a cent.
            </Text>

            <StandardButton title="Let's Start" route="/register_1" />
            <Ahac />
            <LogInButton />
          </Flex>
        </Box>
      </SimpleGrid>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
