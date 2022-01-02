import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import {
  useAddLocationMutation,
  useMemQuery,
  useRegistermMutation,
} from "../generated/graphql";
import React, { useState } from "react";
import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Tag,
  TagLabel,
  TagLeftIcon,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { AddIcon } from "@chakra-ui/icons";
import { DblStandardButton } from "../components/DblStandardButton";
import { Inputfield } from "../components/inputfield";
import { MerchLayout } from "../components/merchLayout";
import { MenuSlide } from "../components/menuslide";
import { FilePicker, RemoveIcon } from "evergreen-ui";
import { useFileUpload } from "use-file-upload";
import { Router, useRouter } from "next/router";

const Mburner = () => {
  const [{ data, fetching }] = useMemQuery();
  console.log("burner mem", data?.mem);
  return <MerchLayout title="burn UP"></MerchLayout>;
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Mburner);
