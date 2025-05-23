import * as React from 'react';
import type { ReactElement } from 'react';
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

function createThemeVarDefinitions(theme: any, keyNameObject: any, base?: any) {
  return Array.from(Object.entries(keyNameObject))
    .map(([key, varName]) => {
      if (!theme) {
        return '';
      }

      if (isObject(varName)) {
        return createThemeVarDefinitions(theme[key], varName, theme.base || base);
      }
      const keyName = `--${varName}`;

      const keyValue = theme instanceof Map ? theme.get(key) : theme?.[key];
      if (!keyValue && !base) {
        return '';
      }
      if (!keyValue || keyValue === '') {
        return `${keyName}: ${base[key]};`;
      }

      return `${keyName}: ${keyValue};`;
    })
    .flat()
    .join(' ');
}

interface EmotionCacheProps {
  root?: ShadowRoot | Document;
  children: ReactElement;
}

const EmotionCache = ({ root, children }: EmotionCacheProps) => {
  const [doc, setDoc] = React.useState<Document | ShadowRoot | undefined>(root);
  React.useLayoutEffect(() => {
    setDoc((existingDocument) => existingDocument || document);
  }, []);
  const emotionCache = React.useMemo(
    () =>
      doc &&
      createCache({
        key: 'pbl',
        container: doc instanceof Document ? doc.head : doc,
        stylisPlugins: [prefixer],
      }),
    [doc]
  );

  if (!emotionCache || !root) {
    return <>{children}</>;
  }
  return (
    <CacheProvider value={emotionCache}>
      <rootContext.Provider value={root}>{children}</rootContext.Provider>
    </CacheProvider>
  );
};

export const PabloThemeProvider = ({
  theme = {},
  componentStyles = {},
  root,
  children,
}: PabloThemeProviderProps) => {
  const mergedTheme = merge(defaultTheme, theme, {
    arrayMerge: overwriteMerge,
    isMergeableObject,
  }) as PabloTheme;
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
    <EmotionCache root={root}>
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
    </EmotionCache>
  );
};
