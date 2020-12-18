import * as React from "react";
import { ThemeProvider, useTheme } from "styled-components";
import { defaultTheme } from "./defaultTheme";
import { PabloTheme } from "./types";

export const pabloThemeContext = React.createContext<PabloTheme>(defaultTheme);

export interface PabloThemeProviderProps {
  theme?: PabloTheme;
  children: React.ReactNode;
}

export interface PabloThemeableProps {
  theme: PabloTheme;
}

export const PabloThemeProvider = ({theme = defaultTheme, children}: PabloThemeProviderProps) => {
  const scTheme = useTheme() || {};
  
  return (
    <pabloThemeContext.Provider value={theme}>
      <ThemeProvider theme={{...scTheme, ...theme}}>
        {children}
      </ThemeProvider>
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
