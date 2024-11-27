import { css } from '@emotion/react';
import { AnimationStyleProps, createInOutAnimation } from './InOutAnimation';

const transformInterpolateFn = (shrink: boolean, props: AnimationStyleProps) => {
  const growMultiplier = shrink ? 1 : -1;
  return props.visible ? `scale(1)` : `scale(${1 + growMultiplier * 0.25})`;
};

const animationBase = () => {
  return css``;
};

const animationEnter = css`
  opacity: 1;
  transform: scale(1);
`;

const dropInAnimationExit = (props: AnimationStyleProps) => css`
  opacity: 0;
  transform: ${transformInterpolateFn(true, props)};
`;

const popOutAnimationExit = (props: AnimationStyleProps) => css`
  opacity: 0;
  transform: ${transformInterpolateFn(false, props)};
`;

export const DropInAnimation = createInOutAnimation({
  baseStyles: animationBase,
  enterStyles: animationEnter,
  exitStyles: dropInAnimationExit,
});

export const PopOutAnimation = createInOutAnimation({
  baseStyles: animationBase,
  enterStyles: animationEnter,
  exitStyles: popOutAnimationExit,
});
