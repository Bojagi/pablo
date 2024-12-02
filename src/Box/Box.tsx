import styled from '@emotion/styled';
import { layout } from '@styled-system/layout';
import { flexbox } from '@styled-system/flexbox';
import { position } from '@styled-system/position';
import type { LayoutProps, FlexboxProps, PositionProps } from 'styled-system';
import { system } from '@styled-system/core';

import { color, ColorProps } from './color';
import { CssFunctionReturn } from '../types';
import { baseStyle } from '../shared/baseStyle';
import { getByPath } from '../utils/getByPath';
import { themeVars } from '../theme/themeVars';
import { interpolateCssProp } from '../utils/interpolateCssProp';
import { margin, MarginProps, PaddingProps, padding } from './spacingInterpolation';
import { ifProp } from '../styleHelpers/styleProp';

export interface BoxCssProps {
  css?: CssFunctionReturn;
}

export interface BoxFillableProps {
  fillColor?: string;
}

export interface BoxFlexProps extends FlexboxProps {
  grow?: number | boolean;
  shrink?: number | boolean;
}

export type BoxProps = MarginProps &
  PaddingProps &
  ColorProps &
  LayoutProps &
  BoxFlexProps &
  PositionProps &
  BoxFillableProps &
  BoxCssProps;

const flexGrow = ifProp('grow', (_, value) => `flex-grow: ${value};`);
const flexShrink = ifProp('shrink', (_, value) => `flex-shrink: ${value};`);
export const boxInterpolateFn = (props) =>
  [margin, padding, color, layout, flexbox, position, flexGrow, flexShrink].map((fn) => fn(props));

const fill = system({
  fillColor: {
    property: 'fill',
    transform: (value: string) => getByPath(themeVars.colors, value),
  },
});

export const Box = styled.div<BoxProps>`
  ${baseStyle}
  ${interpolateCssProp}
  ${fill}
  ${(props) => props.css}
  ${boxInterpolateFn}
`;

export type LayoutBoxProps = MarginProps &
  PaddingProps &
  BoxFlexProps &
  LayoutProps &
  PositionProps &
  BoxCssProps;

export const layoutInterpolationFn = (props) =>
  [margin, padding, layout, flexbox, position, flexGrow, flexShrink]
    .map((fn) => fn(props))
    .reduce((acc, styles) => ({ ...acc, ...styles }), {});

export const LayoutBox = styled.div<LayoutBoxProps>`
  ${baseStyle}
  ${layoutInterpolationFn}
`;
