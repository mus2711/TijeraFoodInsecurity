import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import React, { useState } from "react";
import {
  Box,
  Button,
  Divider,
  Flex,
  HStack,
  IconButton,
  Tag,
  TagLabel,
  TagLeftIcon,
  VStack,
} from "@chakra-ui/react";
import { Layout } from "../components/layout";
import { MdMenu, MdVideocam } from "react-icons/md";
import { MenuSlide } from "../components/menuslide";
import { Combobox, RemoveIcon } from "evergreen-ui";
import { MerchantsQuery, useMerchantsQuery } from "../generated/graphql";
import { AddIcon } from "@chakra-ui/icons";
import { ppid } from "process";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";

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
  console.log(mapTags);

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
  console.log(merchantTagIDs);

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
        </VStack>
        <HStack p={"20px"}>
          {tags.map((tagName) => (
            <Tag
              size={"md"}
              variant="subtle"
              colorScheme="green"
              // onClick={setTags([""])}
            >
              <TagLeftIcon boxSize="12px" as={AddIcon} />
              <TagLabel>{tagName}</TagLabel>
            </Tag>
          ))}
          {rmbutton}
        </HStack>
        <VStack spacing={6}>
          {data?.merchants.map(function (p) {
            console.log(p.id);
            let merchantTags: string[] = [];
            merchantTagIDs.get(p.id)?.forEach((e) => {
              const t = mapTags.get(e);
              if (t !== undefined) {
                merchantTags.push(t);
              }
            });

            console.log(merchantTags);
            if (found(merchantTags, tags)) {
              return (
                <>
                  <MenuSlide
                    // imageUrl={p.imageUrl}
                    // imageAlt={p.imageAlt}
                    name={p.cpname}
                    reviewCount={p.reviewCount}
                    rating={p.averageRating ? p.averageRating : undefined}
                    cuisine={merchantTags}
                    // menulist={p.menulist}
                    location={p.location ? p.location : undefined}
                    // avatarlogo={p.avatarlogo}
                    key={p.id}
                    merchantID={p.id}
                  />
                  <Divider />
                </>
              );
            } else if (!tags[0]) {
              return (
                <>
                  <MenuSlide
                    // imageUrl={p.imageUrl}
                    // imageAlt={p.imageAlt}
                    name={p.cpname}
                    reviewCount={p.reviewCount}
                    rating={p.averageRating ? p.averageRating : undefined}
                    cuisine={merchantTags}
                    // menulist={p.menulist}
                    location={p.location ? p.location : undefined}
                    // avatarlogo={p.avatarlogo}
                    key={p.id}
                    merchantID={p.id}
                  />
                  <Divider />
                </>
              );
            }
          })}
          // for demo purpouses
          <Accordion allowToggle>
            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box flex="1" textAlign="left">
                    Demo Search
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                {datalist?.map((p) => (
                  <>
                    <MenuSlide
                      imageUrl={p.imageUrl ? p.imageUrl : undefined}
                      imageAlt={p.imageAlt ? p.imageAlt : undefined}
                      name={p.name}
                      reviewCount={p.reviewCount}
                      rating={p.rating ? p.rating : undefined}
                      // cuisine={p.cuisine}
                      // menulist={p.menulist}
                      location={p.location ? p.location : undefined}
                      avatarlogo={p.avatarlogo ? p.avatarlogo : undefined}
                      // merchantID={p.merchantID}
                      // key={p.id}
                      scrt={true}
                    />
                    <Divider />
                  </>
                ))}
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </VStack>
      </>
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
      <Flex
        direction="column"
        justifyContent="center"
        alignItems="center"
        overflowX={"hidden"}
      >
        <Flex
          direction={"row"}
          mt={6}
          alignItems={"center"}
          justifyContent={"center"}
          maxWidth={"85vw"}
        >
          <Box padding={"3vw"}>
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
          <Box padding={"3vw"}>
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
          {/* <Box padding={"3vw"}>
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
          </Box> */}
        </Flex>
        {/* <SimpleGrid columns={[1, null, 3]} spacing="40px"> */}
        <Box
          spacing={8}
          marginTop={"5px"}
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
