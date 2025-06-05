import React, { cloneElement, ComponentElement, useEffect, useState } from 'react';
import { useBlur } from '../utils/useBlur';
import {
  DropdownListFilterFn,
  DropdownListItem,
  DropdownListItemRenderFn,
} from '../DropdownList/types';
import { DropdownList } from '../DropdownList/DropdownList';

interface AutocompleteProps<V, O = V> {
  children: ComponentElement<any, any>;
  items: DropdownListItem<V, O>[];
  itemFilter?: DropdownListFilterFn<V>;
  onChange: (value: O) => void;
  toOutput?: (item: V) => O;
  showOnEmpty?: boolean;
  filterTerm?: string;
  maxItems?: number;
  renderItem?: DropdownListItemRenderFn<V>;
  wrapItems?: boolean;
}

const defaultFilter: DropdownListFilterFn<any> = (value, filterTerm) => {
  const stringifiedValue = value?.toString?.();
  return (
    stringifiedValue?.toLowerCase().includes(filterTerm?.toLowerCase()) &&
    !filterTerm?.includes(stringifiedValue)
  );
};

const Autocomplete = <V, O = V>({
  children,
  itemFilter = defaultFilter,
  ...props
}: AutocompleteProps<V, O>) => {
  const [childElement] = useState<HTMLElement | null>(null);
  const inputElement = childElement?.querySelector('input, textarea') as HTMLInputElement | null;

  const handleBlur = useBlur((target) => {
    if (target && target.closest('[data-pbl-type=autocomplete-item]')) {
      // Do not close if the blur was triggered by clicking on an autocomplete item
      return;
    }
  });

  useEffect(() => {
    if (inputElement) {
      inputElement.addEventListener('blur', handleBlur);
      return () => {
        inputElement.removeEventListener('blur', handleBlur);
      };
    }
  }, [inputElement, handleBlur]);

  const clonedChildren = cloneElement(children, {
    onBlur: handleBlur,
  });

  return (
    <DropdownList closeOnSelect={false} itemFilter={itemFilter} {...props}>
      {clonedChildren}
    </DropdownList>
  );
};

export { Autocomplete };
