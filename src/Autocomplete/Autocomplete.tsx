import React, { cloneElement, ComponentElement, useEffect, useRef, useState } from 'react';
import { Popover } from '../Popover';
import { AutocompleteFilterFn, AutocompleteItem, AutocompleteItemRenderFn } from './types';
import { useKeyboardNavigation } from '../utils/useKeyboardNavigation';
import { AutoCompleteItemBox } from './AutocompleteItemBox';
import { AutocompleteBox } from './AutocompleteBox';
import { useBlur } from '../utils/useBlur';

interface AutocompleteProps<V, O = V> {
  children: ComponentElement<any, any>;
  items: AutocompleteItem<V, O>[];
  itemFilter?: AutocompleteFilterFn<V>;
  onChange: (value: O) => void;
  toOutput?: (item: V) => O;
  showOnEmpty?: boolean;
  filterTerm?: string;
  maxItems?: number;
  renderItem?: AutocompleteItemRenderFn<V, O>;
  wrapItems?: boolean;
}

const defaultFilter: AutocompleteFilterFn<any> = (value, filterTerm) => {
  const stringifiedValue = value?.toString?.();
  return (
    stringifiedValue?.toLowerCase().includes(filterTerm?.toLowerCase()) &&
    !filterTerm?.includes(stringifiedValue)
  );
};

const Autocomplete = <V, O = V>({
  children,
  items,
  filterTerm,
  itemFilter = defaultFilter,
  renderItem,
  wrapItems = true,
  toOutput,
  onChange,
  showOnEmpty,
  maxItems,
}: AutocompleteProps<V, O>) => {
  const [open, setOpen] = useState(false);
  const [childElement, setChildElement] = useState<HTMLElement | null>(null);
  const inputElement = childElement?.querySelector('input, textarea') as HTMLInputElement | null;
  const wrapperRef = useRef<HTMLDivElement>(null);

  const handleBlur = useBlur((target) => {
    if (target && target.closest('[data-pbl-type=autocomplete-item]')) {
      // Do not close if the blur was triggered by clicking on an autocomplete item
      return;
    }
    setOpen(false);
  });

  useEffect(() => {
    if (inputElement) {
      const handleFocus = () => setOpen(true);
      inputElement.addEventListener('focus', handleFocus);
      inputElement.addEventListener('blur', handleBlur);
      return () => {
        inputElement.removeEventListener('focus', handleFocus);
        inputElement.removeEventListener('blur', handleBlur);
      };
    }
  }, [inputElement, handleBlur]);

  const handleChange = (item: AutocompleteItem<V, O>) => {
    const outputFn = item.toOutput || toOutput;
    const value = outputFn ? outputFn(item.value) : (item.value as unknown as O);
    onChange(value);
  };

  const filteredItems = items.filter((item) => {
    if (filterTerm === undefined) {
      return true;
    }
    const filter = item.filter || itemFilter;
    return filter(item.value, filterTerm);
  });

  const { selectedIndex, handleKeyDown } = useKeyboardNavigation(filteredItems, handleChange);

  useEffect(() => {
    if (selectedIndex >= 0) {
      const itemElement = wrapperRef.current?.querySelector(
        `[data-pbl-type="autocomplete-item"]:nth-child(${selectedIndex + 1})`
      ) as HTMLElement | null;

      if (itemElement) {
        itemElement.scrollIntoView({ block: 'nearest' });
      }
    }
  }, [selectedIndex]);

  const cappedItems = maxItems ? filteredItems.slice(0, maxItems) : filteredItems;
  const renderedItems = cappedItems.map((item, index) => {
    const isSelected = selectedIndex === index;
    const renderFn = item.render || renderItem;

    return (
      <AutoCompleteItemBox
        key={item.key || item.value?.toString()}
        item={item}
        onSelect={() => {
          handleChange(item);
          setOpen(false);
        }}
        render={renderFn}
        selected={isSelected}
        wrap={wrapItems}
      />
    );
  });

  const showPopupBasedOnValue = showOnEmpty || (filterTerm?.length || 0) > 0;
  const showPopup = showPopupBasedOnValue && renderedItems?.length > 0;
  const content = showPopup ? (
    <AutocompleteBox ref={wrapperRef} anchor={childElement}>
      {renderedItems}
    </AutocompleteBox>
  ) : null;

  const clonedChildren = cloneElement(children, {
    ref: (el) => {
      if (el) {
        setChildElement(el);
      }
    },
    onKeyDown: handleKeyDown,
  });

  return (
    <Popover
      placement="bottom-start"
      onClickOutside={(e) => {
        if (e.target === childElement) {
          e.preventDefault();
          e.stopPropagation();
          return;
        }
        inputElement?.blur();
        setOpen(false);
      }}
      anchorElement={inputElement}
      offset={-8}
      arrow={null}
      delay={0}
      open={open}
      content={content}
    >
      {clonedChildren}
    </Popover>
  );
};

export { Autocomplete };
