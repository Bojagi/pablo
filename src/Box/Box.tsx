import styled from '@emotion/styled';
import { color, ColorProps } from './interpolations/color';
import { CssFunctionReturn } from '../types';
import { baseStyle } from '../shared/baseStyle';
import { interpolateCssProp } from '../utils/interpolateCssProp';
import { margin, MarginProps, PaddingProps, padding } from './interpolations/spacing';
import { layout, LayoutProps } from './interpolations/layout';
import { svg, SvgProps } from './interpolations/svg';
import { position, PositionProps } from './interpolations/position';
import { flexItem, FlexItemProps } from './interpolations/flex';

export interface BoxCssProps {
  css?: CssFunctionReturn;
}

export type BoxProps = MarginProps &
  PaddingProps &
  ColorProps &
  LayoutProps &
  FlexItemProps &
  PositionProps &
  SvgProps &
  BoxCssProps;

export const boxInterpolateFn = (props) =>
  [margin, padding, color, layout, svg, position, flexItem].map((fn) => fn(props));

export const Box = styled.div<BoxProps>`
  ${baseStyle}
  ${interpolateCssProp}
  ${(props) => props.css}
  ${boxInterpolateFn}
`;

export type LayoutBoxProps = MarginProps &
  PaddingProps &
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
