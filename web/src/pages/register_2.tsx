import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import {
  useMeQuery,
  usePostsQuery,
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
import { toErrorMap } from "../../utils/toErrorMap";
import { SignInOptions } from "../components/SignInOptions";
import register from "./register";
import { extendTheme } from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";
import { DblStandardButton } from "../components/DblStandardButton";

const Register_1 = () => {
  const [variables, setVariables] = useState({
    limit: 15,
    cursor: null as null | string,
  });
  const [{ data: meData }] = useMeQuery();

  const [{ data, fetching }] = usePostsQuery({ variables });

  const [, register] = useRegisterMutation();

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
            initialValues={{
              userName: "",
              email: "",
              password: "",
            }}
            onSubmit={async (values, { setErrors }) => {
              console.log(values);
              const response = await register(values);
              console.log(response);
              if (response.data?.register.errors) {
                setErrors(toErrorMap(response.data.register.errors));
              } else if (response.data?.register.user) {
                router.push("/");
              }
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <Stack
                  spacing={4}
                  justifyContent={"center"}
                  alignItems={"center"}
                >
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      color="gray.300"
                      fontSize="1.2em"
                      children={<HiUser color="gray.300" />}
                    />
                    <Input
                      name="firstName"
                      placeholder="First Name / Company Name*"
                      label="First Name"
                      width={"75vw"}
                      maxWidth={"350px"}
                    />
                  </InputGroup>

                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      color="gray.300"
                      fontSize="1.2em"
                      children={<HiUser />}
                    />
                    <Input
                      name="lastName"
                      placeholder="Last Name"
                      label="Last Name"
                      width={"75vw"}
                      maxWidth={"350px"}
                    />
                    {/* <InputRightElement
                      children={<HiUser color="green.500" />}
                    /> */}
                  </InputGroup>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      color="gray.300"
                      fontSize="1.2em"
                      children={<MdEmail color="gray.300" />}
                    />
                    <Input
                      name="email"
                      placeholder="johndoe@email.com*"
                      label="Email"
                      width={"75vw"}
                      maxWidth={"350px"}
                    />
                  </InputGroup>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      color="gray.300"
                      fontSize="1.2em"
                      children={<RiLockPasswordFill color="gray.300" />}
                    />
                    <Input
                      name="password"
                      placeholder="Password*"
                      label="Password"
                      width={"75vw"}
                      maxWidth={"350px"}
                      type="password"
                    />
                  </InputGroup>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      color="gray.300"
                      fontSize="1.2em"
                      children={<RiLockPasswordFill color="gray.300" />}
                    />
                    <Input
                      name="password"
                      placeholder="Re-type Password*"
                      label="Password"
                      width={"75vw"}
                      maxWidth={"350px"}
                      type="password"
                    />
                    <InputRightElement
                      children={<CheckIcon color="green.500" />}
                    />
                  </InputGroup>
                </Stack>

                {/* <StandardButton title="Next" route="/register_3" width="75vw" /> */}
                <DblStandardButton
                  title="Register"
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
                  <Text
                    textAlign={"center"}
                    fontSize={"15px"}
                    maxWidth={"60vw"}
                  >
                    Or Sign up with your social media account below:
                  </Text>
                  <SignInOptions />
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

export default withUrqlClient(createUrqlClient, { ssr: true })(Register_1);
