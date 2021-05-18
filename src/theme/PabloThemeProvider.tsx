import * as React from 'react';
import { ThemeProvider, useTheme } from 'styled-components';
import merge from 'deepmerge';
import { defaultComponentStyles } from './defaultComponentStyles';
import { defaultTheme } from './defaultTheme';
import { PabloTheme, ComponentStyles, PabloThemeProviderProps } from './types';
import { pabloThemeContext, pabloComponentStylesContext } from './context';

const overwriteMerge = (_, sourceArray) => sourceArray;

export const PabloThemeProvider = ({
  theme = {},
  componentStyles = {},
  children,
}: PabloThemeProviderProps) => {
  const scTheme = useTheme() || {};
  const mergedTheme = merge(defaultTheme, theme, { arrayMerge: overwriteMerge }) as PabloTheme;
  const mergedComponentStyles = merge(defaultComponentStyles, componentStyles) as ComponentStyles;

  return (
    <pabloThemeContext.Provider value={mergedTheme}>
      <pabloComponentStylesContext.Provider value={mergedComponentStyles}>
        <ThemeProvider
          theme={{ ...scTheme, ...mergedTheme, componentStyles: mergedComponentStyles }}
        >
          {children}
        </ThemeProvider>
      </pabloComponentStylesContext.Provider>
    </pabloThemeContext.Provider>
  );
};
