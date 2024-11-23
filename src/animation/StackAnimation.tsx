import { css } from '@emotion/react';
import type { Interpolation } from '@emotion/react';
import {
  createInOutAnimation,
  InnerInOutAnimationProps,
  InOutAnimationProps,
} from './InOutAnimation';

const getMarginTop = (props: InnerInOutAnimationProps) =>
  props.selfHeight ? -props.selfHeight : 0;

const stackAnimationBase = (props: InnerInOutAnimationProps) => css`
  transition:
    opacity ${props.duration}ms,
    margin-top ${props.duration}ms,
    transform ${props.duration}ms;
  margin-top: ${getMarginTop(props)}px;
  opacity: 0;
  transform: translateY(50%);
`;

const stackAnimationEnter = css`
  opacity: 1;
  margin-top: 0;
  transform: translateY(0);
`;

const stackAnimationExit = (props: InnerInOutAnimationProps) =>
  css`
    opacity: 0;
    margin-top: ${getMarginTop(props)}px;
    transform: translateY(-50%);
  ` as Interpolation<any>;

export type StackAnimationProps = InOutAnimationProps;

export const StackAnimation = createInOutAnimation<StackAnimationProps>({
  baseStyles: stackAnimationBase,
  enterStyles: stackAnimationEnter,
  exitStyles: stackAnimationExit,
});
