import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { mediaQueryOnly } from '../breakpoints/mediaQueryFns';
import { breakpoint as breakpointFn } from '../styleHelpers';
import { HideAbove, HideBelow, HideProps } from '../Hide';

export const ShowAbove = HideBelow;

export const ShowBelow = HideAbove;

export const ShowOnlyOn = styled.div<HideProps>`
  display: none;
  ${(props) =>
    breakpointFn(
      props.breakpoint,
      css`
        display: block;
      `,
      mediaQueryOnly
    )(props)}
`;
