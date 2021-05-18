export type Breakpoint = 'sm' | 'md' | 'lg' | 'xl';

export const breakpointNames: Breakpoint[] = ['sm', 'md', 'lg', 'xl'];

export type BreakpointsArray = [number, number, number, number];

export type Breakpoints = BreakpointsArray &
  Record<Breakpoint, number> & {
    breakpointNames: Breakpoint[];
  };

export function createBreakpoints(
  array: BreakpointsArray,
  usedBreakpointNames: Breakpoint[] = breakpointNames
): Breakpoints {
  const newBreakpoints = ([...array] as unknown) as Breakpoints;
  usedBreakpointNames.forEach((bp, index) => {
    newBreakpoints[bp] = newBreakpoints[index];
  });
  newBreakpoints.breakpointNames = usedBreakpointNames;

  return newBreakpoints as Breakpoints;
}

export const defaultBreakpoints: BreakpointsArray = [600, 1000, 1200, 1920];

export const breakpoints = createBreakpoints(defaultBreakpoints, breakpointNames);
