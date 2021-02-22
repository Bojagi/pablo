import styled, { FlattenInterpolation, FlattenSimpleInterpolation } from 'styled-components';
import { space } from '@styled-system/space';
import { layout } from '@styled-system/layout';
import { flexbox } from '@styled-system/flexbox';
import { position } from '@styled-system/position';
import { border } from '@styled-system/border';
import { system } from '@styled-system/core';

import {
  SpaceProps,
  LayoutProps,
  FlexboxProps,
  PositionProps,
  BorderProps,
  // Just the types, so exclude from eslint
  // eslint-disable-next-line import/no-extraneous-dependencies
} from 'styled-system';
import { color, ColorProps } from './color';

export interface BoxCssProps<T> {
  css?: FlattenInterpolation<T> | FlattenSimpleInterpolation;
}

export interface BoxFillableProps {
  fillColor?: string;
}

export type BoxProps = SpaceProps &
  ColorProps &
  LayoutProps &
  BorderProps &
  FlexboxProps &
  PositionProps &
  BoxFillableProps &
  BoxCssProps<BoxProps>;

export const boxInterpolateFn = (props) =>
  [space, color, layout, border, flexbox, position].map((fn) => fn(props));

export const Box = styled.div<BoxProps>`
  ${(props: BoxProps) => props.css}
  ${system({
    fillColor: {
      property: 'fill',
      scale: 'colors',
    },
  })}
  ${boxInterpolateFn}
`;

export type LayoutBoxProps = SpaceProps &
  FlexboxProps &
  LayoutProps &
  PositionProps &
  BoxCssProps<LayoutBoxProps>;

export const layoutInterpolationFn = (props) =>
  [space, layout, flexbox, position].map((fn) => fn(props));

export const LayoutBox = styled.div<LayoutBoxProps>`
  ${layoutInterpolationFn}
`;

export type FlexProps = LayoutBoxProps;

export const Flex = styled.div<FlexProps>`
  display: flex;
  ${layoutInterpolationFn}
`;
