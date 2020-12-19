import React from "react"
import styled, { css } from "styled-components";
import { Box, BoxProps } from "../Box";
import { ButtonBase } from "../ButtonBase"
import { getComponentStyle } from "../styleHelpers";
import { useComponentStyle } from "../theme";
import { Typography } from "../Typography"

export interface TabProps extends BoxProps {
  active?: boolean;
  icon?: React.ReactNode;
  name: string;
  children: React.ReactNode;
}

const TabButton = styled<React.FC<Partial<TabProps>>>(ButtonBase)`
  color: ${getComponentStyle('tabs.tab.color')};
  position: relative;
  padding: ${getComponentStyle('tabs.tab.padding')};
  margin: ${getComponentStyle('tabs.tab.margin')};

  &:hover {
    background-color: ${getComponentStyle('tabs.tab.hover.backgroundColor')};
  }

  ${props => props.active && css`
    color: ${getComponentStyle('tabs.tab.active.color')};
    padding: ${getComponentStyle('tabs.tab.active.padding')};
    margin: ${getComponentStyle('tabs.tab.active.margin')};
    &:after {
      content: '';
      position: absolute;
      bottom: 0;
      left: ${getComponentStyle('tabs.tab.active.bottomBorder.gap')};
      width: calc(100% - 2 * ${getComponentStyle('tabs.tab.active.bottomBorder.gap')});
      height: ${getComponentStyle('tabs.tab.active.bottomBorder.thickness')};
      border-top-left-radius: ${getComponentStyle('tabs.tab.active.bottomBorder.radius')};
      border-top-right-radius: ${getComponentStyle('tabs.tab.active.bottomBorder.radius')};
      background-color: ${getComponentStyle('tabs.tab.active.bottomBorder.color')};
    }
  `}
`;

export const Tab = ({ children, active, icon, ...props }: TabProps) => {
  const iconGap = useComponentStyle('button.base.iconGap') as number;
  return (
    <TabButton {...props} active={active}>
      {icon && (
        <Box display="flex" mr={iconGap}>{icon}</Box>
      )}
      <Typography variant="button">{children}</Typography>
    </TabButton>
  );
}
