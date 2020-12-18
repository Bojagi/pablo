import React from "react"
import styled, { css } from "styled-components";
import { BoxProps } from "../Box";
import { ButtonBase } from "../ButtonBase"
import { getColor, getSpacing } from "../styleHelpers";
import { Typography } from "../Typography"

export interface TabProps extends BoxProps {
  active?: boolean;
  name: string;
  children: React.ReactNode;
}

const TabButton = styled<React.FC<Partial<TabProps>>>(ButtonBase)`
  color: ${getColor('common', 'black')};
  position: relative;
  padding: ${getSpacing(1)} ${getSpacing(1.5)} ${getSpacing(1.5)};

  &:hover {
    background-color: ${getColor('brand', 'light')};
  }

  ${props => props.active && css`
    color: ${getColor('brand')};
    &:after {
      content: '';
      position: absolute;
      bottom: 0;
      left: ${getSpacing(1)};
      width: calc(100% - ${getSpacing(2)});
      height: ${getSpacing(0.5)};
      border-top-left-radius: ${getSpacing(0.5)};
      border-top-right-radius: ${getSpacing(0.5)};
      background-color: ${getColor('brand')};
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
