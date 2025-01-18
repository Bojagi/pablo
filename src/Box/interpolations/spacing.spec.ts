import { defaultTheme } from '../../theme';
import { PabloThemeableProps } from '../../theme/types';
import { margin, microMargin, microPadding, padding } from './spacing';
import { matchClamp, matchMultipleClamp } from '../../../testUtils/matchClamp';

let props: PabloThemeableProps = {
  theme: defaultTheme,
} as any;

beforeEach(() => {
  props = {
    theme: defaultTheme,
  } as any;
});

describe.each([
  ['macro margin', margin, 'margin', 0.5, 0.75, 'm'],
  ['macro padding', padding, 'padding', 0.5, 0.75, 'p'],
  ['micro margin', microMargin, 'margin', 0.25, 0.5, 'mm'],
  ['micro padding', microPadding, 'padding', 0.25, 0.5, 'mp'],
])('%s system', (name, systemFn: any, property, lowerBase, upperBase, shorthand) => {
  test(`${name} system`, () => {
    expect(systemFn({ [shorthand]: 10, ...props })).toEqual({
      [property]: matchClamp(10, lowerBase, upperBase),
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
      [`${property}Top`]: matchClamp(1, lowerBase, upperBase),
      [`${property}Right`]: matchClamp(2, lowerBase, upperBase),
      [`${property}Bottom`]: matchClamp(3, lowerBase, upperBase),
      [`${property}Left`]: matchClamp(4, lowerBase, upperBase),
    });
  });

  test(`${name} system with x and y props`, () => {
    expect(systemFn({ [`${shorthand}x`]: 10, [`${shorthand}y`]: 20, ...props })).toEqual({
      [`${property}Left`]: matchClamp(10, lowerBase, upperBase),
      [`${property}Right`]: matchClamp(10, lowerBase, upperBase),
      [`${property}Top`]: matchClamp(20, lowerBase, upperBase),
      [`${property}Bottom`]: matchClamp(20, lowerBase, upperBase),
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
        [property]: matchClamp(multiplier, lowerBase, upperBase),
      });
      expect(systemFn({ [`${shorthand}t`]: name, ...props })).toEqual({
        [`${property}Top`]: matchClamp(multiplier, lowerBase, upperBase),
      });
      expect(systemFn({ [`${shorthand}r`]: name, ...props })).toEqual({
        [`${property}Right`]: matchClamp(multiplier, lowerBase, upperBase),
      });
      expect(systemFn({ [`${shorthand}b`]: name, ...props })).toEqual({
        [`${property}Bottom`]: matchClamp(multiplier, lowerBase, upperBase),
      });
      expect(systemFn({ [`${shorthand}l`]: name, ...props })).toEqual({
        [`${property}Left`]: matchClamp(multiplier, lowerBase, upperBase),
      });
      expect(systemFn({ [`${shorthand}x`]: name, ...props })).toEqual({
        [`${property}Left`]: matchClamp(multiplier, lowerBase, upperBase),
        [`${property}Right`]: matchClamp(multiplier, lowerBase, upperBase),
      });
      expect(systemFn({ [`${shorthand}y`]: name, ...props })).toEqual({
        [`${property}Top`]: matchClamp(multiplier, lowerBase, upperBase),
        [`${property}Bottom`]: matchClamp(multiplier, lowerBase, upperBase),
      });
    });
  });

  test(`styled interpolation functions for ${name}`, () => {
    expect(systemFn.all(10)(props)).toEqual({
      [property]: matchClamp(10, lowerBase, upperBase),
    });
    expect(systemFn.top(1)(props)).toEqual({
      [`${property}Top`]: matchClamp(1, lowerBase, upperBase),
    });
    expect(systemFn.x(10)(props)).toEqual({
      [`${property}Left`]: matchClamp(10, lowerBase, upperBase),
      [`${property}Right`]: matchClamp(10, lowerBase, upperBase),
    });
    expect(systemFn.y(10)(props)).toEqual({
      [`${property}Top`]: matchClamp(10, lowerBase, upperBase),
      [`${property}Bottom`]: matchClamp(10, lowerBase, upperBase),
    });
  });
});

test.each([
  ['macro', 0.5, 0.75, padding],
  ['micro', 0.25, 0.5, microPadding],
])('%s gap spacing', (_, lowerBase, upperBase, systemFn: typeof padding) => {
  expect(systemFn({ gap: 10, ...props })).toEqual({
    gap: matchMultipleClamp([10, 10], lowerBase, upperBase),
  });
  expect(systemFn({ gap: [[10, 1]], ...props })).toEqual({
    gap: matchMultipleClamp([10, 1], lowerBase, upperBase),
  });

  expect(systemFn.gap(10)(props)).toEqual({
    gap: matchMultipleClamp([10, 10], lowerBase, upperBase),
  });
});

test('getSpacing', () => {
  const macroUpperBase = 0.75;
  const macroLowerBase = 0.5;
  expect(margin.get('xxxs')(props)).toEqual(matchClamp(0.25, macroLowerBase, macroUpperBase));
  expect(margin.get('xxs')(props)).toEqual(matchClamp(0.5, macroLowerBase, macroUpperBase));
  expect(margin.get('xs')(props)).toEqual(matchClamp(0.75, macroLowerBase, macroUpperBase));
  expect(margin.get('sm')(props)).toEqual(matchClamp(1, macroLowerBase, macroUpperBase));
  expect(margin.get('md')(props)).toEqual(matchClamp(1.5, macroLowerBase, macroUpperBase));
  expect(margin.get('lg')(props)).toEqual(matchClamp(2, macroLowerBase, macroUpperBase));
  expect(margin.get('xl')(props)).toEqual(matchClamp(3, macroLowerBase, macroUpperBase));
  expect(margin.get('xxl')(props)).toEqual(matchClamp(4, macroLowerBase, macroUpperBase));
  expect(margin.get('xxxl')(props)).toEqual(matchClamp(6, macroLowerBase, macroUpperBase));
  expect(padding.get('xxxs')(props)).toEqual(matchClamp(0.25, macroLowerBase, macroUpperBase));
  expect(padding.get('xxs')(props)).toEqual(matchClamp(0.5, macroLowerBase, macroUpperBase));
  expect(padding.get('xs')(props)).toEqual(matchClamp(0.75, macroLowerBase, macroUpperBase));
  expect(padding.get('sm')(props)).toEqual(matchClamp(1, macroLowerBase, macroUpperBase));
  expect(padding.get('md')(props)).toEqual(matchClamp(1.5, macroLowerBase, macroUpperBase));
  expect(padding.get('lg')(props)).toEqual(matchClamp(2, macroLowerBase, macroUpperBase));
  expect(padding.get('xl')(props)).toEqual(matchClamp(3, macroLowerBase, macroUpperBase));
  expect(padding.get('xxl')(props)).toEqual(matchClamp(4, macroLowerBase, macroUpperBase));
  expect(padding.get('xxxl')(props)).toEqual(matchClamp(6, macroLowerBase, macroUpperBase));

  const microUpperBase = 0.5;
  const microLowerBase = 0.25;
  expect(microMargin.get('xxxs')(props)).toEqual(matchClamp(0.25, microLowerBase, microUpperBase));
  expect(microMargin.get('xxs')(props)).toEqual(matchClamp(0.5, microLowerBase, microUpperBase));
  expect(microMargin.get('xs')(props)).toEqual(matchClamp(0.75, microLowerBase, microUpperBase));
  expect(microMargin.get('sm')(props)).toEqual(matchClamp(1, microLowerBase, microUpperBase));
  expect(microMargin.get('md')(props)).toEqual(matchClamp(1.5, microLowerBase, microUpperBase));
  expect(microMargin.get('lg')(props)).toEqual(matchClamp(2, microLowerBase, microUpperBase));
  expect(microMargin.get('xl')(props)).toEqual(matchClamp(3, microLowerBase, microUpperBase));
  expect(microMargin.get('xxl')(props)).toEqual(matchClamp(4, microLowerBase, microUpperBase));
  expect(microMargin.get('xxxl')(props)).toEqual(matchClamp(6, microLowerBase, microUpperBase));
  expect(microPadding.get('xxxs')(props)).toEqual(matchClamp(0.25, microLowerBase, microUpperBase));
  expect(microPadding.get('xxs')(props)).toEqual(matchClamp(0.5, microLowerBase, microUpperBase));
  expect(microPadding.get('xs')(props)).toEqual(matchClamp(0.75, microLowerBase, microUpperBase));
  expect(microPadding.get('sm')(props)).toEqual(matchClamp(1, microLowerBase, microUpperBase));
  expect(microPadding.get('md')(props)).toEqual(matchClamp(1.5, microLowerBase, microUpperBase));
  expect(microPadding.get('lg')(props)).toEqual(matchClamp(2, microLowerBase, microUpperBase));
  expect(microPadding.get('xl')(props)).toEqual(matchClamp(3, microLowerBase, microUpperBase));
  expect(microPadding.get('xxl')(props)).toEqual(matchClamp(4, microLowerBase, microUpperBase));
  expect(microPadding.get('xxxl')(props)).toEqual(matchClamp(6, microLowerBase, microUpperBase));
});
