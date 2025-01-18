import React, { useState } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Box, layoutInterpolationFn, useBoxProps } from '../Box';
import type { LayoutBoxProps } from '../Box';
import type { Style } from '../theme/types';
import { InfoText, Paragraph } from '../Typography';
import { hijackCbBefore } from '../utils/hijackCb';
import { getComponentStyle, transitionTransformer } from '../styleHelpers';
import { useUniqueId } from '../utils/useUniqueId';
import { BaseProps, CssFunctionReturn } from '../types';
import { useCustomStyles } from '../utils/useCustomStyles';
import { baseStyle } from './baseStyle';
import { borderRadiusTransform } from '../Box/interpolations/shape';

export type BaseInputStyleProperties =
  | 'root'
  | 'label'
  | 'infoText'
  | 'startAdornment'
  | 'endAdornment'
  | 'field'
  | 'wrapper';

export interface BaseInputProps<E extends HTMLElement>
  extends BaseProps<BaseInputStyleProperties>,
    LayoutBoxProps {
  id?: string;
  value?: string | number | readonly string[];
  error?: React.ReactNode;
  label?: React.ReactNode;
  infoText?: React.ReactNode;
  fullWidth?: boolean;
  innerRef?: React.ForwardedRef<HTMLDivElement>;
  inputRef?: React.Ref<E>;
  start?: React.ReactNode;
  end?: React.ReactNode;
  onChange?: (newValue: string, e: React.FormEvent<E>) => void;
  onFocus?: () => void;
  onBlur?: () => void;
}

export type InputVariant = 'filled' | 'outline';

export type InnerInputProps<P = object> = LayoutBoxProps &
  P & {
    error?: React.ReactNode;
    fullWidth?: boolean;
    variant: InputVariant;
    startWidth?: number;
    endWidth?: number;
  };

export type BaseInputOuterProps<P extends Record<string, any>, E extends HTMLElement> = Omit<
  P,
  'onChange'
> &
  BaseInputProps<E> & {
    name: string;
    inputComponent: React.FC<P>;
    adornmentGap?: Style | number;
  };

interface InputWrapperProps extends LayoutBoxProps {
  variant: InputVariant;
  name: string;
  fullWidth: boolean;
  focus: boolean;
  error: boolean;
  cssStyles: CssFunctionReturn;
}

const InputWrapper = styled.div<InputWrapperProps>`
  ${baseStyle}
  display: flex;
  align-items: center;
  border: ${getComponentStyle('{name}.borderWidth')}px solid
    ${getComponentStyle('{name}.{variant}.borderColor')};
  font-size: ${getComponentStyle('{name}.fontSize')};
  border-radius: ${getComponentStyle('{name}.borderRadius', borderRadiusTransform)};
  background-color: ${getComponentStyle('{name}.{variant}.backgroundColor')};
  transition: ${getComponentStyle('{name}.transitions', transitionTransformer)};
  ${(props) =>
    props.focus &&
    css`
      box-shadow: 0 0 0 ${getComponentStyle('{name}.{variant}.focus.outlineSize')(props)}
        ${getComponentStyle('{name}.{variant}.focus.outlineColor')(props)};
    `}
  ${(props) =>
    props.error &&
    css`
      border-color: ${getComponentStyle('{name}.{variant}.error.borderColor')(props)};
      &:focus {
        box-shadow: 0 0 0 ${getComponentStyle('{name}.{variant}.focus.outlineSize')(props)}
          ${getComponentStyle('{name}.{variant}.error.focus.outlineColor')(props)};
      }
    `}
  ${layoutInterpolationFn}
  ${(props) =>
    props.fullWidth &&
    css`
      width: auto;
    `}
  ${(props) => props.cssStyles}
`;

export function BaseInput<P extends Record<string, any>, E extends HTMLElement>({
  name,
  inputComponent,
  onChange,
  label,
  id: idProp,
  width,
  innerRef,
  inputRef,
  fullWidth = false,
  adornmentGap = 0,
  value,
  start,
  end,
  onFocus,
  onBlur,
  customStyles,
  variant,
  ...props
}: BaseInputOuterProps<P, E>) {
  const [boxProps, inputProps] = useBoxProps(props);
  const [focus, setFocus] = useState(false);
  const InputComponent = inputComponent as any;
  const generatedId = useUniqueId();
  const id = idProp || generatedId;
  const infoId = `${id}-info`;
  const errorId = `${id}-error`;
  const actualInfoText = props.error || props.infoText;
  const getCustomStyles = useCustomStyles(`${name}.styles`, customStyles);

  return (
    <Box ref={innerRef} css={getCustomStyles('root')} {...boxProps}>
      {label && (
        <label data-testid={`pbl-${name}-label`} htmlFor={id}>
          <Paragraph mb={0.75} customStyles={{ body: getCustomStyles('label') }}>
            {label}
          </Paragraph>
        </label>
      )}
      <InputWrapper
        data-testid={`pbl-${name}-wrapper`}
        name={name}
        fullWidth={fullWidth}
        width={width}
        error={!!props.error}
        focus={focus}
        cssStyles={getCustomStyles('wrapper')}
        variant={variant}
      >
        {start && (
          <Box shrink={0} ml={adornmentGap as any} css={getCustomStyles('startAdornment')}>
            {start}
          </Box>
        )}
        <InputComponent
          {...inputProps}
          data-testid={`pbl-${name}`}
          id={id}
          ref={inputRef}
          value={value}
          aria-invalid={props.error ? 'true' : 'false'}
          aria-errormessage={props.error ? errorId : undefined}
          aria-describedby={actualInfoText && !props.error ? infoId : undefined}
          onFocus={hijackCbBefore(onFocus, () => setFocus(true))}
          onBlur={hijackCbBefore(onBlur, () => setFocus(false))}
          onChange={(e) => onChange && onChange(e.target.value, e)}
          customStyles={customStyles}
        />
        {end && (
          <Box shrink={0} mr={adornmentGap as any} css={getCustomStyles('endAdornment')}>
            {end}
          </Box>
        )}
      </InputWrapper>
      {actualInfoText && (
        <InfoText
          aria-live="polite"
          data-testid={`pbl-${name}-infotext`}
          mt={0.5}
          id={props.error ? errorId : infoId}
          textColor={props.error ? 'negative.main' : 'text.info'}
          customStyles={{
            body: getCustomStyles('infoText'),
          }}
        >
          {actualInfoText}
        </InfoText>
      )}
    </Box>
  );
}
