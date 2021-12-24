import { Button, Text } from "@chakra-ui/react";
import NextLink from "next/link";

// interface;

export const LogInButton = () => {
  return (
    <NextLink href="../login">
      <Button
        marginTop={5}
        width="85vw"
        maxWidth={"350px"}
        height="50px"
        bg="#F2D54B"
        _hover={{ bg: "black" }}
        marginBottom={"30px"}
      >
        LOG IN
      </Button>
    </NextLink>
  );
};
