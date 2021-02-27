import { Placement } from '@popperjs/core';
import React, { forwardRef, ReactElement, ReactNode } from 'react';

import styled from 'styled-components';
import { Box } from '../Box';
import { Popover } from '../Popover/Popover';
import { PopoverArrow } from '../PopoverArrow/PopoverArrow';
import { getColor } from '../styleHelpers';
import { MenuItemProps } from './MenuItem';

export interface MenuProps {
  children: ReactNode;
  open: boolean;
  placement: Placement;
  offset?: number;
  onClose?: () => void;
  items: ReactElement<MenuItemProps>[];
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
  ({ children, items, open, offset, onClose, placement }: MenuProps, ref) => (
    <Popover
      ref={ref}
      open={open}
      offset={offset}
      onClickOutside={onClose}
      arrow={<PopoverArrow size={10} color="white" />}
      placement={placement}
      content={<MenuBox>{items}</MenuBox>}
    >
      <Box my={-1}>{children}</Box>
    </Popover>
  )
);
