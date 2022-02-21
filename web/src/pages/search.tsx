import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import React, { useState } from "react";
import {
  Badge,
  Box,
  Button,
  Divider,
  Flex,
  Grid,
  Heading,
  HStack,
  IconButton,
  Tag,
  TagLabel,
  TagLeftIcon,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { Layout } from "../components/layout";
import { MenuSlide } from "../components/menuslide";
import { AddLocationIcon, Combobox, RemoveIcon } from "evergreen-ui";
import {
  MerchantsQuery,
  useAddTokensMutation,
  useAddUserCoordinatesMutation,
  useMerchantsQuery,
} from "../generated/graphql";
import { AddIcon } from "@chakra-ui/icons";
import ReactPlayer from "react-player/lazy";
import { getDistance, orderByDistance } from "geolib";

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
  const [{ data }] = useMerchantsQuery();
  const [played, setPlayed] = useState(0);
  let [watchedState, setWatchedState] = useState(false);
  let [watchedState2, setWatchedState2] = useState(false);
  let [watchedState3, setWatchedState3] = useState(false);
  const [lat, setLat] = useState<number>(0);
  const [lng, setLng] = useState<number>(0);
  const [, addTokens] = useAddTokensMutation();
  const [located, setLocated] = useState(false);
  const [locationLoad, setLocationLoad] = useState(false);
  const [, addUserCoordinates] = useAddUserCoordinatesMutation();
  const [status, setStatus] = useState("");
  const toast = useToast();

  const getLocation = () => {
    if (!navigator.geolocation) {
      setStatus("Geolocation is not supported by your browser");
    } else {
      setStatus("Locating...");
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setStatus("");
          setLat(position.coords.latitude);
          setLng(position.coords.longitude);
          setLocationLoad(true);
          // toast({
          //   title: "We found somewhere close!",
          //   description: "{} is {} km from you.",
          //   status: "info",
          //   duration: 9000,
          //   isClosable: true,
          // });
        },
        () => {
          setStatus("Unable to retrieve your location");
        }
      );
    }
  };

  const currDist = getDistance(
    { latitude: lat, longitude: lng },
    { latitude: 51.5103, longitude: 7.49347 },
    100
  );
  console.log(currDist * 0.000621371);
  // map of tags to their index
  let mapTags: Map<number, string> = new Map();
  let tagArr: string[] = [];
  // function to take data and map
  let populateTags = (
    newSet: Map<number, string>,
    data: MerchantsQuery | undefined
  ) => {
    data?.tags.map((e) => {
      newSet.set(e.id, e.tagName);
      tagArr.push(e.tagName);
    });

    return newSet;
  };

  populateTags(mapTags, data);

  let merchantTagIDs: Map<number, number[]> = new Map();
  let populateMerchantTagsIDs = (
    newSet: Map<number, number[] | undefined>,
    data: MerchantsQuery | undefined
  ) => {
    data?.allMerchantTags.map((e) => {
      let currentIDs = merchantTagIDs.get(e.merchantId);
      merchantTagIDs.set(e.merchantId, []);

      newSet.set(e.merchantId, [...(currentIDs ?? []), e.tagId]);
    });
    return newSet;
  };

  populateMerchantTagsIDs(merchantTagIDs, data);
  // console.log(merchantTagIDs);

  let [menu, setMenu] = useState(true);
  let [videos, setVideos] = useState(false);

  const menuUp = () => {
    setVideos((videos = false));
    setMenu((menu = true));
  };

  const videoUp = () => {
    setVideos((videos = true));

    setMenu((menu = false));
  };

  const found = (arr1: string[], arr2: string[]) => {
    return arr1.some((r) => arr2.indexOf(r) >= 0);
  };

  let body = null;
  let [tags, setTags] = useState([] as string[]);
  let rmbutton = null;
  if (tags.length >= 1) {
    rmbutton = (
      <IconButton
        aria-label="remove"
        children={<RemoveIcon />}
        onClick={() => setTags((tags = []))}
        colorScheme={"red"}
        height={"30px"}
      />
    );
  }
  if (menu == true) {
    body = (
      <>
        <VStack>
          <Combobox
            padding={10}
            openOnFocus
            width={"400px"}
            height={40}
            items={tagArr}
            onChange={(selected) => {
              if (selected !== null) {
                setTags([...tags, selected]);
              }
            }}
            placeholder="Search what you're looking for..."
            justifyContent="center"
          />
          <HStack>
            <Text>Find which vendors are nearest to you: </Text>
            <IconButton
              size={"md"}
              colorScheme={"teal"}
              children={<AddLocationIcon />}
              aria-label={"location"}
              onClick={getLocation}
            />
          </HStack>
        </VStack>

        <VStack pt={5} pb={5}>
          <Grid templateColumns="repeat(3, 1fr)" gap={6} maxW={"300px"}>
            {tags.map((tagName) => (
              <Tag
                size={"md"}
                variant="subtle"
                colorScheme="green"
                maxW={"120px"}
              >
                <TagLeftIcon boxSize="12px" as={AddIcon} />
                <TagLabel>{tagName}</TagLabel>
              </Tag>
            ))}
          </Grid>
          {rmbutton}
        </VStack>
        <VStack spacing={6}>
          {data?.merchants.map(function (p) {
            // console.log(p.id);
            let merchantTags: string[] = [];
            merchantTagIDs.get(p.id)?.forEach((e) => {
              const t = mapTags.get(e);
              if (t !== undefined) {
                merchantTags.push(t);
              }
            });

            if (found(merchantTags, tags)) {
              return (
                <>
                  <MenuSlide
                    name={p.cpname}
                    reviewCount={p.reviewCount}
                    rating={p.averageRating ? p.averageRating : undefined}
                    cuisine={merchantTags}
                    location={p.city ? p.city : undefined}
                    key={p.id}
                    id={p.id}
                    lat={p.latitude}
                    lng={p.longitude}
                    inputdist={{ latitude: lat, longitude: lng }}
                  />
                  <Divider />
                </>
              );
            } else if (!tags[0]) {
              return (
                <>
                  <MenuSlide
                    name={p.cpname}
                    reviewCount={p.reviewCount}
                    rating={p.averageRating ? p.averageRating : undefined}
                    cuisine={merchantTags}
                    location={p.city ? p.city : undefined}
                    key={p.id}
                    id={p.id}
                    lat={p.latitude}
                    lng={p.longitude}
                    inputdist={{ latitude: lat, longitude: lng }}
                  />
                  <Divider />
                </>
              );
            }
          })}
        </VStack>
      </>
    );
  }

  if (videos == true) {
    body = (
      <>
        <VStack
          spacing={10}
          pt={10}
          display={data?.me.merchant ? "none" : "initial"}
          justifyContent={"center"}
        >
          <VStack>
            <Text maxWidth={"300px"} textAlign="center">
              Watch vidoes and learn about new things, and collect tokens when
              you finish them.
            </Text>
            <Box>
              <Heading size={"sm"} textAlign={"left"} pb={2}>
                Learn Python
              </Heading>

              <ReactPlayer
                width={"400px"}
                url="https://www.youtube.com/embed/I2wURDqiXdM"
                light={true}
                key={1}
                config={{
                  youtube: {
                    playerVars: { showinfo: 1 },
                  },
                }}
                onEnded={() => {
                  setWatchedState((watchedState = true));
                }}
              />
              <Button
                isDisabled={watchedState ? false : true}
                colorScheme={"cyan"}
                size={"sm"}
                mt={2}
                onClick={() => {
                  addTokens({ tokens: 5 });
                  toast({
                    title: "Tokens Claimed.",
                    description: "Congrats! You should now have more tokens.",
                    status: "success",
                    duration: 9000,
                    isClosable: true,
                  });
                }}
              >
                Claim Tokens
              </Button>
            </Box>

            <Box>
              <Heading size={"sm"} textAlign={"left"} pb={2}>
                How to Manage Your Money
              </Heading>

              <ReactPlayer
                width={"400px"}
                url="https://www.youtube.com/watch?v=HQzoZfc3GwQ"
                light={true}
                key={1}
                config={{
                  youtube: {
                    playerVars: { showinfo: 1 },
                  },
                }}
                onEnded={() => {
                  setWatchedState2((watchedState2 = true));
                }}
              />
              <Button
                isDisabled={watchedState ? false : true}
                colorScheme={"cyan"}
                size={"sm"}
                mt={2}
                onClick={() => {
                  addTokens({ tokens: 5 });
                  toast({
                    title: "Tokens Claimed.",
                    description: "Congrats! You should now have more tokens.",
                    status: "success",
                    duration: 9000,
                    isClosable: true,
                  });
                }}
              >
                Claim Tokens
              </Button>
            </Box>
            <Box>
              <Heading size={"sm"} textAlign={"left"} pb={2}>
                Gordon's Quick & Simple Recipes | Gordon Ramsay
              </Heading>

              <ReactPlayer
                width={"400px"}
                url="https://www.youtube.com/watch?v=mhDJNfV7hjk"
                light={true}
                key={1}
                config={{
                  youtube: {
                    playerVars: { showinfo: 1 },
                  },
                }}
                onEnded={() => {
                  setWatchedState3((watchedState3 = true));
                }}
              />
              <Button
                isDisabled={watchedState ? false : true}
                colorScheme={"cyan"}
                size={"sm"}
                mt={2}
                onClick={() => {
                  addTokens({ tokens: 5 });
                  toast({
                    title: "Tokens Claimed.",
                    description: "Congrats! You should now have more tokens.",
                    status: "success",
                    duration: 9000,
                    isClosable: true,
                  });
                }}
              >
                Claim Tokens
              </Button>
            </Box>
          </VStack>
        </VStack>
      </>
    );
  }

  return (
    <Layout title="Explore">
      <Flex
        direction="column"
        justifyContent="center"
        alignItems="center"
        overflowX={"hidden"}
      >
        <HStack spacing={5}>
          <Badge
            colorScheme={"cyan"}
            variant={menu ? "solid" : "outline"}
            onClick={menuUp}
          >
            Food
          </Badge>
          <Badge
            colorScheme={"cyan"}
            variant={videos ? "solid" : "outline"}
            onClick={videoUp}
            display={data?.me.merchant ? "none" : "initial"}
          >
            Education
          </Badge>
        </HStack>

        <Box
          spacing={8}
          marginTop={"5px"}
          gridColumn={"auto"}
          p="20px"
          paddingBottom={"80px"}
        >
          {body}
        </Box>
      </Flex>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Search);
