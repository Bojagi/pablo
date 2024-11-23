import React, { forwardRef, cloneElement } from 'react';
import styled from '@emotion/styled';
import { BoxProps, LayoutBoxProps } from '../Box';
import { useComponentStyle } from '../theme/useComponentStyle';
import { guaranteeArray } from '../utils/guaranteeArray';
import { getComponentStyle } from '../styleHelpers';
import { getCustomStyles } from '../utils/useCustomStyles';
import { ButtonBarStyleProperties } from './styles';
import { BaseProps } from '../types';
import { baseStyle } from '../shared/baseStyle';

export interface ButtonBarProps extends BaseProps<ButtonBarStyleProperties>, LayoutBoxProps {
  children: React.ReactElement<BoxProps> | React.ReactElement<BoxProps>[];
}

const ButtonBarBox = styled.div`
  ${baseStyle}
  display: flex;
  justify-content: flex-end;
  margin: 0 -${getComponentStyle('buttonBar.gap')};
  ${getCustomStyles('buttonBar.styles', 'root')}
`;

export const ButtonBar = forwardRef<HTMLDivElement, ButtonBarProps>(
  ({ children, ...props }: ButtonBarProps, ref) => {
    const gap = useComponentStyle('buttonBar.gap');
    return (
      <ButtonBarBox ref={ref} data-testid="pbl-buttonbar" {...props}>
        {guaranteeArray(children).map((child, i) =>
          cloneElement(child, {
            key: i,
            mx: gap,
          })
        )}
      </ButtonBarBox>
    );
  }
);
