import React from 'react';
import { getComponentStyle } from '../styleHelpers';
import styled from '@emotion/styled';

interface ComboboxItemProps<T extends string | object> {
  children: React.ReactNode;
  value: T;
  onSelect?: (value: T) => void;
  filter?: (item: T, value: string) => boolean;
  toValue?: (item: T) => string;
  selected?: boolean;
}

interface ComboboxItemWrapperProps {
  selected?: boolean;
}

const ComboboxItemWrapper = styled.div<ComboboxItemWrapperProps>`
  font-family: ${getComponentStyle('input.fontFamily')};
  font-size: ${getComponentStyle('input.fontSize')};
  padding: 0.25em;
  cursor: pointer;
  background-color: ${({ theme, selected }) => (selected ? theme.colors.brand.lightest : null)};
  border-radius: 0.5em;
`;

const ComboboxItem = <T extends string | object>(props: ComboboxItemProps<T>) => {
  return (
    <ComboboxItemWrapper
      data-pbl-type="combobox-item"
      selected={props.selected}
      onClick={(e) => {
        e.preventDefault();
        props.onSelect!(props.value);
      }}
    >
      {props.children || props.value.toString()}
    </ComboboxItemWrapper>
  );
};

export { ComboboxItem, ComboboxItemProps };
