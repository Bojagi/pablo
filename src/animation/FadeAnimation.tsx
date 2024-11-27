import { css } from '@emotion/react';
import { createInOutAnimation } from './InOutAnimation';

const fadeAnimationBase = () => css`
  opacity: 0;
`;

const fadeAnimationEnter = css`
  opacity: 1;
`;

export const FadeAnimation = createInOutAnimation({
  baseStyles: fadeAnimationBase,
  enterStyles: fadeAnimationEnter,
});
