import React from "react";
import styled from "styled-components";
import { BoxProps } from "../Box";
import { ButtonBase } from "../ButtonBase";
import { getComponentStyle } from "../styleHelpers";
import { ButtonTypography } from "../Typography";

export type ButtonVariant = 'primary' | 'secondary' | 'text';
export type ButtonColor = 'brand' | 'black' | 'negative' | 'positive';

export interface ButtonProps extends Omit<BoxProps, 'color'> {
  children: React.ReactNode;
  variant?: ButtonVariant;
  color?: ButtonColor;
  disabled?: boolean;
  className?: string;
};

const ButtonPrimary = styled<React.FC<ButtonProps>>(ButtonBase as any)`
  color: ${getComponentStyle('button.primary.{color}.color')};
  background: ${getComponentStyle('button.primary.{color}.backgroundColor')};
  border-color: ${getComponentStyle('button.primary.{color}.borderColor')};

  &:hover:not(:disabled) {
    background: ${getComponentStyle('button.primary.{color}.hover.backgroundColor')};
    border-color: ${getComponentStyle('button.primary.{color}.hover.borderColor')};
  }
`;

const ButtonSecondary = styled<React.FC<ButtonProps>>(ButtonBase as any)`
  color: ${getComponentStyle('button.secondary.{color}.color')};
  border-color: ${getComponentStyle('button.secondary.{color}.borderColor')};

  &:hover:not(:disabled) {
    background: ${getComponentStyle('button.secondary.{color}.hover.backgroundColor')};
  }
`;

const ButtonText = styled<React.FC<ButtonProps>>(ButtonBase as any)`
  color: ${getComponentStyle('button.text.{color}.color')};
  &:hover:not(:disabled) {
    background: ${getComponentStyle('button.text.{color}.hover.backgroundColor')}
  }
`;

const buttonMap: Record<ButtonVariant, React.ComponentType<any>> = {
  primary: ButtonPrimary,
  secondary: ButtonSecondary,
  text: ButtonText,
};

export const Button = ({color = 'brand', variant = 'primary', children, className, disabled, ...props}: ButtonProps) => {
  const InnerButton = buttonMap[variant] || ButtonPrimary;
  return (
    <InnerButton {...props} className={className} disabled={disabled} color={color}>
      <ButtonTypography>{children}</ButtonTypography>
    </InnerButton>
  );
};
