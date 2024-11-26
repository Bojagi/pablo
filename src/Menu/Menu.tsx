import React, { forwardRef } from 'react';
import styled from '@emotion/styled';
import { Box } from '../Box';
import { Popover, PopoverProps } from '../Popover/Popover';
import { PopoverArrow } from '../PopoverArrow/PopoverArrow';
import { baseStyle } from '../shared/baseStyle';
import { themeVars } from '../theme/themeVars';
import { BaseProps } from '../types';
import { useCustomStyles } from '../utils/useCustomStyles';
import { MenuItemProps } from './MenuItem';
import { MenuStyleProperties } from './styles';
import type { ComponentElement, ReactElement } from 'react';
import type { NanoPopPosition } from 'nanopop';

export interface MenuProps extends BaseProps<MenuStyleProperties> {
  children: ComponentElement<any, any>;
  open: boolean;
  placement?: NanoPopPosition;
  offset?: number;
  onClose?: () => void;
  items: ReactElement<MenuItemProps>[];
  animation?: PopoverProps['animation'];
  animationProps?: PopoverProps['animationProps'];
}

const MenuBox = styled(Box)`
  ${baseStyle}
  background-color: ${themeVars.colors.common.white};
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
      placement = 'bottom-end',
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
        aria-haspopup="menu"
        arrow={<PopoverArrow size={10} color="white" customCss={getCustomStyles('arrow')} />}
        placement={placement}
        content={
          <MenuBox role="menu" css={getCustomStyles('box')}>
            {items}
          </MenuBox>
        }
        animation={animation}
        animationProps={animationProps}
      >
        {children}
      </Popover>
    );
  }
);
