import React from "react"
import { Box, BoxProps } from "../Box"
import { SidebarNavItemProps } from "./SidebarNavItem";

export interface SidebarNavProps extends BoxProps {
  children: React.ReactElement<SidebarNavItemProps>;
}

export const SidebarNav = ({children, ...props}) => (
  <Box borderLeft="light" pl={2} as="ul" {...props}>
    {children}
  </Box>
);
