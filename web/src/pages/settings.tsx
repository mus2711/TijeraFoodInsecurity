import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import React from "react";
import { Box, Button, Flex, Stack, Text } from "@chakra-ui/react";
import { Layout } from "../components/layout";
import { ChevronRightIcon, SettingsIcon } from "@chakra-ui/icons";
import {
  MdEmail,
  MdLocationOn,
  MdMessage,
  MdMoney,
  MdPhone,
} from "react-icons/md";
import { HiUser } from "react-icons/hi";
import { useMeQuery } from "../generated/graphql";
import { isServer } from "../../utils/isServer";

const Settings = () => {
  const [{ data, fetching }] = useMeQuery({
    pause: isServer(),
  });

  return (
    <Layout title="SETTINGS">
      <Flex
        direction="column"
        justifyContent="center"
        alignItems="center"
        width={"100vw"}
        alignSelf={"center"}
      >
        <Stack spacing={4} width={"85vw"}>
          <Button
            iconSpacing={20}
            leftIcon={<HiUser width={"5vw"} height={"5vw"} />}
            rightIcon={
              <SettingsIcon
                // marginLeft={"20vw"}
                width={"3vw"}
                height={"3vw"}
              />
            }
            colorScheme="blue"
            variant="solid"
            isFullWidth={true}
            alignContent={"start"}
            height={"15vw"}
            textAlign={"center"}
          >
            <Flex direction={"column"}>
              <Text fontSize={"3.5vw"}>
                {data?.me?.firstname} {data?.me?.lastname}
              </Text>
              <Text fontSize={"2.5vw"}>San Francisco, CA</Text>
            </Flex>
          </Button>
          <Button
            iconSpacing={20}
            leftIcon={<MdPhone width={"5vw"} height={"5vw"} />}
            rightIcon={
              <ChevronRightIcon
                // marginLeft={"20vw"}
                width={"5vw"}
                height={"5vw"}
              />
            }
            colorScheme="pink"
            variant="solid"
            isFullWidth={true}
            alignContent={"start"}
            height={"15vw"}
            textAlign={"center"}
          >
            <Flex direction={"column"}>
              <Text fontSize={"3.5vw"}>+123 456 789</Text>
              <Text fontSize={"2.5vw"}>Phone</Text>
            </Flex>
          </Button>

          <Button
            iconSpacing={9}
            leftIcon={<MdEmail width={"5vw"} height={"5vw"} />}
            rightIcon={
              <ChevronRightIcon
                // marginLeft={"20vw"}
                width={"5vw"}
                height={"5vw"}
              />
            }
            colorScheme="pink"
            variant="solid"
            isFullWidth={true}
            alignContent={"start"}
            height={"15vw"}
            textAlign={"center"}
          >
            <Flex direction={"column"}>
              <Text fontSize={"3.5vw"}>{data?.me?.email}</Text>
              <Text fontSize={"2.5vw"}>Home</Text>
            </Flex>
          </Button>

          <Button
            iconSpacing={20}
            leftIcon={<MdMessage width={"5vw"} height={"5vw"} />}
            rightIcon={
              <ChevronRightIcon
                // marginLeft={"20vw"}
                width={"5vw"}
                height={"5vw"}
              />
            }
            colorScheme="pink"
            variant="solid"
            isFullWidth={true}
            alignContent={"start"}
            height={"15vw"}
            textAlign={"center"}
          >
            <Flex direction={"column"}>
              <Text fontSize={"3.5vw"}>+123 456 789</Text>
              <Text fontSize={"2.5vw"}>Message</Text>
            </Flex>
          </Button>
          <Button
            iconSpacing={6}
            leftIcon={<MdLocationOn width={"5vw"} height={"5vw"} />}
            rightIcon={
              <ChevronRightIcon
                // marginLeft={"20vw"}
                width={"5vw"}
                height={"5vw"}
              />
            }
            colorScheme="pink"
            variant="solid"
            isFullWidth={true}
            alignContent={"start"}
            height={"15vw"}
            textAlign={"center"}
          >
            <Flex direction={"column"}>
              <Text fontSize={"3.5vw"}>497 Evergreen Rd. Roseville...</Text>
              <Text fontSize={"2.5vw"}>Location</Text>
            </Flex>
          </Button>

          <Button
            iconSpacing={"15vw"}
            leftIcon={<MdMoney width={"5vw"} height={"5vw"} />}
            rightIcon={
              <ChevronRightIcon
                // marginLeft={"20vw"}
                width={"5vw"}
                height={"5vw"}
              />
            }
            colorScheme="pink"
            variant="solid"
            isFullWidth={true}
            alignContent={"start"}
            height={"15vw"}
            textAlign={"center"}
          >
            <Flex direction={"column"}>
              <Text fontSize={"3.5vw"}>Transaction History</Text>
            </Flex>
          </Button>

          <Flex
            justifyContent={"center"}
            height={"10vw"}
            bg={"khaki"}
            alignContent={"center"}
            direction={"row"}
            borderRadius={"5px"}
          >
            <Box justifyContent={"center"} alignContent={"center"}>
              <Text fontWeight={"bold"} marginTop={"2vw"}>
                Tokens Available: 1000
              </Text>
            </Box>
          </Flex>
        </Stack>
      </Flex>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Settings);
