import { PabloThemeableProps, Style } from './theme/types';

export type SingleOrArray<T> = T | T[];

export type CssFunctionReturn<P = PabloThemeableProps> =
  | Style<P & PabloThemeableProps>
  | Style<P & PabloThemeableProps>[];

export type CustomStyles<StyleKeys extends string> = Partial<Record<StyleKeys, CssFunctionReturn>>;

export interface BaseStyles<StyleKeys extends string> {
  styles?: CustomStyles<StyleKeys>;
}

export interface BaseProps<StyleKeys extends string> {
  customStyles?: CustomStyles<StyleKeys>;
}
