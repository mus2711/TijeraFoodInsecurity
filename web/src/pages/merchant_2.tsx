import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { useLoginmMutation, useRegistermMutation } from "../generated/graphql";
import React from "react";
import { Box, Flex, Heading, Text, VStack } from "@chakra-ui/react";
import { Layout } from "../components/layout";
import { Ahac } from "../components/AHAC";
import { LogInButton } from "../components/LogInButton";
import { Formik, Form } from "formik";
import router from "next/router";
import { toMerchErrorMap } from "../../utils/toMerchErrorMap";
import { DblStandardButton } from "../components/DblStandardButton";
import { Inputfield } from "../components/inputfield";

const Merchant2 = () => {
  const [, registerm] = useRegistermMutation();
  const [, loginm] = useLoginmMutation();
  const initialInputs = {
    cpname: "",
    username: "",
    email: "",
    password: "",
  };

  const formikInputs = [
    {
      name: "cpname",
      placeholder: "Company Name",
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
                await loginm({
                  usernameOrEmail: values.email,
                  password: values.password,
                });
                router.push("/merchant_3");
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
                ></Flex>
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

export default withUrqlClient(createUrqlClient, { ssr: true })(Merchant2);
