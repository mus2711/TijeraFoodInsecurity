import { useColorMode } from "@chakra-ui/react";
import React, { Children } from "react";
import { useMeQuery } from "../generated/graphql";
import { Navbar } from "./navbar";

import Wrapper, { WrapperVariant } from "./wrapper";

interface LayoutProps {
  varaint?: WrapperVariant;
  title: string;
  icon?: "stack" | "arrow" | null;
}

export const Layout: React.FC<LayoutProps> = ({
  children,
  varaint,
  title,
  icon,
}) => {
  // const [{ data, fetching }] = useMeQuery();
  // const { colorMode, toggleColorMode } = useColorMode();
  // if (data?.me.merchant) {
  //   toggleColorMode();
  // }

  return (
    <>
      <Navbar title={title} icon={icon} />
      <Wrapper variant={varaint}>{children}</Wrapper>
    </>
  );
};
