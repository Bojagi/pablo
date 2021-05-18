import { mediaQueryAbove, mediaQueryBelow, mediaQueryOnly } from './mediaQueryFns';

test('show above mediaQuery with mediaQueryAbove()', () => {
  const query = mediaQueryAbove([100, 200, 300, 400], 1);
  expect(query).toBe('only screen and (min-width: 200px)');
});

test('show below mediaQuery with mediaQueryAbove()', () => {
  const query = mediaQueryBelow([100, 200, 300, 400], 2);
  expect(query).toBe('only screen and (max-width: 299px)');
});

test('show above mediaQuery with mediaQueryOnly() when index is length - 1', () => {
  const query = mediaQueryOnly([100, 200, 300, 400], 3);
  expect(query).toBe('only screen and (min-width: 400px)');
});

test('show between media query with mediaQueryOnly() when index is between first and last', () => {
  const query1 = mediaQueryOnly([100, 200, 300, 400], 0);
  expect(query1).toBe('only screen and (min-width: 100px) and (max-width: 199px)');
  const query2 = mediaQueryOnly([100, 200, 300, 400], 1);
  expect(query2).toBe('only screen and (min-width: 200px) and (max-width: 299px)');
  const query3 = mediaQueryOnly([100, 200, 300, 400], 2);
  expect(query3).toBe('only screen and (min-width: 300px) and (max-width: 399px)');
});
