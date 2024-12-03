import React, { ReactNode } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { baseStyle } from '../shared/baseStyle';
import { getComponentStyle, getSpacing } from '../styleHelpers';
import { ToastStackSide } from './types';

export interface ToastStackProps {
  side: ToastStackSide;
  children: ReactNode;
}

const ToastStackBox = styled.div<ToastStackProps>`
  ${baseStyle}
  padding: ${getSpacing(1.5)};
  width: ${getComponentStyle(['toastCard', 'width'])};
  position: fixed;
  display: flex;
  z-index: 1100;
  ${(props) => {
    switch (props.side) {
      case 'bottom-right':
        return css`
          bottom: 0;
          flex-direction: column-reverse;
          right: 0;
        `;
      case 'bottom-left':
        return css`
          bottom: 0;
          flex-direction: column-reverse;
          left: 0;
        `;
      case 'top-right':
        return css`
          top: 0;
          flex-direction: column;
          right: 0;
        `;
      case 'top-left':
        return css`
          top: 0;
          flex-direction: column;
          left: 0;
        `;
      default:
        return null;
    }
  }}
`;

export function ToastStack({ children, side }: ToastStackProps) {
  return (
    <ToastStackBox data-testid="pbl-toaststack" side={side}>
      {children}
    </ToastStackBox>
  );
}
