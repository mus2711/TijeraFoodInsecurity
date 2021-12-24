import { Flex, Box, IconButton } from "@chakra-ui/react";
import { FaGooglePlusG } from "react-icons/fa";
import { TiSocialFacebook, TiSocialTwitter } from "react-icons/ti";
import NextLink from "next/link";

interface SignInOptionsProps {}
export const SignInOptions: React.FC<SignInOptionsProps> = () => {
  return (
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
            <TiSocialFacebook size={"25px"} color="#5998A0" />
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
            <TiSocialTwitter size={"25px"} color="#5998A0" />
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
            <FaGooglePlusG size={"25px"} color="#5998A0" />
          </IconButton>
        </NextLink>
      </Box>
    </Flex>
  );
};
