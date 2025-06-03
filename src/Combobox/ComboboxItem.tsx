import React from 'react';
import { getComponentStyle } from '../styleHelpers';
import styled from '@emotion/styled';

interface ComboboxItemProps {
  children: React.ReactNode;
  value: string;
  onSelect?: (value: string) => void;
  filter?: (item: string | object, value: string) => boolean;
  toValue?: (item: string | object) => string;
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

const ComboboxItem = (props: ComboboxItemProps) => {
  return (
    <ComboboxItemWrapper
      data-pbl-type="combobox-item"
      selected={props.selected}
      onClick={(e) => {
        e.preventDefault();
        props.onSelect!(props.value);
      }}
    >
      {props.children || props.value}
    </ComboboxItemWrapper>
  );
};

export { ComboboxItem, ComboboxItemProps };
