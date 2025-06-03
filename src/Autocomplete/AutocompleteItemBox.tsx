import React, { isValidElement } from 'react';
import { getComponentStyle } from '../styleHelpers';
import styled from '@emotion/styled';
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

const Wrapper = styled.div<WrapperProps>`
  font-family: ${getComponentStyle('input.fontFamily')};
  font-size: ${getComponentStyle('input.fontSize')};
  padding: 0.25em;
  cursor: pointer;
  background-color: ${({ theme, selected }) => (selected ? theme.colors.brand.lightest : null)};
  border-radius: 0.5em;
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
