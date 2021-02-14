import React from 'react';
import styled, { css } from 'styled-components';
import { BoxProps } from '../Box';
import { getComponentStyle, transitionTransformer } from '../utils/styleHelpers/getComponentStyle';
import { interpolateSize } from '../utils/interpolateSize';
import { useComponentStyle } from '../theme';
import { BaseInput, InnerInputProps } from '../BaseInput/BaseInput';

export interface TextAreaProps extends BoxProps {
  id?: string;
  value?: string;
  error?: React.ReactNode;
  label?: React.ReactNode;
  infoText?: React.ReactNode;
  rows?: number;
  fullWidth?: boolean;
  width?: string | number;
  onChange: (newValue: string, e: React.FormEvent<HTMLTextAreaElement>) => void;
}

interface InnerTextAreaProps
  extends InnerInputProps<{
    rows: number | undefined;
  }> {}

const InnerTextArea = styled.textarea<InnerTextAreaProps>`
  width: ${(props) => (props.width ? interpolateSize(props.width) : 'auto')};
  ${(props) =>
    props.fullWidth &&
    css`
      width: 100%;
    `}
  resize: none;
  box-sizing: border-box;
  padding: ${getComponentStyle('textarea.padding')};
  border: ${getComponentStyle('textarea.borderWidth')}px solid
    ${getComponentStyle('textarea.borderColor')};
  border-radius: 8px;
  background-color: ${getComponentStyle('textarea.backgroundColor')};
  font-family: ${getComponentStyle('textarea.fontFamily')};
  transition: ${getComponentStyle('textarea.transitions', transitionTransformer)};
  outline: none;

  &:focus {
    box-shadow: 0 0 0 ${getComponentStyle('textarea.focus.outlineSize')}
      ${getComponentStyle('textarea.focus.outlineColor')};
  }

  ${(props) =>
    props.error &&
    css`
      border-color: ${getComponentStyle('textarea.error.borderColor')};
      &:focus {
        box-shadow: 0 0 0 ${getComponentStyle('textarea.focus.outlineSize')}
          ${getComponentStyle('textarea.error.focus.outlineColor')};
      }
    `}
`;

export function TextArea({ rows, onChange, ...props }: TextAreaProps) {
  const rowsWithFallback = (useComponentStyle('textarea.defaultRows') as number) || rows;
  return (
    <BaseInput
      name="textarea"
      {...props}
      onChange={onChange}
      rows={rowsWithFallback}
      inputComponent={InnerTextArea}
    />
  );
}
