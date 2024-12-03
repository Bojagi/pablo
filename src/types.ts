import { ComponentStyles, PabloThemeableProps, Style } from './theme/types';

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

export type ComponentPathResolverFn<P extends object> = (props: P) => string;

export type NonArrayObject = object & { length?: never };

type PathTuple<T> =
  T extends Record<string, any>
    ? {
        [K in keyof T]: T[K] extends NonArrayObject ? [K, ...PathTuple<T[K]>] : [K];
      }[keyof T]
    : [];

export type ComponentPath = PathTuple<ComponentStyles>;
