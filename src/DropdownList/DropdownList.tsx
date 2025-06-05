import React, { cloneElement, ComponentElement, useEffect, useMemo, useRef, useState } from 'react';
import { Popover } from '../Popover';
import { DropdownListFilterFn, DropdownListItem, DropdownListItemRenderFn } from './types';
import { useKeyboardNavigation } from '../utils/useKeyboardNavigation';
import { DropdownListItemBox } from '../DropdownList/DropdownListItemBox';
import { DropdownListBox } from '../DropdownList/DropDownListBox';

interface DropdownListProps<V, O = V> {
  children: ComponentElement<any, any>;
  items: DropdownListItem<V, O>[];
  itemFilter?: DropdownListFilterFn<V>;
  anchorElement?: HTMLElement | null;
  onChange: (value: O) => void;
  toOutput?: (item: V) => O;
  onOpenStateChange?: (open: boolean) => void;
  onOpen?: () => void;
  onClose?: () => void;
  showOnEmpty?: boolean;
  closeOnSelect?: boolean;
  filterTerm?: string;
  maxItems?: number;
  renderItem?: DropdownListItemRenderFn<V>;
  wrapItems?: boolean;
}

const defaultFilter: DropdownListFilterFn<any> = () => true;

const DropdownList = <V, O = V>({
  children,
  items,
  filterTerm,
  itemFilter = defaultFilter,
  renderItem,
  wrapItems = true,
  toOutput,
  anchorElement,
  onChange,
  showOnEmpty,
  onOpenStateChange = () => {},
  onOpen = () => {},
  onClose = () => {},
  closeOnSelect = true,
  maxItems,
}: DropdownListProps<V, O>) => {
  const [open, setOpenState] = useState(false);
  const [childElement, setChildElement] = useState<HTMLElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const setOpen = (newValue: boolean) => {
    setOpenState(newValue);
    if (!newValue) {
      onClose();
    } else {
      onOpen();
    }
    onOpenStateChange(newValue);
  };

  const handleChange = (item: DropdownListItem<V, O>) => {
    const outputFn = item.toOutput || toOutput;
    const value = outputFn ? outputFn(item.value) : (item.value as unknown as O);
    onChange(value);
    if (closeOnSelect) {
      setOpen(false);
    }
  };

  const filteredItems = useMemo(
    () =>
      items.filter((item) => {
        if (filterTerm === undefined || filterTerm === '') {
          return true;
        }
        const filter = item.filter || itemFilter;
        return filter(item.value, filterTerm);
      }),
    [filterTerm, itemFilter, items]
  );

  const { selectedIndex } = useKeyboardNavigation(filteredItems, handleChange, open);

  // Scroll to selected element when selectedIndex changes
  useEffect(() => {
    if (selectedIndex >= 0) {
      const itemElement = wrapperRef.current?.querySelector(
        `[data-pbl-type="dropdownList-item"]:nth-child(${selectedIndex + 1})`
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
      <DropdownListItemBox
        key={item.key || item.value?.toString()}
        item={item}
        onSelect={() => {
          handleChange(item);
          if (closeOnSelect) {
            setOpen(false);
          }
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
    <DropdownListBox ref={wrapperRef} anchor={childElement}>
      {renderedItems}
    </DropdownListBox>
  ) : null;

  const clonedChildren = cloneElement(children, {
    ref: (el) => {
      if (el) {
        setChildElement(el);
      }
    },
    onClick: () => {
      setOpen(true);
    },
  });

  const usedAnchor = anchorElement || childElement;

  return (
    <Popover
      placement="bottom-start"
      onClickOutside={(e) => {
        if (e.target === usedAnchor) {
          e.preventDefault();
          e.stopPropagation();
          return;
        }
        setOpen(false);
      }}
      anchorElement={usedAnchor}
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

export { DropdownList };
