/* eslint-disable @typescript-eslint/no-empty-object-type */
import '@emotion/react';
import type { PabloThemeFull } from './theme/types';

declare module '@emotion/react' {
  export interface Theme extends PabloThemeFull {}
}
