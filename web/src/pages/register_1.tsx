import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import React from "react";
import {
  Box,
  Flex,
  Heading,
  HStack,
  IconButton,
  Radio,
  RadioGroup,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Layout } from "../components/layout";
import { MdOutlineFastfood } from "react-icons/md";
import { HiOutlineUserGroup } from "react-icons/hi";
import { Ahac } from "../components/AHAC";
import { LogInButton } from "../components/LogInButton";
import { StandardButton } from "../components/StandardButton";

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
      <VStack justifyContent="center" alignItems="center" spacing={5}>
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
              <IconButton
                bg="none"
                aria-label="Menu"
                icon={<MdOutlineFastfood size={"100px"} />}
                padding={"20px"}
              />

              <HStack justifyContent={"center"} marginTop={"40px"}>
                <Text
                  textColor={"black"}
                  fontWeight={"bold"}
                  textAlign={"center"}
                >
                  Merchant
                </Text>
                <Radio
                  colorScheme="cyan"
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
                  textColor={"black"}
                  fontWeight={"bold"}
                  textAlign={"center"}
                >
                  User
                </Text>
                <Radio
                  colorScheme="cyan"
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
      </VStack>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Register_1);
