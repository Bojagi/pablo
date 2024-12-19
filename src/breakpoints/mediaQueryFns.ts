import { themeVars } from '../theme';
import { Breakpoint, Breakpoints } from '../theme/breakpoints';

export type MediaQueryFn = (breakpointName: Breakpoint, breakpoints: Breakpoints) => string;
export const mediaQueryAbove: MediaQueryFn = (breakpointName) => {
  const varName = themeVars.breakpoints[breakpointName];
  return `only screen and (min-width: ${varName})`;
};

export const mediaQueryBelow: MediaQueryFn = (breakpointName) => {
  const varName = themeVars.breakpoints[breakpointName];
  return `only screen and (max-width: calc(${varName} - 1px))`;
};

export const mediaQueryOnly: MediaQueryFn = (breakpointName, breakpoints) => {
  const allBreakpoints = Array.from(breakpoints.entries());
  const index = allBreakpoints.findIndex(([bp]) => bp === breakpointName);
  if (index === allBreakpoints.length - 1) {
    return mediaQueryAbove(breakpointName, breakpoints);
  }

  const lowerVarName = themeVars.breakpoints[breakpointName];
  const upperVarName = themeVars.breakpoints[allBreakpoints[index + 1][0]];
  return `only screen and (min-width: ${lowerVarName}) and (max-width: calc(${
    upperVarName
  } - 1px))`;
};
