import { css } from '@emotion/react';
import { conditionalStyles } from '../styleHelpers';
import { AnimationStyleProps, createInOutAnimation } from './InOutAnimation';

export type SlideAnimationSide = 'top' | 'left' | 'bottom' | 'right';

export interface SlideAnimationProps {
  side: SlideAnimationSide;
  reverse?: boolean;
}

type SlideStyleProps = AnimationStyleProps<SlideAnimationProps>;

const transformInterpolateFn = (
  axis: 'Y' | 'X',
  directionMultiplier: -1 | 1,
  props: SlideStyleProps
) => {
  const reverseMultiplier = props.reverse ? -1 : 1;
  const axisMultiplier = axis === 'X' ? 0.5 : 1;
  return props.visible
    ? `translate${axis}(0)`
    : `translate${axis}(${reverseMultiplier * directionMultiplier * axisMultiplier * 25}%)`;
};

const topStyles = (props: SlideStyleProps) => css`
  transform: ${transformInterpolateFn('Y', -1, props)};
`;

const bottomStyles = (props: SlideStyleProps) => css`
  transform: ${transformInterpolateFn('Y', 1, props)};
`;

const rightStyles = (props: SlideStyleProps) => css`
  transform: ${transformInterpolateFn('X', 1, props)};
`;

const leftStyles = (props: SlideStyleProps) => css`
  transform: ${transformInterpolateFn('X', -1, props)};
`;

const slideAnimationExited: any = (props: SlideStyleProps) => css`
  opacity: 0;
  ${conditionalStyles<SlideStyleProps>('side', {
    top: topStyles,
    bottom: bottomStyles,
    right: rightStyles,
    left: leftStyles,
  })(props)}
`;

const slideAnimationEntered = css`
  opacity: 1;
  transform: translateY(0) translateX(0);
`;

export const SlideAnimation = createInOutAnimation<SlideAnimationProps>({
  exitedStyles: slideAnimationExited,
  enteredStyles: slideAnimationEntered,
});
