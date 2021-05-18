import { BreakpointsArray } from '../theme/breakpoints';

export type MediaQueryFn = (breakpoints: BreakpointsArray, index: number) => string;

export const mediaQueryAbove: MediaQueryFn = (breakpoints, index) =>
  `only screen and (min-width: ${breakpoints[index]}px)`;

export const mediaQueryBelow: MediaQueryFn = (breakpoints, index) =>
  `only screen and (max-width: ${breakpoints[index] - 1}px)`;

export const mediaQueryOnly: MediaQueryFn = (breakpoints, index) => {
  if (index === breakpoints.length - 1) {
    return mediaQueryAbove(breakpoints, index);
  }

  return `only screen and (min-width: ${breakpoints[index]}px) and (max-width: ${
    breakpoints[index + 1] - 1
  }px)`;
};
