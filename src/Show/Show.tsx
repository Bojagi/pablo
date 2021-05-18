import React from 'react';
import { mediaQueryOnly } from '../breakpoints/mediaQueryFns';
import { useBreakpoint } from '../breakpoints/useBreakpoint';
import { HideAbove, HideBelow, HideProps } from '../Hide';

export function ShowAbove({ breakpoint, children }: HideProps) {
  return <HideBelow breakpoint={breakpoint}>{children}</HideBelow>;
}

export function ShowBelow({ breakpoint, children }: HideProps) {
  return <HideAbove breakpoint={breakpoint}>{children}</HideAbove>;
}

export function ShowOnlyOn({ breakpoint, children }: HideProps) {
  const isOnBreakpoint = useBreakpoint(breakpoint, mediaQueryOnly);
  if (isOnBreakpoint) {
    return <>{children}</>;
  }

  return null;
}
