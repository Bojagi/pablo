import { css } from '@emotion/react';
import { MediaQueryFn, mediaQueryAbove } from '../breakpoints/mediaQueryFns';
import { Breakpoint } from '../theme/breakpoints';
import { PabloThemeableProps, Style } from '../theme/types';

export function breakpoint(
  breakpointName: Breakpoint,
  styles: Style,
  mediaQueryFn: MediaQueryFn = mediaQueryAbove
) {
  return (props: PabloThemeableProps): Style | null => {
    if (props.theme.breakpoints.has(breakpointName)) {
      return css`
        @media ${mediaQueryFn(breakpointName, props.theme.breakpoints)} {
          ${typeof styles === 'function' ? styles(props) : styles}
        }
      `;
    }

    return null;
  };
}
