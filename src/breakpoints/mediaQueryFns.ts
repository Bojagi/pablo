export type MediaQueryFn = (breakpoint: string, breakpoints: string[], index: number) => string;

export type MediaQuerySimpleFn = (breakpoint: string) => string;

export const mediaQueryAbove: MediaQuerySimpleFn = (breakpoint) =>
  `only screen and (min-width: ${breakpoint})`;

export const mediaQueryBelow: MediaQuerySimpleFn = (breakpoint) =>
  `only screen and (max-width: calc(${breakpoint} - 1px))`;

export const mediaQueryOnly: MediaQueryFn = (breakpoint, breakpoints, index) => {
  if (index === breakpoints.length - 1) {
    return mediaQueryAbove(breakpoint);
  }

  return `only screen and (min-width: ${breakpoints[index]}) and (max-width: calc(${
    breakpoints[index + 1]
  } - 1px))`;
};
