import React, { MouseEventHandler, useRef, useState } from 'react';
import { LayoutBox, LayoutBoxProps } from '../Box';
import styled from '@emotion/styled';
import { useEventListener } from '../utils/useEventListener';
import { getComponentStyle, shadowTransformer } from '../styleHelpers';
import { componentPrimitive, getPrimitiveStyle } from '../styleHelpers/componentPrimitive';

interface SliderProps extends LayoutBoxProps {
  from: number;
  to: number;
  value: number;
  onChange: (value: number) => void;
}

const thickness = getPrimitiveStyle('thickness');
const borderRadius = getPrimitiveStyle('borderRadius');
const backgroundColor = getPrimitiveStyle('backgroundColor');

const Rail = componentPrimitive(['slider', 'rail'])`
  width: 100%;
  height: ${thickness};
  border-radius: ${borderRadius};
  background-color: ${backgroundColor};
`;

const Track = componentPrimitive(['slider', 'track'])`
  position: absolute;
  height: ${thickness};
  top: 50%;
  transform: translateY(-50%);
  border-radius: ${borderRadius};
  background-color: ${backgroundColor};
`;

const Thumb = componentPrimitive(['slider', 'thumb'])`
  width: ${getPrimitiveStyle('width')};
  height: ${getPrimitiveStyle('height')};
  border-radius: ${borderRadius};
  background-color: ${backgroundColor};
  box-shadow: ${getPrimitiveStyle('shadow', shadowTransformer)};
  position: absolute;
  top: 50%;
  transform: translateY(-50%) translateX(-50%);
  cursor: grab;
`;

const OuterBox = styled(LayoutBox)`
  width: 100%;
  height: ${getComponentStyle(['slider', 'thumb', 'height'])};
  position: relative;
  display: flex;
  align-items: center;
`;

const Slider = ({ from, to, value, onChange, ...props }: SliderProps) => {
  const offsetRef = useRef<number>(0);
  const railRef = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState(false);
  const ratio = Math.min(Math.max((value - from) / (to - from), 0), 1);
  const percentage = ratio * 100;

  useEventListener('mouseup', () => setDragging(false));
  useEventListener(
    'mousemove',
    (e: MouseEvent) => {
      if (dragging && railRef.current) {
        const { left, width } = railRef.current.getBoundingClientRect();
        const x = e.clientX - left + offsetRef.current;
        const ratio = x / width;
        const calculatedValue = from + ratio * (to - from);
        const newValue = Math.max(Math.min(calculatedValue, to), from);
        onChange(newValue);
      }
    },
    [dragging, onChange, from, to]
  );

  const handleThumbMouseDown: MouseEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    const target = e.target as HTMLDivElement;
    const boundingRect = target.getBoundingClientRect();
    offsetRef.current = boundingRect.left + boundingRect.width * 0.5 - e.clientX;

    setDragging(true);
  };

  return (
    <OuterBox {...props} role="slider">
      <Rail data-testid="slider-rail" ref={railRef} />
      <Track data-testid="slider-track" style={{ width: `${percentage}%` }} />
      <Thumb
        data-testid="slider-thumb"
        onMouseDown={handleThumbMouseDown}
        style={{ left: `${percentage}%` }}
      />
    </OuterBox>
  );
};

export { Slider };
