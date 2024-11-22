import styled from 'styled-components';
import { space } from '@styled-system/space';
import { layout } from '@styled-system/layout';
import { flexbox } from '@styled-system/flexbox';
import { position } from '@styled-system/position';
import { border } from '@styled-system/border';
import type {
  SpaceProps,
  LayoutProps,
  FlexboxProps,
  PositionProps,
  BorderProps,
} from 'styled-system';
import { system } from '@styled-system/core';

import { color, ColorProps } from './color';
import { CssFunctionReturn } from '../types';
import { baseStyle } from '../shared/baseStyle';
import { getByPath } from '../utils/getByPath';
import { themeVars } from '../theme/themeVars';

export interface BoxCssProps {
  css?: CssFunctionReturn;
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
  BoxCssProps;

export const boxInterpolateFn = (props) =>
  [space, color, layout, border, flexbox, position].map((fn) => fn(props));

export const Box = styled.div<BoxProps>`
  ${baseStyle}
  ${(props: BoxProps) => props.css}
  ${system({
    fillColor: {
      property: 'fill',
      transform: (value: string) => getByPath(themeVars.colors, value),
    },
  })}
  ${boxInterpolateFn}
`;

export type LayoutBoxProps = SpaceProps & FlexboxProps & LayoutProps & PositionProps & BoxCssProps;

export const layoutInterpolationFn = (props) =>
  [space, layout, flexbox, position]
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
