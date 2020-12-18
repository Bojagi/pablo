import React from "react";
import styled, { css } from "styled-components";
import { ButtonBase, ButtonBaseProps } from "../ButtonBase";
import { getComponentStyle } from "../styleHelpers";
import { Typography } from "../Typography";


export interface SidebarNavItemProps extends ButtonBaseProps {
  active?: boolean;
  children: React.ReactNode;
}

const SidebarNavItemWrapper = styled<React.FC<SidebarNavItemProps>>(ButtonBase).attrs({
  as: 'li',
})`
  ${props => props.active && css`
    background-color: ${getComponentStyle('sidebarNav.item.active.backgroundColor')};
  `}

  &:hover {
    background-color: ${getComponentStyle('sidebarNav.item.hover.backgroundColor')};
  }
`;

export const SidebarNavItem = ({ children, ...props }: SidebarNavItemProps) => (
  <SidebarNavItemWrapper my={0.5} {...props}>
    <Typography variant="button">{children}</Typography>
  </SidebarNavItemWrapper>
)
