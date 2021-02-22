import React from 'react';
import styled from 'styled-components';
import { layoutInterpolationFn, LayoutBoxProps } from '../Box';
import { getComponentStyle } from '../utils/styleHelpers';
import { SidebarNavItemProps } from './SidebarNavItem';

export interface SidebarNavProps extends LayoutBoxProps {
  children: React.ReactElement<SidebarNavItemProps>;
}

const SidebarNavBox = styled.div<LayoutBoxProps>`
  border-left: ${getComponentStyle('sidebarNav.borderLeft')};
  padding-left: ${getComponentStyle('sidebarNav.borderLeftSpacing')};
  ${layoutInterpolationFn};
`;

export const SidebarNav = ({ children, ...props }) => (
  <SidebarNavBox data-testid="pbl-sidebarnav" as="ul" {...props}>
    {children}
  </SidebarNavBox>
);
