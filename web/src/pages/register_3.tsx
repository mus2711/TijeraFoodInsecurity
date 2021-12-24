import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import {
  useMeQuery,
  usePostsQuery,
  useRegisterMutation,
} from "../generated/graphql";
import React from "react";
import {
  Avatar,
  AvatarBadge,
  Box,
  Button,
  ButtonGroup,
  Flex,
  Heading,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Select,
  Stack,
  Text,
  Textarea,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { Layout } from "../components/layout";
import { useState } from "react";
import { CheckIcon, HamburgerIcon, PhoneIcon } from "@chakra-ui/icons";
import {
  MdOutlineFastfood,
  MdEmail,
  MdLocationOn,
  MdDateRange,
  MdPhone,
} from "react-icons/md";
import { HiUser, HiOutlineUserGroup } from "react-icons/hi";
import { RiContactsBookLine, RiLockPasswordFill } from "react-icons/ri";
import { TiSocialTwitter, TiSocialFacebook } from "react-icons/ti";
import { FaGooglePlusG } from "react-icons/fa";
import { Formik, Form } from "formik";
import router, { useRouter } from "next/router";
import { toErrorMap } from "../../utils/toErrorMap";
import { Inputfield } from "../components/inputfield";
import register from "./register";
import { StandardButton } from "../components/StandardButton";
import { DblStandardButton } from "../components/DblStandardButton";
import { FilePicker } from "evergreen-ui";
import { useFileUpload } from "use-file-upload";

const bl = "#5998A0";

const Index = () => {
  const [variables, setVariables] = useState({
    limit: 15,
    cursor: null as null | string,
  });
  const [{ data: meData }] = useMeQuery();

  const [{ data, fetching }] = usePostsQuery({ variables });

  // console.log("var: ", variables);
  const router = useRouter();
  const [, register] = useRegisterMutation();
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [status, setStatus] = useState(null);

  const [files, selectFiles] = useFileUpload();

  const getLocation = () => {
    if (!navigator.geolocation) {
      setStatus("Geolocation is not supported by your browser");
    } else {
      setStatus("Locating...");
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setStatus(null);
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
  return (
    <Layout title="SIGN UP">
      <Flex direction="column" justifyContent="center" alignItems="center">
        <Heading>Step 3/3</Heading>

        <Box padding={"25px"} paddingTop={"30px"}>
          <Avatar
            src={files?.source || undefined}
            onClick={() => {
              selectFiles(
                { accept: "image/*", multiple: false },
                ({ name, size, source, file }) => {
                  console.log("Files Selected", { name, size, source, file });
                }
              );
            }}
            boxSize={"100px"}
          >
            <AvatarBadge boxSize="1.25em" bg="green.500" />
          </Avatar>
        </Box>

        <Formik
          initialValues={{
            userName: "",
            email: "",
            password: "",
          }}
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
                      bg={bl}
                      width={"50px"}
                      height={"40px"}
                      onClick={getLocation}
                    >
                      <MdLocationOn size={"30px"} color="white" />
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
      {/* </Flex> */}
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
