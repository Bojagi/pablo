import React, { forwardRef, useMemo, Children, ComponentType, Ref } from 'react';
import { ComboboxItem, ComboboxItemProps } from './ComboboxItem';
import { setRef } from '../utils/setRef';
import { Autocomplete } from '../Autocomplete';
import { Input, InputProps } from '../Input';
import { DropdownListItem } from '../DropdownList';

export interface ComboboxProps<T extends string | object = string> extends InputProps {
  children?: React.ReactElement<ComboboxItemProps<T>>[];
  value: string;
  ref?: Ref<HTMLDivElement>;
  showOnEmpty?: boolean;
  maxItems?: number;
  filter?: (item: T, value: string) => boolean;
  toValue?: (item: T) => string;
}

type ComboboxToValueFn = <T extends string | object>(item: T) => string;

type ComboboxComponent = ComponentType<ComboboxProps<string | object>> & {
  Item: typeof ComboboxItem;
};

const defaultToValue: ComboboxToValueFn = (item) => item.toString();
const Combobox = forwardRef<HTMLDivElement, ComboboxProps>(
  ({ children, filter, toValue = defaultToValue, onChange, value, ...props }, ref) => {
    const setInputRef = (node) => {
      setRef(ref, node);
    };

    const items: DropdownListItem<string | object, string>[] = useMemo(
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
        filterTerm={value as any}
        maxItems={props.maxItems}
        onChange={onChange as any}
        toOutput={toValue}
      >
        <Input inputRef={setInputRef} {...props} onChange={onChange} value={value} />
      </Autocomplete>
    );
  }
) as unknown as ComboboxComponent;

Combobox.Item = ComboboxItem;

export { Combobox };
