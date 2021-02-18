import React, { ReactNode, useState } from 'react';
import Transition, { TransitionStatus } from 'react-transition-group/Transition';
import styled, { FlattenInterpolation, FlattenSimpleInterpolation } from 'styled-components';

export interface InnerInOutAnimationProps {
  state: TransitionStatus;
  duration: number;
  baseStyles: FlattenInterpolation<InnerInOutAnimationProps> | FlattenSimpleInterpolation;
  enterStyles: FlattenInterpolation<InnerInOutAnimationProps> | FlattenSimpleInterpolation;
  exitStyles: FlattenInterpolation<InnerInOutAnimationProps> | FlattenSimpleInterpolation;
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

interface InOutAnimationProps {
  visible: boolean;
  duration: number;
  onExited?: () => void;
  baseStyles: FlattenInterpolation<InnerInOutAnimationProps> | FlattenSimpleInterpolation;
  enterStyles: FlattenInterpolation<InnerInOutAnimationProps> | FlattenSimpleInterpolation;
  exitStyles: FlattenInterpolation<InnerInOutAnimationProps> | FlattenSimpleInterpolation;
  children: ReactNode;
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

  React.useEffect(() => {
    setTimeout(() => setAnimationIn(visible));
  }, [visible]);

  return (
    <Transition in={animationIn} appear timeout={duration} onExited={onExited}>
      {(state) => (
        <InnerInOutAnimation
          baseStyles={baseStyles}
          enterStyles={enterStyles}
          exitStyles={exitStyles}
          duration={duration}
          state={state}
        >
          {children}
        </InnerInOutAnimation>
      )}
    </Transition>
  );
}
