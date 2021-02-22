import React from 'react';
import styled from 'styled-components';
import { layoutInterpolationFn, LayoutBoxProps } from '../Box';
import { guaranteeArray } from '../utils/guaranteeArray';
import { getComponentStyle } from '../utils/styleHelpers';
import { ToolbarItem, ToolbarItemProps } from './ToolbarItem';

const ToolbarBox = styled.div<LayoutBoxProps>`
  display: flex;
  margin: 0 -${getComponentStyle('toolbar.gap')};
  height: calc(${getComponentStyle('toolbar.item.size')} + 2 * ${getComponentStyle('toolbar.gap')});
  align-items: center;
  ${layoutInterpolationFn}
`;

export interface ToolbarProps extends LayoutBoxProps {
  children: React.ReactElement<ToolbarItemProps | {}> | React.ReactElement<ToolbarItemProps | {}>[];
  selected?: string;
}

export function Toolbar({ children, selected, ...props }: ToolbarProps) {
  const interpolatedChildren = guaranteeArray(children).map((child, index) => {
    if (child.type === ToolbarItem) {
      const childProps = child.props as ToolbarItemProps;
      return React.cloneElement(child, {
        key: childProps.name,
        active: selected ? childProps.name === selected : childProps.active,
      });
    }

    return React.cloneElement(child, { key: index });
  });
  return <ToolbarBox {...props}>{interpolatedChildren}</ToolbarBox>;
}
