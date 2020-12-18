import React from 'react';
import {PabloThemeProvider} from '../src/theme';

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
}

export const decorators = [(Story) => <PabloThemeProvider><Story/></PabloThemeProvider>];
