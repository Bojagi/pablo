import { useMediaQuery } from '@react-hook/media-query';
import { usePabloTheme } from '../theme';
import { Breakpoint } from '../theme/breakpoints';
import { themeVars } from '../theme/themeVars';
import { MediaQueryFn, mediaQueryAbove } from './mediaQueryFns';

export function useBreakpoint(
  breakpointName: Breakpoint,
  mediaQueryFn: MediaQueryFn = mediaQueryAbove
) {
  const theme = usePabloTheme();
  const breakpointIndex = theme.breakpoints.breakpointNames.findIndex(
    (bp) => bp === breakpointName
  );
  const bp = themeVars.breakpoints[breakpointName];

  const mediaQuery = mediaQueryFn(bp, theme.breakpoints, breakpointIndex);
  return useMediaQuery(mediaQuery);
}
