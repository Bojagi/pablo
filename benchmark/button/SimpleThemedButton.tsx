import * as React from 'react';
import styled from 'styled-components';
import { PabloThemeProvider } from '../../src/theme';
import { getColor, getSpacing } from '../../src/utils/styleHelpers';

const color = 'brand';
const SimpleThemedButton = styled.button`
  color: ${getColor(color, 'contrastText')};
  background: ${getColor(color)};
  border-color: ${getColor(color)};

  &:focus {
    box-shadow: 0 0 0 ${getSpacing(0.5)} ${getColor(color, 'light')};
  }

  &:hover:not(:disabled) {
    color: ${getColor(color, 'contrastText')};
    background: ${getColor(color, 'dark')};
    border-color: ${getColor(color, 'dark')};
  }
`;

const Wrapper = styled.div`
  margin-bottom: ${getSpacing(1)};
`;

export const SimpleThemedButtonApp = () => (
  <PabloThemeProvider>
    <Wrapper>
      <SimpleThemedButton>Hi</SimpleThemedButton>
    </Wrapper>
  </PabloThemeProvider>
);
