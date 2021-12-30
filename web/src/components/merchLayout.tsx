import React, { Children } from "react";
import { Merchnavbar } from "./merchNavbar";

import Wrapper, { WrapperVariant } from "./wrapper";

interface LayoutProps {
  varaint?: WrapperVariant;
  title: string;
  icon?: "stack" | "arrow" | null;
}

export const MerchLayout: React.FC<LayoutProps> = ({
  children,
  varaint,
  title,
  icon,
}) => {
  return (
    <>
      <Merchnavbar title={title} icon={icon} />
      <Wrapper variant={varaint}>{children}</Wrapper>
    </>
  );
};
