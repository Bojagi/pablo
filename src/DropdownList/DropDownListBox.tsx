import React, { forwardRef, useCallback, useEffect, useRef, useState } from 'react';
import { LayoutBoxProps } from '../Box';
import { componentPrimitive, getPrimitiveStyle } from '../styleHelpers';

interface WrapperProps extends LayoutBoxProps {
  availableHeight?: number;
}

const Wrapper = componentPrimitive<WrapperProps, 'ul'>(['dropdownList', 'container'], {
  tag: 'ul',
})`
  margin: 0;
  list-style: none;
  background-color: ${getPrimitiveStyle('backgroundColor')};
  border-radius: ${getPrimitiveStyle('borderRadius')};
  box-shadow: ${getPrimitiveStyle('boxShadow')};
  border-width: ${getPrimitiveStyle('borderWidth')};
  border-style: solid;
  border-color: ${getPrimitiveStyle('borderColor')};
  padding: ${getPrimitiveStyle('padding')};
  overflow-x: hidden;
  overflow-y: auto;
  height: 100%;
  box-sizing: border-box;
  z-index: 1;
`;

interface DropdownListBoxProps extends LayoutBoxProps {
  children: React.ReactNode;
  anchor: HTMLElement | null;
}

const DropdownListBox = forwardRef<HTMLDivElement, DropdownListBoxProps>((props, ref) => {
  const [availableHeight, setAvailableHeight] = useState(window.innerHeight);
  const width = useRef<number | null>(0);

  const updateSize = useCallback(() => {
    const anchorRect = props.anchor?.getBoundingClientRect();
    if (anchorRect) {
      const newAvailableHeight = Math.min(window.innerHeight - anchorRect.bottom - 10, 300);
      setAvailableHeight(newAvailableHeight);
      width.current = anchorRect.width;
    }
  }, [props.anchor]);

  useEffect(() => {
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, [updateSize]);

  return (
    <Wrapper
      role="listbox"
      ref={ref}
      style={{
        maxHeight: availableHeight ? `${availableHeight}px` : '300px',
        width: width.current || 0,
      }}
      availableHeight={availableHeight}
    >
      {props.children}
    </Wrapper>
  );
});

export { DropdownListBox, DropdownListBoxProps };
