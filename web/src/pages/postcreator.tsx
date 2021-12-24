import { Box, Button, Textarea } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/dist/client/router";
import React from "react";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { useIsAuth } from "../../utils/useIsAuth";
import { Inputfield } from "../components/inputfield";
import { Layout } from "../components/layout";
import { useCreatePostMutation } from "../generated/graphql";

interface registerProps {}

const CreatePost: React.FC<registerProps> = ({}) => {
  const router = useRouter();
  useIsAuth();
  const [, createPost] = useCreatePostMutation();
  return (
    <Layout varaint="small">
      <Formik
        initialValues={{
          title: "",
          text: "",
        }}
        onSubmit={async (values, { setErrors }) => {
          console.log(values);
          const { error } = await createPost(values);
          console.log(error);
          if (!error) {
            router.push("/");
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
              {/* <Inputfield
                name="text"
                placeholder="Enter text..."
                label="Text"
              ></Inputfield> */}
              <Inputfield
                name="text"
                placeholder="Enter text..."
                label="body"
              ></Inputfield>
            </Box>
            <Box mt={6}>
              <Button type="submit" colorScheme="red" isLoading={isSubmitting}>
                Post
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(CreatePost);
