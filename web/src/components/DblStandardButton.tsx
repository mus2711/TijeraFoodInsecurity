import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { Button, HStack, IconButton, Text } from "@chakra-ui/react";
import NextLink from "next/link";

interface DblStandardButtonProps {
  title: string;
  route: string;
  routeback: string;
  widthback?: string;
  widthforward?: string;
  onClick?: () => void;
}

export const DblStandardButton: React.FC<DblStandardButtonProps> = ({
  title,
  route,
  routeback,
  widthback = "15vw",
  widthforward = "60vw",
  onClick,
}) => {
  return (
    <HStack alignContent={"center"} marginTop={"20px"}>
      <NextLink href={routeback}>
        <IconButton
          variant={"outline"}
          textColor="black"
          width={widthback}
          maxWidth={"50px"}
          colorScheme={"cyan"}
          children={<ChevronLeftIcon />}
          aria-label={"back"}
        />
      </NextLink>

      <Button
        variant={"solid"}
        textColor="black"
        // marginTop={"20px"}
        width={widthforward}
        onClick={onClick}
        maxWidth={"300px"}
        colorScheme={"cyan"}
        type="submit"
        rightIcon={<ChevronRightIcon />}
      >
        {title}
      </Button>
    </HStack>
  );
};
