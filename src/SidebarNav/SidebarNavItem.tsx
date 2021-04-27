import React, { forwardRef } from 'react';
import styled, { css } from 'styled-components';
import { buttonBaseStyles, ButtonBaseProps } from '../ButtonBase';
import { getComponentStyle } from '../styleHelpers/getComponentStyle';
import { Typography } from '../Typography';
import { getCustomStyles } from '../utils/useCustomStyles';

export interface SidebarNavItemProps extends ButtonBaseProps {
  selected?: boolean;
  children: React.ReactNode;
}

const SidebarNavItemWrapper = styled.li.attrs({ size: 'small' })<SidebarNavItemProps>`
  ${buttonBaseStyles}
  display: flex;
  margin: ${getComponentStyle('sidebarNav.item.marginY')} 0;
  ${getCustomStyles('sidebar.item.styles', 'root')}

  ${(props) =>
    props.selected &&
    css`
      background-color: ${getComponentStyle('sidebarNav.item.selected.backgroundColor')};
      ${getCustomStyles('sidebar.item.styles', 'selected')}
    `}

  &:hover {
    background-color: ${getComponentStyle('sidebarNav.item.hover.backgroundColor')};
    ${getCustomStyles('sidebar.item.styles', 'hover')}
  }

  &:focus {
    box-shadow: 0 0 0 ${getComponentStyle('sidebarNav.item.focus.outlineSize')}
      ${getComponentStyle('sidebarNav.item.focus.outlineColor')};
    ${getCustomStyles('sidebar.item.styles', 'focus')}
  }

  &:active {
    background-color: ${getComponentStyle('sidebarNav.item.active.backgroundColor')};
    ${getCustomStyles('sidebar.item.styles', 'active')}
  }
`;

export const SidebarNavItem = forwardRef<HTMLLIElement, SidebarNavItemProps>(
  ({ children, ...props }, ref) => (
    <SidebarNavItemWrapper ref={ref} data-testid="pbl-sidebarnav-item" {...props}>
      <Typography variant="button">{children}</Typography>
    </SidebarNavItemWrapper>
  )
);
