import isObject from 'isobject';
import { breakpointVars } from './breakpoints';
import { colorVars } from './colors';
import { typographyVars } from './typography';

export const themeVarNames = {
  typography: typographyVars,
  colors: colorVars,
  breakpoints: breakpointVars,
};

function createThemeReferences<T extends Record<string, any>>(obj: T): T {
  return Object.entries(obj).reduce(
    (acc, [key, value]) => ({
      ...acc,
      [key]: isObject(value) ? createThemeReferences(value as T) : `var(--${value})`,
    }),
    {} as any
  );
}

export const themeVars = createThemeReferences(themeVarNames);
