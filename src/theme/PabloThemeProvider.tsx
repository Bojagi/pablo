import * as React from 'react';
import merge from 'deepmerge';
import isObject from 'isobject';
import { getDefaultComponentStyles } from './defaultComponentStyles';
import { defaultTheme } from './defaultTheme';
import { PabloTheme, ComponentStyles, PabloThemeProviderProps } from './types';
import { pabloThemeContext, pabloComponentStylesContext, rootContext } from './context';
import { themeVarNames } from './themeVars';
import { prefixer } from 'stylis';
import createCache from '@emotion/cache';
import { css, Global, ThemeProvider, CacheProvider } from '@emotion/react';

const overwriteMerge = (_, sourceArray) => sourceArray;
const isMergeableObject = (val) => isObject(val) && !Array.isArray(val) && !(val instanceof Map);

function createThemeVarDefinitions(theme: any, keyNameObject: any) {
  return Array.from(Object.entries(keyNameObject))
    .map(([key, varName]) =>
      isObject(varName)
        ? createThemeVarDefinitions(theme[key], keyNameObject[key])
        : `--${varName}: ${theme instanceof Map ? theme.get(key) : theme[key]};`
    )
    .flat()
    .join(' ');
}

export const PabloThemeProvider = ({
  theme = {},
  componentStyles = {},
  root = document,
  children,
}: PabloThemeProviderProps) => {
  const mergedTheme = merge(defaultTheme, theme, {
    arrayMerge: overwriteMerge,
    isMergeableObject,
  }) as PabloTheme;
  const defaultComponentStyles = getDefaultComponentStyles();

  const mergedComponentStyles = merge(defaultComponentStyles, componentStyles) as ComponentStyles;

  const emotionCache = React.useMemo(
    () =>
      createCache({
        key: 'app',
        container: root instanceof Document ? root.head : root,
        stylisPlugins: [prefixer],
      }),
    [root]
  );

  const styledTheme = React.useMemo(
    () => ({
      ...mergedTheme,
      componentStyles: mergedComponentStyles,
    }),
    [mergedComponentStyles, mergedTheme]
  );

  return (
    <CacheProvider value={emotionCache}>
      <rootContext.Provider value={root}>
        <ThemeProvider theme={styledTheme}>
          <Global
            styles={css`
              :root {
                ${createThemeVarDefinitions(mergedTheme, themeVarNames)}
              }
            `}
          />
          <pabloThemeContext.Provider value={mergedTheme}>
            <pabloComponentStylesContext.Provider value={mergedComponentStyles}>
              {children}
            </pabloComponentStylesContext.Provider>
          </pabloThemeContext.Provider>
        </ThemeProvider>
      </rootContext.Provider>
    </CacheProvider>
  );
};
