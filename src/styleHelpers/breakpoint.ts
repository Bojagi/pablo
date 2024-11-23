import { css } from '@emotion/react';
import { MediaQueryFn, mediaQueryAbove } from '../breakpoints/mediaQueryFns';
import { Breakpoint } from '../theme/breakpoints';
import { themeVars } from '../theme/themeVars';
import { PabloThemeableProps, Style } from '../theme/types';

export function breakpoint(
  breakpointName: Breakpoint,
  styles: Style,
  mediaQueryFn: MediaQueryFn = mediaQueryAbove
) {
  return (props: PabloThemeableProps): Style | null => {
    const breakpointIndex = props.theme.breakpoints.breakpointNames.findIndex(
      (bp) => bp === breakpointName
    );
    const bp = themeVars.breakpoints[breakpointName];
    if (breakpointIndex >= 0) {
      return css`
        @media ${mediaQueryFn(bp, props.theme.breakpoints, breakpointIndex)} {
          ${typeof styles === 'function' ? styles(props) : styles}
        }
      `;
    }

    return null;
  };
}
