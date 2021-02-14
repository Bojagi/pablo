import { css } from 'styled-components';
import { getComponentStyle } from '../utils/styleHelpers';
import { getSpacing } from '../utils/styleHelpers/getSpacing';

export const topStyles = css`
  left: 50%;
  bottom: calc(${getComponentStyle('tooltip.gap')} + ${(props: any) => props.contentHeight}px);
  transform: ${(props: any) => (props.isVisible ? 'translateY(0)' : 'translateY(25%)')}
    translateX(-50%);
`;
export const bottomStyles = css`
  left: 50%;
  top: calc(${getComponentStyle('tooltip.gap')} + ${(props: any) => props.contentHeight}px);
  transform: ${(props: any) => (props.isVisible ? 'translateY(0)' : 'translateY(-25%)')}
    translateX(-50%);
`;
export const rightStyles = css`
  top: 50%;
  left: calc(${getComponentStyle('tooltip.gap')} + ${(props: any) => props.contentWidth}px);
  transform: ${(props: any) => (props.isVisible ? 'translateX(0)' : 'translateX(25%)')}
    translateY(-50%);
`;
export const leftStyles = css`
  top: 50%;
  right: calc(${getComponentStyle('tooltip.gap')} + ${(props: any) => props.contentWidth}px);
  transform: ${(props: any) => (props.isVisible ? 'translateX(0)' : 'translateX(-25%)')}
    translateY(-50%);
`;
export const topArrowStyles = css`
  left: 50%;
  transform: scaleY(0.5) translateY(-50%) translateX(-50%) rotateZ(180deg);
`;
export const bottomArrowStyles = css`
  top: -${getSpacing(1.5)};
  left: 50%;
  transform: scaleY(0.5) translateY(-50%) translateX(-50%) rotateZ(0deg);
`;
export const rightArrowStyles = css`
  left: -${getSpacing(1.5)};
  top: 50%;
  transform: scale(0.5) translateX(-50%) translateY(-100%) rotateZ(270deg);
`;
export const leftArrowStyles = css`
  right: -${getSpacing(1.5)};
  top: 50%;
  transform: scale(0.5) translateX(50%) translateY(-100%) rotateZ(90deg);
`;
