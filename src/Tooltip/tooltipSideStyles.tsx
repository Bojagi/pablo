import { css } from 'styled-components';
import { getComponentStyle } from '../styleHelpers';
import { getSpacing } from '../styleHelpers/getSpacing';

const transformInterpolateFn = (axis: 'Y' | 'X', directionMultiplier: -1 | 1) => (props) =>
  props.isVisible ? `translate${axis}(0)` : `translate${axis}(${directionMultiplier * 25}%)`;

const gapStyle = css`
  ${getComponentStyle('tooltip.gap')}
`;

export const topStyles = css`
  bottom: ${gapStyle};
  transform: ${transformInterpolateFn('Y', 1)};
`;

export const bottomStyles = css`
  top: ${gapStyle};
  transform: ${transformInterpolateFn('Y', -1)};
`;

export const rightStyles = css`
  left: ${gapStyle};
  transform: ${transformInterpolateFn('X', 1)};
`;

export const leftStyles = css`
  right: ${gapStyle};
  transform: ${transformInterpolateFn('X', -1)};
`;

export const topArrowStyles = css`
  left: 50%;
  transform: scaleY(0.5) translateY(-50%) translateX(-50%) rotateZ(180deg);
`;

export const bottomArrowStyles = css`
  top: -${getSpacing(5)};
  left: 50%;
  transform: scaleY(0.5) translateY(-50%) translateX(-50%) rotateZ(0deg);
`;

export const rightArrowStyles = css`
  left: -${getSpacing(5)};
  top: 50%;
  transform: scale(0.5) translateX(-50%) translateY(-100%) rotateZ(270deg);
`;

export const leftArrowStyles = css`
  right: -${getSpacing(5)};
  top: 50%;
  transform: scale(0.5) translateX(50%) translateY(-100%) rotateZ(90deg);
`;
