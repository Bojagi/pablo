import React from 'react';
import { Box, BoxProps } from '../Box';
import { useComponentStyle } from '../theme';
import { guaranteeArray } from '../utils/guaranteeArray';
import { TabProps } from './Tab';

export interface TabsProps extends BoxProps {
  children: React.ReactElement<TabProps> | React.ReactElement<TabProps>[];
  selected?: string;
  onSelect?: (selectedName: string) => void;
}

export const Tabs = ({ children, selected, onSelect, ...props }: TabsProps) => {
  const gap = useComponentStyle('tabs.gap');

  return (
    <Box mx={`-${gap}`} flex {...props}>
      {guaranteeArray(children).map((child) =>
        React.cloneElement(child, {
          key: child.props.name,
          mx: gap,
          onClick: child.props.onClick || (() => onSelect && onSelect(child.props.name)),
          active: selected ? selected === child.props.name : child.props.active,
        })
      )}
    </Box>
  );
};
