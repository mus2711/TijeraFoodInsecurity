import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import {
  TagsandMeQuery,
  useAddLocationMutation,
  useAddMerchantTagMutation,
  useRegistermMutation,
  useTagsandMeQuery,
} from "../generated/graphql";
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
import { MenuSlide } from "../components/menuslide";
import { RemoveIcon } from "evergreen-ui";
import { useFileUpload } from "use-file-upload";
import { useRouter } from "next/router";
import { Layout } from "../components/layout";

const Merchant3 = () => {
  const [{ data, fetching }] = useTagsandMeQuery();
  let [tags, setTags] = useState([] as string[]);
  // let [avLogo, setavLogo] = useState("");
  const [files, selectFiles] = useFileUpload();
  const [files2, selectFiles2] = useFileUpload();
  const router = useRouter();
  // const [, registerm] = useRegistermMutation();
  const [, addLocation] = useAddLocationMutation();
  const [, addMerchantTag] = useAddMerchantTagMutation();
  const initialInputs = {
    location: "",
  };

  let pickTags: string[] = [];

  let testTags: Map<string, number> = new Map();
  let populateTags = (
    newSet: Map<string, number>,
    data: TagsandMeQuery | undefined
  ) => {
    data?.tags.map((e) => newSet.set(e.tagName, e.id));
    return newSet;
  };

  console.log(populateTags(testTags, data));

  // let pickTags: string[] | undefined = data?.tags.map((e) => e.tagName);
  let tagSet: string[] = [];
  testTags.forEach((ind, tag) => {
    tagSet.push(tag);
    console.log(ind);
  });
  const formikInputs = [
    {
      name: "location",
      placeholder: "TS Food Security St.",
      label: "Location",
    },
  ];

  const pushTags = () => {
    tags.forEach((tag) => {
      addMerchantTag({ tagId: testTags.get(tag) });
    });
  };

  return (
    <Layout title="SIGN UP">
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
            cuisine={tags}
            badge="Top"
            name={data?.me.merchant ? data?.me.merchant.cpname : undefined}
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
        </VStack>
        <Box paddingTop={"15px"}>
          <Formik
            initialValues={initialInputs}
            onSubmit={async (values, { setErrors }) => {
              console.log(values);
              const response = await addLocation(values);
              console.log(response);

              if (response.data?.addLocation.id) {
                router.push("/");
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
                    />
                  ))}
                </VStack>
                <Box paddingTop={"20px"} maxWidth={"350px"}>
                  <Text fontWeight={"bold"} paddingBottom={"20px"}>
                    Pick your tags
                  </Text>
                  <Box>
                    {tagSet?.map((tagName) => (
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
                  </Box>
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
                  onClick={() => pushTags()}
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
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Merchant3);
