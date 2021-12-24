import { Flex, Box, IconButton } from "@chakra-ui/react";
import React, { Children } from "react";
import { FaGooglePlusG } from "react-icons/fa";
import { TiSocialFacebook, TiSocialTwitter } from "react-icons/ti";
import { Navbar } from "./navbar";
import Wrapper, { WrapperVariant } from "./wrapper";
import NextLink from "next/link";
import { IconType } from "react-icons";

interface RowVectorsProps {
  vectors: IconType;
}

export const RowVectors: React.FC<RowVectorsProps> = ({ vectors }) => {
  return (
    <>
      <Flex
        direction={"row"}
        mt={6}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Box padding={"1vw"}>
          <NextLink href="/">
            <IconButton
              borderColor={"#5998A0"}
              variant="outline"
              isRound={true}
              aria-label={"yes"}
            >
              <TiSocialFacebook size={"6vw"} color="#5998A0" />
            </IconButton>
          </NextLink>
        </Box>
        <Box padding={"1vw"}>
          <NextLink href="/">
            <IconButton
              borderColor={"#5998A0"}
              variant="outline"
              isRound={true}
              aria-label={"yes"}
            >
              <TiSocialTwitter size={"6vw"} color="#5998A0" />
            </IconButton>
          </NextLink>
        </Box>
        <Box padding={"1vw"}>
          <NextLink href="/">
            <IconButton
              borderColor={"#5998A0"}
              variant="outline"
              isRound={true}
              aria-label={"yes"}
            >
              <FaGooglePlusG size={"6vw"} color="#5998A0" />
            </IconButton>
          </NextLink>
        </Box>
      </Flex>
    </>
  );
};
