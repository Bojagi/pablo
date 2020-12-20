import styled from 'styled-components';
import { boxInterpolateFn, BoxProps } from '../Box';
import { getComponentStyle, transitionTransformer } from '../styleHelpers';

export interface ButtonBaseProps extends BoxProps {}

export const ButtonBase = styled.button<ButtonBaseProps>`
  ${boxInterpolateFn}
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: ${getComponentStyle('button.base.padding')};
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
