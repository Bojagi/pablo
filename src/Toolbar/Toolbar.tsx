import React, { forwardRef } from 'react';
import styled from 'styled-components';
import { layoutInterpolationFn, LayoutBoxProps } from '../Box';
import { guaranteeArray } from '../utils/guaranteeArray';
import { getComponentStyle } from '../styleHelpers';
import { ToolbarItem, ToolbarItemProps } from './ToolbarItem';
import { getCustomStyles } from '../utils/useCustomStyles';
import { BaseProps } from '../types';
import { ToolbarStyleProperties } from './styles';

const ToolbarBox = styled.div<LayoutBoxProps>`
  display: flex;
  margin: 0 -${getComponentStyle('toolbar.gap')};
  height: calc(${getComponentStyle('toolbar.item.size')} + 2 * ${getComponentStyle('toolbar.gap')});
  align-items: center;
  ${layoutInterpolationFn}
  ${getCustomStyles('toolbar.styles', 'root')}
`;

export interface ToolbarProps extends LayoutBoxProps, BaseProps<ToolbarStyleProperties> {
  children: React.ReactElement<ToolbarItemProps | {}> | React.ReactElement<ToolbarItemProps | {}>[];
  selected?: string;
}

export const Toolbar = forwardRef<HTMLDivElement, ToolbarProps>(
  ({ children, selected, ...props }: ToolbarProps, ref) => {
    const interpolatedChildren = guaranteeArray(children).map((child, index) => {
      if (child.type === ToolbarItem) {
        const childProps = child.props as ToolbarItemProps;
        console.log('selected', childProps.name, childProps.name === selected);

        return React.cloneElement(child, {
          key: childProps.name,
          active: selected ? childProps.name === selected : childProps.active,
        });
      }

      return React.cloneElement(child, { key: index });
    });
    return (
      <ToolbarBox ref={ref} {...props}>
        {interpolatedChildren}
      </ToolbarBox>
    );
  }
);
