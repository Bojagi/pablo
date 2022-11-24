import styled, { css } from 'styled-components';
import { LayoutBoxProps, layoutInterpolationFn } from '../Box';
import { baseStyle } from '../shared/baseStyle';
import { getComponentStyle, transitionTransformer } from '../styleHelpers';
import { BaseProps } from '../types';
import { getCustomStyles } from '../utils/useCustomStyles';
import { IconButtonStyleProperties } from './styles';

export type IconButtonSize = 'small' | 'medium' | 'large';
export type IconButtonColor = 'brand' | 'plain' | 'negative' | 'positive';

export interface IconButtonProps extends LayoutBoxProps, BaseProps<IconButtonStyleProperties> {
  size?: IconButtonSize;
  color?: IconButtonColor;
  active?: boolean;
}

export const IconButton = styled.button.attrs<IconButtonProps>((props) => ({
  size: props.size || 'medium',
  color: props.color || 'plain',
  active: props.active || false,
  'aria-pressed': props.active ? 'true' : 'false',
}))<IconButtonProps>`
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
          background-color: ${getComponentStyle('iconButton.{color}.active.backgroundColor')};
          color: ${getComponentStyle('iconButton.{color}.active.color')};
          ${getCustomStyles('iconButton.styles', 'active')}
        `
      : css`
          &:hover:enabled {
            background-color: ${getComponentStyle('iconButton.{color}.hover.backgroundColor')};
            color: ${getComponentStyle('iconButton.{color}.hover.color')};
            ${getCustomStyles('iconButton.styles', 'hover')}
          }

          &:focus:enabled {
            background-color: ${getComponentStyle('iconButton.{color}.focus.backgroundColor')};
            color: ${getComponentStyle('iconButton.{color}.focus.color')};
            ${getCustomStyles('iconButton.styles', 'focus')}
          }
        `}

  ${({ size, ...props }) => layoutInterpolationFn(props)}
`;
