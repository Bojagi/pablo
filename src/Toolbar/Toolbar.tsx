import React, { forwardRef, cloneElement } from 'react';
import styled from '@emotion/styled';
import { layoutInterpolationFn, LayoutBoxProps } from '../Box';
import { guaranteeArray } from '../utils/guaranteeArray';
import { getComponentStyle } from '../styleHelpers';
import { ToolbarItem, ToolbarItemProps } from './ToolbarItem';
import { getCustomStyles } from '../utils/useCustomStyles';
import { BaseProps } from '../types';
import { ToolbarStyleProperties } from './styles';
import { baseStyle } from '../shared/baseStyle';

const ToolbarBox = styled.div<LayoutBoxProps>`
  ${baseStyle}
  display: flex;
  margin: 0 -${getComponentStyle(['toolbar', 'gap'])};
  height: calc(${getComponentStyle(['toolbar', 'item', 'size'])} + 2 * ${getComponentStyle(['toolbar', 'gap'])});
  align-items: center;
  ${layoutInterpolationFn}
  ${getCustomStyles('toolbar.styles', 'root')}
`;

export interface ToolbarProps extends LayoutBoxProps, BaseProps<ToolbarStyleProperties> {
  children:
    | React.ReactElement<ToolbarItemProps | object>
    | React.ReactElement<ToolbarItemProps | object>[];
  selected?: string;
}

export const Toolbar = forwardRef<HTMLDivElement, ToolbarProps>(
  ({ children, selected, ...props }: ToolbarProps, ref) => {
    const interpolatedChildren = guaranteeArray(children).map((child, index) => {
      if (child.type === ToolbarItem) {
        const childProps = child.props as ToolbarItemProps;

        return cloneElement(child, {
          key: childProps.name,
          active: selected ? childProps.name === selected : childProps.active,
        });
      }

      return cloneElement(child, { key: index });
    });
    return (
      <ToolbarBox role="toolbar" aria-orientation="horizontal" ref={ref} {...props}>
        {interpolatedChildren}
      </ToolbarBox>
    );
  }
);
