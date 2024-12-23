import { getSpacing } from './getSpacing';

const THEME: any = {
  spacing: {
    macro: 0.5,
    unit: 'rem',
    sizes: {
      xxxs: 0.25,
      xxs: 0.5,
      xs: 0.75,
      sm: 1,
      md: 1.5,
      lg: 2,
      xl: 3,
      xxl: 4,
      xxxl: 6,
    },
  },
};

const THEME_FLUID: any = {
  fluid: {
    minScreen: 320,
    maxScreen: 1440,
  },
  spacing: {
    ...THEME.spacing,
    macro: [1, 1.25],
  },
};

test('get spacing with multiplier', () => {
  const result = getSpacing(0.5)({ theme: THEME });
  expect(result).toBe('0.25rem');
});

test('get get spacing and return value if it is a string', () => {
  const result = getSpacing('123px')({ theme: THEME });
  expect(result).toBe('123px');
});

test('get named spacing', () => {
  const props = { theme: THEME };
  expect(getSpacing('xxxs')(props)).toBe('0.125rem');
  expect(getSpacing('xxs')(props)).toBe('0.25rem');
  expect(getSpacing('xs')(props)).toBe('0.375rem');
  expect(getSpacing('sm')(props)).toBe('0.5rem');
  expect(getSpacing('md')(props)).toBe('0.75rem');
  expect(getSpacing('lg')(props)).toBe('1rem');
  expect(getSpacing('xl')(props)).toBe('1.5rem');
  expect(getSpacing('xxl')(props)).toBe('2rem');
});

test('get fluid spacing with multiplier', () => {
  const props = { theme: THEME_FLUID };
  expect(getSpacing(0.5)(props)).toBe(
    'clamp(0.5rem, 0.4642857142857143rem + 0.00011160714285714285vw, 0.625rem)'
  );
});
