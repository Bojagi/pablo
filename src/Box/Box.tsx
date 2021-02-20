import styled from 'styled-components';

import { borderInterpolateFn, BoxBorderProps } from './border';
import { colorInterpolateFn, BoxColorProps } from './color';
import { displayInterpolateFn, BoxDisplayProps } from './display';
import { BoxFlexProps, flexInterpolateFn } from './flex';
import { BoxPositionProps, positionInterpolateFn } from './position';
import { BoxSizeProps, sizeInterpolateFn } from './size';
import {
  BoxMarginProps,
  BoxPaddingProps,
  marginInterpolateFn,
  paddingInterpolateFn,
} from './spacing';
import { BoxStyleProps, styleInterpolateFn } from './style';

export * from './border';
export * from './color';
export * from './spacing';
export * from './flex';

export type BoxProps = BoxMarginProps &
  BoxPaddingProps &
  BoxDisplayProps &
  BoxColorProps &
  BoxBorderProps &
  BoxFlexProps &
  BoxSizeProps &
  BoxStyleProps &
  BoxPositionProps;

export const boxInterpolateFn = (props) =>
  [
    displayInterpolateFn,
    marginInterpolateFn,
    paddingInterpolateFn,
    colorInterpolateFn,
    borderInterpolateFn,
    flexInterpolateFn,
    sizeInterpolateFn,
    styleInterpolateFn,
    positionInterpolateFn,
  ].map((fn) => fn(props));

export const Box = styled.div<BoxProps>`
  ${boxInterpolateFn}
`;
