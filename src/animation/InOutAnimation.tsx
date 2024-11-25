import React, { forwardRef, type ReactNode, useState, useEffect } from 'react';
import { Transition } from 'react-transition-group';
import styled from '@emotion/styled';
import useResizeObserver from 'use-resize-observer';
import { useForwardRef } from '../utils/useForwardRef';
import { useMountedRef } from '../utils/useMountedRef';
import type { TransitionStatus } from 'react-transition-group';
import type { Interpolation } from '@emotion/react';

export interface InnerInOutAnimationProps {
  state?: TransitionStatus;
  duration: number;
  selfWidth?: number;
  selfHeight?: number;
  baseStyles?: Interpolation<InnerInOutAnimationProps>;
  enterStyles?: Interpolation<InnerInOutAnimationProps>;
  exitStyles?: Interpolation<InnerInOutAnimationProps>;
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

export type AnimatonSetupProps<P extends InOutAnimationProps> = Omit<
  P,
  keyof AnimationAdditionalProps
>;

export interface AnimationAdditionalProps {
  visible: boolean;
  onExited?: () => void;
  baseStyles?: Interpolation<InnerInOutAnimationProps>;
  enterStyles?: Interpolation<InnerInOutAnimationProps>;
  exitStyles?: Interpolation<InnerInOutAnimationProps>;
  children: ReactNode;
}
export interface InOutAnimationProps extends AnimationAdditionalProps {
  duration: number;
}

export interface CreateInOutAnimationOptions {
  baseStyles?: Interpolation<InnerInOutAnimationProps>;
  enterStyles?: Interpolation<InnerInOutAnimationProps>;
  exitStyles?: Interpolation<InnerInOutAnimationProps>;
}

const InOutAnimation = forwardRef<HTMLDivElement, InOutAnimationProps>(
  ({ visible, onExited, duration, children, ...additionalProps }, ref) => {
    const [animationIn, setAnimationIn] = useState(false);
    const [innerRef, setInnerRef] = useForwardRef(ref);
    const mountedRef = useMountedRef();
    const { width, height } = useResizeObserver<HTMLDivElement>({ ref: innerRef });

    useEffect(() => {
      const requestCallback =
        (window as any).requestIdleCallback || requestAnimationFrame || setTimeout;
      requestCallback(() => mountedRef.current && setAnimationIn(visible));
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
