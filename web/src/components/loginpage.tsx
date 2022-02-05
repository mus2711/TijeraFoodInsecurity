import { Box, Button, Flex, IconButton, Link } from "@chakra-ui/react";
import React from "react";

import NextLink from "next/link";
import { Formik, Form } from "formik";
import router, { useRouter } from "next/router";
import { toErrorMap } from "../../utils/toErrorMap";
import login from "../pages/login";
import { Inputfield } from "./inputfield";
import { Layout } from "./layout";
import Wrapper from "./wrapper";
import { useLoginMutation, useLoginmMutation } from "../generated/graphql";

interface loginProp {
  ay: string;
}

export const LoginPage: React.FC<loginProp> = ({}) => {
  const router = useRouter();
  const [, login] = useLoginMutation();
  const [, loginm] = useLoginmMutation();

  return (
    <Layout title="Log In">
      <Wrapper variant="small">
        <Formik
          initialValues={{
            usernameOrEmail: "",
            password: "",
          }}
          onSubmit={async (values, { setErrors }) => {
            console.log(values);
            const response = await login(values);
            console.log(response);

            if (response.data?.login.errors) {
              setErrors(toErrorMap(response.data.login.errors));
            } else if (response.data?.login.user) {
              if (typeof router.query.next === "string") {
                router.push(router.query.next);
              } else {
                router.push("/search");
              }
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <Inputfield
                name="usernameOrEmail"
                placeholder="Enter Username or Email"
                label="Username/Email"
              ></Inputfield>
              <Box mt={4}>
                <Inputfield
                  name="password"
                  placeholder=" Password"
                  label="Password"
                  type="password"
                ></Inputfield>
              </Box>

              <>
                <Box mt={4}>
                  <NextLink href={"/forgot-password"}>
                    <Link>Forgot Password?</Link>
                  </NextLink>
                </Box>
                <Box mt={4}>
                  <NextLink href={"/loginmerchant"}>
                    <Link>Are you a merchant?</Link>
                  </NextLink>
                </Box>
              </>

              <Box mt={6}>
                <Button
                  type="submit"
                  colorScheme="blue"
                  isLoading={isSubmitting}
                >
                  Log In
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </Wrapper>
    </Layout>
  );
};
