import styled from 'styled-components';

import { borderInterpolateFn, BoxBorderProps } from './border';
import { colorInterpolateFn, BoxColorProps } from './color';
import { displayInterpolateFn, BoxDisplayProps } from './display';
import { BoxFlexProps, flexInterpolateFn } from './flex';
import {
  BoxMarginProps,
  BoxPaddingProps,
  marginInterpolateFn,
  paddingInterpolateFn,
} from './spacing';

export * from './border';
export * from './color';
export * from './spacing';
export * from './flex';

export type BoxProps = BoxMarginProps &
  BoxPaddingProps &
  BoxDisplayProps &
  BoxColorProps &
  BoxBorderProps &
  BoxFlexProps;

export const boxInterpolateFn = (props) =>
  [
    displayInterpolateFn,
    marginInterpolateFn,
    paddingInterpolateFn,
    colorInterpolateFn,
    borderInterpolateFn,
    flexInterpolateFn,
  ].map((fn) => fn(props));

export const Box = styled.div<BoxProps>`
  ${boxInterpolateFn}
`;
