import React from 'react';
import { createGlobalStyle } from 'styled-components';
import { PabloThemeProvider } from '../src/theme';

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

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:ital,wght@0,400;0,500;1,400;1,500&display=swap');
`;

export const decorators = [(Story) => (
  <>
    <GlobalStyle />
    <PabloThemeProvider>
      <Story/>
    </PabloThemeProvider>
  </>
)];
