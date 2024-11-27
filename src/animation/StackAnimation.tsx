import { css } from '@emotion/react';
import { AnimationStyleProps, createInOutAnimation } from './InOutAnimation';

const getMarginTop = (props: AnimationStyleProps) => (props.selfHeight ? -props.selfHeight : 0);

const stackAnimationBase = (props: AnimationStyleProps) => css`
  margin-top: ${getMarginTop(props)}px;
  opacity: 0;
  transform: translateY(50%);
`;

const stackAnimationEnter = css`
  opacity: 1;
  margin-top: 0;
  transform: translateY(0);
`;

const stackAnimationExit = (props: AnimationStyleProps) => css`
  opacity: 0;
  margin-top: ${getMarginTop(props)}px;
  transform: translateY(-50%);
`;

export const StackAnimation = createInOutAnimation({
  baseStyles: stackAnimationBase,
  enterStyles: stackAnimationEnter,
  exitStyles: stackAnimationExit,
});
