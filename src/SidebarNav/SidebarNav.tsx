import React, { forwardRef } from 'react';
import styled from 'styled-components';
import { layoutInterpolationFn, LayoutBoxProps } from '../Box';
import { getComponentStyle } from '../styleHelpers';
import { SidebarNavItemProps } from './SidebarNavItem';

export interface SidebarNavProps extends LayoutBoxProps {
  children: React.ReactElement<SidebarNavItemProps> | React.ReactElement<SidebarNavItemProps>[];
}

const SidebarNavBox = styled.ul<LayoutBoxProps>`
  border-left: ${getComponentStyle('sidebarNav.borderLeft')};
  padding-left: ${getComponentStyle('sidebarNav.borderLeftSpacing')};
  ${layoutInterpolationFn};
`;

export const SidebarNav = forwardRef<HTMLUListElement, SidebarNavProps>(
  ({ children, ...props }: SidebarNavProps, ref) => (
    <SidebarNavBox ref={ref} data-testid="pbl-sidebarnav" {...props}>
      {children}
    </SidebarNavBox>
  )
);
