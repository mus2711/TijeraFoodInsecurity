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
  ModalOverlay,
  Text,
  IconButton,
  Spacer,
  VStack,
  Stack,
  PopoverArrow,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverFooter,
  PopoverBody,
  PopoverTrigger,
} from "@chakra-ui/react";
import { EditIcon, PlusIcon, Popover } from "evergreen-ui";
import { Form } from "formik";
import { useRouter } from "next/router";
import { useState } from "react";
import { HiOutlineUserGroup, HiPencil, HiPlus } from "react-icons/hi";
import { MdShoppingBasket } from "react-icons/md";
import { createGlobalState } from "react-hooks-global-state";
import { setGlobalState, useGlobalState } from "../state/state";

interface MenuSlideProps {
  imageUrl: string;
  imageAlt: string;
  name: string;
  reviewCount: number;
  rating: number;
  cuisine: string[];
  location: string;
  route?: Url;
  menulist: {
    item: string;
    description: string;
    foodpic: string;
    price: number;
    itemID: string;
  }[];
  avatarlogo?: string;
  key: number;
}
let theBasket = [] as {
  picture: string;
  title: string;
  desc: string;
  price: number;
  itemID: string;
}[];
export const MenuSlide: React.FC<MenuSlideProps> = ({
  imageAlt,
  imageUrl,
  name,
  reviewCount,
  rating,
  cuisine,
  location,
  route,
  menulist,
  avatarlogo,
  key,
}) => {
  const [currentBasket] = useGlobalState("userBasket");
  let currentLength: number = useGlobalState("userBasket")[0].length;
  let [basketLength, setBasketLength] = useState(currentLength);

  const addToBasket = (item: {
    picture: string;
    title: string;
    desc: string;
    price: number;
    itemID: string;
  }) => {
    theBasket = [...theBasket, item];
    setGlobalState("userBasket", [...currentBasket, item]);
    setBasketLength(basketLength + 1);
    console.log(currentBasket);
  };

  const bl = "#5998A0";
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
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
              New
            </Badge>
            <Box
              color="gray.500"
              fontWeight="semibold"
              letterSpacing="wide"
              fontSize="xs"
              textTransform="uppercase"
              ml="2"
            >
              {cuisine[0]} &bull; {cuisine[1]} &bull; +{cuisine.length - 2}
            </Box>
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
            {/* {property.formattedPrice} */}
            <Box as="span" color="gray.600" fontSize="sm">
              {location}
            </Box>
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
            {menulist.map((p) => (
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
                    src={p.foodpic}
                  ></Image>
                </Box>

                <Stack textAlign={"left"}>
                  <Text fontWeight={"bold"} maxWidth={"200px"}>
                    {p.item}
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
                      picture: p.foodpic,
                      title: p.item,
                      desc: p.description,
                      price: p.price,
                      itemID: p.itemID,
                    });
                  }}
                />
                <IconButton
                  colorScheme={"teal"}
                  aria-label="Menu"
                  icon={<HiPencil size={"20px"} />}
                  padding={"5px"}
                  onClick={() => {}}
                />
                {/* <Button padding={"20px"} colorScheme={"teal"}>
                  Review
                </Button> */}
              </HStack>
            ))}
          </ModalBody>

          <ModalFooter>
            <Button width={"100%"} colorScheme="teal" mr={3} onClick={onClose}>
              Checkout
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
    </>
  );
};
