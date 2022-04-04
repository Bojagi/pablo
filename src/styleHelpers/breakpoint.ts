import { css } from 'styled-components';
import { MediaQueryFn, mediaQueryAbove } from '../breakpoints/mediaQueryFns';
import { Breakpoint } from '../theme/breakpoints';
import { themeVars } from '../theme/themeVars';
import { PabloTheme, Style } from '../theme/types';

export function breakpoint(
  breakpointName: Breakpoint,
  styles: Style,
  mediaQueryFn: MediaQueryFn = mediaQueryAbove
) {
  return ({ theme }: { theme: PabloTheme }): Style | null => {
    const breakpointIndex = theme.breakpoints.breakpointNames.findIndex(
      (bp) => bp === breakpointName
    );
    const bp = themeVars.breakpoints[breakpointName];
    if (breakpointIndex >= 0) {
      return css`
        @media ${mediaQueryFn(bp, theme.breakpoints, breakpointIndex)} {
          ${styles}
        }
      `;
    }

    return null;
  };
}
