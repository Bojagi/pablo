import React, { forwardRef } from 'react';
import styled, { css, FlattenInterpolation } from 'styled-components';
import { buttonBaseStyles, ButtonBaseProps, ButtonSize } from '../ButtonBase';
import { getComponentStyle } from '../styleHelpers/getComponentStyle';
import { Style } from '../theme/types';
import { BaseProps, CssFunctionReturn } from '../types';
import { ButtonTypography } from '../Typography';
import { useCustomStyles } from '../utils/useCustomStyles';
import { ButtonStyleProperties } from './styles';

export type ButtonVariant =
  | 'primary'
  | 'primaryInverted'
  | 'secondary'
  | 'secondaryInverted'
  | 'text'
  | 'textInverted';
export type ButtonColor = 'brand' | 'plain' | 'negative' | 'positive';

export interface InnerButtonProps extends ButtonBaseProps, BaseProps<ButtonStyleProperties> {
  children: React.ReactNode;
  variant?: ButtonVariant;
  fullWidth?: boolean;
  innerRef?: React.Ref<HTMLButtonElement>;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  color?: ButtonColor;
  disabled?: boolean;
  className?: string;
  cssStyles?: CssFunctionReturn;
}

export type ButtonProps<C extends React.ElementType> = InnerButtonProps &
  React.ComponentPropsWithRef<C>;

const getButtonFocusOutlineShadow = (color: Style) => css`
  box-shadow: 0 0 0 ${getComponentStyle('button.base.focus.outlineSize')} ${color};
`;

const ButtonPrimary = styled.button<InnerButtonProps>`
  ${buttonBaseStyles as FlattenInterpolation<InnerButtonProps>}
  justify-content: center;
  ${(props) =>
    props.fullWidth &&
    css`
      width: 100%;
    `}
  color: ${getComponentStyle('button.{color}.{variant}.color')};
  background: ${getComponentStyle('button.{color}.{variant}.backgroundColor')};
  border-color: ${getComponentStyle('button.{color}.{variant}.borderColor')};

  &:focus {
    ${getButtonFocusOutlineShadow(getComponentStyle('button.{color}.outlineColor'))}
  }

  &:hover:not(:disabled) {
    background: ${getComponentStyle('button.{color}.{variant}.hover.backgroundColor')};
    border-color: ${getComponentStyle('button.{color}.{variant}.hover.borderColor')};
  }

  &:active:not(:disabled) {
    color: ${getComponentStyle('button.{color}.{variant}.active.color')};
    background: ${getComponentStyle('button.{color}.{variant}.active.backgroundColor')};
    border-color: ${getComponentStyle('button.{color}.{variant}.active.borderColor')};
  }

  ${(props) => props.cssStyles}
`;

const ButtonSecondary = styled.button<InnerButtonProps>`
  ${buttonBaseStyles as FlattenInterpolation<InnerButtonProps>}
  justify-content: center;
  ${(props) =>
    props.fullWidth &&
    css`
      width: 100%;
    `}
  color: ${getComponentStyle('button.{color}.{variant}.color')};
  border-color: ${getComponentStyle('button.{color}.{variant}.borderColor')};

  &:focus {
    ${getButtonFocusOutlineShadow(getComponentStyle('button.{color}.outlineColor'))}
  }

  &:hover:not(:disabled) {
    color: ${getComponentStyle('button.{color}.{variant}.hover.color')};
    border-color: ${getComponentStyle('button.{color}.{variant}.hover.borderColor')};
    background: ${getComponentStyle('button.{color}.{variant}.hover.backgroundColor')};
  }

  &:active:not(:disabled) {
    color: ${getComponentStyle('button.{color}.{variant}.active.color')};
    border-color: ${getComponentStyle('button.{color}.{variant}.active.borderColor')};
    background: ${getComponentStyle('button.{color}.{variant}.active.backgroundColor')};
  }

  ${(props) => props.cssStyles}
`;

const ButtonText = styled.button<InnerButtonProps>`
  ${buttonBaseStyles as FlattenInterpolation<InnerButtonProps>}
  justify-content: center;
  ${(props) =>
    props.fullWidth &&
    css`
      width: 100%;
    `}
  color: ${getComponentStyle('button.{color}.{variant}.color')};

  &:focus {
    ${getButtonFocusOutlineShadow(getComponentStyle('button.{color}.outlineColor'))}
  }

  &:hover:not(:disabled) {
    color: ${getComponentStyle('button.{color}.{variant}.hover.color')};
    background: ${getComponentStyle('button.{color}.{variant}.hover.backgroundColor')};
  }

  &:active:not(:disabled) {
    color: ${getComponentStyle('button.{color}.{variant}.active.color')};
    border-color: ${getComponentStyle('button.{color}.{variant}.active.borderColor')};
    background: ${getComponentStyle('button.{color}.{variant}.active.backgroundColor')};
  }
  ${(props) => props.cssStyles}
`;

interface IconBoxProps {
  size: ButtonSize;
  marginSide: 'left' | 'right';
  cssStyles?: CssFunctionReturn;
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

  ${(props) => props.cssStyles}
`;

const buttonMap: Record<ButtonVariant, React.ComponentType<any>> = {
  primary: ButtonPrimary,
  primaryInverted: ButtonPrimary,
  secondary: ButtonSecondary,
  secondaryInverted: ButtonSecondary,
  text: ButtonText,
  textInverted: ButtonText,
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps<any>>(
  (
    {
      color = 'brand',
      variant = 'primary',
      size = 'medium',
      startIcon,
      endIcon,
      children,
      className,
      disabled,
      customStyles,
      fullWidth = false,
      ...props
    },
    ref
  ) => {
    const InnerButton = buttonMap[variant] || ButtonPrimary;
    const isKnownVariant = Object.keys(buttonMap).indexOf(variant) > -1;
    const getCustomStyles = useCustomStyles('button.styles', customStyles);
    return (
      <InnerButton
        data-testid="pbl-button"
        variant={isKnownVariant ? variant : 'primary'}
        {...props}
        ref={ref}
        size={size}
        className={className}
        disabled={disabled}
        color={color}
        fullWidth={fullWidth}
        cssStyles={getCustomStyles(variant)}
      >
        {startIcon && (
          <IconBox
            cssStyles={[getCustomStyles('icon'), getCustomStyles('startIcon')]}
            marginSide="right"
            size={size}
            data-testid="pbl-button-icon"
          >
            {startIcon}
          </IconBox>
        )}
        <ButtonTypography>{children}</ButtonTypography>
        {endIcon && (
          <IconBox
            cssStyles={[getCustomStyles('icon'), getCustomStyles('endIcon')]}
            marginSide="left"
            size={size}
            data-testid="pbl-button-icon"
          >
            {endIcon}
          </IconBox>
        )}
      </InnerButton>
    );
  }
);
