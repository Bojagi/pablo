import React from 'react';
import styled, { css } from 'styled-components';
import { Box, BoxProps } from '../Box';
import { ButtonBase, ButtonBaseProps } from '../ButtonBase';
import { getComponentStyle, getColor } from '../styleHelpers';
import { useComponentStyle } from '../theme';
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

const ButtonPrimary = styled<React.FC<ButtonProps>>(ButtonBase as any)`
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

const ButtonSecondary = styled<React.FC<ButtonProps>>(ButtonBase as any)`
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

const ButtonText = styled<React.FC<ButtonProps>>(ButtonBase as any)`
  color: ${getComponentStyle('button.text.{color}.color')};

  &:focus {
    ${getButtonOutlineShadow(getComponentStyle('button.primary.{color}.focus.outlineColor'))}
  }

  &:hover:not(:disabled) {
    color: ${getComponentStyle('button.secondary.{color}.hover.color')};
    background: ${getComponentStyle('button.text.{color}.hover.backgroundColor')};
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
  icon,
  children,
  className,
  disabled,
  ...props
}: ButtonProps) => {
  const InnerButton = buttonMap[variant] || ButtonPrimary;
  const iconGap = useComponentStyle('button.base.iconGap') as number;
  return (
    <InnerButton {...props} className={className} disabled={disabled} color={color}>
      {icon && (
        <Box display="flex" mr={iconGap}>
          {icon}
        </Box>
      )}
      <ButtonTypography>{children}</ButtonTypography>
    </InnerButton>
  );
};
