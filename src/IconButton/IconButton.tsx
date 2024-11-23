import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { LayoutBoxProps, layoutInterpolationFn } from '../Box';
import { baseStyle } from '../shared/baseStyle';
import { getComponentStyle, transitionTransformer } from '../styleHelpers';
import { BaseProps, CssFunctionReturn } from '../types';
import { getCustomStyles } from '../utils/useCustomStyles';
import { IconButtonStyleProperties } from './styles';
import { omit } from '../utils/omit';
import React, { forwardRef, HTMLProps } from 'react';

export type IconButtonSize = 'small' | 'medium' | 'large';
export type IconButtonColor = 'brand' | 'plain' | 'negative' | 'positive';

export interface IconButtonProps
  extends Omit<LayoutBoxProps, 'theme'>,
    BaseProps<IconButtonStyleProperties>,
    Omit<HTMLProps<HTMLButtonElement>, 'width' | 'height' | 'size' | 'as' | 'type'> {
  size?: IconButtonSize;
  color?: IconButtonColor;
  active?: boolean;
  role?: string;
  children?: React.ReactNode;
  css?: CssFunctionReturn<IconButtonProps>;
}
const StyledIconButton = styled.button<IconButtonProps>`
  ${baseStyle}
  width: ${getComponentStyle('iconButton.size.{size}')};
  height: ${getComponentStyle('iconButton.size.{size}')};
  background-color: ${getComponentStyle('iconButton.{color}.backgroundColor')};
  color: ${getComponentStyle('iconButton.{color}.color')};

  border: 0;
  padding: 0;
  outline: 0;
  box-sizing: border-box;
  transition: ${getComponentStyle('iconButton.transition', transitionTransformer)};
  border-radius: ${getComponentStyle('iconButton.borderRadius')};
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;

  & > * {
    width: ${getComponentStyle('iconButton.icon.size.{size}')};
    height: ${getComponentStyle('iconButton.icon.size.{size}')};
    transition: ${getComponentStyle('iconButton.icon.transition', transitionTransformer)};
    transform: scale(
      ${(props) =>
        props.active
          ? props.theme.componentStyles.iconButton.icon.active.scale
          : props.theme.componentStyles.iconButton.icon.scale}
    );
  }

  &:enabled {
    cursor: pointer;
  }

  &:disabled {
    opacity: ${getComponentStyle('iconButton.disabled.opacity')};
    cursor: normal;
  }

  ${getCustomStyles('iconButton.styles', 'root')}

  ${(props) =>
    props.active
      ? css`
          background-color: ${getComponentStyle('iconButton.{color}.active.backgroundColor')(
            props
          )};
          color: ${getComponentStyle('iconButton.{color}.active.color')(props)};
          ${getCustomStyles('iconButton.styles', 'active')(props)}
        `
      : css`
          &:hover:enabled {
            background-color: ${getComponentStyle('iconButton.{color}.hover.backgroundColor')(
              props
            )};
            color: ${getComponentStyle('iconButton.{color}.hover.color')(props)};
            ${getCustomStyles('iconButton.styles', 'hover')(props)}
          }

          &:focus:enabled {
            background-color: ${getComponentStyle('iconButton.{color}.focus.backgroundColor')(
              props
            )};
            color: ${getComponentStyle('iconButton.{color}.focus.color')(props)};
            ${getCustomStyles('iconButton.styles', 'focus')(props)}
          }
        `}

  ${(props) => layoutInterpolationFn(omit(props, ['size']))}
`;

const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ size = 'medium', color = 'plain', active = false, ...props }, ref) => (
    <StyledIconButton
      size={size}
      color={color}
      active={active}
      ref={ref}
      aria-pressed={active ? 'true' : 'false'}
      {...props}
    />
  )
);

export { IconButton };
