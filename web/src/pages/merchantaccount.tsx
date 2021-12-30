import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import React, { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  SimpleGrid,
  Spacer,
  Stack,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { Layout } from "../components/layout";
import {
  MdLocationOn,
  MdSearch,
  MdKeyboardVoice,
  MdMenu,
  MdCamera,
  MdVideocam,
  MdOutlineLocationSearching,
  MdShoppingBasket,
  MdPlusOne,
} from "react-icons/md";
import { MenuSlide } from "../components/menuslide";
import { Foodslide } from "../components/foodslide";
import { HiPlus } from "react-icons/hi";
import { Formik, Form } from "formik";
import router from "next/router";
import { toErrorMap } from "../../utils/toErrorMap";
import { DblStandardButton } from "../components/DblStandardButton";
import { Inputfield } from "../components/inputfield";
import { SignInOptions } from "../components/SignInOptions";
import register from "./register";
import { useRegistermMutation } from "../generated/graphql";
import { MerchLayout } from "../components/merchLayout";

const bl = "#5998A0";

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
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [, registerm] = useRegistermMutation();
  const initialInputs = {
    description: "",
    item: "",
    foodpic: "",
    name: "",
    itemID: "",
  };
  const formikInputs = [
    {
      name: "item",
      placeholder: "Prawn Curry",
      label: "Dish Name",
      itemID: "984375",
    },
    {
      name: "description",
      placeholder: "Ingredients:...",
      label: "Description",
      itemID: "fg84375",
    },
    {
      name: "foodpic",
      placeholder: "...",
      label: "Upload Image",
      itemID: "984575",
    },
    {
      name: "price",
      placeholder: "£10.00",
      label: "Price",
      itemID: "4375",
    },
  ];
  let body = (
    <VStack spacing={6}>
      {datalist.map((p) => (
        <MenuSlide
          imageUrl={p.imageUrl}
          imageAlt={p.imageAlt}
          name={p.name}
          reviewCount={p.reviewCount}
          rating={p.rating}
          cuisine={p.cuisine}
          menulist={p.menulist}
          location={p.location}
          avatarlogo={p.avatarlogo}
          key={p.key}
          modal={false}
        />
      ))}
    </VStack>
  );

  let menu = (
    <VStack spacing={6}>
      {datalist.map((p) => (
        <Foodslide menulist={p.menulist}></Foodslide>
      ))}
    </VStack>
  );

  return (
    <MerchLayout title="Explore">
      <Heading textAlign={"center"}>Your Account</Heading>

      <VStack justifyContent={"center"} alignContent={"center"} spacing={6}>
        <Box spacing={8} marginTop={"25px"} gridColumn={"auto"} p="20px">
          {body}
        </Box>
        <Heading>Your Items</Heading>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalContent
            maxW="800px"
            width={"80vw"}
            borderWidth="1px"
            borderRadius="lg"
            bg={"white"}
          >
            <ModalHeader>Add Item</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Formik
                initialValues={initialInputs}
                onSubmit={async (values, { setErrors }) => {
                  console.log(values);
                  const response = await registerm(values);
                  console.log(response);
                  if (response.data?.registerm.errors) {
                    setErrors(toErrorMap(response.data.registerm.errors));
                  } else if (response.data?.registerm.merchant) {
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
                  </Form>
                )}
              </Formik>
            </ModalBody>

            <ModalFooter>
              <Button
                width={"100%"}
                colorScheme="blue"
                mr={3}
                onClick={onClose}
                rightIcon={<MdPlusOne />}
              >
                Add Item
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
        <Button colorScheme={"teal"} onClick={onOpen}>
          Add Item
        </Button>
        <Button
          colorScheme="green"
          mr={3}
          onClick={onClose}
          rightIcon={<MdPlusOne />}
        >
          Save
        </Button>
        <>{menu}</>
      </VStack>
    </MerchLayout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(MerchAccount);
