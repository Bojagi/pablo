import { FlattenInterpolation, SimpleInterpolation, ThemedStyledProps } from 'styled-components';
import { PabloTheme } from './theme/types';

export type SingleOrArray<T> = T | T[];

export type CssFunctionReturn = SingleOrArray<
  FlattenInterpolation<ThemedStyledProps<{}, PabloTheme>> | SimpleInterpolation
>;

export type CustomStyles<StyleKeys extends string> = Partial<Record<StyleKeys, CssFunctionReturn>>;

export interface BaseStyles<StyleKeys extends string> {
  styles?: CustomStyles<StyleKeys>;
}

export interface BaseProps<StyleKeys extends string> {
  customStyles?: CustomStyles<StyleKeys>;
}
