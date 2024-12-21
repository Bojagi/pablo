import * as React from 'react';
import { PabloTheme, ComponentStyles } from './types';

export const pabloThemeContext = React.createContext<PabloTheme>({} as any);
export const pabloComponentStylesContext = React.createContext<ComponentStyles>({} as any);
export const rootContext = React.createContext<Document | ShadowRoot | null>(null);

export const useComponentStyleContext = () => React.useContext(pabloComponentStylesContext);

export const usePabloTheme = () => React.useContext(pabloThemeContext);
