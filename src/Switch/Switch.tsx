import React from 'react';
import styled, { css } from 'styled-components';
import { boxInterpolateFn, BoxProps } from '../Box';
import { getSpacing, getComponentStyle, getComponentStyleByProp } from '../styleHelpers';

export type SwitchSize = 'small' | 'medium';

interface SwitchBoxProps extends BoxProps {
  disabled?: boolean;
  handleSizeStyle: string;
  size?: SwitchSize;
}

const SwitchBox = styled.div<SwitchBoxProps>`
  ${boxInterpolateFn}
  position: relative;
  width: calc(2 * ${(props) => getComponentStyle(props.handleSizeStyle)(props)});
  height: ${(props) => getComponentStyle(props.handleSizeStyle)(props)};
  border-radius: calc(
    (
        ${(props) => getComponentStyle(props.handleSizeStyle)(props)} + 2 *
          ${getComponentStyle('switch.innerPadding')} + 2 *
          ${getComponentStyle('switch.borderWidth')}px
      ) * 0.5
  );
  padding: ${getComponentStyle('switch.innerPadding')};
  background-color: ${getComponentStyle('switch.backgroundColor')};
  border: ${getComponentStyle('switch.borderWidth')}px solid
    ${getComponentStyle('switch.borderColor')};
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
  handleSizeStyle: string;
  size?: SwitchSize;
}

const SwitchHandle = styled.div<SwitchHandleProps>`
  width: ${getComponentStyleByProp('handleSizeStyle')};
  height: ${getComponentStyleByProp('handleSizeStyle')};
  transform: translateX(
    ${(props: any) => (props.checked ? getComponentStyle(props.handleSizeStyle)(props) : 0)}
  );
  border-radius: 50%;
  transition: ${getComponentStyle('switch.handleTransition')};
  background-color: ${(props) =>
    props.checked
      ? getComponentStyle('switch.handleColorChecked')(props)
      : getComponentStyle('switch.handleColorUnchecked')(props)};
`;

export interface SwitchProps extends BoxProps {
  className?: string;
  disabled?: boolean;
  name?: string;
  size?: SwitchSize;
  checked: boolean;
  onClick?: () => void;
}

export const Switch = ({
  className,
  size = 'medium',
  name,
  disabled,
  checked,
  onClick,
  ...props
}: SwitchProps) => {
  const handleSizeStyle = size === 'small' ? 'switch.handleSizeSmall' : 'switch.handleSizeMedium';
  return (
    <SwitchBox
      className={className}
      onClick={onClick}
      disabled={disabled}
      size={size}
      handleSizeStyle={handleSizeStyle}
      {...props}
    >
      <SwitchHandle checked={checked} size={size} handleSizeStyle={handleSizeStyle} />
      <HiddenInput name={name} checked={checked} disabled={disabled} onClick={onClick} />
    </SwitchBox>
  );
};

getSpacing(2.25, false);
