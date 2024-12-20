import type * as CSS from 'csstype';
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

export type ComponentPathResolverFn<P extends object> = (props: P) => string;

export type ComponentPath<P extends object> = (string | ComponentPathResolverFn<P>)[];

type Primitive = string | number | symbol | boolean | Date | null;

type D<P extends string, C extends string> = string & (P extends '' ? P : C);

type Next<N extends number = 0> = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, any][N];

export type KeyMap<
  T extends { [key: string]: any },
  SKIP = never,
  C extends string = '.',
  PX extends string = '',
  I extends number = 0,
  // @ts-expect-error could be infinite, but needs to be used with care
> = keyof {
  [P in keyof T as T[P] extends Primitive | SKIP | I
    ? `${PX}${D<PX, C>}${string & P}`
    :
        | `${PX}${D<PX, C>}${string & P}`
        | KeyMap<T[P], SKIP, C, `${PX}${D<PX, C>}${string & P}`, Next<I>>]: T[P];
};

export type CssColor =
  | CSS.DataType.NamedColor
  | `#${string}`
  | `rgba(${string})`
  | `rgb(${string})`;

export interface AsProp<C extends React.ElementType> {
  as?: C;
}

export type PolyProps<C extends React.ElementType, P = unknown> = AsProp<C> &
  Omit<React.ComponentPropsWithRef<C>, keyof AsProp<C>> &
  P;

export type PolyComponent<C extends React.ElementType, P = unknown> = <
  E extends React.ElementType = C,
>(
  props: PolyProps<E, P>
) => JSX.Element | null;
