import { Button, SimpleGrid } from "@chakra-ui/react";

import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { useMeQuery, usePostsQuery } from "../generated/graphql";
import React, { useRef } from "react";
import { Box } from "@chakra-ui/react";
import { Layout } from "../components/layout";
import { useState } from "react";
// import SpeechRecognition, {
//   useSpeechRecognition,
// } from "react-speech-recognition";

const Index = () => {
  // const { transcript, resetTranscript } = useSpeechRecognition();
  // const [isListening, setIsListening] = useState(false);
  // const microphoneRef = useRef(null);
  // if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
  //   return (
  //     <div className="mircophone-container">
  //       Browser is not Support Speech Recognition.
  //     </div>
  //   );
  // }
  // const handleListing = () => {
  //   setIsListening(true);
  //   microphoneRef.current.classList.add("listening");
  //   SpeechRecognition.startListening({
  //     continuous: true,
  //   });
  // };
  // const stopHandle = () => {
  //   setIsListening(false);
  //   microphoneRef.current.classList.remove("listening");
  //   SpeechRecognition.stopListening();
  // };
  // const handleReset = () => {
  //   stopHandle();
  //   resetTranscript();
  // };
  return (
    <Layout title="ONBOARDING">
      {/* <div className="microphone-wrapper">
        <div className="mircophone-container">
          <div
            className="microphone-icon-container"
            ref={microphoneRef}
            onClick={handleListing}
          >
            <img src={microPhoneIcon} className="microphone-icon" />
          </div>
          <div className="microphone-status">
            {isListening ? "Listening........." : "Click to start Listening"}
          </div>
          {isListening && (
            <button className="microphone-stop btn" onClick={stopHandle}>
              Stop
            </button>
          )}
        </div>
        {transcript && (
          <div className="microphone-result-container">
            <div className="microphone-result-text">{transcript}</div>
            <button className="microphone-reset btn" onClick={handleReset}>
              Reset
            </button>
          </div>
        )}
      </div> */}
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
