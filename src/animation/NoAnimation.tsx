import { css } from '@emotion/react';
import type { Interpolation } from '@emotion/react';
import { createInOutAnimation } from './InOutAnimation';

const noAnimationBase = css``;

const noAnimationEnter = css``;

const noAnimationExit = css`
  visibility: hidden;
` as Interpolation<any>;

export const NoAnimation = createInOutAnimation({
  baseStyles: noAnimationBase,
  enterStyles: noAnimationEnter,
  exitStyles: noAnimationExit,
});
