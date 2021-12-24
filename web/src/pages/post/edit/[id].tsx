import { Box, Button } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/dist/client/router";
import React from "react";
import { createUrqlClient } from "../../../../utils/createUrqlClient";
import { getIntId } from "../../../../utils/getIntId";
import { Inputfield } from "../../../components/inputfield";
import { Layout } from "../../../components/layout";
import {
  usePostQuery,
  useUpdatePostMutation,
} from "../../../generated/graphql";

export const EditPost = ({}) => {
  const router = useRouter();
  const intId = getIntId();
  const [{ data, fetching }] = usePostQuery({
    pause: intId === -1,
    variables: {
      id: intId,
    },
  });
  const [, updatePost] = useUpdatePostMutation();
  if (fetching) {
    return (
      <Layout>
        <div>...Loading</div>
      </Layout>
    );
  }

  if (!data?.post) {
    <Layout>
      <div>Could not find post.</div>
    </Layout>;
  }

  return (
    <Layout varaint="small">
      <Formik
        initialValues={{
          title: data?.post?.title,
          text: data?.post?.text,
        }}
        onSubmit={async (values, { setErrors }) => {
          console.log(values);
          const { error } = await updatePost({ id: intId, ...values });
          console.log(error);
          if (!error) {
            router.back();
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Inputfield
              name="title"
              placeholder="Title of Post"
              label="Title"
            ></Inputfield>
            <Box mt={4}>
              <Inputfield
                name="text"
                placeholder="Enter text..."
                label="body"
              ></Inputfield>
            </Box>
            <Box mt={6}>
              <Button type="submit" colorScheme="red" isLoading={isSubmitting}>
                Edit Post
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(EditPost);
