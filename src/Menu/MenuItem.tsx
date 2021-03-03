import React, { ReactNode } from 'react';
import styled, { css } from 'styled-components';
import { buttonBaseStyles } from '../ButtonBase';
import { getSpacing, getColor } from '../styleHelpers';
import { ButtonTypography } from '../Typography';

export interface MenuItemProps {
  children: ReactNode;
  onClick?: (e: React.PointerEvent<HTMLButtonElement>) => void;
  selected?: boolean;
  as?: React.ElementType;
}

const MenuItemBox = styled.div<MenuItemProps>`
  ${buttonBaseStyles as any}
  display: block;
  color: ${getColor('common', 'black')};
  text-decoration: none;
  margin-top: ${getSpacing(1)};
  margin-bottom: ${getSpacing(1)};
  padding: ${getSpacing(2)};

  ${(props: MenuItemProps) =>
    props.selected
      ? css`
          background-color: ${getColor('brand', 'lightest')};
        `
      : css`
          &:hover {
            background-color: ${getColor('gray', '50')};
          }

          &:active {
            background-color: ${getColor('gray', '100')};
          }
        `}
`;

export const MenuItem = ({ children, onClick, as, ...props }: MenuItemProps) => (
  <MenuItemBox data-testid="pbl-menu-item" as={as} onClick={onClick} {...props}>
    <ButtonTypography>{children}</ButtonTypography>
  </MenuItemBox>
);
