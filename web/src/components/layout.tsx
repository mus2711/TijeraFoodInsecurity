import React from "react";
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
  return (
    <>
      <Navbar title={title} icon={icon} />
      <Wrapper variant={varaint}>{children}</Wrapper>
    </>
  );
};
