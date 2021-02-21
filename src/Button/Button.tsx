import React from 'react';
import styled, { css, FlattenInterpolation } from 'styled-components';
import { BoxProps } from '../Box';
import { ButtonBaseProps, buttonBaseStyles, ButtonSize } from '../ButtonBase';
import { getComponentStyle } from '../utils/styleHelpers/getComponentStyle';
import { Style } from '../theme/types';
import { ButtonTypography } from '../Typography';

export type ButtonVariant = 'primary' | 'secondary' | 'text';
export type ButtonColor = 'brand' | 'plain' | 'negative' | 'positive';

export interface ButtonProps extends Omit<ButtonBaseProps, 'color'>, Omit<BoxProps, 'color'> {
  children: React.ReactNode;
  variant?: ButtonVariant;
  icon?: React.ReactNode;
  color?: ButtonColor;
  disabled?: boolean;
  className?: string;
}

const getButtonOutlineShadow = (color: Style) => css`
  box-shadow: 0 0 0 ${getComponentStyle('button.base.focus.outlineSize')} ${color};
`;

const ButtonPrimary = styled.button<ButtonProps>`
  ${buttonBaseStyles as FlattenInterpolation<ButtonProps>}
  color: ${getComponentStyle('button.primary.{color}.color')};
  background: ${getComponentStyle('button.primary.{color}.backgroundColor')};
  border-color: ${getComponentStyle('button.primary.{color}.borderColor')};

  &:focus {
    ${getButtonOutlineShadow(getComponentStyle('button.primary.{color}.focus.outlineColor'))}
  }

  &:hover:not(:disabled) {
    background: ${getComponentStyle('button.primary.{color}.hover.backgroundColor')};
    border-color: ${getComponentStyle('button.primary.{color}.hover.borderColor')};
  }
`;

const ButtonSecondary = styled.button<ButtonProps>`
  ${buttonBaseStyles as FlattenInterpolation<ButtonProps>}
  color: ${getComponentStyle('button.secondary.{color}.color')};
  border-color: ${getComponentStyle('button.secondary.{color}.borderColor')};

  &:focus {
    ${getButtonOutlineShadow(getComponentStyle('button.primary.{color}.focus.outlineColor'))}
  }

  &:hover:not(:disabled) {
    color: ${getComponentStyle('button.secondary.{color}.hover.color')};
    background: ${getComponentStyle('button.secondary.{color}.hover.backgroundColor')};
  }
`;

const ButtonText = styled.button<ButtonProps>`
  ${buttonBaseStyles as FlattenInterpolation<ButtonProps>}
  color: ${getComponentStyle('button.text.{color}.color')};

  &:focus {
    ${getButtonOutlineShadow(getComponentStyle('button.primary.{color}.focus.outlineColor'))}
  }

  &:hover:not(:disabled) {
    color: ${getComponentStyle('button.secondary.{color}.hover.color')};
    background: ${getComponentStyle('button.text.{color}.hover.backgroundColor')};
  }
`;

interface IconBoxProps {
  size: ButtonSize;
}

const IconBox = styled.div<IconBoxProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: ${getComponentStyle('button.base.icon.gap')};
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

export const Button = ({
  color = 'brand',
  variant = 'primary',
  size = 'medium',
  icon,
  children,
  className,
  disabled,
  ...props
}: ButtonProps) => {
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
      {icon && (
        <IconBox size={size} data-testid="pbl-button-icon">
          {icon}
        </IconBox>
      )}
      <ButtonTypography>{children}</ButtonTypography>
    </InnerButton>
  );
};
