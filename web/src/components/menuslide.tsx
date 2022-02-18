import { StarIcon } from "@chakra-ui/icons";
import {
  Box,
  Image,
  Badge,
  HStack,
  Avatar,
  useDisclosure,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Text,
  IconButton,
  Spacer,
  Stack,
  Heading,
  Icon,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { HiLocationMarker, HiPencil, HiPlus } from "react-icons/hi";
import { MdOutlineMyLocation, MdShoppingBasket } from "react-icons/md";
import { TiLocation } from "react-icons/ti";

import { useTagsandMeQuery } from "../generated/graphql";
import { setGlobalState, useGlobalState } from "../state/state";

enum Nothing {
  Nothing = "Nothing",
}
enum Url {
  Url = "Url",
}

interface MenuSlideProps {
  imageUrl?: string;
  imageAlt?: string;
  name?: string;
  reviewCount?: number;
  rating?: number;
  cuisine?: string[];
  location?: string;
  // merchantID?: string;
  merchantID?: number;
  route?: Url;
  menulist?: {
    item: string;
    description: string;
    imageUrl: string;
    price: number;
    itemID: string;
  }[];
  avatarlogo?: string;
  key?: number;
  modal?: boolean;
  badge?: string;
  scrt?: boolean;
  id: number;
}
let theBasket = [] as {
  imageUrl: string;
  itemName: string;
  description: string;
  cost: number;
  itemID: number;
}[];
export const MenuSlide: React.FC<MenuSlideProps> = ({
  imageAlt = "...",
  imageUrl = "https://i.ibb.co/ZYYqy2x/f0b1b4305b287bf541822022e1883694.jpg",
  name = "Merchant Name",
  reviewCount = 0,
  rating = 0,
  cuisine = [],
  location = "TS Food Security St.",
  avatarlogo,
  key,
  merchantID,
  modal = true,
  badge = "New",
  scrt = false,
  id,
}) => {
  const [currentBasket] = useGlobalState("userBasket");
  const [currentMerchant] = useGlobalState("basketMerchant");
  let currentLength: number = useGlobalState("userBasket")[0].length;
  let [basketLength, setBasketLength] = useState(currentLength);

  const [{ data, fetching }] = useTagsandMeQuery({
    variables: { merchantId: id },
  });

  const addToBasket = (item: {
    merchantId: number;
    imageUrl: string;
    itemName: string;
    description: string;
    cost: number;
    itemID: number;
  }) => {
    theBasket = [...theBasket, item];
    setGlobalState("basketMerchant", id);
    setGlobalState("userBasket", [...currentBasket, item]);
    setBasketLength(basketLength + 1);
    console.log(currentBasket);
  };

  const pushToReview = () => {
    setGlobalState("reviewRes", {
      imageUrl: imageUrl,
      imageAlt: imageAlt,
      name: name,
      reviewCount: reviewCount,
      rating: rating,
      cuisine: cuisine,
      location: location,
      merchantID: merchantID,
      avatarlogo: avatarlogo,
      key: key,
      modal: false,
      id: id,
    });

    router.push("/review");
  };

  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  let menu = null;
  let tagline = (
    <Box
      color="gray.500"
      fontWeight="semibold"
      letterSpacing="wide"
      fontSize="xs"
      textTransform="uppercase"
      ml="2"
    >
      {cuisine[0]}
    </Box>
  );
  if (scrt == true) {
    const dummyMenu = [
      {
        itemName: "Cheese Burger",
        imageUrl:
          "https://i.ibb.co/ZYYqy2x/f0b1b4305b287bf541822022e1883694.jpg",
        cost: 8,
        description: "Delicious Hamburger with Cheese",
        itemID: 34,
      },
      {
        itemName: "Fries",
        imageUrl:
          "https://i.ibb.co/ZYYqy2x/f0b1b4305b287bf541822022e1883694.jpg",
        price: 3,
        description:
          "Fried potatoes with choice of 2 sauces: Ketchup, Mayo, BBQ, Ranch.",
        itemNameID: 43,
      },
      {
        itemName: "Chocolate Milkshake",
        imageUrl:
          "https://i.ibb.co/ZYYqy2x/f0b1b4305b287bf541822022e1883694.jpg",
        price: 6,
        description: "Made with Whole Milk, and Chocolate Ice Cream.",
        itemID: 53,
      },
    ];
    menu = (
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalContent
          maxW="800px"
          width={"80vw"}
          borderWidth="1px"
          borderRadius="lg"
          bg={"white"}
        >
          <ModalHeader>Food Menu</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {dummyMenu?.map((p) => (
              <HStack spacing={2} p="5px" paddingBottom={"20px"}>
                <Box
                  maxW="80px"
                  borderWidth="1px"
                  borderRadius="lg"
                  overflow="hidden"
                >
                  <Image
                    maxHeight={"80px"}
                    width={"10vw"}
                    fit={"cover"}
                    src={p.imageUrl}
                  ></Image>
                </Box>

                <Stack textAlign={"left"}>
                  <Text fontWeight={"bold"} maxWidth={"200px"}>
                    {p.itemName}
                    {/* {p.itemID} */}
                  </Text>
                  <Text fontSize={"12px"} maxWidth={"200px"}>
                    {p.description}
                  </Text>
                </Stack>

                <Spacer />
                <Text>${p.price}</Text>
                <IconButton
                  colorScheme={"teal"}
                  aria-label="Menu"
                  icon={<HiPlus size={"20px"} />}
                  padding={"5px"}
                  onClick={() => {
                    addToBasket({
                      merchantId: 0,
                      imageUrl: p.imageUrl,
                      itemName: p.itemName,
                      description: p.description,
                      cost: p.cost ? p.cost : 0,
                      itemID: p.itemID ? p.itemID : 0,
                    });
                  }}
                />
              </HStack>
            ))}
          </ModalBody>

          <ModalFooter>
            <Button
              width={"100%"}
              colorScheme="teal"
              mr={3}
              onClick={() => {
                pushToReview();
              }}
              leftIcon={<HiPencil />}
            >
              Leave a Review
            </Button>
            <Button
              width={"100%"}
              colorScheme="blue"
              mr={3}
              onClick={() => {
                router.push("/checkout");
              }}
              rightIcon={<MdShoppingBasket />}
            >
              Basket ({basketLength})
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  }
  if (modal == true && scrt == false) {
    menu = (
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalContent
          maxW="800px"
          width={"80vw"}
          borderWidth="1px"
          borderRadius="lg"
          bg={"white"}
        >
          <ModalHeader>
            {data?.merchant?.cpname}'s Food Menu{" "}
            <Text fontWeight={300} fontSize={"13px"}>
              {data?.merchant?.location}
            </Text>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {id == currentMerchant || currentMerchant == 0 ? null : (
              <HStack>
                <Text>You are currently ordering from another Store: </Text>
                <Button
                  colorScheme={"red"}
                  onClick={() => {
                    setGlobalState("userBasket", []);
                    setGlobalState("basketMerchant", 0);
                  }}
                >
                  New Basket
                </Button>
              </HStack>
            )}
            {data?.getMenu?.map((p) => (
              <HStack spacing={2} p="5px" paddingBottom={"20px"}>
                <Box
                  maxW="80px"
                  borderWidth="1px"
                  borderRadius="lg"
                  overflow="hidden"
                >
                  <Image
                    maxHeight={"80px"}
                    width={"10vw"}
                    fit={"cover"}
                    src={p.imageUrl}
                    alt={p.imageAlt}
                  ></Image>
                </Box>

                <Stack textAlign={"left"}>
                  <Text fontWeight={"bold"} maxWidth={"200px"}>
                    {p.itemName}
                    {/* {p.itemID} */}
                  </Text>
                  <Text fontSize={"12px"} maxWidth={"200px"}>
                    {p.description}
                  </Text>
                </Stack>

                <Spacer />
                <Text>${p.cost}</Text>
                <IconButton
                  colorScheme={
                    id == currentMerchant || currentMerchant == 0
                      ? "teal"
                      : "red"
                  }
                  isDisabled={data.me.merchant ? true : false}
                  aria-label="Menu"
                  icon={<HiPlus size={"20px"} />}
                  padding={"5px"}
                  onClick={() => {
                    if (id == currentMerchant || currentMerchant == 0) {
                      addToBasket({
                        merchantId: id,
                        imageUrl: p.imageUrl,
                        itemName: p.itemName,
                        description: p.description,
                        cost: p.cost,
                        itemID: p.id,
                      });
                    } else {
                    }
                  }}
                />
              </HStack>
            ))}
          </ModalBody>

          <ModalFooter>
            <Button
              width={"100%"}
              colorScheme="teal"
              mr={3}
              onClick={() => {
                pushToReview();
              }}
              leftIcon={<HiPencil />}
              isDisabled={data?.me.merchant ? true : false}
            >
              Leave a Review
            </Button>
            <Button
              width={"100%"}
              colorScheme="blue"
              mr={3}
              onClick={() => {
                router.push("/checkout");
              }}
              rightIcon={<MdShoppingBasket />}
            >
              Basket ({basketLength})
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  }

  if (cuisine.length > 1) {
    tagline = (
      <Box
        color="gray.500"
        fontWeight="semibold"
        letterSpacing="wide"
        fontSize="xs"
        textTransform="uppercase"
        ml="2"
      >
        {cuisine[0]} &bull; {cuisine[1]}
      </Box>
    );
  }
  if (cuisine.length > 2) {
    tagline = (
      <Box
        color="gray.500"
        fontWeight="semibold"
        letterSpacing="wide"
        fontSize="xs"
        textTransform="uppercase"
        ml="2"
      >
        {cuisine[0]} &bull; {cuisine[1]} &bull; + {cuisine.length - 2}
      </Box>
    );
  }
  return (
    <>
      <Box
        maxW="sm"
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        onClick={onOpen}
        // onClick={() => router.push(route)}
      >
        <Image
          maxHeight={"250px"}
          width={"sm"}
          src={imageUrl}
          alt={imageAlt}
          fit={"cover"}
        />

        <Box p="6">
          <Box display="flex" alignItems="baseline">
            <Badge borderRadius="full" px="2" colorScheme="teal">
              {badge}
            </Badge>

            {tagline}
          </Box>
          <HStack paddingTop={"10px"}>
            {avatarlogo ? (
              <Avatar src={avatarlogo}></Avatar>
            ) : (
              <Avatar src={avatarlogo}></Avatar>
            )}

            <Box
              mt="1"
              fontWeight="semibold"
              as="h4"
              lineHeight="tight"
              isTruncated
            >
              {name}
            </Box>
          </HStack>

          <Box>
            <Box as="span" color="gray.600" fontSize="sm">
              {location}
            </Box>
          </Box>
          <Box>
            <HStack>
              <Icon as={MdOutlineMyLocation} />
              <Text color="gray.600" fontSize="sm">
                2.0 miles
              </Text>
            </HStack>
          </Box>

          <Box display="flex" mt="2" alignItems="center">
            {Array(5)
              .fill("")
              .map((_, i) => (
                <StarIcon
                  key={i}
                  color={i < rating ? "teal.500" : "gray.300"}
                />
              ))}
            <Box as="span" ml="2" color="gray.600" fontSize="sm">
              {reviewCount} reviews
            </Box>
          </Box>
        </Box>
      </Box>
      {menu}
    </>
  );
};
