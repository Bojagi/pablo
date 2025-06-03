import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import { Box, LayoutBoxProps } from '../Box';
import { borderRadiusTransform } from '../Box/interpolations/shape';
import { getComponentStyle } from '../styleHelpers';

interface WrapperProps extends LayoutBoxProps {
  availableHeight?: number;
}

const Wrapper = styled(Box)<WrapperProps>`
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

interface AutocompleteBoxProps extends LayoutBoxProps {
  children: React.ReactNode;
  anchor: HTMLElement | null;
}

const AutocompleteBox = (props: AutocompleteBoxProps) => {
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
      style={{
        maxHeight: availableHeight ? `${availableHeight}px` : '300px',
        width: width.current || 0,
      }}
      availableHeight={availableHeight}
    >
      {props.children}
    </Wrapper>
  );
};

export { AutocompleteBox, AutocompleteBoxProps };
