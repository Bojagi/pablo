import * as React from 'react';
import { createGlobalStyle, ThemeProvider, useTheme } from 'styled-components';
import merge from 'deepmerge';
import isObject from 'isobject';
import { defaultComponentStyles } from './defaultComponentStyles';
import { defaultTheme } from './defaultTheme';
import { PabloTheme, ComponentStyles, PabloThemeProviderProps } from './types';
import { pabloThemeContext, pabloComponentStylesContext } from './context';
import { themeVarNames } from './themeVars';

const overwriteMerge = (_, sourceArray) => sourceArray;

function createThemeVarDefinitions(theme: any, keyNameObject: any) {
  return Array.from(Object.entries(keyNameObject))
    .flatMap(([key, varName]) =>
      isObject(varName)
        ? createThemeVarDefinitions(theme[key], keyNameObject[key])
        : `--${varName}: ${theme[key]};`
    )
    .join(' ');
}

const GlobalStyle = createGlobalStyle`
  :root {
    ${(props) => createThemeVarDefinitions(props.theme, themeVarNames)}
  }
 `;

export const PabloThemeProvider = ({
  theme = {},
  componentStyles = {},
  children,
}: PabloThemeProviderProps) => {
  const scTheme = useTheme() || {};
  const mergedTheme = merge(defaultTheme, theme, { arrayMerge: overwriteMerge }) as PabloTheme;
  const mergedComponentStyles = merge(defaultComponentStyles, componentStyles) as ComponentStyles;

  return (
    <>
      <GlobalStyle theme={mergedTheme} />
      <pabloThemeContext.Provider value={mergedTheme}>
        <pabloComponentStylesContext.Provider value={mergedComponentStyles}>
          <ThemeProvider
            theme={{ ...scTheme, ...mergedTheme, componentStyles: mergedComponentStyles }}
          >
            {children}
          </ThemeProvider>
        </pabloComponentStylesContext.Provider>
      </pabloThemeContext.Provider>
    </>
  );
};
