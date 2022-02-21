import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import {
  useAddReviewMutation,
  useAddTokensMutation,
  useMeQuery,
} from "../generated/graphql";
import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Tag,
  TagLabel,
  TagLeftIcon,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { Layout } from "../components/layout";
import { Formik, Form } from "formik";
import { useRouter } from "next/router";
import { Inputfield } from "../components/inputfield";
import { useGlobalState } from "../state/state";
import { MenuSlide } from "../components/menuslide";
import { AddIcon, StarIcon } from "evergreen-ui";
import { useIsAuth } from "../../utils/useIsAuth";

interface reviewProps {}

const review = ({}) => {
  const router = useRouter();
  // useIsAuth();
  let [star, setStar] = useState(1);
  const toast = useToast();
  const [menuProps] = useGlobalState("reviewRes");
  const [, addReview] = useAddReviewMutation();
  const [, addTokens] = useAddTokensMutation();
  const initialInputs = {
    comment: "",
    // merchantId: 1,
    // rating: star,
  };
  const formikInputs = [
    {
      name: "comment",
      placeholder: "Write review...",
      label: "Comment",
    },
  ];
  console.log(menuProps);
  return (
    <Layout title="Leave a Review">
      <VStack spacing={12} paddingBottom={"40px"}>
        <VStack>
          <MenuSlide
            imageUrl={menuProps.imageUrl}
            imageAlt={menuProps.imageAlt}
            avatarlogo={menuProps.avatarlogo}
            name={menuProps.name}
            rating={menuProps.rating}
            location={menuProps.location}
            reviewCount={menuProps.reviewCount}
            cuisine={menuProps.cuisine}
            merchantID={menuProps.merchantID}
            id={menuProps.id}
            // id={menuProps.merchantID}
          />
          <Formik
            initialValues={initialInputs}
            onSubmit={async (values, { setErrors }) => {
              console.log(values);
              const response = await addReview({
                comment: values.comment,
                merchantId: menuProps?.id ?? 0,
                rating: star,
              });
              console.log(response);

              if (response.data?.addReview.comment) {
                addTokens({ tokens: 5 });
                toast({
                  title: "Tokens Claimed.",
                  description: "Congrats! You should now have more tokens.",
                  status: "success",
                  duration: 9000,
                  isClosable: true,
                });
                router.push("/search");
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
                      //   type={p.type ? p.type : undefined}
                    />
                  ))}
                </VStack>
                <Box paddingTop={"20px"}>
                  <Text fontWeight={"bold"}>Leave a Rating</Text>
                  <Box display="flex" mt="2" alignItems="center">
                    {Array(5)
                      .fill("")
                      .map((_, i) => (
                        <StarIcon
                          key={i}
                          color={i < star ? "teal" : "lightgrey"}
                          size={30}
                          onClick={() => {
                            setStar((star = i + 1));
                            console.log(star);
                          }}
                        />
                      ))}
                  </Box>
                </Box>
                <Box paddingTop={"20px"} paddingBottom={"20px"}>
                  <Text fontWeight={"bold"}>Token Bonus</Text>
                  <Box paddingTop={"10px"}>
                    <Tag size={"md"} variant="subtle" colorScheme="teal">
                      <TagLeftIcon boxSize="12px" as={AddIcon} />
                      <TagLabel>5 Token Bonus</TagLabel>
                    </Tag>
                  </Box>
                </Box>
                <Button
                  type="submit"
                  colorScheme={"teal"}
                  width={"75vw"}
                  maxWidth={"350px"}
                >
                  Submit Review
                </Button>
              </Form>
            )}
          </Formik>
        </VStack>
      </VStack>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(review);
