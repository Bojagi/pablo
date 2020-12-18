import * as React from "react";
import { ThemeProvider, useTheme } from "styled-components";
import { defaultComponentStyles } from "./defaultComponentStyles";
import { defaultTheme } from "./defaultTheme";
import { PabloTheme } from "./types";

export const pabloThemeContext = React.createContext<PabloTheme>(defaultTheme);
export const pabloComponentStylesContext = React.createContext<any>(defaultComponentStyles);

export interface PabloThemeProviderProps {
  theme?: PabloTheme;
  componentStyles?: any;
  children: React.ReactNode;
}

export interface PabloThemeableProps {
  theme: PabloTheme;
}

export const PabloThemeProvider = ({
  theme = defaultTheme,
  componentStyles = defaultComponentStyles,
  children
}: PabloThemeProviderProps) => {
  const scTheme = useTheme() || {};
  
  return (
    <pabloThemeContext.Provider value={theme}>
      <pabloComponentStylesContext.Provider value={componentStyles}>
        <ThemeProvider theme={{...scTheme, ...theme, componentStyles}}>
          {children}
        </ThemeProvider>
      </pabloComponentStylesContext.Provider>
    </pabloThemeContext.Provider>
  );
}
  
export const usePabloTheme = () => {
  return React.useContext(pabloThemeContext);
}

export const withPabloTheme = <TProps,>() => 
  (Component: React.ComponentType<TProps & PabloThemeableProps>): React.FC<TProps & PabloThemeableProps> => 
    (props: TProps) => {
      const theme = usePabloTheme();
      return <Component theme={theme} {...props} />;
    }
