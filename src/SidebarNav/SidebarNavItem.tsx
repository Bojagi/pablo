import React from 'react';
import styled, { css } from 'styled-components';
import { buttonBaseStyles, ButtonBaseProps } from '../ButtonBase';
import { getComponentStyle } from '../utils/styleHelpers/getComponentStyle';
import { Typography } from '../Typography';

export interface SidebarNavItemProps extends ButtonBaseProps {
  selected?: boolean;
  children: React.ReactNode;
}

const SidebarNavItemWrapper = styled.li.attrs({ size: 'small' })<SidebarNavItemProps>`
  ${buttonBaseStyles}
  display: flex;
  margin: ${getComponentStyle('sidebarNav.item.marginY')} 0;
  ${(props) =>
    props.selected &&
    css`
      background-color: ${getComponentStyle('sidebarNav.item.selected.backgroundColor')};
    `}

  &:hover {
    background-color: ${getComponentStyle('sidebarNav.item.hover.backgroundColor')};
  }

  &:focus {
    box-shadow: 0 0 0 ${getComponentStyle('sidebarNav.item.focus.outlineSize')}
      ${getComponentStyle('sidebarNav.item.focus.outlineColor')};
  }

  &:active {
    background-color: ${getComponentStyle('sidebarNav.item.active.backgroundColor')};
  }
`;

export const SidebarNavItem = ({ children, ...props }: SidebarNavItemProps) => (
  <SidebarNavItemWrapper data-testid="pbl-sidebarnav-item" {...props}>
    <Typography variant="button">{children}</Typography>
  </SidebarNavItemWrapper>
);
