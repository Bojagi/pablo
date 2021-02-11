import {
  CSSObject,
  FlattenInterpolation,
  FlattenSimpleInterpolation,
  InterpolationFunction,
} from 'styled-components';
import { Colors } from './colors';
import { Spacing } from './spacing';
import { Typography } from './typography';

export type Style =
  | string
  | CSSObject
  | FlattenInterpolation<any>
  | FlattenSimpleInterpolation
  | InterpolationFunction<any>;
export interface PabloTheme {
  spacing: Spacing;
  colors: Colors;
  typography: Typography;
}
