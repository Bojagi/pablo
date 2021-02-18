import React from 'react';
import styled, { css } from 'styled-components';
import { BoxProps } from '../Box';
import { getComponentStyle, transitionTransformer } from '../utils/styleHelpers/getComponentStyle';
import { interpolateSize } from '../utils/interpolateSize';
import { BaseInput, InnerInputProps } from '../BaseInput/BaseInput';
import { useComponentStyle } from '../theme';

export interface InputProps extends BoxProps {
  id?: string;
  value?: string | number;
  error?: React.ReactNode;
  label?: React.ReactNode;
  infoText?: React.ReactNode;
  fullWidth?: boolean;
  width?: string | number;
  onChange: (newValue: string, e: React.FormEvent<HTMLInputElement>) => void;
}

const InnerInput = styled.input<InnerInputProps>`
  width: ${(props) => interpolateSize(props.width)};
  ${(props) =>
    props.fullWidth &&
    css`
      width: 100%;
    `}
  box-sizing: border-box;
  padding: ${getComponentStyle('input.padding')};
  border: ${getComponentStyle('input.borderWidth')}px solid
    ${getComponentStyle('input.borderColor')};
  border-radius: 8px;
  background-color: ${getComponentStyle('input.backgroundColor')};
  font-family: ${getComponentStyle('input.fontFamily')};
  transition: ${getComponentStyle('input.transitions', transitionTransformer)};
  outline: none;

  &:focus {
    box-shadow: 0 0 0 ${getComponentStyle('input.focus.outlineSize')}
      ${getComponentStyle('input.focus.outlineColor')};
  }

  ${(props) =>
    props.error &&
    css`
      border-color: ${getComponentStyle('input.error.borderColor')};
      &:focus {
        box-shadow: 0 0 0 ${getComponentStyle('input.focus.outlineSize')}
          ${getComponentStyle('input.error.focus.outlineColor')};
      }
    `}
`;

export function Input({ width, ...props }: InputProps) {
  const defaultWidth = useComponentStyle('input.defaultWidth');
  return (
    <BaseInput name="input" width={width || defaultWidth} inputComponent={InnerInput} {...props} />
  );
}
