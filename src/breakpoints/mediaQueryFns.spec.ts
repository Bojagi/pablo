import { mediaQueryAbove, mediaQueryBelow, mediaQueryOnly } from './mediaQueryFns';

test('show above mediaQuery with mediaQueryAbove()', () => {
  const query = mediaQueryAbove('sm', new Map([['sm', 100]]) as any);
  expect(query).toBe('only screen and (min-width: var(--pbl-theme-breakpoints-sm))');
});

test('show below mediaQuery with mediaQueryBelow()', () => {
  const query = mediaQueryBelow('sm', new Map([['sm', 100]]) as any);
  expect(query).toBe('only screen and (max-width: calc(var(--pbl-theme-breakpoints-sm) - 1px))');
});

test('show above mediaQuery with mediaQueryOnly() when index is length - 1', () => {
  const query = mediaQueryOnly('sm', new Map([['sm', 100]]) as any);
  expect(query).toBe('only screen and (min-width: var(--pbl-theme-breakpoints-sm))');
});

test('show between media query with mediaQueryOnly() when index is between first and last', () => {
  const allBreakpoints = new Map([
    ['sm', '100px'],
    ['md', '200px'],
    ['lg', '300px'],
    ['xl', '400px'],
  ]);
  const query1 = mediaQueryOnly('sm', allBreakpoints as any);
  expect(query1).toBe(
    'only screen and (min-width: var(--pbl-theme-breakpoints-sm)) and (max-width: calc(var(--pbl-theme-breakpoints-md) - 1px))'
  );
  const query2 = mediaQueryOnly('md', allBreakpoints as any);
  expect(query2).toBe(
    'only screen and (min-width: var(--pbl-theme-breakpoints-md)) and (max-width: calc(var(--pbl-theme-breakpoints-lg) - 1px))'
  );
  const query3 = mediaQueryOnly('lg', allBreakpoints as any);
  expect(query3).toBe(
    'only screen and (min-width: var(--pbl-theme-breakpoints-lg)) and (max-width: calc(var(--pbl-theme-breakpoints-xl) - 1px))'
  );
});
