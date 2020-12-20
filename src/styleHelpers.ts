import { PabloThemeableProps } from './theme';
import { Colors } from './theme/colors';

export type InterpolateFn<T> = (props: PabloThemeableProps) => T;

export type GetSpacingFn =
  | ((multiplier: number, suffix?: string) => InterpolateFn<string>)
  | ((multiplier: number) => InterpolateFn<string>)
  | ((multiplier: number, suffix?: false) => InterpolateFn<number>);

export const getSpacing: GetSpacingFn = (multiplier: number, suffix: string = 'px') => ({
  theme,
}: PabloThemeableProps) => {
  const spacing = theme.spacing.unit * multiplier;
  return (suffix ? `${spacing}${suffix}` : spacing) as any;
};

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
