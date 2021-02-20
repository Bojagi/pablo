import React from 'react';
import styled from 'styled-components';
import { BoxProps } from '../Box';
import { getComponentStyle } from '../utils/styleHelpers/getComponentStyle';
import { BaseInput, InnerInputProps, InputVariant } from '../BaseInput/BaseInput';
import { useComponentStyle } from '../theme';

export interface InputProps extends BoxProps {
  id?: string;
  value?: string | number;
  error?: React.ReactNode;
  label?: React.ReactNode;
  variant?: InputVariant;
  infoText?: React.ReactNode;
  fullWidth?: boolean;
  width?: string | number;
  end?: React.ReactNode;
  onChange: (newValue: string, e: React.FormEvent<HTMLInputElement>) => void;
}

const InnerInput = styled.input<InnerInputProps>`
  box-sizing: border-box;
  flex-grow: 1;
  border: 0;
  padding: ${getComponentStyle('input.padding')};
  background-color: transparent;
  font-family: ${getComponentStyle('input.fontFamily')};
  outline: none;
`;

export function Input({ width, variant = 'filled', ...props }: InputProps) {
  const defaultWidth = useComponentStyle('input.defaultWidth');
  const adornmentGap = useComponentStyle('input.adornmentGap');
  return (
    <BaseInput
      name="input"
      width={width || defaultWidth}
      variant={variant}
      adornmentGap={adornmentGap}
      inputComponent={InnerInput}
      {...props}
    />
  );
}
