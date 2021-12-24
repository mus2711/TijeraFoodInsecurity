import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { Button, HStack, IconButton, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import { TiArrowUpThick } from "react-icons/ti";

import { extendTheme } from "@chakra-ui/react";

// 2. Call `extendTheme` and pass your custom values

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
      <NextLink href={route}>
        <Button
          variant={"solid"}
          textColor="white"
          // marginTop={"20px"}
          width={widthforward}
          maxWidth={"300px"}
          height="40px"
          bg="#5998A0"
          _hover={{ bg: "black" }}
          rightIcon={<ChevronRightIcon />}
        >
          {title}
        </Button>
      </NextLink>
    </HStack>
  );
};