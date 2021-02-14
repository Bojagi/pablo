import React from 'react';
import { Box } from '../Box';
import { useComponentStyle } from '../theme/context';
import { InfoText, ParagraphBold } from '../Typography';
import { useUniqueId } from '../utils/useUniqueId';

export interface BaseInputProps<E extends HTMLElement> {
  id?: string;
  value?: string | number | readonly string[];
  error?: React.ReactNode;
  label?: React.ReactNode;
  infoText?: React.ReactNode;
  fullWidth?: boolean;
  width?: string | number;
  onChange?: (newValue: string, e: React.FormEvent<E>) => void;
}

export type InnerInputProps<P> = P & {
  error?: React.ReactNode;
  fullWidth?: boolean;
  width?: string | number;
};

export type BaseInputOuterProps<P extends Record<string, any>, E extends HTMLElement> = Omit<
  P,
  'onChange'
> &
  BaseInputProps<E> & {
    name: string;
    inputComponent: React.FC<P>;
  };

export function BaseInput<P extends Record<string, any>, E extends HTMLElement>({
  name,
  inputComponent,
  onChange,
  label,
  id: idProp,
  value,
  ...props
}: BaseInputOuterProps<P, E>) {
  const InputComponent = inputComponent as any;
  const generatedId = useUniqueId(name);
  const id = idProp || generatedId;
  const actualInfoText = props.error || props.infoText;
  const defaultWidth = useComponentStyle(`${name}.defaultWidth`);
  return (
    <Box {...props}>
      {label && (
        <label data-testid={`pbl-${name}-label`} htmlFor={id}>
          <ParagraphBold mb={0.75}>{label}</ParagraphBold>
        </label>
      )}
      <InputComponent
        {...props}
        data-testid={`pbl-${name}`}
        id={id}
        error={props.error}
        value={value}
        fullWidth={props.fullWidth}
        width={props.width || defaultWidth}
        onChange={(e) => onChange && onChange(e.target.value, e)}
      />
      {actualInfoText && (
        <InfoText
          data-testid={`pbl-${name}-infotext`}
          mt={0.5}
          color={props.error ? 'negative.main' : 'text.info'}
        >
          {actualInfoText}
        </InfoText>
      )}
    </Box>
  );
}
