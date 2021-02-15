import * as React from 'react';
import { ThemeProvider, useTheme } from 'styled-components';
import merge from 'deepmerge';
import { getComponentStyle } from '../utils/styleHelpers/getComponentStyle';
import { defaultComponentStyles } from './defaultComponentStyles';
import { defaultTheme } from './defaultTheme';
import { PabloTheme, ComponentStyles, PabloThemeProviderProps } from './types';

export const pabloThemeContext = React.createContext<PabloTheme>(defaultTheme);
export const pabloComponentStylesContext = React.createContext<ComponentStyles>(
  defaultComponentStyles
);

export const useComponentStyleContext = () => React.useContext(pabloComponentStylesContext);

export const PabloThemeProvider = ({
  theme = {},
  componentStyles = {},
  children,
}: PabloThemeProviderProps) => {
  const scTheme = useTheme() || {};
  const mergedTheme = merge(defaultTheme, theme) as PabloTheme;
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

export const usePabloTheme = () => React.useContext(pabloThemeContext);

export const useComponentStyle = (path: string, props: Record<string, any> = {}) => {
  const componentStyles = useComponentStyleContext();
  const theme = useTheme();
  return getComponentStyle(path)({ ...props, theme: { ...theme, componentStyles } });
};
