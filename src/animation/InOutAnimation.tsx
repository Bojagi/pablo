import React, { forwardRef, type ReactNode, useEffect } from 'react';
import styled from '@emotion/styled';
import useResizeObserver from 'use-resize-observer';
import { useForwardRef } from '../utils/useForwardRef';
import type { Interpolation } from '@emotion/react';
import { TransitionStatus, useTransitionState } from 'react-transition-state';
import { AnimationEasing } from './styles';
import { useComponentStyleContext } from '../theme';
import { PabloThemeableProps } from '../theme/types';

export interface AnimationSetupProps {
  duration: number;
  easing?: AnimationEasing;
}

export interface AnimationStyleSetup<T> {
  baseStyles?: Interpolation<T>;
  enterStyles?: Interpolation<T>;
  exitStyles?: Interpolation<T>;
}

export interface AnimationAdditionalProps {
  visible: boolean;
  onExited?: () => void;
  children: ReactNode;
}

export type AnimationStyleProps<T extends object = object> = {
  visible: boolean;
  status: TransitionStatus;
  easing: string;
  duration: number;
  selfWidth?: number;
  selfHeight?: number;
} & T &
  PabloThemeableProps;

export type InOutAnimationProps<T extends object = object> = AnimationAdditionalProps &
  AnimationStyleSetup<AnimationStyleProps<T>> &
  AnimationSetupProps &
  T;

export const InnerInOutAnimation = styled.div<AnimationStyleProps<any>>`
  transition: all ${(props) => props.duration}ms ${(props) => props.easing};
  ${(props) => props.baseStyles}
  ${({ status, enterStyles, exitStyles }) => {
    switch (status) {
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

const InOutAnimation = forwardRef<HTMLDivElement, InOutAnimationProps<any>>(
  ({ visible, onExited, duration, children, easing = 'easeInOut', ...additionalProps }, ref) => {
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

    const componentStyles = useComponentStyleContext();
    const { easings } = componentStyles.animation;

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
        status={status}
        easing={easings[easing]}
        {...additionalProps}
      >
        {children}
      </InnerInOutAnimation>
    );
  }
);

export function createInOutAnimation<P extends object>({
  baseStyles,
  enterStyles,
  exitStyles,
}: AnimationStyleSetup<AnimationStyleProps<P>>) {
  return forwardRef<HTMLDivElement, InOutAnimationProps<P>>((props, ref) => {
    return (
      <InOutAnimation
        ref={ref}
        baseStyles={baseStyles}
        enterStyles={enterStyles}
        exitStyles={exitStyles}
        {...props}
      />
    );
  });
}
