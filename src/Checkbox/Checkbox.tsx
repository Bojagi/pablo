import React from 'react';
import styled, { css } from 'styled-components';
import { Box, BoxProps } from '../Box';
import { getComponentStyle, transitionTransformer } from '../utils/styleHelpers/getComponentStyle';
import { useComponentStyleContext } from '../theme';
import { Typography } from '../Typography';
import { useUniqueId } from '../utils/useUniqueId';
import { hijackCbBefore } from '../utils/hijackCb';

export type CheckboxSize = 'small' | 'medium';

interface CheckboxBoxProps {
  disabled?: boolean;
  size?: CheckboxSize;
  focus: boolean;
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

  transition: ${getComponentStyle('checkbox.boxTransition', transitionTransformer)};

  ${(props) =>
    props.focus &&
    css`
      box-shadow: 0 0 0 ${getComponentStyle('checkbox.focus.outlineSize')}
        ${getComponentStyle('checkbox.focus.outlineColor')};
    `};
  }
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
  id?: string;
  className?: string;
  disabled?: boolean;
  name?: string;
  size?: CheckboxSize;
  label?: React.ReactNode;
  checked: boolean;
  onChange: (value: string, e: React.FormEvent<HTMLInputElement>) => void;
  onClick?: (e: React.FormEvent<HTMLInputElement>) => void;
  onFocus?: () => void;
  onBlur?: () => void;
}

export const Checkbox = ({
  id: idProp,
  className,
  size = 'medium',
  name,
  disabled,
  checked,
  label,
  onChange,
  onClick,
  onFocus,
  onBlur,
  ...props
}: CheckboxProps) => {
  const generatedId = useUniqueId('checkbox');
  const id = idProp || generatedId;
  const componentStyles = useComponentStyleContext();
  const typographyVariant = componentStyles.checkbox.typographyVariant[size];
  const [focus, setFocus] = React.useState(false);

  return (
    <Box display="flex" alignItems="center" {...props}>
      <CheckboxBox
        data-testid="pbl-checkbox"
        className={className}
        disabled={disabled}
        size={size}
        focus={focus}
        {...props}
      >
        <CheckboxHandle data-testid="pbl-checkbox-handle" checked={checked} size={size} />
        <HiddenInput
          id={id}
          data-testid="pbl-checkbox-input"
          name={name}
          checked={checked}
          disabled={disabled}
          onChange={
            onChange
              ? (e) => {
                  onChange(e.target.value, e);
                }
              : undefined
          }
          onClick={onClick}
          onFocus={hijackCbBefore(onFocus, () => setFocus(true))}
          onBlur={hijackCbBefore(onBlur, () => setFocus(false))}
        />
      </CheckboxBox>
      {label && (
        <label data-testid="pbl-checkbox-label" htmlFor={id}>
          <Typography ml={1} mb={0} variant={typographyVariant}>
            {label}
          </Typography>
        </label>
      )}
    </Box>
  );
};
