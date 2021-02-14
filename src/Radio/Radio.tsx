import React from 'react';
import styled, { css } from 'styled-components';
import { getComponentStyle, transitionTransformer } from '../utils/styleHelpers/getComponentStyle';
import { getSpacing } from '../utils/styleHelpers/getSpacing';
import {
  BaseCheckable,
  BaseCheckableProps,
  CheckableBoxProps,
  CheckableHandleProps,
} from '../BaseCheckable/BaseCheckable';

const RadioBox = styled.div<CheckableBoxProps>`
  position: relative;
  width: ${getComponentStyle('radio.handleSize.{size}')};
  height: ${getComponentStyle('radio.handleSize.{size}')};
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
      box-shadow: 0 0 0 ${getComponentStyle('radio.focus.outlineSize')}
        ${getComponentStyle('radio.focus.outlineColor')};
    `};
  }
`;

const RadioHandle = styled.div<CheckableHandleProps>`
  width: ${getComponentStyle('radio.handleSize.{size}')};
  height: ${getComponentStyle('radio.handleSize.{size}')};
  transform: scale(${(props: any) => (props.checked ? 1 : 0)});
  border-radius: 50%;
  transition: ${getComponentStyle('radio.handleTransition', transitionTransformer)};
  background-color: ${getComponentStyle('radio.handleColor')};
`;

export interface RadioProps extends BaseCheckableProps {
  value: string;
}

export const Radio = (props: RadioProps) => (
  <BaseCheckable
    componentName="radio"
    componentType="radio"
    componentBox={RadioBox}
    componentHandle={RadioHandle}
    {...props}
  />
);

getSpacing(2.25, false);
