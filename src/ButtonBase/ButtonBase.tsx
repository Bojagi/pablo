import styled from 'styled-components';
import { boxInterpolateFn, BoxProps } from '../Box';
import { getComponentStyle, transitionTransformer } from '../utils/styleHelpers/getComponentStyle';

export type ButtonSize = 'small' | 'medium' | 'large';
// eslint-disable-next-line no-undef
export interface ButtonBaseProps extends BoxProps {
  size?: ButtonSize;
}

export const ButtonBase = styled.button
  .withConfig({})
  .attrs((props: ButtonBaseProps) => ({ size: props.size || 'small' }))<ButtonBaseProps>`
  ${boxInterpolateFn}
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: ${getComponentStyle('button.sizes.{size}.padding')};
  border: ${getComponentStyle('button.base.borderSize')}px solid transparent;
  background: transparent;
  border-radius: ${getComponentStyle('button.base.borderRadius')};
  transition: ${getComponentStyle('button.base.transitions', transitionTransformer)};
  outline: none;

  &:not(:disabled) {
    cursor: pointer;
  }

  &:disabled {
    opacity: ${getComponentStyle('button.base.disabled.opacity')};
    cursor: normal;
  }
`;
