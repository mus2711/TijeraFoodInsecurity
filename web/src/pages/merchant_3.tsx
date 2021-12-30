import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { useMemQuery, useRegistermMutation } from "../generated/graphql";
import React, { useState } from "react";
import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Tag,
  TagLabel,
  TagLeftIcon,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { AddIcon } from "@chakra-ui/icons";
import { DblStandardButton } from "../components/DblStandardButton";
import { Inputfield } from "../components/inputfield";
import { MerchLayout } from "../components/merchLayout";
import { MenuSlide } from "../components/menuslide";
import { FilePicker, RemoveIcon } from "evergreen-ui";
import { useFileUpload } from "use-file-upload";
import { Router, useRouter } from "next/router";

const Merchant_3 = () => {
  const [{ data: meData }] = useMemQuery();
  let [tags, setTags] = useState([] as string[]);
  let [avLogo, setavLogo] = useState("");
  const [files, selectFiles] = useFileUpload();
  const [files2, selectFiles2] = useFileUpload();
  const router = useRouter();

  const [, registerm] = useRegistermMutation();
  const initialInputs = {
    location: "",
  };

  const formikInputs = [
    {
      name: "Location",
      placeholder: "TS Food Security St.",
      label: "Location",
    },
  ];

  return (
    <MerchLayout title="SIGN UP">
      <Flex direction="column" justifyContent="center" alignItems="center">
        <Heading>Step 3/3</Heading>
        <Text textAlign={"center"} width={"75vw"} maxWidth={"350px"}>
          Here we set your menu and your merchant account.
        </Text>
        <VStack paddingTop={"20px"}>
          <MenuSlide
            modal={false}
            avatarlogo={files?.source || undefined}
            imageUrl={files2?.source || undefined}
          ></MenuSlide>
          <HStack paddingTop={"20px"}>
            <Button
              onClick={() => {
                selectFiles(
                  { accept: "image/*", multiple: false },
                  ({ name, size, source, file }) => {
                    console.log("Files Selected", { name, size, source, file });
                  }
                );
              }}
              colorScheme={"blue"}
            >
              Pick Logo
            </Button>

            <Button
              onClick={() => {
                selectFiles2(
                  { accept: "image/*", multiple: false },
                  ({ name, size, source, file }) => {
                    console.log("Files Selected", { name, size, source, file });
                  }
                );
              }}
              colorScheme={"red"}
            >
              Pick Backdrop
            </Button>
          </HStack>
          {/* <FilePicker
            multiple={false}
            width={250}
            onChange={(files) => console.log(files)}
            placeholder="Select the file here!"
          /> */}
        </VStack>
        <Box paddingTop={"15px"}>
          <Formik
            initialValues={initialInputs}
            // onSubmit={async (values, { setErrors }) => {
            //   console.log(values);
            //   const response = await registerm(values);
            //   console.log(response);
            //   if (response.data?.registerm.errors) {
            //     setErrors(toMerchErrorMap(response.data.registerm.errors));
            //   } else if (response.data?.registerm.merchant) {
            //     router.push("/");
            //   }
            // }}
            onSubmit={() => {
              router.push("/merchantaccount");
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
                      type={p.type ? p.type : undefined}
                    />
                  ))}
                </VStack>
                <Box paddingTop={"20px"} maxWidth={"350px"}>
                  <Text fontWeight={"bold"} paddingBottom={"20px"}>
                    Pick your tags
                  </Text>
                  <HStack spacing={4}>
                    {["Vegatarian", "Healthy", "Fast Food"].map((tagName) => (
                      <Tag
                        size={"md"}
                        variant="subtle"
                        colorScheme="teal"
                        onClick={() => {
                          setTags([...tags, tagName]);
                        }}
                      >
                        <TagLeftIcon boxSize="12px" as={AddIcon} />
                        <TagLabel>{tagName}</TagLabel>
                      </Tag>
                    ))}
                  </HStack>
                </Box>
                <Box paddingTop={"20px"}>
                  <Text fontWeight={"bold"} paddingBottom={"20px"}>
                    Your tags
                  </Text>
                  <VStack>
                    <HStack spacing={4}>
                      {tags.map((tagName) => (
                        <Tag size={"md"} variant="subtle" colorScheme="red">
                          <TagLeftIcon boxSize="12px" as={RemoveIcon} />
                          <TagLabel>{tagName}</TagLabel>
                        </Tag>
                      ))}
                    </HStack>
                    <Button
                      height={"30px"}
                      colorScheme={"green"}
                      onClick={() => {
                        setTags([]);
                      }}
                    >
                      Reset Tags
                    </Button>
                  </VStack>
                </Box>
                <DblStandardButton
                  title="Configure your Menu"
                  route="/merchantaccount"
                  routeback="register_1"
                  widthforward="62vw"
                />
                <Flex
                  direction={"column"}
                  mt={6}
                  alignItems={"center"}
                  justifyContent={"center"}
                ></Flex>
              </Form>
            )}
          </Formik>
        </Box>
      </Flex>
    </MerchLayout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Merchant_3);
