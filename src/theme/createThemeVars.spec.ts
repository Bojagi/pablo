import { createThemeVars, createThemeVarArray } from './createThemeVars';

test('createThemeVars should create theme variables for a flat object', () => {
  const theme = {
    color: 'red',
    size: 'large',
  };
  const result = createThemeVars('test', theme);
  expect(result).toEqual({
    color: 'pbl-theme-test-color',
    size: 'pbl-theme-test-size',
  });
});

test('createThemeVars should create theme variables for a nested object', () => {
  const theme = {
    colors: {
      primary: 'blue',
      secondary: 'green',
    },
    typography: {
      fontSize: '16px',
    },
  };
  const result = createThemeVars('test', theme);
  expect(result).toEqual({
    colors: {
      primary: 'pbl-theme-test-colors-primary',
      secondary: 'pbl-theme-test-colors-secondary',
    },
    typography: {
      fontSize: 'pbl-theme-test-typography-fontSize',
    },
  });
});

test('createThemeVars should skip undefined values', () => {
  const theme = {
    color: 'red',
    size: undefined,
  };
  const result = createThemeVars('test', theme);
  expect(result).toEqual({
    color: 'pbl-theme-test-color',
  });
});

test('createThemeVarArray should create theme variables for an array of strings', () => {
  const values = ['primary', 'secondary', 'tertiary'] as const;
  const result = createThemeVarArray('test', values);
  expect(result).toEqual({
    primary: 'pbl-theme-test-primary',
    secondary: 'pbl-theme-test-secondary',
    tertiary: 'pbl-theme-test-tertiary',
  });
});

test('createThemeVars should create theme variables for a deeply nested object', () => {
  const theme = {
    colors: {
      primary: {
        light: 'lightblue',
        dark: 'darkblue',
      },
      secondary: {
        light: 'lightgreen',
        dark: 'darkgreen',
      },
    },
    typography: {
      headings: {
        h1: {
          fontSize: '32px',
          fontWeight: 'bold',
        },
        h2: {
          fontSize: '24px',
          fontWeight: 'semi-bold',
        },
      },
    },
  };
  const result = createThemeVars('test', theme);
  expect(result).toEqual({
    colors: {
      primary: {
        light: 'pbl-theme-test-colors-primary-light',
        dark: 'pbl-theme-test-colors-primary-dark',
      },
      secondary: {
        light: 'pbl-theme-test-colors-secondary-light',
        dark: 'pbl-theme-test-colors-secondary-dark',
      },
    },
    typography: {
      headings: {
        h1: {
          fontSize: 'pbl-theme-test-typography-headings-h1-fontSize',
          fontWeight: 'pbl-theme-test-typography-headings-h1-fontWeight',
        },
        h2: {
          fontSize: 'pbl-theme-test-typography-headings-h2-fontSize',
          fontWeight: 'pbl-theme-test-typography-headings-h2-fontWeight',
        },
      },
    },
  });
});
