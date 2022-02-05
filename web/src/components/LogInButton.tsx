import { Button } from "@chakra-ui/react";
import NextLink from "next/link";

export const LogInButton = () => {
  return (
    <NextLink href="../login">
      <Button
        marginTop={5}
        width="75vw"
        maxWidth={"300px"}
        // height="50px"
        colorScheme={"orange"}
        // marginBottom={"30px"}
      >
        Log In
      </Button>
    </NextLink>
  );
};
