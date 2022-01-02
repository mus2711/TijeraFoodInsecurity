import React from "react";
import { Form, Formik } from "formik";
import { Box, Button, Link } from "@chakra-ui/react";
import Wrapper from "../components/wrapper";
import { Inputfield } from "../components/inputfield";
import { useLoginMutation } from "../generated/graphql";
import { toErrorMap } from "../../utils/toErrorMap";
import { useRouter } from "next/dist/client/router";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import NextLink from "next/link";
import { Layout } from "../components/layout";

const Login: React.FC<{}> = ({}) => {
  const router = useRouter();
  const [, login] = useLoginMutation();
  console.log(router);

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

export default withUrqlClient(createUrqlClient)(Login);
