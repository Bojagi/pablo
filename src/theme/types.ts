import { Colors } from './colors';
import { GetSpacingFn, Spacing } from './spacing';

export interface PabloTheme {
  spacing: Spacing;
  getSpacing: GetSpacingFn;
  colors: Colors;
}
