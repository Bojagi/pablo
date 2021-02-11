import React from 'react';
import { Box, BoxProps } from '../Box';
import { useComponentStyle } from '../theme';
import { TabProps } from './Tab';

export interface TabsProps extends BoxProps {
  children: React.ReactElement<TabProps>[];
  selected?: string;
}

export const Tabs = ({ children, selected, ...props }: TabsProps) => {
  const gap = useComponentStyle('tabs.gapSpacing') as number;
  return (
    <Box mx={-gap} display="flex" {...props}>
      {children.map((child) =>
        React.cloneElement(child, {
          key: child.props.name,
          mx: gap,
          active: selected ? selected === child.props.name : child.props.active,
        })
      )}
    </Box>
  );
};
