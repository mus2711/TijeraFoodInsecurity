import { Box } from "@chakra-ui/react";
import React from "react";

export type WrapperVariant = "small" | "regular";
interface WrapperProps {
  variant?: WrapperVariant;
}

const Wrapper: React.FC<WrapperProps> = ({ children, variant = "regular" }) => {
  return (
    <Box
      maxW={variant === "regular" ? "900px" : "400px"}
      w="100%"
      mt={8}
      mx="auto"
      overflowY={"hidden"}
    >
      {children}
    </Box>
  );
};

export default Wrapper;
