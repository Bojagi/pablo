import { ReactNode } from 'react';
import { css, FlattenInterpolation } from 'styled-components';
import { createInOutAnimation, InnerInOutAnimationProps } from './InOutAnimation';

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
` as FlattenInterpolation<any>;

export interface StackAnimationProps {
  duration: number;
  children: ReactNode;
  visible: boolean;
  onExited?: () => void;
}

export const StackAnimation = createInOutAnimation({
  baseStyles: stackAnimationBase,
  enterStyles: stackAnimationEnter,
  exitStyles: stackAnimationExit,
});
