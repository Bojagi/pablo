// import { Interpolation, ExecutionContext } from 'styled-components';
// import { PabloTheme } from './theme/types';

export type SingleOrArray<T> = T | T[];

export type CssFunctionReturn = any; // Interpolation<ExecutionContext & PabloTheme>;

export type CustomStyles<StyleKeys extends string> = Partial<Record<StyleKeys, CssFunctionReturn>>;

export interface BaseStyles<StyleKeys extends string> {
  styles?: CustomStyles<StyleKeys>;
}

export interface BaseProps<StyleKeys extends string> {
  customStyles?: CustomStyles<StyleKeys>;
}
