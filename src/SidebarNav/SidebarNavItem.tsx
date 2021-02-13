import React from 'react';
import styled, { css } from 'styled-components';
import { ButtonBase, ButtonBaseProps } from '../ButtonBase';
import { getComponentStyle } from '../utils/styleHelpers/getComponentStyle';
import { Typography } from '../Typography';

export interface SidebarNavItemProps extends ButtonBaseProps {
  active?: boolean;
  children: React.ReactNode;
}

const SidebarNavItemWrapper = styled<React.FC<SidebarNavItemProps>>(ButtonBase).attrs({
  as: 'li',
})`
  margin: ${getComponentStyle('sidebarNav.item.marginY')} 0;
  ${(props) =>
    props.active &&
    css`
      background-color: ${getComponentStyle('sidebarNav.item.active.backgroundColor')};
    `}

  &:hover {
    background-color: ${getComponentStyle('sidebarNav.item.hover.backgroundColor')};
  }
`;

export const SidebarNavItem = ({ children, ...props }: SidebarNavItemProps) => (
  <SidebarNavItemWrapper data-testid="pbl-sidebarnav-item" {...props}>
    <Typography variant="button">{children}</Typography>
  </SidebarNavItemWrapper>
);
