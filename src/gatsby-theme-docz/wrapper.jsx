import React from 'react';

import { PabloThemeProvider } from '../theme/PabloThemeProvider';
import { ToastProvider } from '../ToastProvider';

export default ({ children }) => (
  <PabloThemeProvider>
    <ToastProvider>{children}</ToastProvider>
  </PabloThemeProvider>
);
