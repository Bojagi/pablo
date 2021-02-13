import React from 'react';
import styled, { css } from 'styled-components';
import { Box, BoxProps } from '../Box';
import { getComponentStyle } from '../utils/styleHelpers/getComponentStyle';
import { getSpacing } from '../utils/styleHelpers/getSpacing';
import { useComponentStyleContext } from '../theme';
import { Typography } from '../Typography';
import { useUniqueId } from '../utils/useUniqueId';

export type RadioSize = 'small' | 'medium';

interface RadioBoxProps {
  disabled?: boolean;
  size?: RadioSize;
}

const RadioBox = styled.div<RadioBoxProps>`
  position: relative;
  width: ${getComponentStyle('radio.handleSize.{size}')};
  height: ${getComponentStyle('radio.handleSize.{size}')};
  border-radius: 50%;
  padding: ${getComponentStyle('radio.innerPadding.{size}')};
  background-color: ${getComponentStyle('radio.backgroundColor')};
  border: ${getComponentStyle('radio.borderWidth')}px solid
    ${getComponentStyle('radio.borderColor')};
  opacity: ${(props) => (props.disabled ? 0.3 : 1)};
`;

const HiddenInput = styled.input.attrs({ type: 'radio' })`
  position: absolute;
  display: block;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  ${(props) =>
    !props.disabled &&
    css`
      cursor: pointer;
    `}
`;

interface RadioHandleProps {
  disabled?: boolean;
  checked: boolean;
  size?: RadioSize;
}

const RadioHandle = styled.div<RadioHandleProps>`
  width: ${getComponentStyle('radio.handleSize.{size}')};
  height: ${getComponentStyle('radio.handleSize.{size}')};
  transform: scale(${(props: any) => (props.checked ? 1 : 0)});
  border-radius: 50%;
  transition: ${getComponentStyle('radio.handleTransition')};
  background-color: ${getComponentStyle('radio.handleColor')};
`;

export interface RadioProps extends BoxProps {
  id?: string;
  className?: string;
  disabled?: boolean;
  name?: string;
  size?: RadioSize;
  value: string;
  label?: React.ReactNode;
  checked?: boolean;
  onChange?: (value: string, e: React.FormEvent<HTMLInputElement>) => void;
  onClick?: (e: React.FormEvent<HTMLInputElement>) => void;
}

export const Radio = ({
  id: idProp,
  className,
  size = 'medium',
  name,
  disabled,
  value,
  label,
  checked = false,
  onChange,
  onClick,
  ...props
}: RadioProps) => {
  const generatedId = useUniqueId('radio');
  const id = idProp || generatedId;
  const componentStyles = useComponentStyleContext();
  const typographyVariant = componentStyles.radio.typographyVariant[size];

  return (
    <Box className={className} display="flex" alignItems="center" {...props}>
      <RadioBox data-testid="pbl-radio" disabled={disabled} size={size}>
        <RadioHandle data-testid="pbl-radio-handle" checked={checked} size={size} />
        <HiddenInput
          id={id}
          data-testid="pbl-radio-input"
          name={name}
          checked={checked}
          disabled={disabled}
          value={value}
          onClick={onClick}
          onChange={
            onChange
              ? (e) => {
                  onChange(e.target.value, e);
                }
              : undefined
          }
        />
      </RadioBox>
      {label && (
        <label data-testid="pbl-radio-label" htmlFor={id}>
          <Typography ml={1} mb={0} variant={typographyVariant}>
            {label}
          </Typography>
        </label>
      )}
    </Box>
  );
};

getSpacing(2.25, false);
