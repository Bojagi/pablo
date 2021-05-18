import React from 'react';
import { mediaQueryOnly } from '../breakpoints/mediaQueryFns';
import { useBreakpoint } from '../breakpoints/useBreakpoint';
import { HideAbove, HideBelow, HideProps } from '../Hide';

export const ShowAbove = HideBelow;

export const ShowBelow = HideAbove;

export function ShowOnlyOn({ breakpoint, children }: HideProps) {
  const isOnBreakpoint = useBreakpoint(breakpoint, mediaQueryOnly);
  if (isOnBreakpoint) {
    return <>{children}</>;
  }

  return null;
}
