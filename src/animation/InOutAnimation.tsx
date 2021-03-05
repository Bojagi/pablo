import React, { forwardRef, ReactNode, useState } from 'react';
import Transition, { TransitionStatus } from 'react-transition-group/Transition';
import styled, { FlattenInterpolation, FlattenSimpleInterpolation } from 'styled-components';
import useResizeObserver from 'use-resize-observer';
import { useForwardRef } from '../utils/useForwardRef';
import { useMountedRef } from '../utils/useMountedRef';

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

const InOutAnimation = forwardRef<HTMLDivElement, InOutAnimationProps>(
  ({ visible, onExited, duration, children, ...additionalProps }, ref) => {
    const [animationIn, setAnimationIn] = useState(false);
    const [innerRef, setInnerRef] = useForwardRef(ref);
    const mountedRef = useMountedRef();
    const { width, height } = useResizeObserver<HTMLDivElement>({ ref: innerRef });

    React.useEffect(() => {
      setTimeout(() => mountedRef.current && setAnimationIn(visible));
    }, [visible, mountedRef]);

    return (
      <Transition in={animationIn} timeout={duration} onExited={onExited}>
        {(state) => (
          <InnerInOutAnimation
            ref={setInnerRef}
            data-testid="pbl-animation-inner"
            duration={duration}
            selfWidth={width}
            selfHeight={height}
            state={state}
            {...additionalProps}
          >
            {children}
          </InnerInOutAnimation>
        )}
      </Transition>
    );
  }
);

export function createInOutAnimation<P extends InOutAnimationProps = InOutAnimationProps>({
  baseStyles,
  enterStyles,
  exitStyles,
}: CreateInOutAnimationOptions) {
  return forwardRef<HTMLDivElement, P>((props, ref) => (
    <InOutAnimation
      ref={ref}
      baseStyles={baseStyles}
      enterStyles={enterStyles}
      exitStyles={exitStyles}
      {...props}
    />
  ));
}
