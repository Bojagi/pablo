import { PabloThemeableProps } from '../theme/types';

export type InterpolateFn<T> = (props: PabloThemeableProps) => T;

export * from './getSpacing';
export * from './getComponentStyle';
export * from './conditionalStyles';
export * from './breakpoint';
