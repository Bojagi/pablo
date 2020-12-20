import React from 'react';
import { Box, BoxProps } from '../Box';
import { useComponentStyle } from '../theme';
import { SidebarNavItemProps } from './SidebarNavItem';

export interface SidebarNavProps extends BoxProps {
  children: React.ReactElement<SidebarNavItemProps>;
}

export const SidebarNav = ({ children, ...props }) => {
  const borderLeft = useComponentStyle('sidebarNav.borderLeft') as string;
  const borderLeftSpacing = useComponentStyle('sidebarNav.borderLeftSpacing') as number;
  return (
    <Box borderLeft={borderLeft} pl={borderLeftSpacing} as="ul" {...props}>
      {children}
    </Box>
  );
};
