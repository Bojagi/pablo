import React from 'react';
import styled from 'styled-components';
import { BoxProps } from '../Box';
import { useComponentStyle } from '../theme/context';
import { guaranteeArray } from '../utils/guaranteeArray';
import { getComponentStyle } from '../utils/styleHelpers';

export interface ButtonBarProps {
  children: React.ReactElement<BoxProps> | React.ReactElement<BoxProps>[];
}

const ButtonBarBox = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 0 -${getComponentStyle('buttonBar.gap')};
`;

export function ButtonBar({ children }: ButtonBarProps) {
  const gap = useComponentStyle('buttonBar.gap');
  return (
    <ButtonBarBox data-testid="pbl-buttonbar">
      {guaranteeArray(children).map((child, i) =>
        React.cloneElement(child, {
          key: i,
          mx: gap,
        })
      )}
    </ButtonBarBox>
  );
}
