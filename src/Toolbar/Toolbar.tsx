import React from 'react';
import styled from 'styled-components';
import { boxInterpolateFn, BoxProps } from '../Box';
import { getComponentStyle } from '../utils/styleHelpers';
import { ToolbarItem, ToolbarItemProps } from './ToolbarItem';

const ToolbarBox = styled.div<BoxProps>`
  ${boxInterpolateFn}
  display: flex;
  margin: 0 -${getComponentStyle('toolbar.gap')};
  height: calc(${getComponentStyle('toolbar.item.size')} + 2 * ${getComponentStyle('toolbar.gap')});
  align-items: center;
`;

export interface ToolbarProps {
  children: React.ReactElement<ToolbarItemProps | {}> | React.ReactElement<ToolbarItemProps | {}>[];
  selected?: string;
}

export function Toolbar({ children, selected }) {
  const interpolatedChildren = children.map((child) => {
    if (child.type === ToolbarItem) {
      return React.cloneElement(child, {
        active: selected ? child.props.name === selected : child.props.active,
      });
    }

    return child;
  });
  return <ToolbarBox>{interpolatedChildren}</ToolbarBox>;
}
