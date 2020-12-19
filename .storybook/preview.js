import React from 'react';
import { createGlobalStyle } from 'styled-components';
import { PabloThemeProvider } from '../src/theme';
import { getSpacing } from '../src/styleHelpers';

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
      button: {
        base: {
          padding: getSpacing(1.5),
        }
      },
      card: {
        padding: getSpacing(2),
      },
      sidebarNav: {
        borderLeft: '2px dashed red',
      },
      tabs: {
        tab: {
          active: {
            bottomBorder: {
              radius: 0,
              gap: getSpacing(0),
            }
          }
        }
      }
    }}>
      <Story/>
    </PabloThemeProvider>
  </>
)];
