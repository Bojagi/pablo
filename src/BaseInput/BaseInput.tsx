import React from 'react';
import styled, { css } from 'styled-components';
import { Box, LayoutBoxProps, layoutInterpolationFn } from '../Box';
import { Style } from '../theme/types';
import { InfoText, ParagraphBold } from '../Typography';
import { hijackCbBefore } from '../utils/hijackCb';
import { getComponentStyle, transitionTransformer } from '../styleHelpers';
import { useUniqueId } from '../utils/useUniqueId';

export interface BaseInputProps<E extends HTMLElement> extends LayoutBoxProps {
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
}

const InputWrapper = styled.div<InputWrapperProps>`
  display: flex;
  align-items: center;
  box-sizing: border-box;
  border: ${getComponentStyle('{name}.borderWidth')}px solid
    ${getComponentStyle('{name}.{variant}.borderColor')};
  border-radius: 8px;
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
      width: 100%;
    `}
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
  ...props
}: BaseInputOuterProps<P, E>) {
  const [focus, setFocus] = React.useState(false);
  const InputComponent = inputComponent as any;
  const generatedId = useUniqueId(name);
  const id = idProp || generatedId;
  const actualInfoText = props.error || props.infoText;

  return (
    <Box ref={innerRef} mt={mt}>
      {label && (
        <label data-testid={`pbl-${name}-label`} htmlFor={id}>
          <ParagraphBold mb={3}>{label}</ParagraphBold>
        </label>
      )}
      <InputWrapper
        data-testid={`pbl-${name}-wrapper`}
        name={name}
        fullWidth={fullWidth}
        width={width}
        error={!!props.error}
        focus={focus}
        {...props}
      >
        {start && (
          <Box flexShrink={0} ml={adornmentGap as any}>
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
        />
        {end && (
          <Box flexShrink={0} mr={adornmentGap as any}>
            {end}
          </Box>
        )}
      </InputWrapper>
      {actualInfoText && (
        <InfoText
          data-testid={`pbl-${name}-infotext`}
          mt={2}
          textColor={props.error ? 'negative.main' : 'text.info'}
        >
          {actualInfoText}
        </InfoText>
      )}
    </Box>
  );
}
