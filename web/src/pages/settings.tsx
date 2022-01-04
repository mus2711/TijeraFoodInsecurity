import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import React, { useState } from "react";
import {
  Box,
  Button,
  Flex,
  HStack,
  Spacer,
  Stack,
  Text,
  VStack,
  Popover,
  PopoverTrigger,
  PopoverBody,
  PopoverContent,
  Tag,
  TagLabel,
  TagLeftIcon,
  IconButton,
} from "@chakra-ui/react";
import { Layout } from "../components/layout";
import {
  AddIcon,
  ArrowRightIcon,
  ChevronRightIcon,
  SettingsIcon,
} from "@chakra-ui/icons";
import {
  MdEmail,
  MdLocationOn,
  MdMessage,
  MdMoney,
  MdPhone,
} from "react-icons/md";
import { HiLocationMarker, HiUser } from "react-icons/hi";
import Nextlink from "next/link";
import {
  useAddLocationMutation,
  useMeQuery,
  useRegistermMutation,
} from "../generated/graphql";
import { isServer } from "../../utils/isServer";
import { RemoveIcon } from "evergreen-ui";
import { Formik, Form } from "formik";
import router from "next/router";
import { DblStandardButton } from "../components/DblStandardButton";
import { Inputfield } from "../components/inputfield";
import { toMerchErrorMap } from "../../utils/toMerchErrorMap";
import { LogInButton } from "../components/LogInButton";

const Settings = () => {
  const [{ data, fetching }] = useMeQuery({
    pause: isServer(),
  });
  const [, addLocation] = useAddLocationMutation();
  const [, registerm] = useRegistermMutation();
  let [buttonL, setbuttonL] = useState(false);
  const initialInputs = {
    location: "",
  };
  const initialInputscpname = {
    cpname: "",
    password: "",
    email: "",
  };
  const formikInputs = [
    {
      name: "location",
      placeholder: `${data?.me?.merchant?.location}`,
      label: "Location",
    },
  ];
  const formikInputscpname = [
    {
      name: "cpname",
      placeholder: `${data?.me?.merchant?.cpname}`,
      label: "Enter New Name",
    },
    { name: "email", placeholder: "", label: "Enter Email" },
    { name: "password", placeholder: "", label: "Enter Password" },
  ];
  let buttonResL = "submit";
  let body = null;
  if (data?.me?.merchant) {
    body = (
      <VStack spacing={4}>
        <Box>
          <Text
            fontSize={"sm"}
            fontWeight={"medium"}
            width={"75vw"}
            maxWidth={"400px"}
          >
            Location
          </Text>
          <HStack
            width={"75vw"}
            maxWidth={"400px"}
            bgColor={"lightgrey"}
            p={"5px"}
            borderRadius={"5px"}
          >
            <Box>
              <Text fontSize={"md"} paddingLeft={"10px"}>
                {data.me.merchant.location}
              </Text>
            </Box>
            <Spacer />
            <Popover>
              <PopoverTrigger>
                {/* <Button colorScheme={"green"}>Change Location</Button> */}
                <IconButton
                  size={"md"}
                  colorScheme={"green"}
                  children={<HiLocationMarker />}
                  aria-label={"okay"}
                />
              </PopoverTrigger>
              <PopoverContent color="white">
                <PopoverBody>
                  <VStack>
                    <Formik
                      initialValues={initialInputs}
                      onSubmit={async (values, { setErrors }) => {
                        console.log(values);
                        if (values.location !== "") {
                          const response = await addLocation(values);

                          console.log(response);
                          // if (response.data?.registerm.errors) {
                          //   setErrors(toMerchErrorMap(response.data.registerm.errors));
                          // } else if (response.data?.registerm.merchant) {
                          //   router.push("/");
                          // }
                          if (response.data?.addLocation.id) {
                            () => {
                              // setbuttonL((buttonL = "Done!"));
                            };
                          }
                        }
                      }}
                    >
                      {({ isSubmitting }) => (
                        <Form>
                          <VStack spacing={4}>
                            {formikInputs.map((p) => (
                              <Inputfield
                                name={p.name}
                                label={p.label}
                                placeholder={p.placeholder}
                              />
                            ))}
                          </VStack>
                          <Box paddingTop={"20px"}>
                            <Button
                              type="submit"
                              onClick={() => {
                                setbuttonL((buttonL = true));
                              }}
                            >
                              {buttonL ? "Done!" : "Submit"}
                            </Button>
                          </Box>
                        </Form>
                      )}
                    </Formik>
                  </VStack>
                </PopoverBody>
              </PopoverContent>
            </Popover>
          </HStack>
        </Box>
        <Box>
          <Text
            fontSize={"sm"}
            fontWeight={"medium"}
            width={"75vw"}
            maxWidth={"400px"}
          >
            Name
          </Text>
          <HStack
            width={"75vw"}
            maxWidth={"400px"}
            bgColor={"lightgrey"}
            p={"5px"}
            borderRadius={"5px"}
          >
            <Box>
              <Text fontSize={"md"} paddingLeft={"10px"}>
                {data.me.merchant.cpname}
              </Text>
            </Box>
            <Spacer />
            <Popover>
              <PopoverTrigger>
                {/* <Button colorScheme={"green"}>Change Location</Button> */}
                <IconButton
                  size={"md"}
                  colorScheme={"green"}
                  children={<HiUser />}
                  aria-label={"okay"}
                />
              </PopoverTrigger>
              <PopoverContent color="white">
                <PopoverBody>
                  <VStack>
                    <Formik
                      initialValues={initialInputscpname}
                      onSubmit={async (values, { setErrors }) => {
                        console.log(values);
                        if (values.cpname !== "" && data.me.merchant) {
                          const response = await registerm({
                            ...values,
                            username: data?.me?.merchant?.username,
                          });

                          console.log(response);
                          if (response.data?.registerm.errors) {
                            setErrors(
                              toMerchErrorMap(response.data.registerm.errors)
                            );
                          } else if (response.data?.registerm.merchant) {
                            router.push("/");
                          }
                          if (response.data?.registerm) {
                            () => {
                              // setbuttonL((buttonL = "Done!"));
                            };
                          }
                        }
                      }}
                    >
                      {({ isSubmitting }) => (
                        <Form>
                          <VStack spacing={4}>
                            {formikInputscpname.map((p) => (
                              <Inputfield
                                name={p.name}
                                label={p.label}
                                placeholder={p.placeholder}
                              />
                            ))}
                          </VStack>
                          <Box paddingTop={"20px"}>
                            <Button
                              type="submit"
                              onClick={() => {
                                setbuttonL((buttonL = true));
                              }}
                            >
                              {buttonL ? "Done!" : "Submit"}
                            </Button>
                          </Box>
                        </Form>
                      )}
                    </Formik>
                  </VStack>
                </PopoverBody>
              </PopoverContent>
            </Popover>
          </HStack>
        </Box>
        <Box>
          <Text
            fontSize={"sm"}
            fontWeight={"medium"}
            width={"75vw"}
            maxWidth={"400px"}
          >
            Recent Orders
          </Text>

          <HStack
            width={"75vw"}
            maxWidth={"400px"}
            bgColor={"lightgrey"}
            p={"5px"}
            borderRadius={"5px"}
          >
            <Box>
              <Text fontSize={"md"} paddingLeft={"10px"}>
                View all Orders
              </Text>
            </Box>
            <Spacer />
            <Nextlink href={"/"}>
              <IconButton
                size={"md"}
                colorScheme={"teal"}
                children={<ArrowRightIcon />}
                aria-label={"okay"}
              />
            </Nextlink>
          </HStack>
        </Box>
        <Box>
          <Text
            fontSize={"sm"}
            fontWeight={"medium"}
            width={"75vw"}
            maxWidth={"400px"}
          >
            Reviews
          </Text>

          <HStack
            width={"75vw"}
            maxWidth={"400px"}
            bgColor={"lightgrey"}
            p={"5px"}
            borderRadius={"5px"}
          >
            <Box>
              <Text fontSize={"md"} paddingLeft={"10px"}>
                View all Reviews
              </Text>
            </Box>
            <Spacer />
            <Nextlink href={"/"}>
              <IconButton
                size={"md"}
                colorScheme={"teal"}
                children={<ArrowRightIcon />}
                aria-label={"okay"}
              />
            </Nextlink>
          </HStack>
        </Box>
        <Box>
          <Text
            fontSize={"sm"}
            fontWeight={"medium"}
            width={"75vw"}
            maxWidth={"400px"}
          >
            Profile
          </Text>

          <HStack
            width={"75vw"}
            maxWidth={"400px"}
            bgColor={"lightgrey"}
            p={"5px"}
            borderRadius={"5px"}
          >
            <Box>
              <Text fontSize={"md"} paddingLeft={"10px"}>
                Change Profile
              </Text>
            </Box>
            <Spacer />
            <Nextlink href={"/merchantaccount"}>
              <IconButton
                size={"md"}
                colorScheme={"teal"}
                children={<ArrowRightIcon />}
                aria-label={"okay"}
              />
            </Nextlink>
          </HStack>
        </Box>
      </VStack>
    );
  } else if (!data?.me?.merchant && data?.me?.user) {
    body = (
      <VStack spacing={4}>
        <Box>
          <Text
            fontSize={"sm"}
            fontWeight={"medium"}
            width={"75vw"}
            maxWidth={"400px"}
          >
            First Name
          </Text>
          <HStack
            width={"75vw"}
            maxWidth={"400px"}
            bgColor={"lightgrey"}
            p={"5px"}
            borderRadius={"5px"}
          >
            <Box>
              <Text fontSize={"md"} paddingLeft={"10px"}>
                {data.me.user.firstname}
              </Text>
            </Box>
            <Spacer />
            <Popover>
              <PopoverTrigger>
                {/* <Button colorScheme={"green"}>Change Location</Button> */}
                <IconButton
                  size={"md"}
                  colorScheme={"green"}
                  children={<HiUser />}
                  aria-label={"okay"}
                />
              </PopoverTrigger>
              <PopoverContent color="white">
                <PopoverBody>
                  <VStack>
                    <Formik
                      initialValues={initialInputscpname}
                      onSubmit={async (values, { setErrors }) => {
                        console.log(values);
                        if (values.cpname !== "" && data.me.merchant) {
                          const response = await registerm({
                            ...values,
                            username: data?.me?.merchant?.username,
                          });

                          console.log(response);
                          if (response.data?.registerm.errors) {
                            setErrors(
                              toMerchErrorMap(response.data.registerm.errors)
                            );
                          } else if (response.data?.registerm.merchant) {
                            router.push("/");
                          }
                          if (response.data?.registerm) {
                            () => {
                              // setbuttonL((buttonL = "Done!"));
                            };
                          }
                        }
                      }}
                    >
                      {({ isSubmitting }) => (
                        <Form>
                          <VStack spacing={4}>
                            {formikInputscpname.map((p) => (
                              <Inputfield
                                name={p.name}
                                label={p.label}
                                placeholder={p.placeholder}
                              />
                            ))}
                          </VStack>
                          <Box paddingTop={"20px"}>
                            <Button
                              type="submit"
                              onClick={() => {
                                setbuttonL((buttonL = true));
                              }}
                            >
                              {buttonL ? "Done!" : "Submit"}
                            </Button>
                          </Box>
                        </Form>
                      )}
                    </Formik>
                  </VStack>
                </PopoverBody>
              </PopoverContent>
            </Popover>
          </HStack>
        </Box>
        <Box>
          <Text
            fontSize={"sm"}
            fontWeight={"medium"}
            width={"75vw"}
            maxWidth={"400px"}
          >
            Last Name
          </Text>
          <HStack
            width={"75vw"}
            maxWidth={"400px"}
            bgColor={"lightgrey"}
            p={"5px"}
            borderRadius={"5px"}
          >
            <Box>
              <Text fontSize={"md"} paddingLeft={"10px"}>
                {data.me.user.lastname}
              </Text>
            </Box>
            <Spacer />
            <Popover>
              <PopoverTrigger>
                {/* <Button colorScheme={"green"}>Change Location</Button> */}
                <IconButton
                  size={"md"}
                  colorScheme={"green"}
                  children={<HiUser />}
                  aria-label={"okay"}
                />
              </PopoverTrigger>
              <PopoverContent color="white">
                <PopoverBody>
                  <VStack>
                    <Formik
                      initialValues={initialInputscpname}
                      onSubmit={async (values, { setErrors }) => {
                        console.log(values);
                        if (values.cpname !== "" && data.me.merchant) {
                          const response = await registerm({
                            ...values,
                            username: data?.me?.merchant?.username,
                          });

                          console.log(response);
                          if (response.data?.registerm.errors) {
                            setErrors(
                              toMerchErrorMap(response.data.registerm.errors)
                            );
                          } else if (response.data?.registerm.merchant) {
                            router.push("/");
                          }
                          if (response.data?.registerm) {
                            () => {
                              // setbuttonL((buttonL = "Done!"));
                            };
                          }
                        }
                      }}
                    >
                      {({ isSubmitting }) => (
                        <Form>
                          <VStack spacing={4}>
                            {formikInputscpname.map((p) => (
                              <Inputfield
                                name={p.name}
                                label={p.label}
                                placeholder={p.placeholder}
                              />
                            ))}
                          </VStack>
                          <Box paddingTop={"20px"}>
                            <Button
                              type="submit"
                              onClick={() => {
                                setbuttonL((buttonL = true));
                              }}
                            >
                              {buttonL ? "Done!" : "Submit"}
                            </Button>
                          </Box>
                        </Form>
                      )}
                    </Formik>
                  </VStack>
                </PopoverBody>
              </PopoverContent>
            </Popover>
          </HStack>
        </Box>
        <Box>
          <Text
            fontSize={"sm"}
            fontWeight={"medium"}
            width={"75vw"}
            maxWidth={"400px"}
          >
            Recent Orders
          </Text>

          <HStack
            width={"75vw"}
            maxWidth={"400px"}
            bgColor={"lightgrey"}
            p={"5px"}
            borderRadius={"5px"}
          >
            <Box>
              <Text fontSize={"md"} paddingLeft={"10px"}>
                View Transaction History
              </Text>
            </Box>
            <Spacer />
            <Nextlink href={"/"}>
              <IconButton
                size={"md"}
                colorScheme={"teal"}
                children={<ArrowRightIcon />}
                aria-label={"okay"}
              />
            </Nextlink>
          </HStack>
        </Box>
        <Box>
          <Text
            fontSize={"sm"}
            fontWeight={"medium"}
            width={"75vw"}
            maxWidth={"400px"}
          >
            Tokens Remaining
          </Text>

          <HStack
            width={"75vw"}
            maxWidth={"400px"}
            bgColor={"lightgrey"}
            p={"5px"}
            borderRadius={"5px"}
          >
            <Box>
              <Text fontSize={"md"} paddingLeft={"10px"}>
                70% of Tokens Remaining
              </Text>
            </Box>
          </HStack>
        </Box>
      </VStack>
    );
  } else if (!data?.me?.user && !data?.me?.merchant) {
    body = (
      <VStack>
        <Text>Please Log In</Text>
        <LogInButton />
      </VStack>
    );
  }

  return <Layout title="SETTINGS">{body}</Layout>;
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Settings);
