import React from 'react';
import styled, { css } from 'styled-components';
import { boxInterpolateFn, BoxProps } from '../Box';
import { getSpacing, getComponentStyle, getComponentStyleByProp } from '../styleHelpers';

export type SwitchSize = 'small' | 'medium';

interface SwitchBoxProps extends BoxProps {
  disabled?: boolean;
  size?: SwitchSize;
}

const CheckboxBox = styled.div<SwitchBoxProps>`
  ${boxInterpolateFn}
  position: relative;
  width: ${getComponentStyleByProp('size', 'checkbox.handleSize.')};
  height: ${getComponentStyleByProp('size', 'checkbox.handleSize.')};
  border-radius: ${getComponentStyle('checkbox.outerBorderRadius')};
  padding: ${getComponentStyleByProp('size', 'checkbox.innerPadding.')};
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

interface SwitchHandleProps {
  disabled?: boolean;
  checked: boolean;
  size?: SwitchSize;
}

const CheckboxHandle = styled.div<SwitchHandleProps>`
  width: ${getComponentStyleByProp('size', 'checkbox.handleSize.')};
  height: ${getComponentStyleByProp('size', 'checkbox.handleSize.')};
  transform: scale(${(props: any) => (props.checked ? 1 : 0)});
  border-radius: ${getComponentStyle('checkbox.innerBorderRadius')};
  transition: ${getComponentStyle('checkbox.handleTransition')};
  background-color: ${getComponentStyle('checkbox.handleColor')};
`;

export interface SwitchProps extends BoxProps {
  className?: string;
  disabled?: boolean;
  name?: string;
  size?: SwitchSize;
  checked: boolean;
  onClick?: () => void;
}

export const Checkbox = ({
  className,
  size = 'medium',
  name,
  disabled,
  checked,
  onClick,
  ...props
}: SwitchProps) => (
  <CheckboxBox
    className={className}
    onClick={!disabled ? onClick : undefined}
    disabled={disabled}
    size={size}
    {...props}
  >
    <CheckboxHandle checked={checked} size={size} />
    <HiddenInput
      name={name}
      checked={checked}
      disabled={disabled}
      onChange={!disabled ? onClick : undefined}
    />
  </CheckboxBox>
);

getSpacing(2.25, false);
