import React from 'react';
import styled, { css } from 'styled-components';
import { Box, BoxProps } from '../Box';
import { getSpacing, getComponentStyle, getComponentStyleByProp } from '../styleHelpers';
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
  width: ${getComponentStyleByProp('size', 'radio.handleSize.')};
  height: ${getComponentStyleByProp('size', 'radio.handleSize.')};
  border-radius: 50%;
  padding: ${getComponentStyleByProp('size', 'radio.innerPadding.')};
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
  width: ${getComponentStyleByProp('size', 'radio.handleSize.')};
  height: ${getComponentStyleByProp('size', 'radio.handleSize.')};
  transform: scale(${(props: any) => (props.checked ? 1 : 0)});
  border-radius: 50%;
  transition: ${getComponentStyle('radio.handleTransition')};
  background-color: ${getComponentStyle('radio.handleColor')};
`;

export interface RadioProps extends BoxProps {
  className?: string;
  disabled?: boolean;
  name?: string;
  size?: RadioSize;
  value: string;
  label?: React.ReactNode;
  checked?: boolean;
  onClick?: () => void;
}

export const Radio = ({
  className,
  size = 'medium',
  name,
  disabled,
  value,
  label,
  checked = false,
  onClick,
  ...props
}: RadioProps) => {
  const id = useUniqueId('radio');
  const componentStyles = useComponentStyleContext();
  const typographyVariant = componentStyles.radio.typographyVariant[size];
  return (
    <Box className={className} display="flex" alignItems="center" {...props}>
      <RadioBox onClick={!disabled ? onClick : undefined} disabled={disabled} size={size}>
        <RadioHandle checked={checked} size={size} />
        <HiddenInput
          id={id}
          name={name}
          checked={checked}
          disabled={disabled}
          value={value}
          onChange={!disabled ? onClick : undefined}
        />
      </RadioBox>
      {label && (
        <label htmlFor={id}>
          <Typography ml={1} mb={0} variant={typographyVariant}>
            {label}
          </Typography>
        </label>
      )}
    </Box>
  );
};

getSpacing(2.25, false);
