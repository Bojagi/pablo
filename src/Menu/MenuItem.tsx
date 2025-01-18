import React, { ReactNode } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { buttonBaseStyles } from '../ButtonBase';
import { themeVars } from '../theme/themeVars';
import { BaseProps } from '../types';
import { Typography } from '../Typography';
import { getCustomStyles, useCustomStyles } from '../utils/useCustomStyles';
import { MenuItemStyleProperties } from './styles';
import { margin, padding } from '../Box/interpolations/spacing';

export interface MenuItemProps extends BaseProps<MenuItemStyleProperties> {
  children: ReactNode;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  selected?: boolean;
  as?: React.ElementType;
}

const MenuItemBox = styled.div<MenuItemProps>`
  ${buttonBaseStyles as any}
  display: block;
  color: ${themeVars.colors.common.black};
  text-decoration: none;
  ${margin.y(0.25)}
  ${padding.all(0.5)}

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
    <Typography
      variant="button"
      customStyles={{
        button: useCustomStyles('menu.styles', customStyles)('itemText'),
      }}
    >
      {children}
    </Typography>
  </MenuItemBox>
);
