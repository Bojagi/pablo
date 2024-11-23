import React, { forwardRef } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { getComponentStyle, transitionTransformer } from '../styleHelpers/getComponentStyle';

import {
  BaseCheckable,
  BaseCheckableProps,
  CheckableBoxProps,
  CheckableHandleProps,
} from '../shared/BaseCheckable';
import { getCustomStyles } from '../utils/useCustomStyles';
import { baseStyle } from '../shared/baseStyle';

const radioBoxSize = (props) => css`
  calc(${getComponentStyle('radio.handleSize.{size}')(props)} + 2 * (${getComponentStyle(
    'radio.innerPadding.{size}'
  )(props)} + ${getComponentStyle('radio.borderWidth')(props)}px))
`;

const RadioBox = styled.div<CheckableBoxProps>`
  ${baseStyle}
  position: relative;
  width: ${radioBoxSize};
  height: ${radioBoxSize};
  border-radius: 50%;
  padding: ${getComponentStyle('radio.innerPadding.{size}')};
  background-color: ${getComponentStyle('radio.backgroundColor')};
  border: ${getComponentStyle('radio.borderWidth')}px solid
    ${getComponentStyle('radio.borderColor')};
  opacity: ${(props) => (props.disabled ? 0.3 : 1)};
  transition: ${getComponentStyle('radio.boxTransition', transitionTransformer)};

  ${(props) =>
    props.focus &&
    css`
      box-shadow: 0 0 0 ${getComponentStyle('radio.focus.outlineSize')(props)}
        ${getComponentStyle('radio.focus.outlineColor')(props)};
    `};
  }
  ${getCustomStyles('radio.styles', 'box')}
`;

const RadioHandle = styled.div<CheckableHandleProps>`
  ${baseStyle}
  width: ${getComponentStyle('radio.handleSize.{size}')};
  height: ${getComponentStyle('radio.handleSize.{size}')};
  transform: scale(${(props: any) => (props.checked ? 1 : 0)});
  border-radius: 50%;
  transition: ${getComponentStyle('radio.handleTransition', transitionTransformer)};
  background-color: ${getComponentStyle('radio.handleColor')};
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
