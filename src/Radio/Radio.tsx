import React, { forwardRef } from 'react';
import { transitionTransformer } from '../styleHelpers/getComponentStyle';

import {
  BaseCheckable,
  BaseCheckableProps,
  CheckableBoxProps,
  CheckableHandleProps,
} from '../shared/BaseCheckable';
import { getCustomStyles } from '../utils/useCustomStyles';
import { baseStyle } from '../shared/baseStyle';
import { componentPrimitive, getPrimitiveStyle } from '../styleHelpers';
import { ifProp } from '../styleHelpers/styleProp';
import { pabloCss } from '../styleHelpers/css';

const radioBoxSize = pabloCss<Required<CheckableBoxProps>>`
  calc(
    ${getPrimitiveStyle(['handleSize', (props) => props.size])} + 2 * (
    ${getPrimitiveStyle(['innerPadding', (props) => props.size])}
   + ${getPrimitiveStyle('borderWidth')}px))
`;

const RadioBox = componentPrimitive<Required<CheckableBoxProps>>(['radio'])`
  ${baseStyle}
  position: relative;
  width: ${radioBoxSize};
  height: ${radioBoxSize};
  border-radius: 50%;
  padding: ${getPrimitiveStyle(['innerPadding', (props) => props.size])};
  background-color: ${getPrimitiveStyle('backgroundColor')};
  border: ${getPrimitiveStyle('borderWidth')}px solid
    ${getPrimitiveStyle('borderColor')};
  opacity: ${(props) => (props.disabled ? 0.3 : 1)};
  transition: ${getPrimitiveStyle('boxTransition', transitionTransformer)};

  ${ifProp(
    'focus',
    pabloCss`
      box-shadow: 0 0 0 ${getPrimitiveStyle(['focus', 'outlineSize'])} ${getPrimitiveStyle(['focus', 'outlineColor'])};
    `
  )}
  ${getCustomStyles('radio.styles', 'box')}
`;

const RadioHandle = componentPrimitive<Required<CheckableHandleProps>>(['radio'])`
  ${baseStyle}
  width: ${getPrimitiveStyle(['handleSize', (props) => props.size])};
  height: ${getPrimitiveStyle(['handleSize', (props) => props.size])};
  transform: scale(${ifProp('checked', 1, 0)});
  border-radius: 50%;
  transition: ${getPrimitiveStyle('handleTransition', transitionTransformer)};
  background-color: ${getPrimitiveStyle('handleColor')};
  ${getCustomStyles('radio.styles', 'handle')}
`;

export interface RadioProps extends BaseCheckableProps {
  value: string;
}

export const Radio = forwardRef<HTMLDivElement, RadioProps>((props: RadioProps, ref) => (
  <BaseCheckable
    ref={ref}
    role="radio"
    componentName="radio"
    componentType="radio"
    componentBox={RadioBox}
    componentHandle={RadioHandle}
    {...props}
  />
));
