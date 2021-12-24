import { Box, Button, Link } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { NextPage } from "next";
import NextLink from "next/link";
import { withUrqlClient } from "next-urql";
import router, { useRouter } from "next/dist/client/router";
import React, { useState } from "react";
import { createUrqlClient } from "../../../utils/createUrqlClient";
import { toErrorMap } from "../../../utils/toErrorMap";
import { Inputfield } from "../../components/inputfield";
import Wrapper from "../../components/wrapper";
import { usePasswordResetMutation } from "../../generated/graphql";

const ResetPassword: NextPage<{ token: string }> = () => {
  const router = useRouter();
  const [, PasswordReset] = usePasswordResetMutation();
  const [tokenError, setTokenError] = useState("");
  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{
          newPassword: "",
          newPasswordDuplicate: "",
        }}
        onSubmit={async (values, { setErrors }) => {
          // console.log(values);
          // console.log(token);
          const input = {
            ...values,
            token:
              typeof router.query.token === "string" ? router.query.token : "",
          };
          console.log(input);
          const response = await PasswordReset(input);
          console.log(response);
          if (response.data?.PasswordReset.errors) {
            // setErrors(toErrorMap(response.data.PasswordReset.errors));
            const errorMap = toErrorMap(response.data.PasswordReset.errors);
            if ("token" in errorMap) {
              setTokenError(errorMap.token);
            }
            setErrors(errorMap);
          } else if (response.data?.PasswordReset.user) {
            router.push("/");
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Inputfield
              name="newPassword"
              placeholder="New Password"
              label="New Password"
              type="password"
            ></Inputfield>
            <Box mt={4}>
              <Inputfield
                name="newPasswordDuplicate"
                placeholder=" Re-enter New Password"
                label="Re-enter New Password"
                type="password"
              ></Inputfield>
            </Box>
            {tokenError ? (
              <>
                <Box color="red" mt={6}>
                  {tokenError}
                </Box>
                <NextLink href={"/forgot-password"}>
                  <Link>Send me an email to reset my password.</Link>
                </NextLink>
              </>
            ) : null}
            <Box mt={6}>
              <Button type="submit" colorScheme="blue" isLoading={isSubmitting}>
                Change Password
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

// ResetPassword.getInitialProps = ({ query }) => {
//   return {
//     token: query.token as string,
//   };
// };

export default withUrqlClient(createUrqlClient)(ResetPassword);
