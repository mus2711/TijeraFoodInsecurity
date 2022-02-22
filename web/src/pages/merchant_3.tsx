import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import {
  TagsandMeQuery,
  useAddMerchantImageMutation,
  useAddMerchantLogoMutation,
  useAddMerchantTagMutation,
  useChangeMerchantAddressMutation,
  useTagsandMeQuery,
} from "../generated/graphql";
import React, { useCallback, useState } from "react";
import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Input,
  InputGroup,
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
import { RemoveIcon, Select } from "evergreen-ui";
import { useRouter } from "next/router";
import { Layout } from "../components/layout";
import { findMerchantId } from "../functions/findMerchantId";
import { MenuSlide } from "../components/menuslide";
import Dropzone, { useDropzone } from "react-dropzone";

const merchant_3 = () => {
  const [{ data, fetching }] = useTagsandMeQuery({
    variables: { merchantId: findMerchantId() },
  });
  const [, changeMerchantAddress] = useChangeMerchantAddressMutation();
  const [country, setCountry] = useState("");
  let [tags, setTags] = useState([] as string[]);
  const router = useRouter();

  const [, addMerchantTag] = useAddMerchantTagMutation();

  const initialInputs = {
    address1: "",
    address2: "",
    city: "",
    postcode: "",
    country: country,
  };
  //// /////

  // const [upload] = useMutation(uploadFileMutation);
  const [, addMerchantLogo] = useAddMerchantLogoMutation();
  const [, addMerchantImage] = useAddMerchantImageMutation();

  let [fileToUpload, setFileToUpload] = useState<File>();
  let [imageSrc, setImageSrc] = useState("");
  let [logoToUpload, setlogoToUpload] = useState<File>();
  let [logoSrc, setLogoSrc] = useState("");

  const readFile = (file: File) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.addEventListener("load", () => resolve(reader.result), false);
      reader.readAsDataURL(file);
    });
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
      name: "address1",
      placeholder: "32 TS Food Security St.",
      label: "Address 1",
    },
    {
      name: "address2",
      placeholder: "Marylebone",
      label: "Address 2",
    },
    {
      name: "city",
      placeholder: "London",
      label: "City/Town",
    },
    {
      name: "postcode",
      placeholder: "E3 8CH",
      label: "Postcode",
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
            avatarlogo={logoSrc}
            imageUrl={imageSrc}
            cuisine={tags}
            badge="Top"
            name={data?.me.merchant ? data?.me.merchant.cpname : undefined}
            id={Number(data?.me.merchant?.id)}
          ></MenuSlide>

          <HStack paddingTop={"20px"}>
            <Dropzone
              onDrop={async ([file]) => {
                let imageDataUrl: any = await readFile(file);

                setLogoSrc((logoSrc = imageDataUrl));

                addMerchantLogo({
                  image: logoSrc,
                }).then((response) => console.log(response));
              }}
              multiple={false}
            >
              {({ getRootProps, getInputProps }) => (
                <div {...getRootProps({ className: "dropzone" })}>
                  <input {...getInputProps()} />
                  <Button colorScheme={"blue"}>Select a Logo</Button>
                </div>
              )}
            </Dropzone>

            <Dropzone
              onDrop={async ([file]) => {
                let imageDataUrl: any = await readFile(file);
                setImageSrc((imageSrc = imageDataUrl));
                addMerchantImage({ image: imageSrc }).then((response) =>
                  console.log(response)
                );
              }}
              multiple={false}
            >
              {({ getRootProps, getInputProps }) => (
                <div {...getRootProps({ className: "dropzone" })}>
                  <input {...getInputProps()} />
                  <Button colorScheme={"green"}>Select a Image</Button>
                </div>
              )}
            </Dropzone>
          </HStack>
        </VStack>
        <Box paddingTop={"15px"}>
          <Formik
            initialValues={initialInputs}
            onSubmit={async (values, { setErrors }) => {
              values["country"] = country;
              const response = await changeMerchantAddress(values);
              console.log(response);
              if (response.data?.changeMerchantAddress.city) {
                router.push("/search");
              }
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <VStack spacing={4}>
                  <InputGroup>
                    <Select
                      placeholder="country"
                      value={country}
                      // iconColor={bl}
                      color="gray.300"
                      // colorScheme={"cyan"}
                      size={"medium"}
                      onChange={(val) => {
                        setCountry(val.target.selectedOptions[0].value);
                      }}
                      // variant="filled"
                    >
                      <option value="UK">United Kingdom</option>
                      <option value="USA">United States</option>
                      <option value="FR">France</option>
                      <option value="COL">Columbia</option>
                      <option value="BRB">Barbados</option>
                    </Select>
                  </InputGroup>
                  {formikInputs.map((p, val) => (
                    <Inputfield
                      name={p.name}
                      label={p.label}
                      placeholder={p.placeholder}
                      key={String(val)}
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
                      {tags.map((tagName, value) => (
                        <Tag
                          size={"md"}
                          variant="subtle"
                          colorScheme="red"
                          m={1}
                          id={String(value)}
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

export default withUrqlClient(createUrqlClient, { ssr: true })(merchant_3);
