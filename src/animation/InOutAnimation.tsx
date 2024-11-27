import React, { forwardRef, type ReactNode, useEffect } from 'react';
import styled from '@emotion/styled';
import useResizeObserver from 'use-resize-observer';
import { useForwardRef } from '../utils/useForwardRef';
import type { Interpolation } from '@emotion/react';
import { TransitionStatus, useTransitionState } from 'react-transition-state';

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

export type AnimationSetupProps<P extends InOutAnimationProps> = Omit<
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
    const [innerRef, setInnerRef] = useForwardRef(ref);
    const { width, height } = useResizeObserver<HTMLDivElement>({ ref: innerRef });

    const [{ status }, toggle] = useTransitionState({
      timeout: duration,
      preEnter: true,
      onStateChange: (newStatus) => {
        if (newStatus.current.status === 'exited' && onExited) {
          onExited();
        }
      },
    });

    useEffect(() => {
      toggle(visible);
    }, [toggle, visible]);

    return (
      <InnerInOutAnimation
        ref={setInnerRef}
        data-testid="pbl-animation-inner"
        duration={duration}
        selfWidth={width}
        selfHeight={height}
        state={status}
        {...additionalProps}
      >
        {children}
      </InnerInOutAnimation>
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
