import * as React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { buttonBaseStyles } from '../../src/ButtonBase';
import { PabloThemeProvider } from '../../src/theme';
import { Style } from '../../src/theme/types';
import { getComponentStyle } from '../../src/utils/styleHelpers';

const getButtonOutlineShadow = (color: Style) => css`
  box-shadow: 0 0 0 ${getComponentStyle(['button', 'base', 'focus', 'outlineSize'])} ${color};
`;

const PabloButton = styled.button`
  ${buttonBaseStyles}
  color: ${getComponentStyle('button.primary.{color}.color')};
  background: ${getComponentStyle('button.primary.{color}.backgroundColor')};
  border-color: ${getComponentStyle('button.primary.{color}.borderColor')};

  &:focus {
    ${getButtonOutlineShadow(getComponentStyle('button.primary.{color}.focus.outlineColor'))}
  }

  &:hover:enabled {
    background: ${getComponentStyle('button.primary.{color}.hover.backgroundColor')};
    border-color: ${getComponentStyle('button.primary.{color}.hover.borderColor')};
  }
`;
export const PabloButtonApp = () => (
  <PabloThemeProvider>
    <PabloButton mb={1}>Hello</PabloButton>
  </PabloThemeProvider>
);
