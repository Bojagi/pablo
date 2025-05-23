import React from 'react';
import merge from 'deepmerge';
import { render } from '@testing-library/react';
import { PabloThemeProvider } from './PabloThemeProvider';
import { pabloThemeContext, pabloComponentStylesContext } from './context';
import { defaultTheme } from './defaultTheme';
import { getDefaultComponentStyles } from './defaultComponentStyles';

test('PabloThemeProvider should provide default theme and component styles', () => {
  let providedTheme: any = null;
  let providedComponentStyles: any = null;

  render(
    <PabloThemeProvider>
      <pabloThemeContext.Consumer>
        {(theme) => {
          providedTheme = theme;
          return null;
        }}
      </pabloThemeContext.Consumer>
      <pabloComponentStylesContext.Consumer>
        {(componentStyles) => {
          providedComponentStyles = componentStyles;
          return null;
        }}
      </pabloComponentStylesContext.Consumer>
    </PabloThemeProvider>
  );

  expect(providedTheme).toEqual(defaultTheme);
  expect(providedComponentStyles).toEqual(merge(getDefaultComponentStyles(), {}));
});

test('PabloThemeProvider should merge custom theme with default theme', () => {
  const customTheme: any = {
    colors: {
      primary: 'custom-blue',
    },
  };

  let providedTheme: any = null;

  render(
    <PabloThemeProvider theme={customTheme}>
      <pabloThemeContext.Consumer>
        {(theme) => {
          providedTheme = theme;
          return null;
        }}
      </pabloThemeContext.Consumer>
    </PabloThemeProvider>
  );

  expect(providedTheme.colors.primary).toBe('custom-blue');
  expect(providedTheme.colors.brand).toEqual(defaultTheme.colors.brand);
});

test('PabloThemeProvider should merge custom component styles with default styles', () => {
  const customComponentStyles = {
    button: {
      backgroundColor: 'custom-button-bg',
    },
  };

  let providedComponentStyles: any = null;

  render(
    <PabloThemeProvider componentStyles={customComponentStyles as any}>
      <pabloComponentStylesContext.Consumer>
        {(componentStyles) => {
          providedComponentStyles = componentStyles;
          return null;
        }}
      </pabloComponentStylesContext.Consumer>
    </PabloThemeProvider>
  );

  expect(providedComponentStyles.button.backgroundColor).toBe('custom-button-bg');
  expect(providedComponentStyles.input).toEqual(getDefaultComponentStyles().input);
});

test('PabloThemeProvider should apply global CSS variables to :root', () => {
  render(
    <PabloThemeProvider>
      <div />
    </PabloThemeProvider>
  );

  const rootStyles = getComputedStyle(document.documentElement);

  expect(rootStyles.getPropertyValue('--pbl-theme-colors-brand-main').trim()).toBe(
    defaultTheme.colors.brand.main
  );
});
