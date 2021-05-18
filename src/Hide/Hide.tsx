import React, { ReactNode } from 'react';
import { mediaQueryBelow, mediaQueryOnly } from '../breakpoints/mediaQueryFns';
import { useBreakpoint } from '../breakpoints/useBreakpoint';
import { Breakpoint } from '../theme/breakpoints';

export interface HideProps {
  children: ReactNode;
  breakpoint: Breakpoint;
}

export function HideAbove({ breakpoint, children }: HideProps) {
  const isAbove = useBreakpoint(breakpoint);
  if (isAbove) {
    return null;
  }

  return <>{children}</>;
}

export function HideBelow({ breakpoint, children }: HideProps) {
  const isBelow = useBreakpoint(breakpoint, mediaQueryBelow);
  if (isBelow) {
    return null;
  }

  return <>{children}</>;
}

export function HideOnlyOn({ breakpoint, children }: HideProps) {
  const isOnBreakpoint = useBreakpoint(breakpoint, mediaQueryOnly);

  if (isOnBreakpoint) {
    return null;
  }

  return <>{children}</>;
}
