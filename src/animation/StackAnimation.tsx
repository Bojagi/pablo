import { css } from 'styled-components';
import type { Interpolation } from 'styled-components';
import {
  createInOutAnimation,
  InnerInOutAnimationProps,
  InOutAnimationProps,
} from './InOutAnimation';

const getMarginTop = (props) => (props.selfHeight ? -props.selfHeight : 0);

const stackAnimationBase = css<InnerInOutAnimationProps>`
  transition: ${(props) =>
    css`opacity ${props.duration}ms, margin-top ${props.duration}ms, transform ${props.duration}ms`};
  margin-top: ${getMarginTop}px;
  opacity: 0;
  transform: translateY(50%);
`;

const stackAnimationEnter = css`
  opacity: 1;
  margin-top: 0;
  transform: translateY(0);
`;

const stackAnimationExit = css`
  opacity: 0;
  margin-top: ${getMarginTop}px;
  transform: translateY(-50%);
` as Interpolation<any>;

export type StackAnimationProps = InOutAnimationProps;

export const StackAnimation = createInOutAnimation<StackAnimationProps>({
  baseStyles: stackAnimationBase,
  enterStyles: stackAnimationEnter,
  exitStyles: stackAnimationExit,
});
