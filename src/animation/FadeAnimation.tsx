import { css } from '@emotion/react';
import type { Interpolation } from '@emotion/react';
import { createInOutAnimation, InOutAnimationProps } from './InOutAnimation';

const fadeAnimationBase = (props: FadeAnimationProps) => css`
  transition: opacity ${props.duration}ms;
  opacity: 0;
`;

const fadeAnimationEnter = css`
  opacity: 1;
  transform: translateY(0) translateX(0);
`;

const fadeAnimationExit = css`
  opacity: 0;
` as Interpolation<any>;

export type FadeAnimationProps = InOutAnimationProps;

export const FadeAnimation = createInOutAnimation<FadeAnimationProps>({
  baseStyles: fadeAnimationBase,
  enterStyles: fadeAnimationEnter,
  exitStyles: fadeAnimationExit,
});
