import React, { forwardRef } from 'react';
import styled, { css } from 'styled-components';
import { getComponentStyle, transitionTransformer } from '../styleHelpers/getComponentStyle';
import {
  BaseCheckable,
  BaseCheckableProps,
  CheckableBoxProps,
  CheckableHandleProps,
} from '../BaseCheckable/BaseCheckable';
import { getCustomStyles } from '../utils/useCustomStyles';

const SwitchBox = styled.div<CheckableBoxProps>`
  position: relative;
  width: calc(2 * ${(props) => getComponentStyle('switch.handleSize.{size}')(props)});
  height: ${(props) => getComponentStyle('switch.handleSize.{size}')(props)};
  border-radius: calc(
    (
        ${(props) => getComponentStyle('switch.handleSize.{size}')(props)} + 2 *
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
      box-shadow: 0 0 0 ${getComponentStyle('switch.focus.outlineSize')}
        ${getComponentStyle('switch.focus.outlineColor')};
    `};
  }
  ${getCustomStyles('switch.styles', 'box')}
`;

const SwitchHandle = styled.div<CheckableHandleProps>`
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

export interface SwitchProps extends BaseCheckableProps {}

export const Switch = forwardRef<HTMLDivElement, SwitchProps>((props, ref) => (
  <BaseCheckable
    ref={ref}
    componentName="switch"
    componentType="checkbox"
    componentBox={SwitchBox}
    componentHandle={SwitchHandle}
    {...props}
  />
));
