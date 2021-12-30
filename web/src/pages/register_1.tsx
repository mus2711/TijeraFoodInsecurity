import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { useMeQuery, usePostsQuery } from "../generated/graphql";
import React from "react";
import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  IconButton,
  Radio,
  RadioGroup,
  Stack,
  Text,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { Layout } from "../components/layout";
import { useState } from "react";
import { MdOutlineFastfood } from "react-icons/md";
import { HiOutlineUserGroup } from "react-icons/hi";
import { Ahac } from "../components/AHAC";
import { LogInButton } from "../components/LogInButton";
import { StandardButton } from "../components/StandardButton";
import { m } from "framer-motion";

const Register_1 = () => {
  let body = null;
  const [typevalue, setTypevalue] = React.useState("1");
  if (typevalue == "1") {
    body = <StandardButton title="Next" route="/register_2" />;
  } else {
    body = <StandardButton title="Next" route="/merchant_2" />;
  }
  return (
    <Layout title="SIGN UP">
      <Flex direction="column" justifyContent="center" alignItems="center">
        <Heading>Step 1/3</Heading>
        <Text textAlign={"center"} maxWidth={"70vw"}>
          Please select the type of account you would like to setup.
        </Text>
        <RadioGroup
          defaultValue={"1"}
          onChange={setTypevalue}
          value={typevalue}
        >
          <Flex
            direction="row"
            justifyContent="center"
            alignItems="center"
            paddingTop={"50px"}
          >
            <Box justifyContent="center" alignItems="center">
              {/* <NextLink href={"/register_2"}> */}
              <IconButton
                bg="none"
                aria-label="Menu"
                icon={<MdOutlineFastfood size={"100px"} />}
                padding={"20px"}
              />
              {/* </NextLink> */}
              <HStack justifyContent={"center"} marginTop={"40px"}>
                <Text
                  textColor={"#5998A0"}
                  fontWeight={"bold"}
                  textAlign={"center"}
                  // marginTop={"40px"}
                >
                  Merchant
                </Text>
                <Radio
                  colorScheme="blue"
                  value="2"
                  onClick={() => {
                    console.log(typevalue);
                  }}
                ></Radio>
              </HStack>
            </Box>

            <Text>Or</Text>
            <Box justifyContent="center" alignItems="center">
              <IconButton
                bg="none"
                aria-label="Menu"
                icon={<HiOutlineUserGroup size={"100px"} />}
                padding={"20px"}
              />

              <HStack justifyContent={"center"} marginTop={"40px"}>
                <Text
                  textColor={"#5998A0"}
                  fontWeight={"bold"}
                  textAlign={"center"}
                  // marginTop={"40px"}
                >
                  User
                </Text>
                <Radio
                  colorScheme="blue"
                  value="1"
                  onClick={() => {
                    console.log(typevalue);
                  }}
                ></Radio>
              </HStack>
            </Box>
          </Flex>
        </RadioGroup>
        {body}
        <Ahac />
        <LogInButton />
      </Flex>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Register_1);
