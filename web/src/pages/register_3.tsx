import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { useMeQuery, useRegisterMutation } from "../generated/graphql";
import React from "react";
import {
  Avatar,
  AvatarBadge,
  Box,
  Flex,
  Heading,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  Stack,
  Text,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { Layout } from "../components/layout";
import { useState } from "react";
import { MdLocationOn, MdDateRange, MdPhone } from "react-icons/md";
import { HiOutlineUserGroup } from "react-icons/hi";
import { Formik, Form } from "formik";
import { useRouter } from "next/router";
import { toErrorMap } from "../../utils/toErrorMap";
import { DblStandardButton } from "../components/DblStandardButton";

const bl = "#5998A0";

const Index = () => {
  const router = useRouter();
  const [, register] = useRegisterMutation();
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);
  const [status, setStatus] = useState("");
  let [image, setImage] = React.useState("");

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
          console.log("Lat: ", lat);
          console.log("Lng: ", lng);
        },
        () => {
          setStatus("Unable to retrieve your location");
        }
      );
    }
  };
  const onImageChange = (e: any) => {
    console.log(e.target.files[0]);
    setImage((image = URL.createObjectURL(e.target.files[0])));
  };

  return (
    <Layout title="SIGN UP">
      <Flex direction="column" justifyContent="center" alignItems="center">
        <Heading>Step 3/3</Heading>

        <Box padding={"25px"} paddingTop={"30px"}>
          <Avatar
            src={image}
            onClick={() => {}}
            boxSize={"100px"}
            position={"absolute"}
          >
            {/* <AvatarBadge boxSize="1.25em" bg="green.500" /> */}
          </Avatar>
          <Input
            type={"file"}
            accept="image/*"
            onClick={() => console.log("yes")}
            className="inputPhoto"
            onChange={onImageChange}
            placeholder="Pick an Image"
            borderWidth={"0px"}
            opacity={0}
            width="100px"
            height={"100px"}
          />
        </Box>

        <Formik
          initialValues={{}}
          onSubmit={async (values, { setErrors }) => {
            console.log(values);
            const response = await register(values);
            console.log(response);
            if (response.data?.register.errors) {
              setErrors(toErrorMap(response.data.register.errors));
            } else if (response.data?.register.user) {
              router.push("/");
            }
          }}
        >
          {({ isSubmitting }) => {
            return (
              <Form>
                <Stack spacing={4}>
                  <InputGroup>
                    <Select
                      placeholder="Country"
                      iconColor={bl}
                      color="gray.300"
                      colorScheme={"cyan"}
                      variant="filled"
                    >
                      <option value="option1">United Kingdom</option>
                      <option value="option2">United States</option>
                      <option value="option3">France</option>
                    </Select>
                  </InputGroup>
                  <HStack spacing={1}>
                    <InputGroup>
                      <InputLeftElement
                        pointerEvents="none"
                        color="gray.300"
                        fontSize="1.2em"
                        children={<MdLocationOn color="gray.300" />}
                      />
                      <Input
                        name="address"
                        placeholder="Address"
                        label="Address"
                        width={"75vw"}
                        maxWidth={"300px"}
                      />
                    </InputGroup>
                    <IconButton
                      aria-label={"findlocation"}
                      colorScheme={"cyan"}
                      width={"50px"}
                      height={"40px"}
                      onClick={getLocation}
                    >
                      <MdLocationOn size={"30px"} color="black" />
                    </IconButton>
                  </HStack>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      color="gray.300"
                      fontSize="1.2em"
                      children={<MdDateRange color="gray.300" />}
                    />
                    <Input
                      name="date"
                      placeholder="Date of Birth (mm/dd/yyyy)"
                      label="Date of Birth"
                      width={"75vw"}
                      maxWidth={"350px"}
                    />
                  </InputGroup>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      color="gray.300"
                      fontSize="1.2em"
                      children={<MdPhone color="gray.300" />}
                    />
                    <Input
                      name="Phone Number"
                      placeholder="Phone Number"
                      label="Phone Number"
                      width={"75vw"}
                      maxWidth={"350px"}
                    />
                  </InputGroup>
                  <InputGroup>
                    <Select
                      placeholder="Gender"
                      iconColor={bl}
                      color="gray.300"
                    >
                      <option value="option1">Male</option>
                      <option value="option2">Female</option>
                      <option value="option3">Other</option>
                    </Select>
                  </InputGroup>
                  <InputGroup>
                    <Select
                      placeholder="Annual Revenue"
                      iconColor={bl}
                      color="gray.300"
                    >
                      <option value="option1">0-20k</option>
                      <option value="option2">20-40k</option>
                      <option value="option3">40+k</option>
                    </Select>
                  </InputGroup>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      color="gray.300"
                      fontSize="1.2em"
                      children={<HiOutlineUserGroup color="gray.300" />}
                    />
                    <Input
                      name="numDependents"
                      placeholder="Number of Dependents"
                      label="Number of Dependents"
                      width={"75vw"}
                      maxWidth={"350px"}
                    />
                  </InputGroup>
                </Stack>
              </Form>
            );
          }}
        </Formik>
      </Flex>
      <Flex
        paddingTop={"20px"}
        direction={"column"}
        justifyContent={"center"}
        z
        alignItems={"center"}
      >
        <Text textAlign={"center"} fontSize={"10px"} maxWidth={"70vw"}>
          By registering you agree to our{" "}
          <NextLink href={"/"}>Terms & Conditions</NextLink>
        </Text>

        <DblStandardButton
          title="Register"
          route="/search"
          routeback="register_2"
        />
      </Flex>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
