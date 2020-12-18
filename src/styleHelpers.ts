import { PabloThemeableProps } from "./theme";
import { Colors } from "./theme/colors";

type InterpolateFn<T> = (props: PabloThemeableProps) => T;

export type GetSpacingFn = 
  | ((multiplier: number, suffix?: string) => InterpolateFn<string>)
  | ((multiplier: number) => InterpolateFn<string>) 
  | ((multiplier: number, suffix?: false) => InterpolateFn<number>);

export const getSpacing: GetSpacingFn = (multiplier: number, suffix: string = 'px') => 
  ({theme}: PabloThemeableProps) => {
    const spacing = theme.getSpacing(multiplier);
    return (suffix ? `${spacing}${suffix}` : spacing) as any;
  }

export const getColor = (name: keyof Colors, variant: string = 'main') =>
  ({theme}: PabloThemeableProps) => {
    return theme.colors[name][variant];
  }

export const getComponentStyle = (path: string) => {
  return ({theme, ...props}) => {
    const interpolatedPath = path.replace(/\{(.*?)\}/g, (_, val) => props[val] || val);
    const value = interpolatedPath.split('.').reduce((acc, key) => acc[key] || {}, theme.componentStyles || {});
    if (typeof value === 'function') { 
      return value({theme});
    }

    return value;
  }
}
