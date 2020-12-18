import React from "react";
import { Box, BoxProps } from "../Box";
import { TabProps } from "./Tab";

export interface TabsProps extends BoxProps {
  children: React.ReactElement<TabProps>[];
  selected?: string;
};

export const Tabs = ({children, selected, ...props}: TabsProps) => {
  return (
    <Box mx={-0.5} display="flex" {...props}>
      {children.map((child) => (
        React.cloneElement(child, { key: child.props.name, mx: 0.5, active: selected ? selected === child.props.name : child.props.active })
      ))}
    </Box>
  );
}
