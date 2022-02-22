import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import {
  useAddUserCoordinatesMutation,
  useAddUserImageMutation,
  useInitialiseUserTokensMutation,
  useRegisterMutation,
  useRegisterUserFinalMutation,
} from "../generated/graphql";
import React, { useCallback } from "react";
import {
  Avatar,
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
  VStack,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { Layout } from "../components/layout";
import { useState } from "react";
import { MdDateRange, MdLocationOn, MdPhone } from "react-icons/md";
import { useRouter } from "next/router";
import { DblStandardButton } from "../components/DblStandardButton";
import { SliderInput } from "../components/SliderInput";
import { useDropzone } from "react-dropzone";

const bl = "#5998A0";

const Register_3 = () => {
  const router = useRouter();
  const [lat, setLat] = useState<number>(0);
  const [lng, setLng] = useState<number>(0);
  const [status, setStatus] = useState("");
  let [image, setImage] = React.useState("");
  const [initialValue, setInitialValue] = useState(10000);
  const [dependents, setDependents] = useState(5);
  const [country, setCountry] = useState("");
  const [DOB, setDOB] = useState("00/00/00");
  const [phone, setPhone] = useState("+0");
  const [gender, setGender] = useState<String | null>(null);
  const [, initialiseUserTokens] = useInitialiseUserTokensMutation();
  const [, addUserCoordinates] = useAddUserCoordinatesMutation();
  const [, addUserImage] = useAddUserImageMutation();

  let [fileToUpload, setFileToUpload] = useState<File>();
  let [imageSrc, setImageSrc] = useState("");

  const readFile = (file: File) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.addEventListener("load", () => resolve(reader.result), false);
      reader.readAsDataURL(file);
    });
  };

  const onDrop = useCallback(
    async ([file]) => {
      console.log("arr file: ", [file]);
      console.log("single file", file);
      console.log("file 0:", file[0]);
      let imageDataUrl: any = await readFile(file);

      setImageSrc((imageSrc = imageDataUrl));
      console.log("img_data: ", imageSrc);
      setFileToUpload((fileToUpload = file));

      addUserImage({
        image: imageSrc.substring(0, 10),
      }).then((response) => console.log(response));
    },
    [addUserImage]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const InputDrop = () => {
    if (fileToUpload) {
      return <Text>📷 ✅</Text>;
    } else if (isDragActive) {
      return <Text>Drop thed image here</Text>;
    } else {
      return (
        <Text>
          Drag 'n' drop your image here, or just click to select an image🍎
        </Text>
      );
    }
  };
  // ///////

  const [locationLoad, setLocationLoad] = useState(false);

  const [, registerUserFinal] = useRegisterUserFinalMutation();
  var date_regex =
    /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;

  function delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

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

  const initialiseTokens = async () => {
    delay(1000);
    initialiseUserTokens();
  };

  const onRegisterUser = async () => {
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

      await addUserCoordinates({ latitude: lat, longitude: lng }).then(() =>
        initialiseTokens().then(() => router.push("/search"))
      );
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
          <div {...getRootProps()}>
            <input accept="image/*" {...getInputProps()} />
            <InputDrop></InputDrop>
          </div>
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
        <VStack>
          <HStack spacing={6}>
            <Text>Set your location:</Text>
            <IconButton
              aria-label={"findlocation"}
              colorScheme={locationLoad ? "green" : "cyan"}
              width={"40px"}
              height={"40px"}
              onClick={getLocation}
            >
              <MdLocationOn size={"30px"} color="black" />
            </IconButton>
          </HStack>
        </VStack>
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
