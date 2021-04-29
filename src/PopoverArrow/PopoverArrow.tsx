import styled from 'styled-components';
import { baseStyle } from '../shared/baseStyle';
import { CssFunctionReturn } from '../types';

export interface ArrowProps {
  size: number;
  color: string;
  customCss?: CssFunctionReturn;
}

export const PopoverArrow = styled.div<ArrowProps>`
  ${baseStyle}
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  &:after {
    ${baseStyle}
    content: '';
    position: absolute;
    top: -${(props) => props.size};
    left: -${(props) => props.size * 0.5}px;
    border-left: ${(props) => props.size}px solid transparent;
    border-right: ${(props) => props.size}px solid transparent;
    border-bottom: ${(props) => props.size}px solid ${(props) => props.color};
    ${(props) => props.customCss}
  }

  *[data-popper-placement^='top'] & {
    bottom: -${(props) => props.size}px;
    &:after {
      transform: rotate(180deg);
    }
  }

  *[data-popper-placement^='bottom'] & {
    top: -${(props) => props.size}px;
  }

  *[data-popper-placement^='left'] & {
    right: -${(props) => props.size}px;
    &:after {
      transform: rotate(90deg) scaleX(0.75);
    }
  }

  *[data-popper-placement^='right'] & {
    left: -${(props) => props.size}px;
    &:after {
      transform: rotate(-90deg) scaleX(0.75);
    }
  }
`;
