import React, { forwardRef } from 'react';
import styled, { css } from 'styled-components';
import { Flex, LayoutBoxProps } from '../Box';
import { useComponentStyle } from '../theme/useComponentStyle';
import { Typography, TypographyVariant } from '../Typography';
import { hijackCbBefore } from '../utils/hijackCb';
import { useUniqueId } from '../utils/useUniqueId';

export type CheckableSize = 'small' | 'medium';

export interface BaseCheckableProps extends LayoutBoxProps {
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
}

export interface CheckableBoxProps {
  className?: string;
  disabled?: boolean;
  size?: CheckableSize;
  focus: boolean;
}

export interface CheckableHandleProps {
  disabled?: boolean;
  checked: boolean;
  size?: CheckableSize;
}

export interface OuterBaseCheckableProps extends BaseCheckableProps {
  componentName: 'radio' | 'switch' | 'checkbox';
  componentType: 'radio' | 'checkbox';
  componentBox: React.FC<CheckableBoxProps>;
  componentHandle: React.FC<CheckableHandleProps>;
}

const HiddenInput = styled.input`
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
      ...props
    }: OuterBaseCheckableProps,
    ref
  ) => {
    const generatedId = useUniqueId(componentName);
    const id = idProp || generatedId;
    const typographyVariant = useComponentStyle(
      `${componentName}.typographyVariant.${size}`
    ) as TypographyVariant;
    const [focus, setFocus] = React.useState(false);

    return (
      <Flex ref={ref} alignItems="center" {...props}>
        <ComponentBox
          className={className}
          data-testid={`pbl-${componentName}`}
          disabled={disabled}
          size={size}
          focus={focus}
        >
          <ComponentHandle
            data-testid={`pbl-${componentName}-handle`}
            checked={checked || false}
            size={size}
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
          <label data-testid={`pbl-${componentName}-label`} htmlFor={id}>
            <Typography ml={4} mb={0} variant={typographyVariant}>
              {label}
            </Typography>
          </label>
        )}
      </Flex>
    );
  }
);
