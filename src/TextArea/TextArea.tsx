import React, { forwardRef } from 'react';
import styled from '@emotion/styled';
import { LayoutBoxProps } from '../Box';
import { getComponentStyle } from '../styleHelpers/getComponentStyle';
import { BaseInput, InnerInputProps, InputVariant } from '../shared/BaseInput';
import { useComponentStyle } from '../theme/useComponentStyle';
import { getCustomStyles } from '../utils/useCustomStyles';
import { baseStyle } from '../shared/baseStyle';

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

type InnerTextAreaProps = InnerInputProps<{
  rows: number | undefined;
}>;

const InnerTextArea = styled.textarea<InnerTextAreaProps>`
  ${baseStyle}
  resize: none;
  border: 0;
  flex-grow: 1;
  padding: ${getComponentStyle('textArea.padding')};
  background-color: transparent;
  font-family: ${getComponentStyle('textArea.fontFamily')};
  font-size: ${getComponentStyle('textArea.fontSize')};
  outline: none;
  ${getCustomStyles('textArea.styles', 'field')}
`;

export const TextArea = forwardRef<HTMLDivElement, TextAreaProps>(
  ({ rows, variant = 'filled', width, ...props }, ref) => {
    const rowsFallback = useComponentStyle('textArea.defaultRows') as number;
    const rowsWithFallback = rows || rowsFallback;
    const defaultWidth = useComponentStyle('textArea.defaultWidth');

    return (
      <BaseInput
        variant={variant}
        name="textArea"
        innerRef={ref}
        {...props}
        width={width || defaultWidth}
        rows={rowsWithFallback}
        inputComponent={InnerTextArea}
      />
    );
  }
);
