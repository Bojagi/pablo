import styled from '@emotion/styled';
import { baseStyle } from '../shared/baseStyle';
import { CssFunctionReturn } from '../types';
import { css } from '@emotion/react';

export interface ArrowProps {
  size: number;
  color: string;
  positionMatch: string | null;
  customCss?: CssFunctionReturn;
}

export const PopoverArrow = styled.div<ArrowProps>`
  ${baseStyle}
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  ${(props) => {
    console.log(props.positionMatch);
    return '';
  }}
  position: fixed;
  &:after {
    ${baseStyle}
    content: '';
    position: absolute;
    /* top: -${(props) => props.size}px; */
    left: -${(props) => props.size * 0.5}px;
    border-left: ${(props) => props.size}px solid transparent;
    border-right: ${(props) => props.size}px solid transparent;
    border-bottom: ${(props) => props.size}px solid ${(props) => props.color};
    ${(props) => props.customCss}
  }

  ${(props) =>
    props.positionMatch?.startsWith('t') &&
    css`
      &:after {
        bottom: 0;
        transform: rotate(180deg);
      }
    `}

  ${(props) =>
    props.positionMatch?.startsWith('b') &&
    css`
      &:after {
        top: -${props.size}px;
      }
    `}

    ${(props) =>
    props.positionMatch?.startsWith('l') &&
    css`
      &:after {
        left: -${props.size * 0.5}px;
        transform: rotate(90deg) scaleX(0.75);
      }
    `}

    ${(props) =>
    props.positionMatch?.startsWith('r') &&
    css`
      &:after {
        left: -${props.size * 1.5}px;
        transform: rotate(-90deg) scaleX(0.75);
      }
    `}
`;
