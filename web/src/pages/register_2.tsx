import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { useRegisterMutation } from "../generated/graphql";
import React from "react";
import { Box, Flex, Heading, InputGroup, Text, VStack } from "@chakra-ui/react";
import { Layout } from "../components/layout";
import { Ahac } from "../components/AHAC";
import { LogInButton } from "../components/LogInButton";
import { Formik, Form } from "formik";
import { useRouter } from "next/router";
import { toErrorMap } from "../../utils/toErrorMap";
import { SignInOptions } from "../components/SignInOptions";
import { DblStandardButton } from "../components/DblStandardButton";
import { Inputfield } from "../components/inputfield";
import { HiUser } from "react-icons/hi";

const Register_2 = () => {
  const router = useRouter();
  const [, register] = useRegisterMutation();

  return (
    <Layout title="SIGN UP">
      <VStack>
        <Heading>Step 2/3</Heading>
        <Text textAlign={"center"} width={"75vw"} maxWidth={"350px"}>
          Please tell us a little about yourself so we can improve your
          experience.
        </Text>
        <Box paddingTop={"15px"}>
          <Formik
            initialValues={{
              firstname: "",
              lastname: "",
              username: "",
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
                <VStack spacing={4}>
                  <InputGroup>
                    {/* <InputLeftElement
                        pointerEvents="none"
                        color="gray.300"
                        fontSize="1.2em"
                        children={<HiUser color="gray.300" />}
                      /> */}
                    <Inputfield
                      name="firstname"
                      placeholder="First Name*"
                      label="First Name"
                      // left={<HiUser color="gray.300" />}
                    />
                  </InputGroup>

                  <InputGroup>
                    {/* <InputLeftElement
                      pointerEvents="none"
                      color="gray.300"
                      fontSize="1.2em"
                      children={<HiUser />}
                    /> */}
                    <Inputfield
                      name="lastname"
                      placeholder="Last Name*"
                      label="Last Name"
                      // width={"75vw"}
                      // maxWidth={"350px"}
                    />
                  </InputGroup>
                  <InputGroup>
                    {/* <InputLeftElement
                      pointerEvents="none"
                      color="gray.300"
                      fontSize="1.2em"
                      children={<HiUser />}
                    /> */}
                    <Inputfield
                      name="username"
                      placeholder="Username*"
                      label="Username"
                      // width={"75vw"}
                      // maxWidth={"350px"}
                    />
                  </InputGroup>
                  <InputGroup>
                    {/* <InputLeftElement
                      pointerEvents="none"
                      color="gray.300"
                      fontSize="1.2em"
                      children={<MdEmail color="gray.300" />}
                    /> */}
                    <Inputfield
                      name="email"
                      placeholder="johndoe@email.com*"
                      label="Email"
                      // width={"75vw"}
                      // maxWidth={"350px"}
                    />
                  </InputGroup>
                  <InputGroup>
                    {/* <InputLeftElement
                      pointerEvents="none"
                      color="gray.300"
                      fontSize="1.2em"
                      children={<RiLockPasswordFill color="gray.300" />}
                    /> */}
                    <Inputfield
                      name="password"
                      placeholder="Password*"
                      label="Password"
                      // width={"75vw"}
                      // maxWidth={"350px"}
                      type="password"
                    />
                  </InputGroup>
                  <InputGroup>
                    {/* <InputLeftElement
                      pointerEvents="none"
                      color="gray.300"
                      fontSize="1.2em"
                      children={<RiLockPasswordFill color="gray.300" />}
                    /> */}

                    <Inputfield
                      name="password_re"
                      placeholder="Re-type Password*"
                      label="Password"
                      // width={"75vw"}
                      // maxWidth={"350px"}
                      type="password"
                    />

                    {/* <InputRightElement
                      children={<CheckIcon color="green.500" />}
                    /> */}
                  </InputGroup>
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
      </VStack>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Register_2);
