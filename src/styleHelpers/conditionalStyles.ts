import type { Interpolation, ExecutionContext } from 'styled-components';
import { PabloThemeableProps, PabloTheme } from '../theme/types';

export function conditionalStyles<P extends Record<string, any>, PK extends keyof P = keyof P>(
  propKey: PK,
  styleMap: Record<P[PK], Interpolation<P & Partial<ExecutionContext> & PabloTheme>>
) {
  return (props: P & PabloThemeableProps): Interpolation<P & ExecutionContext & PabloTheme> =>
    styleMap[props[propKey]];
}
