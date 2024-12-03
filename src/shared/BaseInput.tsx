import React, { useState } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Box, layoutInterpolationFn } from '../Box';
import type { LayoutBoxProps } from '../Box';
import type { InputComponentIdentifier, Style } from '../theme/types';
import { InfoText, ParagraphBold } from '../Typography';
import { hijackCbBefore } from '../utils/hijackCb';
import { getComponentStyle, transitionTransformer } from '../styleHelpers';
import { useUniqueId } from '../utils/useUniqueId';
import { BaseProps, CssFunctionReturn } from '../types';
import { useCustomStyles } from '../utils/useCustomStyles';
import { baseStyle } from './baseStyle';
import { pabloCss } from '../styleHelpers/css';
import { ifProp } from '../styleHelpers/styleProp';

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
    name: InputComponentIdentifier;
    inputComponent: React.FC<P>;
    adornmentGap?: Style | number;
  };

interface InputWrapperProps extends InnerInputProps {
  name: 'textarea' | 'input';
  fullWidth: boolean;
  focus: boolean;
  error: boolean;
  cssStyles: CssFunctionReturn;
}

const focusStyles = pabloCss<InputWrapperProps>`
  box-shadow: 0 0 0
    ${getComponentStyle((props) => [props.name, props.variant, 'focus', 'outlineSize'])}
    ${getComponentStyle((props) => [props.name, props.variant, 'focus', 'outlineColor'])};
`;

const errorStyles = (props: InputWrapperProps) =>
  pabloCss`
  border-color: ${getComponentStyle([props.name, props.variant, 'error', 'borderColor'])};
  &:focus {
    box-shadow: 0 0 0 ${getComponentStyle([props.name, props.variant, 'focus', 'outlineSize'])}
      ${getComponentStyle([props.name, props.variant, 'error', 'focus', 'outlineColor'])};
  }
`(props);

const InputWrapper = styled.div<InputWrapperProps>`
  ${baseStyle}
  display: flex;
  align-items: center;
  border: ${getComponentStyle((props) => [props.name, 'borderWidth'])}px solid
    ${getComponentStyle((props) => [props.name, props.variant, 'borderColor'])};
  border-radius: ${getComponentStyle((props) => [props.name, 'borderRadius'])};
  background-color: ${getComponentStyle((props) => [props.name, props.variant, 'backgroundColor'])};
  transition: ${getComponentStyle((props) => [props.name, 'transitions'], transitionTransformer)};
  ${ifProp('focus', focusStyles)}
  ${ifProp('error', errorStyles)}
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
  mt,
  start,
  end,
  onFocus,
  onBlur,
  customStyles,
  ...props
}: BaseInputOuterProps<P, E>) {
  const [focus, setFocus] = useState(false);
  const InputComponent = inputComponent as any;
  const generatedId = useUniqueId();
  const id = idProp || generatedId;
  const infoId = `${id}-info`;
  const errorId = `${id}-error`;
  const actualInfoText = props.error || props.infoText;
  const getCustomStyles = useCustomStyles(`${name}.styles`, customStyles);
  return (
    <Box ref={innerRef} mt={mt} css={getCustomStyles('root')}>
      {label && (
        <label data-testid={`pbl-${name}-label`} htmlFor={id}>
          <ParagraphBold mb={0.75} customStyles={{ paragraphBold: getCustomStyles('label') }}>
            {label}
          </ParagraphBold>
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
        {...props}
      >
        {start && (
          <Box flexShrink={0} ml={adornmentGap as any} css={getCustomStyles('startAdornment')}>
            {start}
          </Box>
        )}
        <InputComponent
          {...props}
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
          <Box flexShrink={0} mr={adornmentGap as any} css={getCustomStyles('endAdornment')}>
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
            info: getCustomStyles('infoText'),
          }}
        >
          {actualInfoText}
        </InfoText>
      )}
    </Box>
  );
}
