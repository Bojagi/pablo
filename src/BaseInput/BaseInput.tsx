import React from 'react';
import styled, { css } from 'styled-components';
import { Box, LayoutBoxProps, layoutInterpolationFn } from '../Box';
import { Style } from '../theme/types';
import { InfoText, ParagraphBold } from '../Typography';
import { hijackCbBefore } from '../utils/hijackCb';
import { getComponentStyle, transitionTransformer } from '../styleHelpers';
import { useUniqueId } from '../utils/useUniqueId';
import { BaseProps, CssFunctionReturn } from '../types';
import { useCustomStyles } from '../utils/useCustomStyles';

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

export type InnerInputProps<P = {}> = LayoutBoxProps &
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
  fullWidth: boolean;
  focus: boolean;
  error: boolean;
  cssStyles: CssFunctionReturn;
}

const InputWrapper = styled.div<InputWrapperProps>`
  display: flex;
  align-items: center;
  box-sizing: border-box;
  border: ${getComponentStyle('{name}.borderWidth')}px solid
    ${getComponentStyle('{name}.{variant}.borderColor')};
  border-radius: ${getComponentStyle('{name}.borderRadius')};
  background-color: ${getComponentStyle('{name}.{variant}.backgroundColor')};
  transition: ${getComponentStyle('{name}.transitions', transitionTransformer)};
  ${(props) =>
    props.focus &&
    css`
      box-shadow: 0 0 0 ${getComponentStyle('{name}.{variant}.focus.outlineSize')}
        ${getComponentStyle('{name}.{variant}.focus.outlineColor')};
    `}
  ${(props) =>
    props.error &&
    css`
      border-color: ${getComponentStyle('{name}.{variant}.error.borderColor')};
      &:focus {
        box-shadow: 0 0 0 ${getComponentStyle('{name}.{variant}.focus.outlineSize')}
          ${getComponentStyle('{name}.{variant}.error.focus.outlineColor')};
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
  mt,
  start,
  end,
  onFocus,
  onBlur,
  customStyles,
  ...props
}: BaseInputOuterProps<P, E>) {
  const [focus, setFocus] = React.useState(false);
  const InputComponent = inputComponent as any;
  const generatedId = useUniqueId(name);
  const id = idProp || generatedId;
  const actualInfoText = props.error || props.infoText;
  const getCustomStyles = useCustomStyles(`${name}.styles`, customStyles);
  return (
    <Box ref={innerRef} mt={mt} css={getCustomStyles('root')}>
      {label && (
        <label data-testid={`pbl-${name}-label`} htmlFor={id}>
          <ParagraphBold mb={3} customStyles={{ paragraphBold: getCustomStyles('label') }}>
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
          data-testid={`pbl-${name}-infotext`}
          mt={2}
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
