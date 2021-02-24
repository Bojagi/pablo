import React from 'react';
import styled, { css, FlattenInterpolation } from 'styled-components';
import { buttonBaseStyles, ButtonBaseProps, ButtonSize } from '../ButtonBase';
import { getComponentStyle } from '../utils/styleHelpers/getComponentStyle';
import { Style } from '../theme/types';
import { ButtonTypography } from '../Typography';

export type ButtonVariant = 'primary' | 'secondary' | 'text';
export type ButtonColor = 'brand' | 'plain' | 'negative' | 'positive';

export interface InnerButtonProps extends ButtonBaseProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  color?: ButtonColor;
  disabled?: boolean;
  className?: string;
}

export type ButtonProps<C extends React.ElementType> = InnerButtonProps &
  React.ComponentPropsWithRef<C>;

const getButtonFocusOutlineShadow = (color: Style) => css`
  box-shadow: 0 0 0 ${getComponentStyle('button.base.focus.outlineSize')} ${color};
`;

const ButtonPrimary = styled.button<InnerButtonProps>`
  ${buttonBaseStyles as FlattenInterpolation<InnerButtonProps>}
  color: ${getComponentStyle('button.{color}.primary.color')};
  background: ${getComponentStyle('button.{color}.primary.backgroundColor')};
  border-color: ${getComponentStyle('button.{color}.primary.borderColor')};

  &:focus {
    ${getButtonFocusOutlineShadow(getComponentStyle('button.{color}.outlineColor'))}
  }

  &:hover:not(:disabled) {
    background: ${getComponentStyle('button.{color}.primary.hover.backgroundColor')};
    border-color: ${getComponentStyle('button.{color}.primary.hover.borderColor')};
  }

  &:active:not(:disabled) {
    color: ${getComponentStyle('button.{color}.primary.active.color')};
    background: ${getComponentStyle('button.{color}.primary.active.backgroundColor')};
    border-color: ${getComponentStyle('button.{color}.primary.active.borderColor')};
  }
`;

const ButtonSecondary = styled.button<InnerButtonProps>`
  ${buttonBaseStyles as FlattenInterpolation<InnerButtonProps>}
  color: ${getComponentStyle('button.{color}.secondary.color')};
  border-color: ${getComponentStyle('button.{color}.secondary.borderColor')};

  &:focus {
    ${getButtonFocusOutlineShadow(getComponentStyle('button.{color}.outlineColor'))}
  }

  &:hover:not(:disabled) {
    color: ${getComponentStyle('button.{color}.secondary.hover.color')};
    border-color: ${getComponentStyle('button.{color}.secondary.hover.borderColor')};
    background: ${getComponentStyle('button.{color}.secondary.hover.backgroundColor')};
  }

  &:active:not(:disabled) {
    color: ${getComponentStyle('button.{color}.secondary.active.color')};
    border-color: ${getComponentStyle('button.{color}.secondary.active.borderColor')};
    background: ${getComponentStyle('button.{color}.secondary.active.backgroundColor')};
  }
`;

const ButtonText = styled.button<InnerButtonProps>`
  ${buttonBaseStyles as FlattenInterpolation<InnerButtonProps>}
  color: ${getComponentStyle('button.{color}.text.color')};

  &:focus {
    ${getButtonFocusOutlineShadow(getComponentStyle('button.{color}.outlineColor'))}
  }

  &:hover:not(:disabled) {
    color: ${getComponentStyle('button.{color}.text.hover.color')};
    background: ${getComponentStyle('button.{color}.text.hover.backgroundColor')};
  }

  &:active:not(:disabled) {
    color: ${getComponentStyle('button.{color}.text.active.color')};
    border-color: ${getComponentStyle('button.{color}.text.active.borderColor')};
    background: ${getComponentStyle('button.{color}.text.active.backgroundColor')};
  }
`;

interface IconBoxProps {
  size: ButtonSize;
  marginSide: 'left' | 'right';
}

const IconBox = styled.div<IconBoxProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-${(props) => props.marginSide}: ${getComponentStyle('button.base.icon.gap')};
  width: ${getComponentStyle('button.base.icon.size.{size}')};
  height: ${getComponentStyle('button.base.icon.size.{size}')};

  & > * {
    width: ${getComponentStyle('button.base.icon.size.{size}')};
    height: ${getComponentStyle('button.base.icon.size.{size}')};
  }
`;

const buttonMap: Record<ButtonVariant, React.ComponentType<any>> = {
  primary: ButtonPrimary,
  secondary: ButtonSecondary,
  text: ButtonText,
};

export const Button = <C extends React.ElementType>({
  color = 'brand',
  variant = 'primary',
  size = 'medium',
  startIcon,
  endIcon,
  children,
  className,
  disabled,
  ...props
}: ButtonProps<C>) => {
  const InnerButton = buttonMap[variant] || ButtonPrimary;
  return (
    <InnerButton
      data-testid="pbl-button"
      {...props}
      size={size}
      className={className}
      disabled={disabled}
      color={color}
    >
      {startIcon && (
        <IconBox marginSide="right" size={size} data-testid="pbl-button-icon">
          {startIcon}
        </IconBox>
      )}
      <ButtonTypography>{children}</ButtonTypography>
      {endIcon && (
        <IconBox marginSide="left" size={size} data-testid="pbl-button-icon">
          {endIcon}
        </IconBox>
      )}
    </InnerButton>
  );
};
