import styled from 'styled-components';
import { boxInterpolateFn, BoxProps } from '../Box';
import { getComponentStyle, transitionTransformer } from '../utils/styleHelpers';

export type IconButtonSize = 'small' | 'medium' | 'large';

export interface IconButtonProps extends BoxProps {
  size?: IconButtonSize;
}

export const IconButton = styled.button.attrs<IconButtonProps>((props) => ({
  size: props.size || 'medium',
}))<IconButtonProps>`
  border: 0;
  padding: 0;
  outline: 0;
  box-sizing: border-box;
  transition: ${getComponentStyle('iconButton.buttonTransition', transitionTransformer)};
  border-radius: ${getComponentStyle('iconButton.borderRadius')}px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  width: ${getComponentStyle('iconButton.size.{size}')};
  height: ${getComponentStyle('iconButton.size.{size}')};
  background-color: ${getComponentStyle('iconButton.backgroundColor')};
  color: ${getComponentStyle('iconButton.color')};

  &:hover {
    background-color: ${getComponentStyle('iconButton.hover.backgroundColor')};
    color: ${getComponentStyle('iconButton.hover.color')};
  }

  &:focus {
    background-color: ${getComponentStyle('iconButton.focus.backgroundColor')};
    color: ${getComponentStyle('iconButton.focus.color')};
  }
  ${boxInterpolateFn}
`;
