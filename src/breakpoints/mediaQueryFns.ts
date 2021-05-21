import { BreakpointsArray } from '../theme/breakpoints';

export type MediaQueryFn = (breakpoints: BreakpointsArray, index: number) => string;

export const mediaQueryAbove: MediaQueryFn = (breakpoints, index) =>
  `only screen and (min-width: ${breakpoints[index]})`;

export const mediaQueryBelow: MediaQueryFn = (breakpoints, index) =>
  `only screen and (max-width: calc(${breakpoints[index]} - 1px))`;

export const mediaQueryOnly: MediaQueryFn = (breakpoints, index) => {
  if (index === breakpoints.length - 1) {
    return mediaQueryAbove(breakpoints, index);
  }

  return `only screen and (min-width: ${breakpoints[index]}) and (max-width: calc(${
    breakpoints[index + 1]
  } - 1px))`;
};
