import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import {
  useMeQuery,
  useRegisterMutation,
  useRegisterUserFinalMutation,
} from "../generated/graphql";
import React, { useEffect } from "react";
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
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
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
import { SliderInput } from "../components/SliderInput";
import { constant } from "lodash";

const bl = "#5998A0";

const Register_3 = () => {
  const router = useRouter();
  const [, register] = useRegisterMutation();
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);
  const [status, setStatus] = useState("");
  let [image, setImage] = React.useState("");
  const [initialValue, setInitialValue] = useState(10000);
  const [dependents, setDependents] = useState(5);
  const [country, setCountry] = useState("");
  const [DOB, setDOB] = useState("00/00/00");
  const [phone, setPhone] = useState("+0");
  const [gender, setGender] = useState<String | null>(null);
  const [address, setAddress] = useState<String | null>(null);

  const [, registerUserFinal] = useRegisterUserFinalMutation();
  var date_regex =
    /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;

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

  const onRegisterUser = () => {
    if (date_regex.test(DOB)) {
      registerUserFinal({
        year: Number(DOB.slice(6, 10)),
        month: Number(DOB.slice(3, 5)),
        day: Number(DOB.slice(0, 2)),
        income: initialValue,
        dependents: dependents,
        country: country,
        gender: String(gender) ?? "",
        phoneNumber: phone,
      });
      router.push("/search");
    }
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

        <Stack spacing={4}>
          <InputGroup>
            <Select
              placeholder="Country"
              value={country}
              iconColor={bl}
              color="gray.300"
              colorScheme={"cyan"}
              onChange={(val) => {
                setCountry(val.target.selectedOptions[0].value);
              }}
              // variant="filled"
            >
              <option value="UK">United Kingdom</option>
              <option value="USA">United States</option>
              <option value="FR">France</option>
              <option value="COL">Columbia</option>
              <option value="BRB">Barbados</option>
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
                onChange={(e) => {
                  setAddress(e.target.value);
                }}
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
              // rightLog={date_regex.test(DOB) ? false : true}
              errorBorderColor="red.300"
              placeholder="Date of Birth (mm/dd/yyyy)"
              label="Date of Birth"
              width={"75vw"}
              maxWidth={"350px"}
              onChange={(e) => setDOB(e.target.value)}
            />
          </InputGroup>
          {/* <HStack>
            <NumberInput
              step={1}
              defaultValue={15}
              min={0o0}
              max={31}
              maxWidth={"116px"}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper color={"black"} />
                <NumberDecrementStepper color={"black"} />
              </NumberInputStepper>
            </NumberInput>
            <NumberInput
              step={1}
              defaultValue={15}
              min={0o0}
              max={31}
              size={"md"}
              maxWidth={"116px"}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper color={"black"} />
                <NumberDecrementStepper color={"black"} />
              </NumberInputStepper>
            </NumberInput>
            <NumberInput
              step={1}
              defaultValue={15}
              min={0o0}
              max={31}
              maxWidth={"116px"}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper color={"black"} />
                <NumberDecrementStepper color={"black"} />
              </NumberInputStepper>
            </NumberInput>
          </HStack> */}
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
              onChange={(e) => setPhone(e.target.value)}
            />
          </InputGroup>
          <InputGroup>
            <Select
              placeholder="Gender"
              iconColor={bl}
              color="gray.300"
              onChange={(val) => {
                setGender(val.target.selectedOptions[0].value);
              }}
            >
              <option value="M">Male</option>
              <option value="F">Female</option>
              <option value="O">Other</option>
            </Select>
          </InputGroup>

          <SliderInput
            value={initialValue}
            title="How much are you making a year?"
            onChange={(val) => setInitialValue(val)}
            testId="initialValueInput"
            targets={[0, 20000]}
            max={20000}
            min={0}
            unitL="$"
            unitR=""
            step={500}
            key={"1"}
          />
          <SliderInput
            value={dependents}
            title="How many people depend on you to provide?"
            onChange={(val) => setDependents(val)}
            testId="dependentsInput"
            targets={[0, 10]}
            max={10}
            min={0}
            unitL=""
            unitR=""
            step={1}
            key={"2"}
          />
        </Stack>
      </Flex>
      <Flex
        paddingTop={"20px"}
        paddingBottom={"80px"}
        direction={"column"}
        justifyContent={"center"}
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
          onClick={() => onRegisterUser()}
        />
      </Flex>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Register_3);
