import { Box, Link, Button } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { withUrqlClient } from "next-urql";
import router from "next/dist/client/router";
import React from "react";
import { useState } from "react";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { toErrorMap } from "../../utils/toErrorMap";
import { Inputfield } from "../components/inputfield";
import Wrapper from "../components/wrapper";
import { useForgotPasswordMutation } from "../generated/graphql";
import NextLink from "next/link";

const ForgotPassword: React.FC<{}> = ({}) => {
  const [complete, setComplete] = useState(false);
  const [, ForgotPassword] = useForgotPasswordMutation();
  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{
          email: "",
        }}
        onSubmit={async (email, { setErrors }) => {
          console.log(email);
          await ForgotPassword(email);
          setComplete(true);
        }}
      >
        {({ isSubmitting }) =>
          complete ? (
            <>
              <Box>Email sent!</Box>
              <Button
                onClick={() => {
                  router.push("/");
                }}
                variant="link"
              >
                Go to the Home Page
              </Button>
            </>
          ) : (
            <Form>
              <Inputfield
                name="email"
                placeholder="Enter Email"
                label="Email"
              ></Inputfield>

              <Box mt={6}>
                <Button
                  type="submit"
                  colorScheme="blue"
                  isLoading={isSubmitting}
                >
                  Send Email
                </Button>
              </Box>
            </Form>
          )
        }
      </Formik>
    </Wrapper>
  );
};

export default withUrqlClient(createUrqlClient)(ForgotPassword);
