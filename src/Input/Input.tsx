import React from 'react';
import styled, { css } from 'styled-components';
import { Box, BoxProps } from '../Box';
import { getComponentStyle, transitionTransformer } from '../utils/styleHelpers/getComponentStyle';
import { InfoText, ParagraphBold } from '../Typography';
import { useUniqueId } from '../utils/useUniqueId';
import { interpolateSize } from '../utils/interpolateSize';
import { useComponentStyle } from '../theme';

export interface InputProps extends BoxProps {
  id?: string;
  value?: string;
  error?: React.ReactNode;
  label?: React.ReactNode;
  infoText?: React.ReactNode;
  fullWidth?: boolean;
  width?: string | number;
  onChange: (newValue: string, e: React.FormEvent<HTMLInputElement>) => void;
}

export interface InnerInputProps {
  error?: React.ReactNode;
  fullWidth?: boolean;
  width: string | number;
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

export function Input({
  id: idProp,
  value,
  error,
  label,
  infoText,
  fullWidth,
  width,
  onChange,
  ...props
}: InputProps) {
  const generatedId = useUniqueId('input');
  const id = idProp || generatedId;
  const actualInfoText = error || infoText;
  const defaultWidth = useComponentStyle('input.defaultWidth');
  return (
    <Box {...props}>
      {label && (
        <label data-testid="pbl-input-label" htmlFor={id}>
          <ParagraphBold mb={0.75}>{label}</ParagraphBold>
        </label>
      )}
      <InnerInput
        data-testid="pbl-input"
        id={id}
        error={error}
        value={value}
        fullWidth={fullWidth}
        width={width || defaultWidth}
        onChange={(e) => onChange(e.target.value, e)}
        {...props}
      />
      {actualInfoText && (
        <InfoText
          data-testid="pbl-input-infotext"
          mt={0.5}
          color={error ? 'negative.main' : 'text.info'}
        >
          {actualInfoText}
        </InfoText>
      )}
    </Box>
  );
}
