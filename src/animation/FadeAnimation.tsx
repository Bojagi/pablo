import { css } from '@emotion/react';
import { createInOutAnimation } from './InOutAnimation';

const fadeAnimationExited = () => css`
  opacity: 0;
`;

const fadeAnimationEntered = css`
  opacity: 1;
`;

export const FadeAnimation = createInOutAnimation({
  exitedStyles: fadeAnimationExited,
  enteredStyles: fadeAnimationEntered,
});
