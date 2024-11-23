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

const switchBoxSize = (multiplier) => (props) => css`
  calc(${multiplier} * ${getComponentStyle('switch.handleSize.{size}')(props)} + 2 * (${getComponentStyle(
    'switch.innerPadding.{size}'
  )(props)} + ${getComponentStyle('switch.borderWidth')(props)}px))
`;

const SwitchBox = styled.div<CheckableBoxProps>`
  ${baseStyle}
  position: relative;
  width: ${switchBoxSize(2)};
  height: ${switchBoxSize(1)};
  border-radius: calc(
    (
        ${getComponentStyle('switch.handleSize.{size}')} + 2 *
          ${getComponentStyle('switch.innerPadding.{size}')} + 2 *
          ${getComponentStyle('switch.borderWidth')}px
      ) * 0.5
  );
  padding: ${getComponentStyle('switch.innerPadding.{size}')};
  background-color: ${getComponentStyle('switch.backgroundColor')};
  border: ${getComponentStyle('switch.borderWidth')}px solid
    ${getComponentStyle('switch.borderColor')};
  opacity: ${(props) => (props.disabled ? 0.3 : 1)};

  transition: ${getComponentStyle('switch.boxTransition', transitionTransformer)};

  ${(props) =>
    props.focus &&
    css`
      box-shadow: 0 0 0 ${getComponentStyle('switch.focus.outlineSize')(props)}
        ${getComponentStyle('switch.focus.outlineColor')(props)};
    `};
  }
  ${getCustomStyles('switch.styles', 'box')}
`;

const SwitchHandle = styled.div<CheckableHandleProps>`
  ${baseStyle}
  width: ${getComponentStyle('switch.handleSize.{size}')};
  height: ${getComponentStyle('switch.handleSize.{size}')};
  transform: translateX(
    ${(props: any) => (props.checked ? getComponentStyle('switch.handleSize.{size}')(props) : 0)}
  );
  border-radius: 50%;
  transition: ${getComponentStyle('switch.handleTransition', transitionTransformer)};
  background-color: ${(props) =>
    props.checked
      ? getComponentStyle('switch.handleColorChecked')(props)
      : getComponentStyle('switch.handleColorUnchecked')(props)};
  ${getCustomStyles('switch.styles', 'handle')}
`;

export type SwitchProps = BaseCheckableProps;

export const Switch = forwardRef<HTMLDivElement, SwitchProps>((props, ref) => (
  <BaseCheckable
    ref={ref}
    role="switch"
    componentName="switch"
    componentType="checkbox"
    componentBox={SwitchBox}
    componentHandle={SwitchHandle}
    {...props}
  />
));
