import React from 'react';
import { createGlobalStyle } from 'styled-components';
import { PabloThemeProvider } from '../src/theme';
import { getSpacing, getColor } from '../src/styleHelpers';
import { css } from 'styled-components';

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
    <PabloThemeProvider componentStyles={{
      // button: {
      //   base: {
      //     iconGap: 3,
      //   },
      // },
      // sidebarNav: {
      //   borderLeftSpacing: 5,
      //   item: {
      //     hover: {
      //       backgroundColor: getColor('positive', 'main'),
      //     },
      //   },
      //   borderLeft: css`2px dotted red`,
      // },
    }}>
      <Story/>
    </PabloThemeProvider>
  </>
)];
