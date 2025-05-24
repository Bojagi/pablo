import React, { useState, forwardRef, useRef, useEffect } from 'react';
import styled from '@emotion/styled';
import { LayoutBoxProps } from '../Box';
import { getComponentStyle } from '../styleHelpers/getComponentStyle';
import { BaseInput, InnerInputProps, InputVariant } from '../shared/BaseInput';
import { useComponentStyle } from '../theme/useComponentStyle';
import { getCustomStyles } from '../utils/useCustomStyles';
import { baseStyle } from '../shared/baseStyle';
import { Popover } from '../Popover';
import { borderRadiusTransform } from '../Box/interpolations/shape';
import { useBlur } from '../utils/useBlur';

export interface ComboboxProps extends LayoutBoxProps {
  id?: string;
  value?: string;
  inputRef?: React.Ref<HTMLInputElement>;
  children?: React.ReactElement<ComboboxItemProps>[];
  delimiter?: string;
  error?: React.ReactNode;
  label?: React.ReactNode;
  variant?: InputVariant;
  infoText?: React.ReactNode;
  fullWidth?: boolean;
  end?: React.ReactNode;
  showOnEmpty?: boolean;
  onChange: (newValue: string) => void;
}

export interface ComboboxItemProps {
  children: React.ReactNode;
  value: string;
  onSelect?: (value: string) => void;
  selected?: boolean;
}

const InnerComboBox = styled.input<InnerInputProps>`
  ${baseStyle}
  flex-grow: 1;
  flex-shrink: 1;
  border: 0;
  padding: ${getComponentStyle('input.padding')};
  background-color: transparent;
  font-family: ${getComponentStyle('input.fontFamily')};
  font-size: ${getComponentStyle('input.fontSize')};
  outline: none;
  ${getCustomStyles('input.styles', 'field')}
  width: 100%;
`;

const AutocompleteBox = styled.div`
  background-color: white;
  border-radius: ${(props) =>
    borderRadiusTransform(getComponentStyle('input.borderRadius')(props), props.theme)};
  box-shadow: ${getComponentStyle('input.boxShadow')};
  border-width: 1px;
  border-style: solid;
  padding: 0.5em;
  overflow-x: hidden;
  overflow-y: auto;
  height: 100%;
  box-sizing: border-box;
  border-color: ${getComponentStyle('input.outline.borderColor')};
  z-index: 1;
`;

const ComboboxItemWrapper = styled.div`
  font-family: ${getComponentStyle('input.fontFamily')};
  font-size: ${getComponentStyle('input.fontSize')};
  padding: 0.25em;
  cursor: pointer;
  background-color: ${({ theme, selected }) => (selected ? theme.colors.brand.lightest : null)};
  border-radius: 0.5em;
`;

export const Combobox = forwardRef<HTMLDivElement, ComboboxProps>(
  ({ width, variant = 'filled', children, onChange, value, ...props }, ref) => {
    const [open, setOpen] = useState(false);
    const [suggestionMaxHeight, setSuggestionMaxHeight] = useState(window.innerHeight);
    const innerRef = useRef<HTMLInputElement>(null);
    const [selectedItemIndex, setSelectedItemIndex] = useState<number>(-1);

    const domRect = innerRef.current?.getBoundingClientRect() || {
      width: 0,
      height: 0,
      bottom: 0,
      top: 0,
      left: 0,
    };

    const setRef = (node) => {
      innerRef.current = node;
      if (ref) {
        if (typeof ref === 'function') {
          ref(node);
        } else {
          ref.current = node;
        }
      }
    };

    useEffect(() => {
      const setter = () => {
        console.log('domRect', domRect);

        setSuggestionMaxHeight(window.innerHeight - domRect.bottom - 10);
      };
      setter();
      window.addEventListener('resize', setter);
      return () => window.removeEventListener('resize', setter);
    });

    const handleBlur = useBlur((target) => {
      if (target && target.closest('[data-pbl-type=combobox-item]')) {
        // Do not close if the blur was triggered by clicking on a combobox item
        return;
      }
      setOpen(false);
    });

    const defaultWidth = useComponentStyle('input.defaultWidth') as any;
    const adornmentGap = useComponentStyle('input.adornmentGap');

    const items =
      children
        ?.filter(
          (child) =>
            child.props.value?.toLowerCase().includes(value?.toLowerCase()) &&
            !value?.includes(child.props.value)
        )
        .map((child, index) => {
          return (
            <ComboboxItem
              key={child.props.value}
              children={child.props.children}
              value={child.props.value}
              selected={selectedItemIndex === index}
              onSelect={onChange}
            />
          );
        }) ?? [];

    const showPopupBasedOnValue = props.showOnEmpty || value?.length > 0;
    const showPopup = showPopupBasedOnValue && items?.length > 0;
    const content = showPopup ? <AutocompleteBox>{items}</AutocompleteBox> : null;

    const handleKeyDown = (e: React.KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setSelectedItemIndex((prev) => (prev >= items.length - 1 ? 0 : prev + 1));
          break;
        case 'ArrowUp':
          e.preventDefault();
          setSelectedItemIndex((prev) => {
            return prev <= 0 ? items.length - 1 : prev - 1;
          });
          break;
        case 'Enter':
          e.preventDefault();
          if (selectedItemIndex >= 0) {
            const selectedItem = items[selectedItemIndex];
            if (selectedItem) {
              onChange(selectedItem.props.value);
            }
          }
          break;
        default:
          setSelectedItemIndex(-1);
      }
    };

    return (
      <Popover
        placement="bottom"
        onClickOutside={(e) => {
          if (e.target === innerRef.current) {
            e.preventDefault();
            e.stopPropagation();
            return;
          }
          innerRef?.current?.blur();
          setOpen(false);
        }}
        style={{ width: domRect.width, height: 'fit-content', maxHeight: suggestionMaxHeight }}
        offset={-8}
        arrow={null}
        delay={0}
        open={true}
        content={content}
      >
        <BaseInput<InnerInputProps, HTMLInputElement>
          name="input"
          inputRef={setRef}
          variant={variant}
          adornmentGap={adornmentGap}
          inputComponent={InnerComboBox}
          {...props}
          value={value}
          onChange={onChange}
          onKeyDown={handleKeyDown}
          onFocus={() => setOpen(true)}
          onBlur={handleBlur}
          width={width || defaultWidth}
        />
      </Popover>
    );
  }
);

export const ComboboxItem = (props: ComboboxItemProps) => {
  console.log('children', props.children);

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
