import React, { cloneElement, isValidElement } from 'react';
import { componentPrimitive, getComponentStyle, getPrimitiveStyle } from '../styleHelpers';
import { Body } from '../Typography';
import { DropdownListItem, DropdownListItemRenderFn } from './types';

interface DropdownListItemBoxProps<V, O = V> {
  render?: DropdownListItemRenderFn<V>;
  item: DropdownListItem<V, O>;
  wrap: boolean;
  onSelect?: (item: V) => void;
  toString?: (item: V) => string;
  selected?: boolean;
}

interface WrapperProps {
  selected?: boolean;
}

const getElementProps = (selected) => ({
  'data-pbl-type': 'dropdownList-item',
  'data-selected': selected && 'true',
  'aria-selected': selected && 'true',
  role: 'option',
});

const Wrapper = componentPrimitive<WrapperProps, 'li'>(['dropdownList', 'item'], {
  tag: 'li',
})`
  padding: ${getPrimitiveStyle('padding')};
  cursor: pointer;
  border-radius: ${getPrimitiveStyle('borderRadius')};

  &[data-selected='true'] {
    background-color: ${getComponentStyle(['dropdownList', 'item', 'selected', 'backgroundColor'])};
  }
`;

const getRenderItem = <V, O>(
  { item, onSelect, toString, selected, render }: DropdownListItemBoxProps<V, O>,
  shouldWrap: boolean
): React.ReactNode => {
  if (render) {
    const renderedItem = render({
      value: item.value,
      label: item.label,
      onSelect: () => onSelect?.(item.value),
      selected,
    });

    if (typeof renderedItem === 'string') {
      return <Body>{renderedItem}</Body>;
    }

    if (isValidElement(renderedItem)) {
      if (!shouldWrap) {
        return cloneElement(renderedItem, getElementProps(selected) as any);
      }
      return renderedItem;
    }
  }

  if (item.label) {
    if (isValidElement(item.label)) {
      return item.label;
    }
    return <Body>{item.label}</Body>;
  }

  const stringifiedItem = toString ? toString(item.value) : item.toString?.(item.value);
  return <Body>{stringifiedItem}</Body>;
};

const DropdownListItemBox = <V, O = V>(props: DropdownListItemBoxProps<V, O>) => {
  const shouldWrap = props.item.wrap || props.wrap;
  const renderItem = getRenderItem(props, shouldWrap);
  if (!shouldWrap) {
    return renderItem;
  }
  return (
    <Wrapper
      {...getElementProps(props.selected)}
      selected={props.selected}
      onClick={(e) => {
        e.preventDefault();
        props.onSelect!(props.item.value);
      }}
    >
      {renderItem}
    </Wrapper>
  );
};

export { DropdownListItemBox, DropdownListItemBoxProps };
