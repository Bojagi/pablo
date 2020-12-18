import React from "react"
import styled, { css } from "styled-components";
import { BoxProps } from "../Box";
import { ButtonBase } from "../ButtonBase"
import { getComponentStyle } from "../styleHelpers";
import { Typography } from "../Typography"

export interface TabProps extends BoxProps {
  active?: boolean;
  name: string;
  children: React.ReactNode;
}

const TabButton = styled<React.FC<Partial<TabProps>>>(ButtonBase)`
  color: ${getComponentStyle('tabs.tab.color')};
  position: relative;
  padding: ${getComponentStyle('tabs.tab.padding')};

  &:hover {
    background-color: ${getComponentStyle('tabs.tab.hover.backgroundColor')};
  }

  ${props => props.active && css`
    color: ${getComponentStyle('tabs.tab.active.color')};
    &:after {
      content: '';
      position: absolute;
      bottom: 0;
      left: ${getComponentStyle('tabs.tab.active.bottomBorder.gap')};
      width: calc(100% - ${getComponentStyle('tabs.tab.active.bottomBorder.gap')} - ${getComponentStyle('tabs.tab.active.bottomBorder.gap')});
      height: ${getComponentStyle('tabs.tab.active.bottomBorder.thickness')};
      border-top-left-radius: ${getComponentStyle('tabs.tab.active.bottomBorder.radius')};
      border-top-right-radius: ${getComponentStyle('tabs.tab.active.bottomBorder.radius')};
      background-color: ${getComponentStyle('tabs.tab.active.bottomBorder.color')};
    }
  `}
`;

export const Tab = ({ children, active, ...props }: TabProps) => {
  return (
    <TabButton {...props} active={active}>
      <Typography variant="button">{children}</Typography>
    </TabButton>
  );
}
