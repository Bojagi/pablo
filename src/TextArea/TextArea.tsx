import React from 'react';
import styled, { css } from 'styled-components';
import { boxInterpolateFn, BoxProps } from '../Box';
import { getComponentStyle, transitionTransformer } from '../utils/styleHelpers/getComponentStyle';
import { InfoText, ParagraphBold } from '../Typography';
import { useUniqueId } from '../utils/useUniqueId';
import { interpolateSize } from '../utils/interpolateSize';
import { useComponentStyle } from '../theme';

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

interface TextAreaBoxProps extends BoxProps {}

const TextAreaBox = styled.div<TextAreaBoxProps>`
  ${boxInterpolateFn}
`;

interface InnerTextAreaProps {
  error?: React.ReactNode;
  fullWidth?: boolean;
  width: string | number;
}

const InnerTextArea = styled.textarea<InnerTextAreaProps>`
  width: ${(props) => interpolateSize(props.width)};
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

export function TextArea({
  id: idProp,
  value,
  error,
  label,
  infoText,
  fullWidth,
  width,
  onChange,
  rows,
  ...props
}: TextAreaProps) {
  const generatedId = useUniqueId('textarea');
  const id = idProp || generatedId;
  const actualInfoText = error || infoText;
  const defaultWidth = useComponentStyle('textarea.defaultWidth');
  return (
    <TextAreaBox {...props}>
      {label && (
        <label data-testid="pbl-textarea-label" htmlFor={id}>
          <ParagraphBold mb={0.75}>{label}</ParagraphBold>
        </label>
      )}
      <InnerTextArea
        data-testid="pbl-textarea"
        id={id}
        rows={rows}
        error={error}
        width={width || defaultWidth}
        value={value}
        fullWidth={fullWidth}
        onChange={(e) => onChange(e.target.value, e)}
        {...props}
      />
      {actualInfoText && (
        <InfoText
          data-testid="pbl-textarea-infotext"
          mt={0.5}
          color={error ? 'negative.main' : 'text.info'}
        >
          {actualInfoText}
        </InfoText>
      )}
    </TextAreaBox>
  );
}
