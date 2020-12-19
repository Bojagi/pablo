import { Colors } from './colors';
import { Spacing } from './spacing';
import { CSSObject, FlattenInterpolation, FlattenSimpleInterpolation, InterpolationFunction } from 'styled-components';

export type Style = string | CSSObject | FlattenInterpolation<any> | FlattenSimpleInterpolation | InterpolationFunction<any>;
export interface PabloTheme {
  spacing: Spacing;
  colors: Colors;
}
