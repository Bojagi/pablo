import { FlattenInterpolation, ThemedStyledProps } from 'styled-components';
import { PabloThemeableProps } from './theme';
import { Colors } from './theme/colors';
import { PabloTheme } from './theme/types';

export type InterpolateFn<T> = (props: PabloThemeableProps) => T;

/* eslint-disable no-redeclare */
export function getSpacing(multiplier: number): InterpolateFn<string>;
export function getSpacing(multiplier: number, suffix: string): InterpolateFn<string>;
export function getSpacing(multiplier: number, suffix: false): InterpolateFn<number>;
export function getSpacing(multiplier: any, suffix: any = 'px'): any {
  return ({ theme }: PabloThemeableProps) => {
    const spacing = theme.spacing.unit * multiplier;
    console.log('spacing', spacing);

    return (suffix !== false ? `${spacing}${suffix}` : spacing) as any;
  };
}
/* eslint-enable no-redeclare */

export const getColor = (name: keyof Colors, variant: string = 'main') => ({
  theme,
}: PabloThemeableProps) => theme.colors[name][variant];

export const getComponentStyle = (
  path: string,
  transformFn: (value: unknown) => string | number = (v) => v as string
) => ({ theme, ...props }) => {
  const interpolatedPath = path.replace(/\{(.*?)\}/g, (_, val) => props[val] || val);
  const value = interpolatedPath
    .split('.')
    .reduce((acc, key) => acc[key] || {}, theme.componentStyles || {});
  if (typeof value === 'function') {
    return transformFn(value({ theme }));
  }

  return transformFn(value);
};

export const transitionTransformer = (transitions: string[][]) =>
  transitions.map((param) => param.join(' ')).join(', ');

export const shadowTransformer = (shadows: string[]) => shadows.join(', ');

export function conditionalStyles<P extends Record<string, any>, PK extends keyof P = keyof P>(
  propKey: PK,
  styleMap: Record<P[PK], FlattenInterpolation<ThemedStyledProps<P, PabloTheme>>>
) {
  return (props: P & PabloThemeableProps): FlattenInterpolation<ThemedStyledProps<P, PabloTheme>> =>
    styleMap[props[propKey]];
}

export const getComponentStyleByProp = <P extends Record<string, any>>(
  propKey: keyof P,
  prefix: string = ''
) => (props: ThemedStyledProps<P, PabloTheme>) =>
  getComponentStyle(((prefix + props[propKey]) as unknown) as string)(props);
