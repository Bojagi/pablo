import { Placement } from '@popperjs/core';
import React, { forwardRef, ReactComponentElement, ReactElement } from 'react';

import styled from 'styled-components';
import { Popover, PopoverProps } from '../Popover/Popover';
import { PopoverArrow } from '../PopoverArrow/PopoverArrow';
import { getColor } from '../styleHelpers';
import { MenuItemProps } from './MenuItem';

export interface MenuProps {
  children: ReactComponentElement<any>;
  open: boolean;
  placement: Placement;
  offset?: number;
  onClose?: () => void;
  items: ReactElement<MenuItemProps>[];
  animation?: PopoverProps['animation'];
  animationProps?: PopoverProps['animationProps'];
}

const MenuBox = styled.div`
  background-color: ${getColor('common', 'white')};
  border-radius: 4px;
  max-width: 400px;
  min-width: 120px;
  padding: 8px;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.2);
`;

export const Menu = forwardRef(
  (
    { children, items, open, offset, onClose, placement, animation, animationProps }: MenuProps,
    ref
  ) => (
    <Popover
      ref={ref}
      open={open}
      offset={offset}
      onClickOutside={onClose}
      arrow={<PopoverArrow size={10} color="white" />}
      placement={placement}
      content={<MenuBox>{items}</MenuBox>}
      animation={animation}
      animationProps={animationProps}
    >
      {children}
    </Popover>
  )
);
