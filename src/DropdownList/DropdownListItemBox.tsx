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

const Wrapper = componentPrimitive<WrapperProps>(['dropdownList', 'item'])`
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
      item: item.value,
      onSelect: () => onSelect?.(item.value),
      selected,
    });
    if (isValidElement(renderedItem)) {
      if (!shouldWrap) {
        return cloneElement(renderedItem, {
          'data-pbl-type': 'dropdownList-item',
          'data-selected': selected && 'true',
        } as any);
      }
      return renderedItem;
    }
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
      data-pbl-type="dropdownList-item"
      data-selected={props.selected && 'true'}
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
