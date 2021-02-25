import React, { forwardRef } from 'react';
import styled from 'styled-components';
import { BoxProps, LayoutBoxProps } from '../Box';
import { useComponentStyle } from '../theme/useComponentStyle';
import { guaranteeArray } from '../utils/guaranteeArray';
import { getComponentStyle } from '../styleHelpers';

export interface ButtonBarProps extends LayoutBoxProps {
  children: React.ReactElement<BoxProps> | React.ReactElement<BoxProps>[];
}

const ButtonBarBox = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 0 -${getComponentStyle('buttonBar.gap')};
`;

export const ButtonBar = forwardRef<HTMLDivElement, ButtonBarProps>(
  ({ children, ...props }: ButtonBarProps, ref) => {
    const gap = useComponentStyle('buttonBar.gap');
    return (
      <ButtonBarBox ref={ref} data-testid="pbl-buttonbar" {...props}>
        {guaranteeArray(children).map((child, i) =>
          React.cloneElement(child, {
            key: i,
            mx: gap,
          })
        )}
      </ButtonBarBox>
    );
  }
);
