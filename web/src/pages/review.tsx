import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { useRegisterMutation } from "../generated/graphql";
import React, { useState } from "react";
import {
  Box,
  Button,
  Flex,
  Heading,
  InputGroup,
  Tag,
  TagLabel,
  TagLeftIcon,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Layout } from "../components/layout";
import { Ahac } from "../components/AHAC";
import { LogInButton } from "../components/LogInButton";
import { Formik, Form } from "formik";
import { useRouter } from "next/router";
import { toErrorMap } from "../../utils/toErrorMap";
import { SignInOptions } from "../components/SignInOptions";
import { DblStandardButton } from "../components/DblStandardButton";
import { Inputfield } from "../components/inputfield";
import { HiUser } from "react-icons/hi";
import { useGlobalState } from "../state/state";
import { MenuSlide } from "../components/menuslide";
import { AddIcon, StarIcon } from "evergreen-ui";

interface reviewProps {}

const review = ({}) => {
  const router = useRouter();
  let [star, setStar] = useState(1);
  const [menuProps] = useGlobalState("reviewRes");
  const initialInputs = {
    comment: "",
  };
  const formikInputs = [
    {
      name: "comment",
      placeholder: "Write review...",
      label: "Comment",
    },
  ];

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
          />
          <Formik
            initialValues={initialInputs}
            // onSubmit={async (values, { setErrors }) => {
            //   console.log(values);
            //   const response = await register(values);
            //   console.log(response);
            //   if (response.data?.register.errors) {
            //     setErrors(toErrorMap(response.data.register.errors));
            //   } else if (response.data?.register.user) {
            //     router.push("/search");
            //   }
            // }}
            onSubmit={() => {
              console.log("ys");
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
                      <TagLabel>5% Bonus</TagLabel>
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