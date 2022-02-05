import { ChevronRightIcon } from "@chakra-ui/icons";
import { Button } from "@chakra-ui/react";
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
        marginTop={"20px"}
        width={width}
        maxWidth={"350px"}
        // height="40px"
        colorScheme={"cyan"}
        rightIcon={<ChevronRightIcon />}
      >
        {title}
      </Button>
    </NextLink>
  );
};
