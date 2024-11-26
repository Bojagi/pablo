import { css } from '@emotion/react';
import { conditionalStyles } from '../styleHelpers';
import { createInOutAnimation, InOutAnimationProps } from './InOutAnimation';
import { PabloThemeableProps } from '../theme/types';

const transformInterpolateFn = (
  axis: 'Y' | 'X',
  directionMultiplier: -1 | 1,
  props: SlideAnimationProps
) => {
  const reverseMultiplier = props.reverse ? -1 : 1;
  const axisMultiplier = axis === 'X' ? 0.5 : 1;
  return props.visible
    ? `translate${axis}(0)`
    : `translate${axis}(${reverseMultiplier * directionMultiplier * axisMultiplier * 25}%)`;
};

const topStyles = (props: SlideAnimationProps) => css`
  transform: ${transformInterpolateFn('Y', -1, props)};
`;

const bottomStyles = (props: SlideAnimationProps) => css`
  transform: ${transformInterpolateFn('Y', 1, props)};
`;

const rightStyles = (props: SlideAnimationProps) => css`
  transform: ${transformInterpolateFn('X', 1, props)};
`;

const leftStyles = (props: SlideAnimationProps) => css`
  transform: ${transformInterpolateFn('X', -1, props)};
`;

const stackAnimationBase: any = (props: SlideAnimationProps & PabloThemeableProps) => css`
  transition:
    opacity ${props.duration}ms,
    transform ${props.duration}ms;
  opacity: 0;
  ${conditionalStyles<SlideAnimationProps>('side', {
    top: topStyles,
    bottom: bottomStyles,
    right: rightStyles,
    left: leftStyles,
  })(props)}
`;

const stackAnimationEnter = css`
  opacity: 1;
  transform: translateY(0) translateX(0);
`;

const stackAnimationExit = (props: SlideAnimationProps & PabloThemeableProps) => css`
  opacity: 0;
  ${conditionalStyles<SlideAnimationProps>('side', {
    top: topStyles,
    bottom: bottomStyles,
    right: rightStyles,
    left: leftStyles,
  })(props)}
`;

export interface SlideAnimationProps extends InOutAnimationProps {
  side: TooltipSide;
  reverse?: boolean;
}

export const SlideAnimation = createInOutAnimation<SlideAnimationProps>({
  baseStyles: stackAnimationBase,
  enterStyles: stackAnimationEnter,
  exitStyles: stackAnimationExit,
});
