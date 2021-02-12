import React from 'react';
import styled, { css } from 'styled-components';
import { Box, BoxProps } from '../Box';
import { getComponentStyle } from '../styleHelpers';
import { useComponentStyleContext } from '../theme';
import { Typography } from '../Typography';
import { useUniqueId } from '../utils/useUniqueId';

export type CheckboxSize = 'small' | 'medium';

interface CheckboxBoxProps {
  disabled?: boolean;
  size?: CheckboxSize;
}

const CheckboxBox = styled.div<CheckboxBoxProps>`
  position: relative;
  width: ${getComponentStyle('checkbox.handleSize.{size}')};
  height: ${getComponentStyle('checkbox.handleSize.{size}')};
  border-radius: ${getComponentStyle('checkbox.outerBorderRadius')};
  padding: ${getComponentStyle('checkbox.innerPadding.{size}')};
  background-color: ${getComponentStyle('checkbox.backgroundColor')};
  border: ${getComponentStyle('checkbox.borderWidth')}px solid
    ${getComponentStyle('checkbox.borderColor')};
  opacity: ${(props) => (props.disabled ? 0.3 : 1)};
`;

const HiddenInput = styled.input.attrs({ type: 'checkbox' })`
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

interface CheckboxHandleProps {
  disabled?: boolean;
  checked: boolean;
  size?: CheckboxSize;
}

const CheckboxHandle = styled.div<CheckboxHandleProps>`
  width: ${getComponentStyle('checkbox.handleSize.{size}')};
  height: ${getComponentStyle('checkbox.handleSize.{size}')};
  transform: scale(${(props: any) => (props.checked ? 1 : 0)});
  border-radius: ${getComponentStyle('checkbox.innerBorderRadius')};
  transition: ${getComponentStyle('checkbox.handleTransition')};
  background-color: ${getComponentStyle('checkbox.handleColor')};
`;

export interface CheckboxProps extends BoxProps {
  className?: string;
  disabled?: boolean;
  name?: string;
  size?: CheckboxSize;
  label?: React.ReactNode;
  checked: boolean;
  onClick?: () => void;
}

export const Checkbox = ({
  className,
  size = 'medium',
  name,
  disabled,
  checked,
  label,
  onClick,
  ...props
}: CheckboxProps) => {
  const id = useUniqueId('checkbox');
  const componentStyles = useComponentStyleContext();
  const typographyVariant = componentStyles.checkbox.typographyVariant[size];
  return (
    <Box display="flex" alignItems="center" {...props}>
      <CheckboxBox
        className={className}
        onClick={!disabled ? onClick : undefined}
        disabled={disabled}
        size={size}
        {...props}
      >
        <CheckboxHandle checked={checked} size={size} />
        <HiddenInput
          id={id}
          name={name}
          checked={checked}
          disabled={disabled}
          onChange={!disabled ? onClick : undefined}
        />
      </CheckboxBox>
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
