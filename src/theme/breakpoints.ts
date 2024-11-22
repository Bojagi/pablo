import { createThemeVarArray } from './createThemeVars';

export type Breakpoint = 'sm' | 'md' | 'lg' | 'xl';

export const breakpointNames: Breakpoint[] = ['sm', 'md', 'lg', 'xl'];

export type BreakpointsArray = [string, string, string, string];

export type Breakpoints = BreakpointsArray &
  Record<Breakpoint, string> & {
    breakpointNames: Breakpoint[];
  };

export function createBreakpoints(
  array: BreakpointsArray,
  usedBreakpointNames: Breakpoint[] = breakpointNames
): Breakpoints {
  const newBreakpoints: Breakpoints = usedBreakpointNames.reduce(
    (acc, bp, index) => ({
      ...acc,
      [bp]: array[index],
    }),
    { array, breakpointNames: usedBreakpointNames } as unknown as Breakpoints
  );

  return newBreakpoints as Breakpoints;
}

export const defaultBreakpoints: BreakpointsArray = ['700px', '1000px', '1200px', '1920px'];

export const breakpoints = createBreakpoints(defaultBreakpoints, breakpointNames);

export const breakpointVars = createThemeVarArray('breakpoints', breakpointNames);
