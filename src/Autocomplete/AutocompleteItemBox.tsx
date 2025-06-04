import React, { isValidElement } from 'react';
import { componentPrimitive, getComponentStyle, getPrimitiveStyle } from '../styleHelpers';
import { Body } from '../Typography';
import { AutocompleteItem, AutocompleteItemRenderFn } from './types';

interface AutoCompleteItemBoxProps<V, O = V> {
  render?: AutocompleteItemRenderFn<V, O>;
  item: AutocompleteItem<V, O>;
  wrap: boolean;
  onSelect?: (item: AutocompleteItem<V, O>) => void;
  toString?: (item: AutocompleteItem<V, O>) => string;
  selected?: boolean;
}

interface WrapperProps {
  selected?: boolean;
}

const Wrapper = componentPrimitive<WrapperProps>(['autocomplete', 'item'])`
  padding: ${getPrimitiveStyle('padding')};
  cursor: pointer;
  border-radius: ${getPrimitiveStyle('borderRadius')};

  &[data-selected='true'] {
    background-color: ${getComponentStyle(['autocomplete', 'item', 'selected', 'backgroundColor'])};
  }
`;

const getRenderItem = <V, O>({
  item,
  onSelect,
  toString,
  selected,
}: AutoCompleteItemBoxProps<V, O>): React.ReactNode => {
  if (item.render) {
    const renderedItem = item.render({ item, onSelect: () => onSelect?.(item), selected });
    if (isValidElement(renderedItem)) {
      return renderedItem;
    }
  }

  const stringifiedItem = toString ? toString(item) : item?.toString?.(item.value);
  return <Body>{stringifiedItem}</Body>;
};

const AutoCompleteItemBox = <V, O = V>(props: AutoCompleteItemBoxProps<V, O>) => {
  const renderItem = getRenderItem(props);
  if (!props.item.wrap && !props.wrap) {
    return renderItem;
  }
  return (
    <Wrapper
      data-pbl-type="autocomplete-item"
      data-selected={props.selected && 'true'}
      selected={props.selected}
      onClick={(e) => {
        e.preventDefault();
        props.onSelect!(props.item);
      }}
    >
      {renderItem}
    </Wrapper>
  );
};

export { AutoCompleteItemBox, AutoCompleteItemBoxProps };
