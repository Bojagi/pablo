import * as React from 'react';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import merge from 'deepmerge';
import isObject from 'isobject';
import { getDefaultComponentStyles } from './defaultComponentStyles';
import { defaultTheme } from './defaultTheme';
import { PabloTheme, ComponentStyles, PabloThemeProviderProps } from './types';
import { pabloThemeContext, pabloComponentStylesContext } from './context';
import { themeVarNames } from './themeVars';

const overwriteMerge = (_, sourceArray) => sourceArray;

function createThemeVarDefinitions(theme: any, keyNameObject: any) {
  return Array.from(Object.entries(keyNameObject))
    .map(([key, varName]) =>
      isObject(varName)
        ? createThemeVarDefinitions(theme[key], keyNameObject[key])
        : `--${varName}: ${theme[key]};`
    )
    .flat()
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
  const mergedTheme = merge(defaultTheme, theme, { arrayMerge: overwriteMerge }) as PabloTheme;
  const defaultComponentStyles = getDefaultComponentStyles();

  const mergedComponentStyles = merge(defaultComponentStyles, componentStyles) as ComponentStyles;

  const styledTheme = React.useMemo(
    () => ({
      ...mergedTheme,
      componentStyles: mergedComponentStyles,
    }),
    [mergedComponentStyles, mergedTheme]
  );

  return (
    <>
      <ThemeProvider theme={styledTheme}>
        <GlobalStyle theme={mergedTheme} />
        <pabloThemeContext.Provider value={mergedTheme}>
          <pabloComponentStylesContext.Provider value={mergedComponentStyles}>
            {children}
          </pabloComponentStylesContext.Provider>
        </pabloThemeContext.Provider>
      </ThemeProvider>
    </>
  );
};
