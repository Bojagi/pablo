import { Placement } from '@popperjs/core';
import React, { forwardRef, ReactComponentElement, ReactElement } from 'react';

import styled from 'styled-components';
import { Box } from '../Box';
import { Popover, PopoverProps } from '../Popover/Popover';
import { PopoverArrow } from '../PopoverArrow/PopoverArrow';
import { getColor } from '../styleHelpers';
import { BaseProps } from '../types';
import { useCustomStyles } from '../utils/useCustomStyles';
import { MenuItemProps } from './MenuItem';
import { MenuStyleProperties } from './styles';

export interface MenuProps extends BaseProps<MenuStyleProperties> {
  children: ReactComponentElement<any>;
  open: boolean;
  placement: Placement;
  offset?: number;
  onClose?: () => void;
  items: ReactElement<MenuItemProps>[];
  animation?: PopoverProps['animation'];
  animationProps?: PopoverProps['animationProps'];
}

const MenuBox = styled(Box)`
  background-color: ${getColor('common', 'white')};
  border-radius: 4px;
  max-width: 400px;
  min-width: 120px;
  padding: 8px;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.2);
  ${(props) => props.css}
`;

export const Menu = forwardRef(
  (
    {
      children,
      items,
      open,
      offset,
      onClose,
      placement,
      animation,
      animationProps,
      customStyles,
    }: MenuProps,
    ref
  ) => {
    const getCustomStyles = useCustomStyles('menu.styles', customStyles);
    return (
      <Popover
        ref={ref}
        open={open}
        offset={offset}
        onClickOutside={onClose}
        arrow={<PopoverArrow size={10} color="white" customCss={getCustomStyles('arrow')} />}
        placement={placement}
        content={<MenuBox css={getCustomStyles('box')}>{items}</MenuBox>}
        animation={animation}
        animationProps={animationProps}
      >
        {children}
      </Popover>
    );
  }
);
