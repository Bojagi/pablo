import React, { forwardRef, ReactElement } from 'react';
import styled from '@emotion/styled';
import { LayoutBoxProps } from '../Box';
import { getComponentStyle } from '../styleHelpers/getComponentStyle';
import { BaseInput, InnerInputProps, InputVariant } from '../shared/BaseInput';
import { useComponentStyle } from '../theme/useComponentStyle';
import { getCustomStyles } from '../utils/useCustomStyles';
import { baseStyle } from '../shared/baseStyle';

export interface NativeSelectProps extends LayoutBoxProps {
  id?: string;
  value?: string | number;
  inputRef?: React.Ref<HTMLSelectElement>;
  children: ReactElement<'option'>[];
  error?: React.ReactNode;
  label?: React.ReactNode;
  variant?: InputVariant;
  infoText?: React.ReactNode;
  fullWidth?: boolean;
  end?: React.ReactNode;
  onChange: (newValue: string, e: React.FormEvent<HTMLSelectElement>) => void;
}

const StyledSelect = styled.select<InnerInputProps>`
  ${baseStyle}
  flex-grow: 1;
  border: 0;
  appearance: none;
  padding: ${getComponentStyle('nativeSelect.padding')};
  background-color: transparent;
  font-family: ${getComponentStyle('nativeSelect.fontFamily')};
  outline: none;
  padding-right: ${getComponentStyle('nativeSelect.reservedArrowSpace')};
  position: relative;
  ${getCustomStyles('nativeSelect.styles', 'field')}
`;

const SelectWrapper = styled.div`
  position: relative;
  width: 100%;
  display: flex;

  :after {
    content: '';
    background-image: url("data:image/svg+xml,%3Csvg width='8' height='6' viewBox='0 0 8 6' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M4 6L0.535899 -6.52533e-07L7.4641 -4.68497e-08L4 6Z' fill='currentColor' /%3E%3C/svg%3E");
    width: 8px;
    height: 6px;
    position: absolute;
    right: ${getComponentStyle('nativeSelect.arrowGap')};
    top: 50%;
    transform: translateY(-50%);
  }
`;

const InnerSelect = forwardRef<HTMLSelectElement, React.ComponentProps<typeof StyledSelect>>(
  (props, ref) => (
    <SelectWrapper>
      <StyledSelect ref={ref} {...props} />
    </SelectWrapper>
  )
) as unknown as typeof StyledSelect;

export const NativeSelect = forwardRef<HTMLDivElement, NativeSelectProps>(
  ({ width, variant = 'filled', ...props }, ref) => {
    const defaultWidth = useComponentStyle('nativeSelect.defaultWidth') as any;
    const adornmentGap = useComponentStyle('nativeSelect.adornmentGap');
    return (
      <BaseInput<InnerInputProps, any>
        name="nativeSelect"
        innerRef={ref}
        variant={variant}
        adornmentGap={adornmentGap}
        inputComponent={InnerSelect}
        {...props}
        width={width || defaultWidth}
      />
    );
  }
);
