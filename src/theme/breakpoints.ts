import { createThemeVarArray } from './createThemeVars';

export type DefinableBreakpoint = 'sm' | 'md' | 'lg' | 'xl';
export type Breakpoint = 'base' | DefinableBreakpoint;

export type Breakpoints = Map<Breakpoint, number>;

export function createBreakpoints(
  tuples: [DefinableBreakpoint, number][]
): Map<Breakpoint, number> {
  return new Map([['base', 0], ...tuples]);
}

export const defaultBreakpointsTuple: [DefinableBreakpoint, number][] = [
  ['sm', 700],
  ['md', 1000],
  ['lg', 1200],
  ['xl', 1920],
];

export const breakpoints = createBreakpoints(defaultBreakpointsTuple);
export const breakpointVars = createThemeVarArray(
  'breakpoints',
  defaultBreakpointsTuple.map(([name]) => name)
);
