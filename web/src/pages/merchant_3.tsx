import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import {
  TagsandMeQuery,
  useAddLocationMutation,
  useAddMerchantTagMutation,
  useMeQuery,
  useTagsandMeQuery,
} from "../generated/graphql";
import React, { useState } from "react";
import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Input,
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
import { RemoveIcon } from "evergreen-ui";
import { useRouter } from "next/router";
import { Layout } from "../components/layout";
import { findMerchantId } from "../functions/findMerchantId";
import { MenuSlide } from "../components/menuslide";

const Merchant3 = () => {
  const [{ data, fetching }] = useTagsandMeQuery({
    variables: { merchantId: findMerchantId() },
  });

  let [tags, setTags] = useState([] as string[]);
  const router = useRouter();
  const [, addLocation] = useAddLocationMutation();
  const [, addMerchantTag] = useAddMerchantTagMutation();
  let [image, setImage] = React.useState("");
  let [banner, setBanner] = React.useState<string | undefined>(undefined);

  const initialInputs = {
    location: "",
  };

  const onImageChange = (e: any) => {
    console.log(e.target.files[0]);
    setImage((image = URL.createObjectURL(e.target.files[0])));
  };

  const onBannerChange = (e: any) => {
    console.log(e.target.files[0]);
    setBanner((image = URL.createObjectURL(e.target.files[0])));
  };

  let mapTags: Map<string, number> = new Map();
  let populateTags = (
    newSet: Map<string, number>,
    data: TagsandMeQuery | undefined
  ) => {
    data?.tags.map((e) => newSet.set(e.tagName, e.id));
    return newSet;
  };

  populateTags(mapTags, data);

  let tagSet: string[] = [];
  mapTags.forEach((ind, tag) => {
    tagSet.push(tag);
    // console.log(ind);
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
      const call = mapTags.get(tag);
      if (call !== undefined) {
        addMerchantTag({ tagId: call });
      }
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
            avatarlogo={image}
            imageUrl={banner}
            cuisine={tags}
            badge="Top"
            name={data?.me.merchant ? data?.me.merchant.cpname : undefined}
            id={Number(data?.me.merchant?.id)}
          ></MenuSlide>
          <HStack paddingTop={"20px"}>
            <VStack>
              <Button size="md" colorScheme={"cyan"} position={"absolute"}>
                Pick Logo
              </Button>
              <Input
                // size={"md"}
                type={"file"}
                accept="image/*"
                onClick={() => console.log("yes")}
                className="inputPhoto"
                onChange={onImageChange}
                placeholder="Pick an Image"
                borderWidth={"0px"}
                opacity={0}
                width="120px"
                // height={"100px"}
              />
            </VStack>

            {/* <Button colorScheme={"red"}>Pick Backdrop</Button> */}
            <VStack>
              <Button size="md" colorScheme={"red"} position={"absolute"}>
                Pick Backdrop
              </Button>
              <Input
                // size={"md"}
                type={"file"}
                accept="image/*"
                onClick={() => console.log("yes")}
                className="inputPhoto"
                onChange={onBannerChange}
                placeholder="Pick an Image"
                borderWidth={"0px"}
                opacity={0}
                width="120px"
                // height={"100px"}
              />
            </VStack>
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
                        m={1}
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
                    <Box maxWidth={"350px"}>
                      {tags.map((tagName) => (
                        <Tag
                          size={"md"}
                          variant="subtle"
                          colorScheme="red"
                          m={1}
                        >
                          <TagLeftIcon boxSize="12px" as={RemoveIcon} />
                          <TagLabel>{tagName}</TagLabel>
                        </Tag>
                      ))}
                    </Box>
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
