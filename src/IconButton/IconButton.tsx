import styled, { css } from 'styled-components';
import { LayoutBoxProps, layoutInterpolationFn } from '../Box';
import { getComponentStyle, transitionTransformer } from '../styleHelpers';

export type IconButtonSize = 'small' | 'medium' | 'large';

export interface IconButtonProps extends LayoutBoxProps {
  size?: IconButtonSize;
  active?: boolean;
}

export const IconButton = styled.button.attrs<IconButtonProps>((props) => ({
  size: props.size || 'medium',
  active: props.active || false,
}))<IconButtonProps>`
  width: ${getComponentStyle('iconButton.size.{size}')};
  height: ${getComponentStyle('iconButton.size.{size}')};
  background-color: ${getComponentStyle('iconButton.backgroundColor')};
  color: ${getComponentStyle('iconButton.color')};

  border: 0;
  padding: 0;
  outline: 0;
  box-sizing: border-box;
  transition: ${getComponentStyle('iconButton.transition', transitionTransformer)};
  border-radius: ${getComponentStyle('iconButton.borderRadius')}px;
  display: flex;
  justify-content: center;
  align-items: center;

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

  &:not(:disabled) {
    cursor: pointer;
  }

  &:disabled {
    opacity: ${getComponentStyle('iconButton.disabled.opacity')};
    cursor: normal;
  }

  ${(props) =>
    props.active
      ? css`
          background-color: ${getComponentStyle('toolbar.item.active.backgroundColor')};
          color: ${getComponentStyle('toolbar.item.active.color')};
        `
      : css`
          &:hover:not(:disabled) {
            background-color: ${getComponentStyle('iconButton.hover.backgroundColor')};
            color: ${getComponentStyle('iconButton.hover.color')};
          }

          &:focus:not(:disabled) {
            background-color: ${getComponentStyle('iconButton.focus.backgroundColor')};
            color: ${getComponentStyle('iconButton.focus.color')};
          }
        `}

  ${({ size, ...props }) => layoutInterpolationFn(props)}
`;
