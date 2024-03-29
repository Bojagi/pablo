import React, { forwardRef } from 'react';
import styled from 'styled-components';
import { layoutInterpolationFn, LayoutBoxProps } from '../Box';
import { baseStyle } from '../shared/baseStyle';
import { getComponentStyle } from '../styleHelpers';
import { registerComponentStyles } from '../theme';
import { BaseProps } from '../types';
import { getCustomStyles } from '../utils/useCustomStyles';
import { SidebarNavItemProps } from './SidebarNavItem';
import { SidebarNavStyleProperties, sidebarNavStyles } from './styles';

export interface SidebarNavProps extends LayoutBoxProps, BaseProps<SidebarNavStyleProperties> {
  children: React.ReactElement<SidebarNavItemProps> | React.ReactElement<SidebarNavItemProps>[];
}

const SidebarNavBox = styled.ul<LayoutBoxProps>`
  ${baseStyle}
  border-left: ${getComponentStyle('sidebarNav.borderLeft')};
  padding-left: ${getComponentStyle('sidebarNav.borderLeftSpacing')};
  ${layoutInterpolationFn}
  ${getCustomStyles('sidebar.styles', 'root')}
`;

export const SidebarNav = forwardRef<HTMLUListElement, SidebarNavProps>(
  ({ children, ...props }: SidebarNavProps, ref) => (
    <SidebarNavBox ref={ref} data-testid="pbl-sidebarnav" {...props}>
      {children}
    </SidebarNavBox>
  )
);

registerComponentStyles('sidebarNav', sidebarNavStyles);
