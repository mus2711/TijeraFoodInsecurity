import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { Button, HStack, IconButton, Text } from "@chakra-ui/react";
import NextLink from "next/link";

interface DblStandardButtonProps {
  title: string;
  route: string;
  routeback: string;
  widthback?: string;
  widthforward?: string;
}

export const DblStandardButton: React.FC<DblStandardButtonProps> = ({
  title,
  route,
  routeback,
  widthback = "15vw",
  widthforward = "60vw",
}) => {
  return (
    <HStack alignContent={"center"} marginTop={"20px"}>
      <NextLink href={routeback}>
        <IconButton
          variant={"solid"}
          textColor="white"
          // marginTop={"20px"}
          width={widthback}
          maxWidth={"50px"}
          height="40px"
          bg="#5998A0"
          _hover={{ bg: "black" }}
          children={<ChevronLeftIcon />}
          aria-label={"back"}
        />
      </NextLink>

      <Button
        variant={"solid"}
        textColor="white"
        // marginTop={"20px"}
        width={widthforward}
        maxWidth={"300px"}
        height="40px"
        bg="#5998A0"
        _hover={{ bg: "black" }}
        type="submit"
        rightIcon={<ChevronRightIcon />}
      >
        {title}
      </Button>
    </HStack>
  );
};
