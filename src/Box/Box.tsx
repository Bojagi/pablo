import styled from "styled-components";

import { borderInterpolateFn, BoxBorderProps } from "./border";
import { colorInterpolateFn, BoxColorProps } from "./color";
import { displayInterpolateFn, BoxDisplayProps } from "./display";
import { BoxMarginProps, BoxPaddingProps, marginInterpolateFn, paddingInterpolateFn } from "./spacing";

export * from './border';
export * from './color';
export * from './spacing';

export type BoxProps = BoxMarginProps & BoxPaddingProps & BoxDisplayProps & BoxColorProps & BoxBorderProps;

export const boxInterpolateFn = (props) => [
  displayInterpolateFn,
  marginInterpolateFn,
  paddingInterpolateFn,
  colorInterpolateFn,
  borderInterpolateFn,
].map(fn => fn(props));

export const Box = styled.div<BoxProps>`${boxInterpolateFn}`;
