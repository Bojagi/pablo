import styled from '@emotion/styled';
import { layout } from '@styled-system/layout';
import { flexbox } from '@styled-system/flexbox';
import { position } from '@styled-system/position';
import type { LayoutProps, FlexboxProps, PositionProps, PaddingProps } from 'styled-system';
import { system } from '@styled-system/core';

import { color, ColorProps } from './color';
import { CssFunctionReturn } from '../types';
import { baseStyle } from '../shared/baseStyle';
import { getByPath } from '../utils/getByPath';
import { themeVars } from '../theme/themeVars';
import { interpolateCssProp } from '../utils/interpolateCssProp';
import { margin, MarginProps, padding } from './spacingInterpolation';

export interface BoxCssProps {
  css?: CssFunctionReturn;
}

export interface BoxFillableProps {
  fillColor?: string;
}

export interface BoxCenterFlexProps {
  centerFlex?: boolean;
}

export type BoxProps = MarginProps &
  PaddingProps &
  ColorProps &
  LayoutProps &
  FlexboxProps &
  BoxCenterFlexProps &
  PositionProps &
  BoxFillableProps &
  BoxCssProps;

export const boxInterpolateFn = (props) =>
  [margin, padding, color, layout, flexbox, position].map((fn) => fn(props));

export const Box = styled.div<BoxProps>`
  ${baseStyle}
  ${interpolateCssProp}
  ${system({
    fillColor: {
      property: 'fill',
      transform: (value: string) => getByPath(themeVars.colors, value),
    },
  })}
  ${(props) =>
    props.centerFlex ? 'display: flex; justify-content: center; align-items: center;' : ''}
  ${boxInterpolateFn}
`;

export type LayoutBoxProps = MarginProps &
  PaddingProps &
  FlexboxProps &
  LayoutProps &
  PositionProps &
  BoxCssProps;

export const layoutInterpolationFn = (props) =>
  [margin, padding, layout, flexbox, position]
    .map((fn) => fn(props))
    .reduce((acc, styles) => ({ ...acc, ...styles }), {});

export const LayoutBox = styled.div<LayoutBoxProps>`
  ${baseStyle}
  ${layoutInterpolationFn}
`;

export type FlexProps = LayoutBoxProps;

export const Flex = styled.div<FlexProps>`
  ${baseStyle}
  display: flex;
  ${layoutInterpolationFn}
`;
