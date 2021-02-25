import React, { forwardRef } from 'react';
import { Flex, LayoutBoxProps } from '../Box';
import { useComponentStyle } from '../theme/useComponentStyle';
import { guaranteeArray } from '../utils/guaranteeArray';
import { TabProps } from './Tab';

export interface TabsProps extends LayoutBoxProps {
  children: React.ReactElement<TabProps> | React.ReactElement<TabProps>[];
  selected?: string;
  onSelect?: (selectedName: string) => void;
}

export const Tabs = forwardRef<HTMLDivElement, TabsProps>(
  ({ children, selected, onSelect, ...props }: TabsProps, ref) => {
    const gap = useComponentStyle('tabs.gap');

    return (
      <Flex ref={ref} mx={`-${gap}`} {...props}>
        {guaranteeArray(children).map((child) =>
          React.cloneElement(child, {
            key: child.props.name,
            mx: gap,
            onClick: child.props.onClick || (() => onSelect && onSelect(child.props.name)),
            selected: selected ? selected === child.props.name : child.props.selected,
          })
        )}
      </Flex>
    );
  }
);
