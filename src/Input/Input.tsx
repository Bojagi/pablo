import React, { forwardRef } from 'react';
import styled from '@emotion/styled';
import { LayoutBoxProps } from '../Box';
import { getComponentStyle } from '../styleHelpers/getComponentStyle';
import { BaseInput, InnerInputProps, InputVariant } from '../shared/BaseInput';
import { useComponentStyle } from '../theme/useComponentStyle';
import { getCustomStyles } from '../utils/useCustomStyles';
import { baseStyle } from '../shared/baseStyle';

export interface InputProps extends LayoutBoxProps {
  id?: string;
  value?: string | number;
  inputRef?: React.Ref<HTMLInputElement>;
  error?: React.ReactNode;
  label?: React.ReactNode;
  variant?: InputVariant;
  infoText?: React.ReactNode;
  fullWidth?: boolean;
  end?: React.ReactNode;
  onChange: (newValue: string, e: React.FormEvent<HTMLInputElement>) => void;
}

const InnerInput = styled.input<InnerInputProps>`
  ${baseStyle}
  flex-grow: 1;
  flex-shrink: 1;
  border: 0;
  padding: ${getComponentStyle('input.padding')};
  background-color: transparent;
  font-family: ${getComponentStyle('input.fontFamily')};
  font-size: ${getComponentStyle('input.fontSize')};
  outline: none;
  ${getCustomStyles('input.styles', 'field')}
  width: 100%;
`;

export const Input = forwardRef<HTMLDivElement, InputProps>(
  ({ width, variant = 'filled', ...props }, ref) => {
    const defaultWidth = useComponentStyle('input.defaultWidth') as any;
    const adornmentGap = useComponentStyle('input.adornmentGap');
    return (
      <BaseInput<InnerInputProps, HTMLInputElement>
        name="input"
        innerRef={ref}
        variant={variant}
        adornmentGap={adornmentGap}
        inputComponent={InnerInput}
        {...props}
        width={width || defaultWidth}
      />
    );
  }
);
