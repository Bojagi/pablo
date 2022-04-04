import { BreakpointsArray } from '../theme/breakpoints';

export type MediaQueryFn = (
  breakpoint: string,
  breakpoints: BreakpointsArray,
  index: number
) => string;

export const mediaQueryAbove: MediaQueryFn = (breakpoint) =>
  `only screen and (min-width: ${breakpoint})`;

export const mediaQueryBelow: MediaQueryFn = (breakpoint) =>
  `only screen and (max-width: calc(${breakpoint} - 1px))`;

export const mediaQueryOnly: MediaQueryFn = (breakpoint, breakpoints, index) => {
  if (index === breakpoints.length - 1) {
    return mediaQueryAbove(breakpoint, breakpoints, index);
  }

  return `only screen and (min-width: ${breakpoints[index]}) and (max-width: calc(${
    breakpoints[index + 1]
  } - 1px))`;
};
