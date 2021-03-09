import { css } from 'styled-components';
import { getSpacing } from '../styleHelpers/getSpacing';

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
