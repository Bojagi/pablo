import { Breakpoint, Breakpoints } from '../theme/breakpoints';

export type MediaQueryFn = (breakpointName: Breakpoint, breakpoints: Breakpoints) => string;
export const mediaQueryAbove: MediaQueryFn = (breakpointName, breakpoints) => {
  const value = breakpoints.get(breakpointName);
  return `only screen and (min-width: ${value})`;
};

export const mediaQueryBelow: MediaQueryFn = (breakpointName, breakpoints) => {
  const value = breakpoints.get(breakpointName);
  return `only screen and (max-width: calc(${value} - 1px))`;
};

export const mediaQueryOnly: MediaQueryFn = (breakpointName, breakpoints) => {
  const allBreakpoints = Array.from(breakpoints.entries());
  const index = allBreakpoints.findIndex(([bp]) => bp === breakpointName);
  if (index === allBreakpoints.length - 1) {
    return mediaQueryAbove(breakpointName, breakpoints);
  }

  return `only screen and (min-width: ${allBreakpoints[index][1]}) and (max-width: calc(${
    allBreakpoints[index + 1][1]
  } - 1px))`;
};
