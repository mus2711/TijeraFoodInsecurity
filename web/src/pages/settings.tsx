import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import React, { useState } from "react";
import {
  Box,
  Button,
  HStack,
  Spacer,
  Text,
  VStack,
  Popover,
  PopoverTrigger,
  PopoverBody,
  PopoverContent,
  IconButton,
  Divider,
  useToast,
} from "@chakra-ui/react";
import { Layout } from "../components/layout";
import { ArrowRightIcon } from "@chakra-ui/icons";
import { HiLocationMarker, HiUser } from "react-icons/hi";
import Nextlink from "next/link";
import {
  useAddLocationMutation,
  useChangeFirstnameMutation,
  useChangeLastNameMutation,
  useMeQuery,
  useRegistermMutation,
} from "../generated/graphql";
import { isServer } from "../../utils/isServer";
import { Formik, Form } from "formik";
import router from "next/router";
import { Inputfield } from "../components/inputfield";
import { toMerchErrorMap } from "../../utils/toMerchErrorMap";
import { LogInButton } from "../components/LogInButton";

const Settings = () => {
  const [{ data, fetching }] = useMeQuery({
    pause: isServer(),
  });
  const [, addLocation] = useAddLocationMutation();
  const [, registerm] = useRegistermMutation();
  const [, changeFirstname] = useChangeFirstnameMutation();
  const [, changeLastName] = useChangeLastNameMutation();
  let [buttonL, setbuttonL] = useState(false);
  const toast = useToast();

  const initialInputs = {
    location: "",
  };
  const initialInputscpname = {
    cpname: "",
    password: "",
    email: "",
  };

  const initialInputsfirstname = {
    firstname: "",
  };

  const initialInputslastname = {
    lastname: "",
  };

  const formikInputs = [
    {
      name: "location",
      placeholder: `${data?.me?.merchant?.location}`,
      label: "Location",
    },
  ];
  const formikInputsfirstname = [
    {
      name: "firstname",
      placeholder: `${data?.me?.user?.firstname}`,
      label: "Enter New Name",
    },
  ];

  const formikInputslastname = [
    {
      name: "lastname",
      placeholder: `${data?.me?.user?.lastname}`,
      label: "Enter New Last Name",
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
            <Nextlink href={"/merchantreviews"}>
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
                      initialValues={initialInputsfirstname}
                      onSubmit={async (values, { setErrors }) => {
                        console.log(values);
                        if (values.firstname !== "" && data.me.user) {
                          const response = await changeFirstname({
                            ...values,
                          });

                          console.log(response);

                          if (response.data?.changeFirstname) {
                            () => {
                              setbuttonL((buttonL = true));
                            };
                          }
                        }
                      }}
                    >
                      {({ isSubmitting }) => (
                        <Form>
                          <VStack spacing={4}>
                            {formikInputsfirstname.map((p) => (
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
                      initialValues={initialInputslastname}
                      onSubmit={async (values, { setErrors }) => {
                        console.log(values);
                        if (values.lastname !== "" && data.me.user) {
                          const response = await changeLastName({
                            ...values,
                          });

                          console.log(response);

                          if (response.data?.changeLastName) {
                            () => {
                              setbuttonL((buttonL = true));
                            };
                          }
                        }
                      }}
                    >
                      {({ isSubmitting }) => (
                        <Form>
                          <VStack spacing={4}>
                            {formikInputslastname.map((p) => (
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
            <Nextlink href={"/userorders"}>
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
        <Divider />
        <Text maxWidth={"400px"} textAlign={"center"}>
          Do you want to sign up to become a delivery driver and earn more
          tokens?
        </Text>
        <Button
          colorScheme={"blue"}
          size={"xs"}
          onClick={() =>
            toast({
              title: "Signed up for Delivery Driving.",
              description: "Thank you for registering your interest!",
              status: "success",
              duration: 9000,
              isClosable: true,
            })
          }
        >
          Click here to Register
        </Button>
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
