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
} from "@chakra-ui/react";
import { PlusIcon } from "evergreen-ui";
import { useRouter } from "next/router";
import { HiOutlineUserGroup, HiPencil, HiPlus, HiX } from "react-icons/hi";
import { MdShoppingBasket } from "react-icons/md";

interface FoodSlideProps {
  menulist: {
    item: string;
    description: string;
    foodpic: string;
    price: number;
  }[];
}

export const Foodslide: React.FC<FoodSlideProps> = ({ menulist }) => {
  const bl = "#5998A0";
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialInputs = {
    description: "",
    item: "",
    foodpic: "",
    name: "",
  };
  const formikInputs = [
    {
      name: "item",
      placeholder: "Prawn Curry",
      label: "Dish Name",
    },
    {
      name: "description",
      placeholder: "Ingredients:...",
      label: "Description",
    },
    {
      name: "foodpic",
      placeholder: "...",
      label: "Upload Image",
    },
    {
      name: "price",
      placeholder: "£10.00",
      label: "Price",
    },
  ];
  return (
    <Box
      // maxW="sm"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
    >
      <VStack spacing={2} p="5px" paddingBottom={"20px"}>
        {menulist.map((p) => (
          <>
            <Box
              maxW="300px"
              borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
              width={"85vw"}
            >
              <Image
                maxHeight={"80px"}
                width={"20vw"}
                fit={"cover"}
                src={p.foodpic}
              ></Image>
            </Box>

            <Stack textAlign={"left"}>
              <Text fontWeight={"bold"} maxWidth={"200px"}>
                {p.item}
              </Text>
              <Text fontSize={"12px"} maxWidth={"200px"}>
                {p.description}
              </Text>
            </Stack>

            <Spacer />
            <Text>${p.price}</Text>
            <HStack>
              <IconButton
                colorScheme={"red"}
                aria-label="Menu"
                icon={<HiX size={"20px"} />}
                padding={"5px"}
              />
              <IconButton
                colorScheme={"teal"}
                aria-label="Menu"
                icon={<HiPencil size={"20px"} />}
                padding={"5px"}
              />
            </HStack>
          </>
        ))}
      </VStack>
    </Box>
  );
};