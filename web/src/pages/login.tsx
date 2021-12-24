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
import { useLoginMutation } from "../generated/graphql";
import { toErrorMap } from "../../utils/toErrorMap";
import { useRouter } from "next/dist/client/router";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import NextLink from "next/link";
import { route } from "next/dist/server/router";

const Login: React.FC<{}> = ({}) => {
  const router = useRouter();
  const [, login] = useLoginMutation();
  console.log(router);

  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{
          userNameOrEmail: "",
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
              router.push("/");
            }
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Inputfield
              name="userNameOrEmail"
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
            </>

            <Box mt={6}>
              <Button type="submit" colorScheme="blue" isLoading={isSubmitting}>
                Log In
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default withUrqlClient(createUrqlClient)(Login);
