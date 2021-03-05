import { BasePlacement } from '@popperjs/core';
import { css, FlattenInterpolation } from 'styled-components';
import { conditionalStyles } from '../styleHelpers';
import { createInOutAnimation, InOutAnimationProps } from './InOutAnimation';

export type TooltipSide = BasePlacement;

const transformInterpolateFn = (axis: 'Y' | 'X', directionMultiplier: -1 | 1) => (
  props: SlideAnimationProps
) => {
  const reverseMultiplier = props.reverse ? -1 : 1;
  const axisMultiplier = axis === 'X' ? 0.5 : 1;
  return props.visible
    ? `translate${axis}(0)`
    : `translate${axis}(${reverseMultiplier * directionMultiplier * axisMultiplier * 25}%)`;
};

const topStyles = css`
  transform: ${transformInterpolateFn('Y', -1)};
`;

const bottomStyles = css`
  transform: ${transformInterpolateFn('Y', 1)};
`;

const rightStyles = css`
  transform: ${transformInterpolateFn('X', 1)};
`;

const leftStyles = css`
  transform: ${transformInterpolateFn('X', -1)};
`;

const stackAnimationBase: any = css<SlideAnimationProps>`
  transition: ${(props) => css`opacity ${props.duration}ms, transform ${props.duration}ms`};
  opacity: 0;
  ${conditionalStyles('side', {
    top: topStyles,
    bottom: bottomStyles,
    right: rightStyles,
    left: leftStyles,
  })}
`;

const stackAnimationEnter = css`
  opacity: 1;
  transform: translateY(0) translateX(0);
`;

const stackAnimationExit = css`
  opacity: 0;
  ${conditionalStyles('side', {
    top: topStyles,
    bottom: bottomStyles,
    right: rightStyles,
    left: leftStyles,
  })}
` as FlattenInterpolation<any>;

export interface SlideAnimationProps extends InOutAnimationProps {
  side: TooltipSide;
  reverse?: boolean;
}

export const SlideAnimation = createInOutAnimation<SlideAnimationProps>({
  baseStyles: stackAnimationBase,
  enterStyles: stackAnimationEnter,
  exitStyles: stackAnimationExit,
});
