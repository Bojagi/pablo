import React from 'react';
import { createGlobalStyle } from 'styled-components';
import { PabloThemeProvider } from '../src/theme';
import { getSpacing } from '../src/styleHelpers/getSpacing';
import { css } from 'styled-components';

export const parameters = {
  layout: 'centered',
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

export const decorators = [(Story) => (
  <>
    <PabloThemeProvider 
      theme={{
        // colors: {
        //   brand: {
        //     main: 'coral',
        //     light: 'bisque',
        //     dark: 'crimson',
        //   },
        // },
      }}
      componentStyles={{
        // button: {
        //   base: {
        //     iconGap: 3,
        //   },
        // },
        // sidebarNav: {
        //   borderLeftSpacing: 5,
        //   item: {
        //     hover: {
        //       backgroundColor: themeVars.colors.positive.main,
        //     },
        //   },
        //   borderLeft: css`2px dotted red`,
        // },
      }}
    >
      <Story/>
    </PabloThemeProvider>
  </>
)];
