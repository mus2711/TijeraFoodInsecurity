import { ChevronRightIcon } from "@chakra-ui/icons";
import { Button, Text } from "@chakra-ui/react";
import NextLink from "next/link";

interface StandardButtonProps {
  title: string;
  route: string;
  width?: string;
}

export const StandardButton: React.FC<StandardButtonProps> = ({
  title,
  route,
  width = "85vw",
}) => {
  return (
    <NextLink href={route}>
      <Button
        variant={"solid"}
        textColor="white"
        marginTop={"20px"}
        width={width}
        maxWidth={"350px"}
        height="40px"
        bg="#5998A0"
        _hover={{ bg: "black" }}
        rightIcon={<ChevronRightIcon />}
      >
        {title}
      </Button>
    </NextLink>
  );
};
