import React from 'react';
import styled, { css } from 'styled-components';
import { Box, BoxProps } from '../Box';
import { getSpacing, getComponentStyle, getComponentStyleByProp } from '../styleHelpers';
import { useComponentStyleContext } from '../theme';
import { Typography } from '../Typography';
import { useUniqueId } from '../utils/useUniqueId';

export type SwitchSize = 'small' | 'medium';

interface SwitchBoxProps {
  disabled?: boolean;
  size?: SwitchSize;
}

const SwitchBox = styled.div<SwitchBoxProps>`
  position: relative;
  width: calc(2 * ${(props) => getComponentStyle(`switch.handleSize.${props.size}`)(props)});
  height: ${(props) => getComponentStyle(`switch.handleSize.${props.size}`)(props)};
  border-radius: calc(
    (
        ${(props) => getComponentStyle(`switch.handleSize.${props.size}`)(props)} + 2 *
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
  size?: SwitchSize;
}

const SwitchHandle = styled.div<SwitchHandleProps>`
  width: ${getComponentStyleByProp('size', 'switch.handleSize.')};
  height: ${getComponentStyleByProp('size', 'switch.handleSize.')};
  transform: translateX(
    ${(props: any) =>
      props.checked ? getComponentStyle(`switch.handleSize.${props.size}`)(props) : 0}
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
  label?: React.ReactNode;
  checked: boolean;
  onClick?: () => void;
}

export const Switch = ({
  className,
  size = 'medium',
  name,
  disabled,
  checked,
  label,
  onClick,
  ...props
}: SwitchProps) => {
  const id = useUniqueId('switch');
  const componentStyles = useComponentStyleContext();
  const typographyVariant = componentStyles.switch.typographyVariant[size];
  return (
    <Box display="flex" alignItems="center" className={className} {...props}>
      <SwitchBox
        onClick={!disabled ? onClick : undefined}
        disabled={disabled}
        size={size}
        {...props}
      >
        <SwitchHandle checked={checked} size={size} />
        <HiddenInput
          id={id}
          name={name}
          checked={checked}
          disabled={disabled}
          onClick={!disabled ? onClick : undefined}
        />
      </SwitchBox>
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
