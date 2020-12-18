import React from "react";
import styled, { css } from "styled-components";
import { BoxProps } from "../Box";
import { ButtonBase } from "../ButtonBase";
import { getColor } from "../styleHelpers";
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

const ButtonPrimary = styled<React.FC<ButtonProps>>(ButtonBase)`
  ${props => {
    switch(props.color) {
      case 'black':
        return css`
          color: ${getColor('common', 'blackContrastText')};
          background: ${getColor('common', 'black')};
          border-color: ${getColor('common', 'black')};
        `;
      case 'positive':
        return css`
          color: ${getColor('positive', 'contrastText')};
          background: ${getColor('positive')};
          border-color: ${getColor('positive')};

          &:hover:not(:disabled) {
            background: ${getColor('positive', 'dark')};
            border-color: ${getColor('positive', 'dark')};
          }
        `;
      case 'negative':
        return css`
          color: ${getColor('negative', 'contrastText')};
          background: ${getColor('negative')};
          border-color: ${getColor('negative')};

          &:hover:not(:disabled) {
            background: ${getColor('negative', 'dark')};
            border-color: ${getColor('negative', 'dark')};
          }
        `;
      case 'brand':
      default:
        return css`
          color: ${getColor('brand', 'contrastText')};
          background: ${getColor('brand')};
          border-color: ${getColor('brand')};

          &:hover:not(:disabled) {
            background: ${getColor('brand', 'dark')};
            border-color: ${getColor('brand', 'dark')};
          }
        `;
    }
  }}
`;

const ButtonSecondary = styled<React.FC<ButtonProps>>(ButtonBase)`
  ${props => {
    switch(props.color) {
      case 'black':
        return css`
          color: ${getColor('common', 'black')};
          border-color: ${getColor('common', 'black')};
        `;
      case 'positive':
        return css`
          color: ${getColor('positive')};
          border-color: ${getColor('positive')};

          &:hover:not(:disabled) {
            background: ${getColor('positive', 'light')};
          }
        `;
      case 'negative':
        return css`
          color: ${getColor('negative')};
          border-color: ${getColor('negative')};

          &:hover:not(:disabled) {
            background: ${getColor('negative', 'light')};
          }
        `;
      case 'brand':
      default:
        return css`
          color: ${getColor('brand')};
          border-color: ${getColor('brand')};

          &:hover:not(:disabled) {
            background: ${getColor('brand', 'light')};
          }
        `;
    }
  }}
`;

const ButtonText = styled<React.FC<ButtonProps>>(ButtonBase)`
  ${props => {
    switch(props.color) {
      case 'black':
        return css`
          color: ${getColor('common', 'black')};
        `;
      case 'positive':
        return css`
          color: ${getColor('positive')};
  
          &:hover:not(:disabled) {
            background: ${getColor('positive', 'light')};
          }
        `;
      case 'negative':
        return css`
          color: ${getColor('negative')};
  
          &:hover:not(:disabled) {
            background: ${getColor('negative', 'light')};
          }
        `;
      case 'brand':
      default:
        return css`
          color: ${getColor('brand')};
  
          &:hover:not(:disabled) {
            background: ${getColor('brand', 'light')};
          }
        `;
    }
  }}
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
