import React from 'react';
import styled from 'styled-components';
import { boxInterpolateFn, BoxProps } from '../Box';
import { getComponentStyle } from '../utils/styleHelpers';
import { ToolbarItem, ToolbarItemProps } from './ToolbarItem';

const ToolbarBox = styled.div<BoxProps>`
  display: flex;
  margin: 0 -${getComponentStyle('toolbar.gap')};
  height: calc(${getComponentStyle('toolbar.item.size')} + 2 * ${getComponentStyle('toolbar.gap')});
  align-items: center;
  ${boxInterpolateFn}
`;

export interface ToolbarProps extends BoxProps {
  children: React.ReactElement<ToolbarItemProps | {}> | React.ReactElement<ToolbarItemProps | {}>[];
  selected?: string;
}

export function Toolbar({ children, selected, ...props }) {
  const interpolatedChildren = children.map((child, index) => {
    if (child.type === ToolbarItem) {
      return React.cloneElement(child, {
        key: child.props.name,
        active: selected ? child.props.name === selected : child.props.active,
      });
    }

    return React.cloneElement(child, { key: index });
  });
  return <ToolbarBox {...props}>{interpolatedChildren}</ToolbarBox>;
}
