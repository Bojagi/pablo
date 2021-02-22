import React from 'react';
import { Flex, LayoutBoxProps } from '../Box';
import { useComponentStyle } from '../theme';
import { guaranteeArray } from '../utils/guaranteeArray';
import { TabProps } from './Tab';

export interface TabsProps extends LayoutBoxProps {
  children: React.ReactElement<TabProps> | React.ReactElement<TabProps>[];
  selected?: string;
  onSelect?: (selectedName: string) => void;
}

export const Tabs = ({ children, selected, onSelect, ...props }: TabsProps) => {
  const gap = useComponentStyle('tabs.gap');

  return (
    <Flex mx={`-${gap}`} {...props}>
      {guaranteeArray(children).map((child) =>
        React.cloneElement(child, {
          key: child.props.name,
          mx: gap,
          onClick: child.props.onClick || (() => onSelect && onSelect(child.props.name)),
          active: selected ? selected === child.props.name : child.props.active,
        })
      )}
    </Flex>
  );
};
