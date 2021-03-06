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
import {
  AddLocationIcon,
  Combobox,
  ConsoleIcon,
  RemoveIcon,
} from "evergreen-ui";
import {
  MerchantsQuery,
  useAddTokensandWatchVideoMutation,
  useAddTokensMutation,
  useAddUserCoordinatesMutation,
  useMerchantsQuery,
  useUserWatchedVideosQuery,
} from "../generated/graphql";
import { AddIcon } from "@chakra-ui/icons";
import ReactPlayer from "react-player/lazy";
import { getDistance } from "geolib";

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
  const [{ data, error }] = useMerchantsQuery();
  // if (data?.me == null) {
  //   throw new Error("User not logged in");
  //   // try {
  //   //   console.log("User not logged in")
  //   // }
  //   // catch (e) {
  //   //   console.log(e)
  //   // }
  // }
  const [lat, setLat] = useState<number>(0);
  const [lng, setLng] = useState<number>(0);
  const [, addTokens] = useAddTokensMutation();
  const [, addTokenandWatchVideo] = useAddTokensandWatchVideoMutation();
  const [located, setLocated] = useState(false);
  const [locationLoad, setLocationLoad] = useState(false);
  const [, addUserCoordinates] = useAddUserCoordinatesMutation();
  const [status, setStatus] = useState("");
  const [closestMerch, setClosestMerch] = useState<string | undefined>(
    undefined
  );
  const [closestDistance, setClosestDistance] = useState<string | undefined>(
    undefined
  );
  const toast = useToast();

  const watchedVid = data?.userWatchedVideos.map((val) => val.id);

  let merchantDistance: number[][] = [];
  const merchToCoord: any[] = [];
  const coordToDist = new Map();

  const findClosestMerchant = async () => {
    if (lat !== 0 && lng !== 0) {
      data?.merchants.forEach((merchant, value) => {
        if (merchant.latitude && merchant.longitude) {
          let location = [merchant.latitude, merchant.longitude];
          merchantDistance = [...merchantDistance, location];

          merchToCoord.push({
            key: merchant.latitude + merchant.longitude,
            value: merchant.cpname,
          });

          coordToDist.set(
            getDistance(
              { latitude: lat, longitude: lng },
              { latitude: merchant.latitude, longitude: merchant.longitude },
              100
            ),
            [merchant.latitude, merchant.longitude]
          );

          let distances = merchantDistance.map((val) =>
            getDistance(
              { latitude: lat, longitude: lng },
              { latitude: val[0], longitude: val[1] },
              100
            )
          );
          const minDist = Math.min(...distances);
          const minCoord = coordToDist.get(minDist);
          for (const [coord, merchant] of Object.entries(merchToCoord)) {
            if (merchant.key === minCoord[0] + minCoord[1]) {
              setClosestMerch(merchant.value);
            }
          }

          setClosestDistance((minDist * 0.001).toPrecision(4));
        }
      });
    }
  };
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

          findClosestMerchant().then((val) => {
            if (closestMerch && closestDistance) {
              toast({
                title: "We found somewhere close!",
                description: `${closestMerch} is ${closestDistance} km from you.`,
                status: "info",
                duration: 9000,
                isClosable: true,
              });
            }
          });
        },
        () => {
          setStatus("Unable to retrieve your location");
        }
      );
    }
  };

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
                    avatarlogo={p.cplogo ? p.cplogo : undefined}
                    imageUrl={p.imageUrl ? p.imageUrl : undefined}
                    imageAlt={p.imageAlt ? p.imageAlt : undefined}
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
                    location={p.city ? p.address1 + ", " + p.city : undefined}
                    key={p.id}
                    id={p.id}
                    lat={p.latitude}
                    lng={p.longitude}
                    inputdist={{ latitude: lat, longitude: lng }}
                    avatarlogo={p.cplogo ? p.cplogo : undefined}
                    imageUrl={p.imageUrl ? p.imageUrl : undefined}
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
        <VStack spacing={6}>
          <Text maxWidth={"300px"} textAlign="center">
            Watch vidoes and learn about new things, and collect tokens when you
            finish them.
          </Text>
          {data?.videos.map(function (p) {
            return (
              <>
                <Box>
                  <Heading size={"sm"} textAlign={"left"} pb={2}>
                    {p.title}
                  </Heading>

                  <ReactPlayer
                    width={"400px"}
                    url={p.videoUrl ? p.videoUrl : undefined}
                    light={true}
                    key={1}
                    config={{
                      youtube: {
                        playerVars: { showinfo: 1 },
                      },
                    }}
                    onEnded={() => {
                      if (data.me.user) {
                        if (!watchedVid?.includes(p.id)) {
                          addTokenandWatchVideo({
                            tokens: p.tokens,
                            videoId: p.id,
                          });
                          toast({
                            title: "Tokens Claimed.",
                            description:
                              "Congrats! You should now have more tokens.",
                            status: "success",
                            duration: 9000,
                            isClosable: true,
                          });
                        } else {
                          toast({
                            title: "Tokens not claimed",
                            description: "You've already watched this video.",
                            status: "info",
                            duration: 9000,
                            isClosable: true,
                          });
                        }
                      }
                    }}
                  />
                </Box>
              </>
            );
          })}
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
