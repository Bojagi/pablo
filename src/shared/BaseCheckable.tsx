import React, { useState, forwardRef } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Flex, LayoutBoxProps } from '../Box';
import { baseStyle } from '../shared/baseStyle';
import { useComponentStyle } from '../theme/useComponentStyle';
import { BaseProps, CssFunctionReturn } from '../types';
import { Typography, TypographyVariant } from '../Typography';
import { hijackCbBefore } from '../utils/hijackCb';
import { useCustomStyles } from '../utils/useCustomStyles';
import { useUniqueId } from '../utils/useUniqueId';

export type CheckableSize = 'small' | 'medium';
export type CheckableStyleProperties = 'box' | 'handle' | 'label';

export interface BaseCheckableProps extends LayoutBoxProps, BaseProps<CheckableStyleProperties> {
  id?: string;
  inputRef?: React.Ref<HTMLInputElement>;
  className?: string;
  disabled?: boolean;
  name?: string;
  size?: CheckableSize;
  value?: string;
  label?: React.ReactNode;
  checked?: boolean;
  onChange?: (value: string, e: React.FormEvent<HTMLInputElement>) => void;
  onClick?: (e: React.FormEvent<HTMLInputElement>) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  customStyles?: Record<string, CssFunctionReturn>;
}

export interface CheckableBoxProps extends BaseProps<CheckableStyleProperties> {
  className?: string;
  disabled?: boolean;
  size?: CheckableSize;
  focus: boolean;
  children?: React.ReactNode;
}

export interface CheckableHandleProps extends BaseProps<CheckableStyleProperties> {
  disabled?: boolean;
  checked: boolean;
  size?: CheckableSize;
}

export interface OuterBaseCheckableProps extends BaseCheckableProps {
  componentName: 'radio' | 'switch' | 'checkbox';
  componentType: 'radio' | 'checkbox';
  role: 'switch' | 'radio' | 'checkbox';
  componentBox: React.FC<CheckableBoxProps>;
  componentHandle: React.FC<CheckableHandleProps>;
}

const HiddenInput = styled.input`
  ${baseStyle}
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

export const BaseCheckable = forwardRef<HTMLDivElement, OuterBaseCheckableProps>(
  (
    {
      componentName,
      componentType,
      componentBox: ComponentBox,
      componentHandle: ComponentHandle,
      className,
      id: idProp,
      size = 'medium',
      name,
      disabled,
      checked,
      label,
      value,
      onChange,
      onClick,
      onFocus,
      onBlur,
      inputRef,
      customStyles,
      ...props
    }: OuterBaseCheckableProps,
    ref
  ) => {
    const generatedId = useUniqueId();
    const id = idProp || generatedId;
    const typographyVariant = useComponentStyle(
      `${componentName}.typographyVariant.${size}`
    ) as TypographyVariant;
    const [focus, setFocus] = useState(false);
    const getCustomStyles = useCustomStyles(`${componentName}.styles`, customStyles);

    return (
      <Flex ref={ref} alignItems="center" {...props}>
        <ComponentBox
          className={className}
          data-testid={`pbl-${componentName}`}
          disabled={disabled}
          size={size}
          focus={focus}
          customStyles={customStyles}
        >
          <ComponentHandle
            data-testid={`pbl-${componentName}-handle`}
            checked={checked || false}
            size={size}
            customStyles={customStyles}
          />
          <HiddenInput
            id={id}
            data-testid={`pbl-${componentName}-input`}
            name={name}
            checked={checked}
            disabled={disabled}
            type={componentType}
            value={value}
            ref={inputRef}
            onClick={onClick}
            onChange={
              onChange
                ? (e) => {
                    onChange(e.target.value, e);
                  }
                : undefined
            }
            onFocus={hijackCbBefore(onFocus, () => setFocus(true))}
            onBlur={hijackCbBefore(onBlur, () => setFocus(false))}
          />
        </ComponentBox>
        {label && (
          <Typography
            data-testid={`pbl-${componentName}-label`}
            ml={4}
            mb={0}
            variant={typographyVariant}
            as="label"
            htmlFor={id}
            customStyles={{
              [typographyVariant]: getCustomStyles('label'),
            }}
          >
            {label}
          </Typography>
        )}
      </Flex>
    );
  }
);
