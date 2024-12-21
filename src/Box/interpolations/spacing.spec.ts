import { defaultTheme } from '../../theme';
import { PabloThemeableProps } from '../../theme/types';
import { margin, microMargin, microPadding, padding } from './spacing';

let props: PabloThemeableProps = {
  theme: defaultTheme,
} as any;

beforeEach(() => {
  props = {
    theme: defaultTheme,
  } as any;
});

describe.each([
  ['macro margin', margin, 'margin', 0.5, 'm'],
  ['macro padding', padding, 'padding', 0.5, 'p'],
  ['micro margin', microMargin, 'margin', 0.25, 'mm'],
  ['micro padding', microPadding, 'padding', 0.25, 'mp'],
])('%s system', (name, systemFn, property, base, shorthand) => {
  test(`${name} system`, () => {
    expect(systemFn({ [shorthand]: 10, ...props })).toEqual({
      [property]: `${10 * base}rem`,
    });
  });

  test(`${name} system single props`, () => {
    expect(
      systemFn({
        [`${shorthand}t`]: 1,
        [`${shorthand}r`]: 2,
        [`${shorthand}b`]: 3,
        [`${shorthand}l`]: 4,
        ...props,
      })
    ).toEqual({
      [`${property}Top`]: `${1 * base}rem`,
      [`${property}Right`]: `${2 * base}rem`,
      [`${property}Bottom`]: `${3 * base}rem`,
      [`${property}Left`]: `${4 * base}rem`,
    });
  });

  test(`${name} system with x and y props`, () => {
    expect(systemFn({ [`${shorthand}x`]: 10, [`${shorthand}y`]: 20, ...props })).toEqual({
      [`${property}Left`]: `${10 * base}rem`,
      [`${property}Right`]: `${10 * base}rem`,
      [`${property}Top`]: `${20 * base}rem`,
      [`${property}Bottom`]: `${20 * base}rem`,
    });
  });

  test('named spacing', () => {
    const namedSpacings = [
      ['xxxs', 0.25],
      ['xxs', 0.5],
      ['xs', 0.75],
      ['sm', 1],
      ['md', 1.5],
      ['lg', 2],
      ['xl', 3],
      ['xxl', 4],
      ['xxxl', 6],
    ] as const;

    namedSpacings.forEach(([name, multiplier]) => {
      expect(systemFn({ [`${shorthand}`]: name, ...props })).toEqual({
        [property]: `${multiplier * base}rem`,
      });
      expect(systemFn({ [`${shorthand}t`]: name, ...props })).toEqual({
        [`${property}Top`]: `${multiplier * base}rem`,
      });
      expect(systemFn({ [`${shorthand}r`]: name, ...props })).toEqual({
        [`${property}Right`]: `${multiplier * base}rem`,
      });
      expect(systemFn({ [`${shorthand}b`]: name, ...props })).toEqual({
        [`${property}Bottom`]: `${multiplier * base}rem`,
      });
      expect(systemFn({ [`${shorthand}l`]: name, ...props })).toEqual({
        [`${property}Left`]: `${multiplier * base}rem`,
      });
      expect(systemFn({ [`${shorthand}x`]: name, ...props })).toEqual({
        [`${property}Left`]: `${multiplier * base}rem`,
        [`${property}Right`]: `${multiplier * base}rem`,
      });
      expect(systemFn({ [`${shorthand}y`]: name, ...props })).toEqual({
        [`${property}Top`]: `${multiplier * base}rem`,
        [`${property}Bottom`]: `${multiplier * base}rem`,
      });
    });
  });

  test(`styled interpolation functions for ${name}`, () => {
    expect(systemFn.all(10)(props)).toEqual({
      [property]: `${10 * base}rem`,
    });
    expect(systemFn.top(1)(props)).toEqual({
      [`${property}Top`]: `${1 * base}rem`,
    });
    expect(systemFn.x(10)(props)).toEqual({
      [`${property}Left`]: `${10 * base}rem`,
      [`${property}Right`]: `${10 * base}rem`,
    });
    expect(systemFn.y(10)(props)).toEqual({
      [`${property}Top`]: `${10 * base}rem`,
      [`${property}Bottom`]: `${10 * base}rem`,
    });
  });
});

test.each([
  ['macro', 0.5, padding],
  ['micro', 0.25, microPadding],
])('%s gap spacing', (_, base, systemFn) => {
  expect(systemFn({ gap: 10, ...props })).toEqual({
    gap: `${10 * base}rem ${10 * base}rem`,
  });
  expect(systemFn({ gap: [[10, 1]], ...props })).toEqual({
    gap: `${10 * base}rem ${1 * base}rem`,
  });
  expect(systemFn.gap(10)(props)).toEqual({
    gap: `${10 * base}rem ${10 * base}rem`,
  });
});
