import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import React, { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Divider,
  Flex,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  SimpleGrid,
  Stack,
  Text,
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
} from "react-icons/md";
import { MenuSlide } from "../components/menuslide";
import { Combobox } from "evergreen-ui";
import { useMerchantsQuery } from "../generated/graphql";

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
    merchantID: "df3d332",
    menulist: [
      {
        item: "Cheese Burger",
        foodpic:
          "https://i.ibb.co/ZYYqy2x/f0b1b4305b287bf541822022e1883694.jpg",
        price: 8,
        description: "Delicious Hamburger with Cheese",
        itemID: "039043",
      },
      {
        item: "Fries",
        foodpic:
          "https://i.ibb.co/ZYYqy2x/f0b1b4305b287bf541822022e1883694.jpg",
        price: 3,
        description:
          "Fried potatoes with choice of 2 sauces: Ketchup, Mayo, BBQ, Ranch.",
        itemID: "654043",
      },
      {
        item: "Chocolate Milkshake",
        foodpic:
          "https://i.ibb.co/ZYYqy2x/f0b1b4305b287bf541822022e1883694.jpg",
        price: 6,
        description: "Made with Whole Milk, and Chocolate Ice Cream.",
        itemID: "12343",
      },
    ],
    avatarlogo: "https://bit.ly/dan-abramov",
  },
  {
    imageUrl: "https://i.ibb.co/ZYYqy2x/f0b1b4305b287bf541822022e1883694.jpg",
    imageAlt: "Rear view of modern home with pool",
    name: "Chicken Cottage",
    reviewCount: 84,
    rating: 3,
    cuisine: ["Halal", "Chicken", "Fries"],
    location: "Deleware St. 10, New York, N78999",
    route: "/",
    key: 2,
    merchantID: "dfjhkdsd332",
    menulist: [
      {
        item: "bg",
        foodpic:
          "https://i.ibb.co/ZYYqy2x/f0b1b4305b287bf541822022e1883694.jpg",
        price: 3,
        description:
          "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Accusamus ratione eaque nihil corrupti non nam necessitatibus",
        itemID: "039543",
      },
      {
        item: "bh",
        foodpic:
          "https://i.ibb.co/ZYYqy2x/f0b1b4305b287bf541822022e1883694.jpg",
        price: 4,
        description:
          "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Accusamus ratione eaque nihil corrupti non nam necessitatibus",
        itemID: "039435043",
      },
      {
        item: "tt",
        foodpic:
          "https://i.ibb.co/ZYYqy2x/f0b1b4305b287bf541822022e1883694.jpg",
        price: 2,
        description:
          "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Accusamus ratione eaque nihil corrupti non nam necessitatibus",
        itemID: "03ewre9043",
      },
    ],
  },
];

const Search = () => {
  const [{ data, fetching }] = useMerchantsQuery();
  let [menu, setMenu] = useState(true);
  let [photos, setPhotos] = useState(false);
  let [videos, setVideos] = useState(false);
  let [loc, setLoc] = useState(false);

  const menuUp = () => {
    setPhotos((menu = false));
    setVideos((videos = false));
    setLoc((loc = false));
    setMenu((photos = true));
  };
  const photoUp = () => {
    setPhotos((menu = true));
    setVideos((videos = false));
    setLoc((loc = false));
    setMenu((photos = false));
  };

  const videoUp = () => {
    setPhotos((menu = false));
    setVideos((videos = true));
    setLoc((loc = false));
    setMenu((photos = false));
  };

  const locUp = () => {
    setPhotos((menu = false));
    setVideos((videos = false));
    setLoc((loc = true));
    setMenu((photos = false));
  };
  let body = null;

  if (menu == true) {
    body = (
      <Stack spacing={6}>
        {/* {datalist.map((p) => (
          <>
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
              merchantID={p.merchantID}
            />
            <Divider />
          </>
        ))} */}
        {data?.merchants.map((p) => (
          <>
            <MenuSlide
              imageUrl={p.imageUrl}
              imageAlt={p.imageAlt}
              name={p.cpname}
              reviewCount={p.reviewCount}
              rating={p.averageRating}
              // cuisine={p.cuisine}
              // menulist={p.menulist}
              location={p.location}
              avatarlogo={p.cplogo}
              merchantID={p.id}
            />
            <Divider />
          </>
        ))}
      </Stack>
    );
  }
  if (photos == true) {
    body = <Button>Photos</Button>;
  }
  if (videos == true) {
    body = <Button>Videos</Button>;
  }
  if (loc == true) {
    body = <Button>Loc</Button>;
  }
  return (
    <Layout title="Explore">
      <Flex direction="column" justifyContent="center" alignItems="center">
        <Combobox
          openOnFocus
          width="100%"
          height={40}
          items={["Banana", "Orange", "Apple", "Mango"]}
          onChange={(selected) => console.log(selected)}
          placeholder="Fruit"
        />

        <Flex
          direction={"row"}
          mt={6}
          alignItems={"center"}
          justifyContent={"center"}
          maxWidth={"85vw"}
        >
          <Box padding={"1vw"}>
            <IconButton
              borderColor={"#5998A0"}
              variant="outline"
              isRound={true}
              aria-label={"yes"}
              onClick={menuUp}
            >
              <MdMenu size={"20px"} color="#5998A0" />
            </IconButton>
          </Box>
          {/* <Box padding={"1vw"}>
            <IconButton
              borderColor={"#5998A0"}
              variant="outline"
              isRound={true}
              aria-label={"yes"}
              onClick={photoUp}
            >
              <MdCamera size={"20px"} color="#5998A0" />
            </IconButton>
          </Box> */}
          <Box padding={"1vw"}>
            <IconButton
              borderColor={"#5998A0"}
              variant="outline"
              isRound={true}
              aria-label={"yes"}
              onClick={videoUp}
            >
              <MdVideocam size={"20px"} color="#5998A0" />
            </IconButton>
          </Box>
          <Box padding={"1vw"}>
            <IconButton
              borderColor={"#5998A0"}
              variant="outline"
              isRound={true}
              aria-label={"yes"}
              onClick={locUp}

              // backgroundColor={post.voteStatus === 1 ? "yellowgreen" : undefined}
            >
              <MdLocationOn size={"20px"} color="#5998A0" />
            </IconButton>
          </Box>
        </Flex>
        {/* <SimpleGrid columns={[1, null, 3]} spacing="40px"> */}
        <Box
          spacing={8}
          marginTop={"25px"}
          gridColumn={"auto"}
          p="20px"
          paddingBottom={"80px"}
        >
          {body}
        </Box>
        {/* </SimpleGrid> */}
      </Flex>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Search);
