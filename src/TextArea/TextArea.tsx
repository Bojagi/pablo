import React, { forwardRef } from 'react';
import styled from 'styled-components';
import { LayoutBoxProps } from '../Box';
import { getComponentStyle } from '../styleHelpers/getComponentStyle';
import { BaseInput, InnerInputProps, InputVariant } from '../BaseInput/BaseInput';
import { useComponentStyle } from '../theme/useComponentStyle';

export interface TextAreaProps extends LayoutBoxProps {
  id?: string;
  value?: string;
  inputRef?: React.Ref<HTMLTextAreaElement>;
  error?: React.ReactNode;
  label?: React.ReactNode;
  variant?: InputVariant;
  infoText?: React.ReactNode;
  rows?: number;
  fullWidth?: boolean;
  onChange: (newValue: string, e: React.FormEvent<HTMLTextAreaElement>) => void;
}

interface InnerTextAreaProps
  extends InnerInputProps<{
    rows: number | undefined;
  }> {}

const InnerTextArea = styled.textarea<InnerTextAreaProps>`
  resize: none;
  border: 0;
  flex-grow: 1;
  box-sizing: border-box;
  padding: ${getComponentStyle('textarea.padding')};
  background-color: transparent;
  font-family: ${getComponentStyle('textarea.fontFamily')};
  outline: none;
`;

export const TextArea = forwardRef<HTMLDivElement, TextAreaProps>(
  ({ rows, variant = 'filled', width, ...props }, ref) => {
    const rowsFallback = useComponentStyle('textarea.defaultRows') as number;
    const rowsWithFallback = rows || rowsFallback;
    const defaultWidth = useComponentStyle('textarea.defaultWidth');

    return (
      <BaseInput
        variant={variant}
        name="textarea"
        innerRef={ref}
        {...props}
        width={width || defaultWidth}
        rows={rowsWithFallback}
        inputComponent={InnerTextArea}
      />
    );
  }
);
