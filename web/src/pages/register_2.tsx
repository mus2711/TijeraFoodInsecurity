import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { useRegisterMutation } from "../generated/graphql";
import React, { useState } from "react";
import { Box, Flex, Heading, Text, VStack } from "@chakra-ui/react";
import { Layout } from "../components/layout";
import { Ahac } from "../components/AHAC";
import { LogInButton } from "../components/LogInButton";
import { Formik, Form } from "formik";
import { useRouter } from "next/router";
import { toErrorMap } from "../../utils/toErrorMap";
import { SignInOptions } from "../components/SignInOptions";
import { DblStandardButton } from "../components/DblStandardButton";
import { Inputfield } from "../components/inputfield";

const Register_2 = () => {
  const router = useRouter();
  const [, register] = useRegisterMutation();
  const [slide, setSlide] = useState(2);
  const initialInputs = {
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
  };
  const formikInputs = [
    {
      name: "firstname",
      placeholder: "First Name",
      label: "First Name",
    },
    {
      name: "lastname",
      placeholder: "Last Name",
      label: "Last Name",
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
  ];

  return (
    <Layout title="SIGN UP">
      <VStack paddingBottom={"40px"}>
        <Heading>Step {slide}/3</Heading>
        <Text textAlign={"center"} width={"75vw"} maxWidth={"350px"}>
          Please tell us a little about yourself so we can improve your
          experience.
        </Text>
        <Box paddingTop={"15px"}>
          <Formik
            initialValues={initialInputs}
            onSubmit={async (values, { setErrors }) => {
              console.log(values);
              const response = await register(values);
              console.log(response);
              if (response.data?.register.errors) {
                setErrors(toErrorMap(response.data.register.errors));
              } else if (response.data?.register.user) {
                router.push("/register_3");
              }
            }}
          >
            {() => (
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
                ></Flex>
              </Form>
            )}
          </Formik>
        </Box>
        <VStack spacing={5}>
          <Ahac />
          <LogInButton />
        </VStack>
      </VStack>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Register_2);
