import React, { ReactNode } from 'react';
import { css } from 'styled-components';
import { InnerInOutAnimationProps, InOutAnimation } from './InOutAnimation';

const stackAnimationBase = css<InnerInOutAnimationProps>`
  transition: ${(props) =>
    css`opacity ${props.duration}ms, margin-top ${props.duration}ms, transform ${props.duration}ms`};
  /* margin-top: -73px; */
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
  /* margin-top: -73px; */
  transform: translateY(-50%);
`;

export interface StackAnimationProps {
  duration: number;
  children: ReactNode;
  visible: boolean;
  onExited?: () => void;
}

export function StackAnimation({ duration, children, visible, onExited }: StackAnimationProps) {
  return (
    <InOutAnimation
      visible={visible}
      duration={duration}
      onExited={onExited}
      baseStyles={stackAnimationBase}
      enterStyles={stackAnimationEnter}
      exitStyles={stackAnimationExit}
    >
      {children}
    </InOutAnimation>
  );
}
