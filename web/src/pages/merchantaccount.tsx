import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import React from "react";
import {
  Avatar,
  Box,
  Button,
  Heading,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { MdPlusOne } from "react-icons/md";
import { MenuSlide } from "../components/menuslide";
import { Foodslide } from "../components/foodslide";
import { Formik, Form } from "formik";
import { useRouter } from "next/router";
import { Inputfield } from "../components/inputfield";
import {
  useCreateFoodItemMutation,
  useTagsandMeQuery,
} from "../generated/graphql";
import { useIsAuthMerchant } from "../../utils/useIsAuthMerchant";
import { Layout } from "../components/layout";
import { findMerchantId } from "../functions/findMerchantId";

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
  const [, createFoodItem] = useCreateFoodItemMutation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  let [image, setImage] = React.useState("");
  let [banner, setBanner] = React.useState<string | undefined>(undefined);
  let [menuPhoto, setMenuPhoto] = React.useState("");

  const onImageChange = (e: any) => {
    console.log(e.target.files[0]);
    setImage((image = URL.createObjectURL(e.target.files[0])));
  };

  const onBannerChange = (e: any) => {
    console.log(e.target.files[0]);
    setBanner((image = URL.createObjectURL(e.target.files[0])));
  };
  const onMenuPhotoChange = (e: any) => {
    console.log(e.target.files[0]);
    setMenuPhoto((image = URL.createObjectURL(e.target.files[0])));
  };

  const initialInputs = {
    itemName: "",
    description: "",
    stock: 0,
    cost: 0,
    imageAlt: "",
    imageURL: "",
  };
  const formikInputs = [
    {
      name: "itemName",
      placeholder: "Prawn Curry",
      label: "Item Name",
    },
    {
      name: "description",
      placeholder: "Ingredients:...",
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
    {
      name: "imageAlt",
      placeholder: "Photo of Prawn Curry...",
      label: "Image Description",
    },
  ];

  let merchantTagSet: string[] = [];
  data?.merchantTags.forEach((e) => merchantTagSet.push(e.tagName));
  console.log(merchantTagSet);

  let body = (
    <VStack spacing={6}>
      (
      <MenuSlide
        imageUrl={banner}
        cuisine={merchantTagSet}
        location={
          data?.me?.merchant?.location
            ? data?.me?.merchant?.location
            : undefined
        }
        reviewCount={data?.me?.merchant?.reviewCount}
        rating={
          data?.me?.merchant?.averageRating
            ? data?.me?.merchant?.averageRating
            : undefined
        }
        avatarlogo={image}
        merchantID={data?.me?.merchant?.id ? data?.me?.merchant?.id : undefined}
        name={data?.me?.merchant?.cpname}
      />
    </VStack>
  );

  let menu = (
    <VStack spacing={6} paddingBottom={"50px"}>
      {data?.getMenu.map((p) => (
        <Foodslide menulist={p}></Foodslide>
      ))}
    </VStack>
  );
  return (
    <Layout title="Explore">
      <Heading textAlign={"center"}>Your Account</Heading>

      <VStack justifyContent={"center"} alignContent={"center"} spacing={6}>
        <Box spacing={8} marginTop={"25px"} gridColumn={"auto"} p="20px">
          {body}
        </Box>
        <HStack paddingTop={"0px"}>
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
                  values.cost = Number(values.cost);
                  values.stock = Number(values.stock);
                  const response = await createFoodItem(values);
                  console.log(response);
                  if (response.data?.createFoodItem.id) {
                    console.log(response.data?.createFoodItem.id);
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
                        <Avatar src={menuPhoto} />
                        <VStack>
                          <Button
                            size="md"
                            colorScheme={"cyan"}
                            position={"absolute"}
                          >
                            Pick Photo
                          </Button>
                          <Input
                            // size={"md"}
                            type={"file"}
                            accept="image/*"
                            onClick={() => console.log("yes")}
                            className="inputPhoto"
                            onChange={onMenuPhotoChange}
                            placeholder="Pick an Image"
                            borderWidth={"0px"}
                            opacity={0}
                            width="120px"
                            // height={"100px"}
                          />
                        </VStack>
                      </HStack>
                    </VStack>
                    <ModalFooter>
                      <Button
                        width={"100%"}
                        colorScheme="blue"
                        mr={3}
                        // onClick={() => {}}
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
          <Button
            colorScheme="green"
            mr={3}
            onClick={onClose}
            rightIcon={<MdPlusOne />}
          >
            Save
          </Button>
        </HStack>
        <>{menu}</>
      </VStack>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(MerchAccount);
