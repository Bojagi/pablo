import { mediaQueryAbove, mediaQueryBelow, mediaQueryOnly } from './mediaQueryFns';

test('show above mediaQuery with mediaQueryAbove()', () => {
  const query = mediaQueryAbove('sm', new Map([['sm', 100]]) as any);
  expect(query).toBe('only screen and (min-width: 100px)');
});

test('show below mediaQuery with mediaQueryBelow()', () => {
  const query = mediaQueryBelow('sm', new Map([['sm', 100]]) as any);
  expect(query).toBe('only screen and (max-width: 99px)');
});

test('show above mediaQuery with mediaQueryOnly() when index is length - 1', () => {
  const query = mediaQueryOnly('sm', new Map([['sm', 100]]) as any);
  expect(query).toBe('only screen and (min-width: 100px)');
});

test('show between media query with mediaQueryOnly() when index is between first and last', () => {
  const allBreakpoints = new Map([
    ['sm', 100],
    ['md', 200],
    ['lg', 300],
    ['xl', 400],
  ]);
  const query1 = mediaQueryOnly('sm', allBreakpoints as any);
  expect(query1).toBe('only screen and (min-width: 100px) and (max-width: 199px)');
  const query2 = mediaQueryOnly('md', allBreakpoints as any);
  expect(query2).toBe('only screen and (min-width: 200px) and (max-width: 299px)');
  const query3 = mediaQueryOnly('lg', allBreakpoints as any);
  expect(query3).toBe('only screen and (min-width: 300px) and (max-width: 399px)');
});
