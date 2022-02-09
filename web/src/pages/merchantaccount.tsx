import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import React from "react";
import {
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
import { useTagsandMeQuery } from "../generated/graphql";
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
  console.log(data?.getMenu);

  const { isOpen, onOpen, onClose } = useDisclosure();
  let [image, setImage] = React.useState("");
  let [banner, setBanner] = React.useState<string | undefined>(undefined);

  const onImageChange = (e: any) => {
    console.log(e.target.files[0]);
    setImage((image = URL.createObjectURL(e.target.files[0])));
  };

  const onBannerChange = (e: any) => {
    console.log(e.target.files[0]);
    setBanner((image = URL.createObjectURL(e.target.files[0])));
  };

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
        // avatarlogo={files?.source || data?.me?.merchant?.cplogo}
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
                // onSubmit={async (values, { setErrors }) => {
                //   console.log(values);
                //   const response = await registerm(values);
                //   console.log(response);
                //   if (response.data?.registerm.errors) {
                //     setErrors(toErrorMap(response.data.registerm.errors));
                //   } else if (response.data?.registerm.merchant) {
                //     router.push("/");
                //   }
                // }}
                onSubmit={() => {}}
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
