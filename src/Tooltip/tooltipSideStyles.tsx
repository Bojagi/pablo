import { css } from '@emotion/react';
import { getSpacing } from '../styleHelpers/getSpacing';

export const topArrowStyles = css`
  left: 50%;
  transform: scaleY(0.5) translateY(-50%) translateX(-50%) rotateZ(180deg);
`;

export const bottomArrowStyles = (props) => css`
  top: -${getSpacing(5)(props)};
  left: 50%;
  transform: scaleY(0.5) translateY(-50%) translateX(-50%) rotateZ(0deg);
`;

export const rightArrowStyles = (props) => css`
  left: -${getSpacing(5)(props)};
  top: 50%;
  transform: scale(0.5) translateX(-50%) translateY(-100%) rotateZ(270deg);
`;

export const leftArrowStyles = (props) => css`
  right: -${getSpacing(5)(props)};
  top: 50%;
  transform: scale(0.5) translateX(50%) translateY(-100%) rotateZ(90deg);
`;
