import * as React from 'react';
import styled from '@emotion/styled';
import { PabloThemeProvider } from '../../src/theme';

const DirectButton = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 8px 12px;
  border: 1px solid transparent;
  background: transparent;
  border-radius: 4px;
  transition: background-color 0.3s, border-color 0.3s, box-shadow 0.3s ease-in-out;
  outline: none;

  &:enabled {
    cursor: pointer;
  }

  &:disabled {
    opacity: 0.4;
    cursor: normal;
  }

  color: #ffffff;
  background: #6a50f2;
  border-color: #6a50f2;

  &:focus {
    box-shadow: 0 0 0 4px $EBE7FF;
  }

  &:hover:enabled {
    color: #ffffff;
    background: #301a9e;
    border-color: #301a9e;
  }
`;
export const DirectButtonApp = () => (
  <PabloThemeProvider>
    <DirectButton>Hi</DirectButton>
  </PabloThemeProvider>
);
