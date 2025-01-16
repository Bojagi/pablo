import styled from '@emotion/styled';
import { color, ColorProps } from './interpolations/color';
import { CssFunctionReturn } from '../types';
import { baseStyle } from '../shared/baseStyle';
import { interpolateCssProp } from '../utils/interpolateCssProp';
import { margin, padding, SpacingProps } from './interpolations/spacing';
import { layout, LayoutProps } from './interpolations/layout';
import { svg, SvgProps } from './interpolations/svg';
import { position, PositionProps } from './interpolations/position';
import { flexItem, FlexItemProps } from './interpolations/flex';
import { shape, ShapeProps } from './interpolations/shape';
import { splitProps } from '../utils/splitProps';

export interface BoxCssProps {
  css?: CssFunctionReturn;
}

export type BoxProps = SpacingProps &
  ColorProps &
  LayoutProps &
  FlexItemProps &
  PositionProps &
  SvgProps &
  ShapeProps &
  BoxCssProps;

export const boxInterpolateFn = (props) =>
  [margin, padding, color, shape, layout, svg, position, flexItem].map((fn) => fn(props));

export const boxPropNames = [
  ...margin.propNames,
  ...padding.propNames,
  ...color.propNames,
  ...shape.propNames,
  ...layout.propNames,
  ...svg.propNames,
  ...position.propNames,
  ...flexItem.propNames,
];

export const useBoxProps = (props: Record<string, any>) => {
  console.log('boxPropNames', boxPropNames);

  return splitProps(props, boxPropNames);
};

export const Box = styled.div<BoxProps>`
  ${baseStyle}
  ${interpolateCssProp}
  ${(props) => props.css}
  ${boxInterpolateFn}
`;

export type LayoutBoxProps = SpacingProps &
  FlexItemProps &
  LayoutProps &
  PositionProps &
  BoxCssProps;

export const layoutInterpolationFn = (props) =>
  [margin, padding, layout, position, flexItem]
    .map((fn) => fn(props))
    .reduce((acc, styles) => ({ ...acc, ...styles }), {});

export const LayoutBox = styled.div<LayoutBoxProps>`
  ${baseStyle}
  ${layoutInterpolationFn}
`;
