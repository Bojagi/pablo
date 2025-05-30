import { Breakpoint, Breakpoints } from '../theme/breakpoints';

export type MediaQueryFn = (breakpointName: Breakpoint, breakpoints: Breakpoints) => string;
export const mediaQueryAbove: MediaQueryFn = (breakpointName, breakpoints) => {
  const bp = breakpoints.get(breakpointName);
  return `only screen and (min-width: ${bp}px)`;
};

export const mediaQueryBelow: MediaQueryFn = (breakpointName, breakpoints) => {
  const bp = breakpoints.get(breakpointName) || 0;
  return `only screen and (max-width: ${bp - 1}px)`;
};

export const mediaQueryOnly: MediaQueryFn = (breakpointName, breakpoints) => {
  const allBreakpoints = Array.from(breakpoints.entries());
  const index = allBreakpoints.findIndex(([bp]) => bp === breakpointName);
  if (index === allBreakpoints.length - 1) {
    return mediaQueryAbove(breakpointName, breakpoints);
  }

  const lowerBound = breakpoints.get(breakpointName) || 0;
  const upperBound = breakpoints.get(allBreakpoints[index + 1][0]) || 0;
  return `only screen and (min-width: ${lowerBound}px) and (max-width: ${upperBound - 1}px)`;
};
