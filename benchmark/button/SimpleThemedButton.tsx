import * as React from 'react';
import styled from '@emotion/styled';
import { PabloThemeProvider } from '../../src/theme';
import { themeVars } from '../../src/theme/themeVars';
import { getSpacing } from '../../src/utils/styleHelpers';

const color = 'brand';
const SimpleThemedButton = styled.button`
  color: ${themeVars.colors[color].contrastText};
  background: ${themeVars.colors[color].main};
  border-color: ${themeVars.colors[color].main};

  &:focus {
    box-shadow: 0 0 0 ${getSpacing(0.5)} ${themeVars.colors[color].light};
  }

  &:hover:enabled {
    color: ${themeVars.colors[color].contrastText};
    background: ${themeVars.colors[color].dark};
    border-color: ${themeVars.colors[color].dark};
  }
`;

const Wrapper = styled.div`
  margin-bottom: ${getSpacing(0.25)};
`;

export const SimpleThemedButtonApp = () => (
  <PabloThemeProvider>
    <Wrapper>
      <SimpleThemedButton>Hi</SimpleThemedButton>
    </Wrapper>
  </PabloThemeProvider>
);
