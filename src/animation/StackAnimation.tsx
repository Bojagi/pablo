import { css } from '@emotion/react';
import { AnimationStyleProps, createInOutAnimation } from './InOutAnimation';

const getMarginTop = (props: AnimationStyleProps) => (props.selfHeight ? -props.selfHeight : 0);

const stackAnimationPreEnter = () => css`
  opacity: 0;
  margin-top: 0;
  transform: translateY(-50%);
  transition: none;
`;

const stackAnimationExited = (props: AnimationStyleProps) => css`
  opacity: 0;
  margin-top: ${getMarginTop(props)}px;
  transform: translateY(50%);
`;

const stackAnimationEntered = css`
  opacity: 1;
  margin-top: 0;
  transform: translateY(0);
`;

export const StackAnimation = createInOutAnimation({
  exitedStyles: stackAnimationExited,
  preEnterStyles: stackAnimationPreEnter,
  enteredStyles: stackAnimationEntered,
});
