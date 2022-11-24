import React, { ReactNode } from 'react';
import styled, { css } from 'styled-components';
import { buttonBaseStyles } from '../ButtonBase';
import { getSpacing } from '../styleHelpers';
import { themeVars } from '../theme/themeVars';
import { BaseProps } from '../types';
import { ButtonTypography } from '../Typography';
import { getCustomStyles, useCustomStyles } from '../utils/useCustomStyles';
import { MenuItemStyleProperties } from './styles';

export interface MenuItemProps extends BaseProps<MenuItemStyleProperties> {
  children: ReactNode;
  onClick?: (e: React.PointerEvent<HTMLButtonElement>) => void;
  selected?: boolean;
  as?: React.ElementType;
}

const MenuItemBox = styled.div<MenuItemProps>`
  ${buttonBaseStyles as any}
  display: block;
  color: ${themeVars.colors.common.black};
  text-decoration: none;
  margin-top: ${getSpacing(1)};
  margin-bottom: ${getSpacing(1)};
  padding: ${getSpacing(2)};

  ${(props: MenuItemProps) =>
    props.selected
      ? css`
          background-color: ${themeVars.colors.brand.lightest};
        `
      : css`
          &:hover {
            background-color: ${themeVars.colors.gray['50']};
          }

          &:active {
            background-color: ${themeVars.colors.gray[100]};
          }
        `}
  ${getCustomStyles('menu.styles', 'item')}
`;

export const MenuItem = ({ children, onClick, as, customStyles, ...props }: MenuItemProps) => (
  <MenuItemBox
    data-testid="pbl-menu-item"
    as={as}
    role="menuitem"
    onClick={onClick}
    customStyles={customStyles}
    {...props}
  >
    <ButtonTypography
      customStyles={{
        button: useCustomStyles('menu.styles', customStyles)('itemText'),
      }}
    >
      {children}
    </ButtonTypography>
  </MenuItemBox>
);
