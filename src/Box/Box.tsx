import styled from '@emotion/styled';
import { layout } from '@styled-system/layout';
import { flexbox } from '@styled-system/flexbox';
import { position } from '@styled-system/position';
import type { LayoutProps, FlexboxProps, PositionProps } from 'styled-system';
import { system } from '@styled-system/core';
import type * as CSS from 'csstype';

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

export type FlexProps = LayoutBoxProps & {
  center?: boolean;
  equal?: boolean;
  end?: boolean;
  start?: boolean;
  between?: boolean;
  stretch?: boolean;
  direction?: CSS.Property.FlexDirection;
};

const justifyContent = (where: CSS.Property.JustifyContent) => `justify-content: ${where};`;

export const Flex = styled(Box)<FlexProps>`
  display: flex;
  ${ifProp('center', 'justify-content: center; align-items: center;')}
  ${ifProp('equal', '> * { flex-basis: 100%; flex-grow: 1; flex-shrink: 1; }')}
  ${ifProp('between', justifyContent('space-between'))}
  ${ifProp('end', justifyContent('flex-end'))}
  ${ifProp('start', justifyContent('flex-start'))}
  ${ifProp('stretch', 'align-items: stretch;')}
  ${ifProp('direction', (_, value) => `flex-direction: ${value};`)}
`;
