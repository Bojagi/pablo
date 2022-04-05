import { css } from 'styled-components';
import { layoutInterpolationFn, LayoutBoxProps } from '../Box';
import { baseStyle } from '../shared/baseStyle';
import { getComponentStyle, transitionTransformer } from '../styleHelpers/getComponentStyle';

export type ButtonSize = 'small' | 'medium' | 'large';
export interface ButtonBaseProps extends LayoutBoxProps {
  size?: ButtonSize;
  onClick?: () => void;
}

export const buttonBaseStyles = css<ButtonBaseProps>`
  ${baseStyle}
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  text-decoration: none;
  padding: ${getComponentStyle('button.sizes.{size}.padding')};
  border: ${getComponentStyle('button.base.borderSize')}px solid transparent;
  background: transparent;
  border-radius: ${getComponentStyle('button.base.borderRadius')};
  transition: ${getComponentStyle('button.base.transitions', transitionTransformer)};
  outline: none;

  &:enabled {
    cursor: pointer;
  }

  &:disabled {
    opacity: ${getComponentStyle('button.base.disabled.opacity')};
    cursor: normal;
  }

  ${({ size, ...props }) => layoutInterpolationFn(props)}
`;
