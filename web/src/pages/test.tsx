import { Button, SimpleGrid } from "@chakra-ui/react";

import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../../utils/createUrqlClient";

import React, { useRef } from "react";
import { Box } from "@chakra-ui/react";
import { Layout } from "../components/layout";
import { useState } from "react";
// import SpeechRecognition, {
//   useSpeechRecognition,
// } from "react-speech-recognition";

const Index = () => {
  let [ran, setRanState] = useState("" as string);
  const handleImageChange = (event) => {
    image: URL.createObjectURL(event.target.files[0]);
  };
  return (
    <Layout title="ONBOARDING">
      <label>
        <input
          style={{ display: "none" }}
          type="file"
          accept="image/*"
          capture="environment"
          onChange={handleImageChange}
        />
        <Button>hello</Button>
      </label>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
