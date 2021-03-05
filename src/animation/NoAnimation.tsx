import { css, FlattenInterpolation } from 'styled-components';
import { createInOutAnimation, InnerInOutAnimationProps } from './InOutAnimation';

const noAnimationBase = css<InnerInOutAnimationProps>``;

const noAnimationEnter = css``;

const noAnimationExit = css`
  visibility: hidden;
` as FlattenInterpolation<any>;

export const NoAnimation = createInOutAnimation({
  baseStyles: noAnimationBase,
  enterStyles: noAnimationEnter,
  exitStyles: noAnimationExit,
});
