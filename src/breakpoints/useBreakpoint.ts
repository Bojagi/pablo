import { useMediaQuery } from '@react-hook/media-query';
import { usePabloTheme } from '../theme';
import { Breakpoint } from '../theme/breakpoints';
import { MediaQueryFn, mediaQueryAbove } from './mediaQueryFns';

export function useBreakpoint(
  breakpointName: Breakpoint,
  mediaQueryFn: MediaQueryFn = mediaQueryAbove
) {
  const theme = usePabloTheme();
  const mediaQuery = mediaQueryFn(breakpointName, theme.breakpoints);
  return useMediaQuery(mediaQuery);
}
