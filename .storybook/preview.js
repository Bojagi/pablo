import React from 'react';
import { createGlobalStyle } from 'styled-components';
import { PabloThemeProvider } from '../src/theme';
import { getSpacing } from '../src/styleHelpers/getSpacing';
import { getColor } from '../src/styleHelpers/getColor';
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

export const decorators = [(Story) => (
  <>
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
