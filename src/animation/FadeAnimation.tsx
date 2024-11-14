import { css, Interpolation } from 'styled-components';
import { createInOutAnimation, InOutAnimationProps } from './InOutAnimation';

const fadeAnimationBase: any = css<FadeAnimationProps>`
  transition: ${(props) => css`opacity ${props.duration}ms`};
  opacity: 0;
`;

const fadeAnimationEnter = css`
  opacity: 1;
  transform: translateY(0) translateX(0);
`;

const fadeAnimationExit = css`
  opacity: 0;
` as Interpolation<any>;

export interface FadeAnimationProps extends InOutAnimationProps {}

export const FadeAnimation = createInOutAnimation<FadeAnimationProps>({
  baseStyles: fadeAnimationBase,
  enterStyles: fadeAnimationEnter,
  exitStyles: fadeAnimationExit,
});
