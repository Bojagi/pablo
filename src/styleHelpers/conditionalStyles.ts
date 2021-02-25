import { FlattenInterpolation, ThemedStyledProps } from 'styled-components';
import { PabloThemeableProps, PabloTheme } from '../theme/types';

export function conditionalStyles<P extends Record<string, any>, PK extends keyof P = keyof P>(
  propKey: PK,
  styleMap: Record<P[PK], FlattenInterpolation<ThemedStyledProps<P, PabloTheme>>>
) {
  return (props: P & PabloThemeableProps): FlattenInterpolation<ThemedStyledProps<P, PabloTheme>> =>
    styleMap[props[propKey]];
}
