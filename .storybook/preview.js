import React from 'react';
import {PabloThemeProvider} from '../src/theme';

export const parameters = {
  backgrounds: {
    default: 'bojagi',
    values: [
      {
        name: 'bojagi',
        value: '#fafafa',
      },
    ],
  },
};

export const decorators = [(Story) => <PabloThemeProvider><Story/></PabloThemeProvider>];
