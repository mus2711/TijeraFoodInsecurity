import React from "react";
import { Field, Form, Formik } from "formik";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Link,
} from "@chakra-ui/react";
import Wrapper from "../components/wrapper";
import { Inputfield } from "../components/inputfield";
import { useMutation } from "urql";
import {
  useLoginmMutation,
  useLoginMutation,
  useMemQuery,
} from "../generated/graphql";
import { toErrorMap } from "../../utils/toErrorMap";
import { useRouter } from "next/dist/client/router";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import NextLink from "next/link";
import { route } from "next/dist/server/router";
import { Layout } from "../components/layout";
import { toMerchErrorMap } from "../../utils/toMerchErrorMap";
import { MerchLayout } from "../components/merchLayout";
import { query } from "@urql/exchange-graphcache";

const LoginMerchant: React.FC<{}> = ({}) => {
  const router = useRouter();
  const [, loginm] = useLoginmMutation();

  return (
    <MerchLayout title="Log In">
      <Wrapper variant="small">
        <Formik
          initialValues={{
            usernameOrEmail: "",
            password: "",
          }}
          onSubmit={async (values, { setErrors }) => {
            console.log("values", values);
            const response = await loginm(values);
            console.log("response", response);
            console.log("router.query.next", router.query.next);
            if (response.data?.loginm.errors) {
              setErrors(toMerchErrorMap(response.data.loginm.errors));
            } else if (response.data?.loginm.merchant) {
              if (typeof router.query.next === "string") {
                router.push(router.query.next);
              } else {
                router.push("/mburner");
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
                  <NextLink href={"/login"}>
                    <Link>Are you a regular User?</Link>
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
    </MerchLayout>
  );
};

export default withUrqlClient(createUrqlClient)(LoginMerchant);
