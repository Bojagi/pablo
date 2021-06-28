/* eslint-disable import/no-extraneous-dependencies */
import React, { ReactNode } from 'react';
import { theme, useConfig, ComponentsProvider } from 'docz';

import { PabloThemeProvider } from '@/theme/PabloThemeProvider';
import { ToastProvider } from '@/ToastProvider';

export default ({ children }) => (
  <PabloThemeProvider>
    <ToastProvider>{children}</ToastProvider>
  </PabloThemeProvider>
);
