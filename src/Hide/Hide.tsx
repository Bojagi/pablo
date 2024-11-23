import { ReactNode } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { mediaQueryBelow, MediaQueryFn, mediaQueryOnly } from '../breakpoints/mediaQueryFns';
import { breakpoint as breakpointFn } from '../styleHelpers';
import { Breakpoint } from '../theme/breakpoints';

export interface HideProps {
  children: ReactNode;
  breakpoint: Breakpoint;
}

const createHideBox = (fn?: MediaQueryFn) => styled.div<HideProps>`
  ${(props) =>
    breakpointFn(
      props.breakpoint,
      css`
        display: none;
      `,
      fn
    )(props)}
`;

export const HideAbove = createHideBox();
export const HideBelow = createHideBox(mediaQueryBelow);
export const HideOnlyOn = createHideBox(mediaQueryOnly);
