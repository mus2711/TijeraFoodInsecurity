import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import React, { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Heading,
  HStack,
  IconButton,
  Input,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { MdPlusOne } from "react-icons/md";
import { MenuSlide } from "../components/menuslide";
import { Formik, Form } from "formik";
import { useRouter } from "next/router";
import { Inputfield } from "../components/inputfield";
import {
  useAddFoodImageMutation,
  useAddMerchantImageMutation,
  useAddMerchantLogoMutation,
  useChangeFoodStockMutation,
  useCreateFoodItemMutation,
  useDeleteFoodItemMutation,
  useTagsandMeQuery,
} from "../generated/graphql";
import { useIsAuthMerchant } from "../../utils/useIsAuthMerchant";
import { Layout } from "../components/layout";
import { findMerchantId } from "../functions/findMerchantId";
import { HiMinus } from "react-icons/hi";

import Dropzone from "react-dropzone";

const datalist = [
  {
    imageUrl: "https://i.ibb.co/Cmk22Xv/72a025a0efc630882a6aabbc435e2bcd.jpg",
    imageAlt: "Rear view of modern home with pool",
    name: "Los Santos Diner",
    reviewCount: 34,
    rating: 4,
    cuisine: ["American", "Diner", "Burgers"],
    location: "Harrow Road 10, London, E1 4ZJ",
    route: "/",
    key: 1,
    menulist: [
      {
        item: "Cheese Burger",
        foodpic:
          "https://i.ibb.co/ZYYqy2x/f0b1b4305b287bf541822022e1883694.jpg",
        price: 8,
        description: "Delicious Hamburger with Cheese",
        itemID: "hk5jh45",
      },
      {
        item: "Fries",
        foodpic:
          "https://i.ibb.co/ZYYqy2x/f0b1b4305b287bf541822022e1883694.jpg",
        price: 3,
        description:
          "Fried potatoes with choice of 2 sauces: Ketchup, Mayo, BBQ, Ranch.",
        itemID: "hk5jh45",
      },
      {
        item: "Chocolate Milkshake",
        foodpic:
          "https://i.ibb.co/ZYYqy2x/f0b1b4305b287bf541822022e1883694.jpg",
        price: 6,
        description: "Made with Whole Milk, and Chocolate Ice Cream.",
        itemID: "hk5jh45",
      },
    ],
    avatarlogo: "https://bit.ly/dan-abramov",
  },
];

const MerchAccount = () => {
  const router = useRouter();
  useIsAuthMerchant();
  const [{ data, fetching }] = useTagsandMeQuery({
    variables: { merchantId: findMerchantId() },
  });
  const toast = useToast();

  const [, createFoodItem] = useCreateFoodItemMutation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  let [image, setImage] = React.useState("");
  let [banner, setBanner] = React.useState<string | undefined>(undefined);
  let [menuPhoto, setMenuPhoto] = React.useState("");
  const [, deleteFoodItem] = useDeleteFoodItemMutation();
  const [, changeFoodStock] = useChangeFoodStockMutation();

  const [, addMerchantLogo] = useAddMerchantLogoMutation();
  const [, addMerchantImage] = useAddMerchantImageMutation();
  const [, addItemImage] = useAddFoodImageMutation();

  let [fileToUpload, setFileToUpload] = useState<File>();
  let [imageSrc, setImageSrc] = useState("");
  let [logoToUpload, setlogoToUpload] = useState<File>();
  let [logoSrc, setLogoSrc] = useState("");
  let [itemSRC, setItemSRC] = useState("");

  const onMenuPhotoChange = (e: any) => {
    console.log(e.target.files[0]);
    setMenuPhoto((image = URL.createObjectURL(e.target.files[0])));
  };

  const readFile = (file: File) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.addEventListener("load", () => resolve(reader.result), false);
      reader.readAsDataURL(file);
    });
  };

  const initialInputs = {
    itemName: "",
    description: "",
    stock: 0,
    cost: 0,
    idMerchant: data?.me.merchant?.id ?? 0,
  };
  const formikInputs = [
    {
      name: "itemName",
      placeholder: "Prawn Curry",
      label: "Item Name",
    },
    {
      name: "description",
      placeholder: "Ingredients: ...",
      label: "Description",
    },
    {
      name: "stock",
      placeholder: "2",
      label: "How much stock available?",
    },
    {
      name: "cost",
      placeholder: "10.00",
      label: "Price",
    },
  ];

  let merchantTagSet: string[] = [];
  data?.merchantTags.forEach((e) => merchantTagSet.push(e.tagName));

  let body = (
    <VStack spacing={6}>
      (
      <MenuSlide
        imageUrl={
          data?.me.merchant?.imageUrl ? data?.me.merchant?.imageUrl : undefined
        }
        cuisine={merchantTagSet}
        location={
          data?.me?.merchant?.city ? data?.me?.merchant?.city : undefined
        }
        reviewCount={data?.me?.merchant?.reviewCount}
        rating={
          data?.me?.merchant?.averageRating
            ? data?.me?.merchant?.averageRating
            : undefined
        }
        avatarlogo={
          data?.me.merchant?.cplogo ? data?.me.merchant?.cplogo : undefined
        }
        merchantID={data?.me?.merchant?.id ? data?.me?.merchant?.id : undefined}
        name={data?.me?.merchant?.cpname}
        id={data?.me?.merchant?.id ? data?.me?.merchant?.id : 0}
      />
    </VStack>
  );

  let menu = (
    <VStack spacing={6} paddingBottom={"50px"}>
      <Table size="sm" width={"200px"}>
        <Thead>
          <Tr>
            {/* <Th display={["none", "revert"]}>Image</Th> */}
            <Th>Item Name</Th>
            <Th display={["none", "revert"]}>Description</Th>
            <Th textAlign={"center"}>Stock</Th>
            <Th isNumeric>Cost</Th>
            <Th isNumeric>Remove?</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data?.getMenu.map((p, value) => (
            <>
              <Tr key={value}>
                {/* <Td display={["none", "inline-grid"]}>
                  <Box
                    maxW="75px"
                    maxH="75px"
                    borderWidth="1px"
                    borderRadius="lg"
                    overflow="hidden"
                    width={"85vw"}
                    height={"85vw"}
                  >
                    <Image
                      maxHeight={"100px"}
                      width={"20vw"}
                      fit={"cover"}
                      src={p.imageUrl ? p.imageUrl : undefined}
                      alt={p.imageAlt ? p.imageAlt : undefined}
                    ></Image>
                  </Box>
                </Td> */}
                <Td>{p.itemName} </Td>
                <Td display={["none", "revert"]}>{p.description}</Td>
                <Td textAlign={"center"}>
                  {p.stock}
                  <HStack></HStack>
                </Td>
                <Td isNumeric textAlign={"center"}>
                  {p.cost}
                </Td>
                <Td>
                  {" "}
                  <HStack alignContent={"center"} justifyContent={"center"}>
                    <IconButton
                      colorScheme={"red"}
                      value={p.itemName}
                      aria-label="Menu"
                      icon={<HiMinus size={"15px"} />}
                      size={"sm"}
                      // width={"80px"}
                      // height={"30px"}
                      padding={"5px"}
                      variant={"outline"}
                      onClick={() => {
                        console.log("yes");
                        deleteFoodItem({
                          foodItemId: p.id,
                          idMerchant: Number(data.me.merchant?.id),
                        });
                      }}
                    />
                  </HStack>
                </Td>
              </Tr>
            </>
          ))}
        </Tbody>
      </Table>
    </VStack>
  );
  return (
    <Layout title="Explore">
      <Heading textAlign={"center"}>Your Account</Heading>

      <VStack justifyContent={"center"} alignContent={"center"} spacing={6}>
        <Box spacing={8} marginTop={"25px"} gridColumn={"auto"} p="20px">
          {body}
        </Box>
        <HStack>
          <Dropzone
            onDrop={async ([file]) => {
              let imageDataUrl: any = await readFile(file);

              setLogoSrc((logoSrc = imageDataUrl));

              addMerchantLogo({
                image: logoSrc,
              })
                .then((response) => console.log(response))
                .then(() =>
                  toast({
                    title: "Logo Changed.",
                    description: "Logo changed, refresh to see the change.",
                    status: "success",
                    duration: 9000,
                    isClosable: true,
                  })
                );
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
              addMerchantImage({ image: imageSrc })
                .then((response) => console.log(response))
                .then(() =>
                  toast({
                    title: "Image Changed.",
                    description: "Image changed, refresh to see the change.",
                    status: "success",
                    duration: 9000,
                    isClosable: true,
                  })
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
        <Heading>Your Items</Heading>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalContent
            maxW="800px"
            width={"80vw"}
            borderWidth="1px"
            borderRadius="lg"
            bg={"white"}
          >
            <ModalHeader>
              Add Item{" "}
              <Text fontWeight={300} fontSize={"13px"}>
                For the price of your item please just list the dollar amount,
                as 1 Token = $1.
              </Text>
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Formik
                initialValues={initialInputs}
                onSubmit={async (values, { setErrors }) => {
                  console.log(values);
                  values.cost = Number(values.cost);
                  values.stock = Number(values.stock);

                  const response = await createFoodItem(values);
                  const ItemId =
                    response.data?.createFoodItem[
                      response.data?.createFoodItem.length - 1
                    ].id;
                  if (ItemId) {
                    addItemImage({ image: itemSRC, foodItemId: ItemId }).then(
                      (response) => console.log(response)
                    );
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
                      <HStack>
                        <Avatar size={"lg"} src={itemSRC} />
                        <Dropzone
                          onDrop={async ([file]) => {
                            let imageDataUrl: any = await readFile(file);
                            setItemSRC((itemSRC = imageDataUrl));
                          }}
                          multiple={false}
                        >
                          {({ getRootProps, getInputProps }) => (
                            <div {...getRootProps({ className: "dropzone" })}>
                              <input {...getInputProps()} />
                              <Button colorScheme={"yellow"}>
                                Select an Image
                              </Button>
                            </div>
                          )}
                        </Dropzone>
                      </HStack>
                    </VStack>
                    <ModalFooter>
                      <Button
                        width={"100%"}
                        colorScheme="blue"
                        mr={3}
                        type="submit"
                        rightIcon={<MdPlusOne />}
                      >
                        Add Item
                      </Button>
                    </ModalFooter>
                  </Form>
                )}
              </Formik>
            </ModalBody>
          </ModalContent>
        </Modal>
        <HStack>
          <Button colorScheme={"teal"} onClick={onOpen}>
            Add Item
          </Button>
        </HStack>
        <>{menu}</>
      </VStack>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(MerchAccount);
