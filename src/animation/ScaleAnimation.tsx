import { css } from '@emotion/react';
import { AnimationStyleProps, createInOutAnimation } from './InOutAnimation';

const transformInterpolateFn = (shrink: boolean, props: AnimationStyleProps) => {
  const growMultiplier = shrink ? 1 : -1;
  return props.visible ? `scale(1)` : `scale(${1 + growMultiplier * 0.25})`;
};

const animationEntered = css`
  opacity: 1;
  transform: scale(1);
`;

const animationExited = (shrink: boolean) => (props: AnimationStyleProps) => css`
  opacity: 0;
  transform: ${transformInterpolateFn(shrink, props)};
`;

export const DropInAnimation = createInOutAnimation({
  enteredStyles: animationEntered,
  exitedStyles: animationExited(true),
});

export const PopOutAnimation = createInOutAnimation({
  enteredStyles: animationEntered,
  exitedStyles: animationExited(false),
});
