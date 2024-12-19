import { mediaQueryAbove, mediaQueryBelow, mediaQueryOnly } from './mediaQueryFns';

test('show above mediaQuery with mediaQueryAbove()', () => {
  const query = mediaQueryAbove('sm', new Map([['sm', 'var']]) as any);
  expect(query).toBe('only screen and (min-width: var)');
});

test('show below mediaQuery with mediaQueryAbove()', () => {
  const query = mediaQueryBelow('sm', new Map([['sm', 'var']]) as any);
  expect(query).toBe('only screen and (max-width: calc(var - 1px))');
});

test('show above mediaQuery with mediaQueryOnly() when index is length - 1', () => {
  const query = mediaQueryOnly('sm', new Map([['sm', 'var']]) as any);
  expect(query).toBe('only screen and (min-width: var)');
});

test('show between media query with mediaQueryOnly() when index is between first and last', () => {
  const allBreakpoints = new Map([
    ['sm', '100px'],
    ['md', '200px'],
    ['lg', '300px'],
    ['xl', '400px'],
  ]);
  const query1 = mediaQueryOnly('sm', allBreakpoints as any);
  expect(query1).toBe('only screen and (min-width: 100px) and (max-width: calc(200px - 1px))');
  const query2 = mediaQueryOnly('md', allBreakpoints as any);
  expect(query2).toBe('only screen and (min-width: 200px) and (max-width: calc(300px - 1px))');
  const query3 = mediaQueryOnly('lg', allBreakpoints as any);
  expect(query3).toBe('only screen and (min-width: 300px) and (max-width: calc(400px - 1px))');
});
