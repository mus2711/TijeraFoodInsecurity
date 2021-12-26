import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import {
  useMeQuery,
  useRegistermMutation,
  useRegisterMutation,
} from "../generated/graphql";
import React from "react";
import {
  Box,
  Button,
  ChakraProvider,
  Flex,
  Heading,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Radio,
  RadioGroup,
  Stack,
  Text,
  useColorMode,
  VStack,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { Layout } from "../components/layout";
import { useState } from "react";
import { MdEmail, MdOutlineFastfood } from "react-icons/md";
import { HiOutlineUserGroup, HiUser } from "react-icons/hi";
import { Ahac } from "../components/AHAC";
import { LogInButton } from "../components/LogInButton";
import { StandardButton } from "../components/StandardButton";
import { Formik, Form } from "formik";
import router from "next/router";
import { RiLockPasswordFill } from "react-icons/ri";
import { toMerchErrorMap } from "../../utils/toMerchErrorMap";
import { SignInOptions } from "../components/SignInOptions";
import register from "./register";
import { extendTheme } from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";
import { DblStandardButton } from "../components/DblStandardButton";
import { Inputfield } from "../components/inputfield";

const Merchant_2 = () => {
  const [{ data: meData }] = useMeQuery();

  const [, registerm] = useRegistermMutation();
  const initialInputs = {
    cpname: "",
    username: "",
    email: "",
    password: "",
  };

  const formikInputs = [
    {
      name: "cpname",
      placeholder: "Comapany Name",
      label: "Company Name",
    },
    {
      name: "username",
      placeholder: "john_doe1",
      label: "Username",
    },
    {
      name: "email",
      placeholder: "johndoe@email.com",
      label: "Email",
    },
    {
      name: "password",
      placeholder: "Password*",
      label: "Password",
      type: "password",
    },
    // {
    //   name: "re_password",
    //   placeholder: "Retype Password",
    //   label: "Retype Password",
    //   type: "password",
    // },
  ];

  return (
    <Layout title="SIGN UP">
      <Flex direction="column" justifyContent="center" alignItems="center">
        <Heading>Step 2/3</Heading>
        <Text textAlign={"center"} width={"75vw"} maxWidth={"350px"}>
          Please tell us a little about yourself so we can improve your
          experience.
        </Text>
        <Box paddingTop={"15px"}>
          <Formik
            initialValues={initialInputs}
            onSubmit={async (values, { setErrors }) => {
              console.log(values);
              const response = await registerm(values);
              console.log(response);
              if (response.data?.registerm.errors) {
                setErrors(toMerchErrorMap(response.data.registerm.errors));
              } else if (response.data?.registerm.merchant) {
                router.push("/");
              }
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <VStack spacing={4}>
                  {formikInputs.map((p) => (
                    <Inputfield
                      name={p.name}
                      label={p.label}
                      placeholder={p.placeholder}
                      type={p.type ? p.type : undefined}
                    />
                  ))}
                </VStack>

                <DblStandardButton
                  title="Next"
                  route="/register_3"
                  routeback="register_1"
                  widthforward="62vw"
                />
                <Flex
                  direction={"column"}
                  mt={6}
                  alignItems={"center"}
                  justifyContent={"center"}
                >
                  {/* <Text
                    textAlign={"center"}
                    fontSize={"15px"}
                    maxWidth={"60vw"}
                  >
                    Or Sign up with your social media account below:
                  </Text>
                  <SignInOptions /> */}
                </Flex>
              </Form>
            )}
          </Formik>
        </Box>
        <Ahac />
        <LogInButton />
      </Flex>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Merchant_2);
