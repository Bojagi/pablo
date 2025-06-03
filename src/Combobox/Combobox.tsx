import React, { forwardRef, useMemo, Children } from 'react';
import styled from '@emotion/styled';
import { LayoutBoxProps } from '../Box';
import { getComponentStyle } from '../styleHelpers/getComponentStyle';
import { BaseInput, InnerInputProps, InputVariant } from '../shared/BaseInput';
import { useComponentStyle } from '../theme/useComponentStyle';
import { getCustomStyles } from '../utils/useCustomStyles';
import { baseStyle } from '../shared/baseStyle';
import { ComboboxItem, ComboboxItemProps } from './ComboboxItem';
import { setRef } from '../utils/setRef';
import { Autocomplete, AutocompleteItem } from '../Autocomplete';

export interface ComboboxProps extends LayoutBoxProps {
  id?: string;
  value?: string;
  inputRef?: React.Ref<HTMLInputElement>;
  children?: React.ReactElement<ComboboxItemProps>[];
  delimiter?: string;
  error?: React.ReactNode;
  label?: React.ReactNode;
  variant?: InputVariant;
  infoText?: React.ReactNode;
  fullWidth?: boolean;
  end?: React.ReactNode;
  showOnEmpty?: boolean;
  maxItems?: number;
  filter?: (item: string | object, value: string) => boolean;
  toValue?: (item: string | object) => string;
  onChange: (newValue: string) => void;
}

const InnerComboBox = styled.input<InnerInputProps>`
  ${baseStyle}
  flex-grow: 1;
  flex-shrink: 1;
  border: 0;
  padding: ${getComponentStyle('input.padding')};
  background-color: transparent;
  font-family: ${getComponentStyle('input.fontFamily')};
  font-size: ${getComponentStyle('input.fontSize')};
  outline: none;
  ${getCustomStyles('input.styles', 'field')}
  width: 100%;
`;

type ComboboxToValueFn = <T extends string | object>(item: T) => string;

const defaultToValue: ComboboxToValueFn = (item) => item.toString();
export const Combobox = forwardRef<HTMLDivElement, ComboboxProps>(
  (
    {
      width,
      variant = 'filled',
      children,
      filter,
      toValue = defaultToValue,
      onChange,
      value,
      ...props
    },
    ref
  ) => {
    const defaultWidth = useComponentStyle('input.defaultWidth') as any;
    const adornmentGap = useComponentStyle('input.adornmentGap');

    const setInputRef = (node) => {
      setRef(ref, node);
    };

    const items: AutocompleteItem<any, string>[] = useMemo(
      () =>
        children
          ? Children.map(children, (child) => {
              const toOutput = child?.props.toValue || toValue;
              const outputValue = toOutput(child?.props.value);
              return {
                value: child?.props.value,
                key: child.key || outputValue,
                render: () => child.props.children,
                filter: child?.props.filter || filter,
                toOutput,
                toString: toOutput,
              };
            })
          : [],
      [children, filter, toValue]
    );

    return (
      <Autocomplete
        items={items}
        showOnEmpty={props.showOnEmpty}
        filterTerm={value}
        maxItems={props.maxItems}
        onChange={onChange}
        toOutput={toValue}
      >
        <BaseInput<InnerInputProps, HTMLInputElement>
          name="input"
          inputRef={setInputRef}
          variant={variant}
          adornmentGap={adornmentGap}
          inputComponent={InnerComboBox}
          {...props}
          value={value}
          onChange={onChange}
          width={width || defaultWidth}
        />
      </Autocomplete>
    );
  }
);

Combobox.Item = ComboboxItem;
