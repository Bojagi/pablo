/* eslint-disable import/no-extraneous-dependencies */
import React, { ReactNode } from 'react';
import { theme, useConfig, ComponentsProvider } from 'docz';

import { PabloThemeProvider } from '@/theme/PabloThemeProvider';

export default ({ children }) => <PabloThemeProvider>{children}</PabloThemeProvider>;
