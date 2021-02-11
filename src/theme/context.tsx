import * as React from 'react';
import { ThemeProvider, useTheme } from 'styled-components';
import merge from 'deepmerge';
import { getComponentStyle } from '../styleHelpers';
import { ComponentStyles, defaultComponentStyles } from './defaultComponentStyles';
import { defaultTheme } from './defaultTheme';
import { PabloTheme } from './types';

export const pabloThemeContext = React.createContext<PabloTheme>(defaultTheme);
export const pabloComponentStylesContext = React.createContext<ComponentStyles>(
  defaultComponentStyles
);

export const useComponentStyleContext = () => React.useContext(pabloComponentStylesContext);

export interface PabloThemeProviderProps {
  theme?: RecursivePartial<PabloTheme>;
  componentStyles?: RecursivePartial<ComponentStyles>;
  children: React.ReactNode;
}

export interface PabloThemeableProps {
  theme: PabloTheme;
}

type RecursivePartial<T> = {
  [P in keyof T]?: T[P] extends (infer U)[]
    ? RecursivePartial<U>[]
    : T[P] extends object
    ? RecursivePartial<T[P]>
    : T[P];
};

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

export const useComponentStyle = (path: string) => {
  const componentStyles = React.useContext(pabloComponentStylesContext);
  return getComponentStyle(path)({ theme: { componentStyles } });
};

export const withPabloTheme = <TProps,>() => (
  Component: React.ComponentType<TProps & PabloThemeableProps>
): React.FC<TProps & PabloThemeableProps> => (props: TProps) => {
  const theme = usePabloTheme();
  return <Component theme={theme} {...props} />;
};
