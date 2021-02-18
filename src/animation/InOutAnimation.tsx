import React, { ReactNode, useState } from 'react';
import Transition, { TransitionStatus } from 'react-transition-group/Transition';
import styled, { FlattenInterpolation, FlattenSimpleInterpolation } from 'styled-components';
import useResizeObserver from 'use-resize-observer';

export interface InnerInOutAnimationProps {
  state: TransitionStatus;
  duration: number;
  selfWidth?: number;
  selfHeight?: number;
  baseStyles?: FlattenInterpolation<InnerInOutAnimationProps> | FlattenSimpleInterpolation;
  enterStyles?: FlattenInterpolation<InnerInOutAnimationProps> | FlattenSimpleInterpolation;
  exitStyles?: FlattenInterpolation<InnerInOutAnimationProps> | FlattenSimpleInterpolation;
}

export const InnerInOutAnimation = styled.div<InnerInOutAnimationProps>`
  ${(props) => props.baseStyles}
  ${({ state, enterStyles, exitStyles }) => {
    switch (state) {
      case 'entered':
      case 'entering':
        return enterStyles;
      case 'exited':
        return exitStyles;
      default:
        return null;
    }
  }}
`;

export interface InOutAnimationProps {
  visible: boolean;
  duration: number;
  onExited?: () => void;
  baseStyles?: FlattenInterpolation<InnerInOutAnimationProps> | FlattenSimpleInterpolation;
  enterStyles?: FlattenInterpolation<InnerInOutAnimationProps> | FlattenSimpleInterpolation;
  exitStyles?: FlattenInterpolation<InnerInOutAnimationProps> | FlattenSimpleInterpolation;
  children: ReactNode;
}

export interface CreateInOutAnimationOptions {
  baseStyles?: FlattenInterpolation<InnerInOutAnimationProps> | FlattenSimpleInterpolation;
  enterStyles?: FlattenInterpolation<InnerInOutAnimationProps> | FlattenSimpleInterpolation;
  exitStyles?: FlattenInterpolation<InnerInOutAnimationProps> | FlattenSimpleInterpolation;
}

export function createInOutAnimation({
  baseStyles,
  enterStyles,
  exitStyles,
}: CreateInOutAnimationOptions) {
  return (props: InOutAnimationProps) => (
    <InOutAnimation
      baseStyles={baseStyles}
      enterStyles={enterStyles}
      exitStyles={exitStyles}
      {...props}
    />
  );
}

export function InOutAnimation({
  visible,
  onExited,
  children,
  duration,
  baseStyles,
  enterStyles,
  exitStyles,
}: InOutAnimationProps) {
  const [animationIn, setAnimationIn] = useState(false);
  const ref = React.useRef<HTMLDivElement>(null);
  const { width, height } = useResizeObserver<HTMLDivElement>({ ref });

  React.useEffect(() => {
    setTimeout(() => setAnimationIn(visible));
  }, [visible]);

  return (
    <Transition in={animationIn} appear timeout={duration} onExited={onExited}>
      {(state) => (
        <InnerInOutAnimation
          ref={ref}
          baseStyles={baseStyles}
          enterStyles={enterStyles}
          exitStyles={exitStyles}
          duration={duration}
          selfWidth={width}
          selfHeight={height}
          state={state}
        >
          {children}
        </InnerInOutAnimation>
      )}
    </Transition>
  );
}
