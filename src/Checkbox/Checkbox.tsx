import React, { forwardRef } from 'react';
import styled, { css } from 'styled-components';
import { getComponentStyle, transitionTransformer } from '../styleHelpers/getComponentStyle';
import {
  BaseCheckable,
  BaseCheckableProps,
  CheckableBoxProps,
  CheckableHandleProps,
} from '../shared/BaseCheckable';
import { getCustomStyles } from '../utils/useCustomStyles';
import { baseStyle } from '../shared/baseStyle';

const checkboxSize = css`
  calc(${getComponentStyle('checkbox.handleSize.{size}')} + 2 * (${getComponentStyle(
  'checkbox.innerPadding.{size}'
)} + ${getComponentStyle('checkbox.borderWidth')}px))
`;

const CheckboxBox = styled.div<CheckableBoxProps>`
  ${baseStyle}
  position: relative;
  width: ${checkboxSize};
  height: ${checkboxSize};
  border-radius: ${getComponentStyle('checkbox.outerBorderRadius')};
  padding: ${getComponentStyle('checkbox.innerPadding.{size}')};
  background-color: ${getComponentStyle('checkbox.backgroundColor')};
  border: ${getComponentStyle('checkbox.borderWidth')}px solid
    ${getComponentStyle('checkbox.borderColor')};
  opacity: ${(props) => (props.disabled ? 0.3 : 1)};

  transition: ${getComponentStyle('checkbox.boxTransition', transitionTransformer)};

  ${(props) =>
    props.focus &&
    css`
      box-shadow: 0 0 0 ${getComponentStyle('checkbox.focus.outlineSize')}
        ${getComponentStyle('checkbox.focus.outlineColor')};
    `};
  }
  ${getCustomStyles('checkbox.styles', 'box')}
`;

const CheckboxHandle = styled.div<CheckableHandleProps>`
  ${baseStyle}
  width: ${getComponentStyle('checkbox.handleSize.{size}')};
  height: ${getComponentStyle('checkbox.handleSize.{size}')};
  transform: scale(${(props: any) => (props.checked ? 1 : 0)});
  border-radius: ${getComponentStyle('checkbox.innerBorderRadius')};
  transition: ${getComponentStyle('checkbox.handleTransition')};
  background-color: ${getComponentStyle('checkbox.handleColor')};
  ${getCustomStyles('checkbox.styles', 'handle')}
`;

export interface CheckboxProps extends BaseCheckableProps {}

export const Checkbox = forwardRef<HTMLDivElement, CheckboxProps>((props, ref) => (
  <BaseCheckable
    ref={ref}
    componentName="checkbox"
    componentType="checkbox"
    componentBox={CheckboxBox}
    componentHandle={CheckboxHandle}
    {...props}
  />
));
