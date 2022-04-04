import { mediaQueryAbove, mediaQueryBelow, mediaQueryOnly } from './mediaQueryFns';

test('show above mediaQuery with mediaQueryAbove()', () => {
  const query = mediaQueryAbove('var', ['100px', '200px', '300px', '400px'], 1);
  expect(query).toBe('only screen and (min-width: var)');
});

test('show below mediaQuery with mediaQueryAbove()', () => {
  const query = mediaQueryBelow('var', ['100px', '200px', '300px', '400px'], 2);
  expect(query).toBe('only screen and (max-width: calc(var - 1px))');
});

test('show above mediaQuery with mediaQueryOnly() when index is length - 1', () => {
  const query = mediaQueryOnly('var', ['100px', '200px', '300px', '400px'], 3);
  expect(query).toBe('only screen and (min-width: var)');
});

test('show between media query with mediaQueryOnly() when index is between first and last', () => {
  const query1 = mediaQueryOnly('var', ['100px', '200px', '300px', '400px'], 0);
  expect(query1).toBe('only screen and (min-width: 100px) and (max-width: calc(200px - 1px))');
  const query2 = mediaQueryOnly('var', ['100px', '200px', '300px', '400px'], 1);
  expect(query2).toBe('only screen and (min-width: 200px) and (max-width: calc(300px - 1px))');
  const query3 = mediaQueryOnly('var', ['100px', '200px', '300px', '400px'], 2);
  expect(query3).toBe('only screen and (min-width: 300px) and (max-width: calc(400px - 1px))');
});
