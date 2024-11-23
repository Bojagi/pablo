import React, { forwardRef } from 'react';
import { buttonBaseStyles, ButtonBaseProps, ButtonSize } from '../ButtonBase';
import styled from '@emotion/styled';
import { getComponentStyle } from '../styleHelpers/getComponentStyle';
import { BaseProps, CssFunctionReturn } from '../types';
import { ButtonTypography } from '../Typography';
import { useCustomStyles } from '../utils/useCustomStyles';
import { ButtonStyleProperties } from './styles';
import { interpolateCssProp } from '../utils/interpolateCssProp';

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
  ref?: React.Ref<any>;
}

export type ButtonProps<C extends React.ElementType> = InnerButtonProps &
  React.ComponentPropsWithRef<C>;

const getColorStyles = (props, suffix?: string) => {
  const basePath = 'button.{color}.{variant}';
  const suffixedPath = [basePath, suffix].filter((x) => x).join('.');

  return {
    color: getComponentStyle(`${suffixedPath}.color`)(props),
    borderColor: getComponentStyle(`${suffixedPath}.borderColor`)(props),
    background: getComponentStyle(`${suffixedPath}.backgroundColor`)(props),
  };
};

const InnerButton = styled('button')<InnerButtonProps>([
  buttonBaseStyles,
  (props) => ({
    justifyContent: 'center',
    width: props.fullWidth ? '100%' : 'inherit',
    ...getColorStyles(props),
    '&:focus': {
      boxShadow: `0 0 0 ${getComponentStyle('button.base.focus.outlineSize')(
        props
      )} ${getComponentStyle('button.{color}.outlineColor')(props)}`,
    },
    '&:hover:enabled': getColorStyles(props, 'hover'),
    '&:active:enabled': getColorStyles(props, 'active'),
  }),
]);

interface IconBoxProps {
  size: ButtonSize;
  marginSide: 'left' | 'right';
  css?: CssFunctionReturn;
  children?: React.ReactNode;
}

const IconBox = styled.div((props: IconBoxProps) => [
  {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    [`margin-${props.marginSide}`]: getComponentStyle('button.base.icon.gap')(props),

    '&, & > *': {
      width: getComponentStyle('button.base.icon.size.{size}')(props),
      height: getComponentStyle('button.base.icon.size.{size}')(props),
    },
  },
  interpolateCssProp,
]);

const knownVariants = [
  'primary',
  'primaryInverted',
  'secondary',
  'secondaryInverted',
  'text',
  'textInverted',
];

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
    const isKnownVariant = knownVariants.indexOf(variant) > -1;
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
        css={getCustomStyles(variant)}
      >
        {startIcon && (
          <IconBox
            css={(props) => [getCustomStyles('icon', props), getCustomStyles('startIcon', props)]}
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
            css={(props) => [getCustomStyles('icon', props), getCustomStyles('endIcon', props)]}
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
