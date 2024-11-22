import { css } from 'styled-components';
import type { Interpolation } from 'styled-components';
import { createInOutAnimation, InnerInOutAnimationProps } from './InOutAnimation';

const noAnimationBase = css<InnerInOutAnimationProps>``;

const noAnimationEnter = css``;

const noAnimationExit = css`
  visibility: hidden;
` as Interpolation<any>;

export const NoAnimation = createInOutAnimation({
  baseStyles: noAnimationBase,
  enterStyles: noAnimationEnter,
  exitStyles: noAnimationExit,
});
