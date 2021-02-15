import React from 'react';
import styled from 'styled-components';
import { BoxProps } from '../Box';
import { guaranteeArray } from '../utils/guaranteeArray';
import { getComponentStyle } from '../utils/styleHelpers';

export interface ButtonBarProps {
  children: React.ReactElement<BoxProps>[];
}

const ButtonBarBox = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 0 -${getComponentStyle('buttonBar.gap')};
`;

const ButtonBarItem = styled.div`
  margin: 0 ${getComponentStyle('buttonBar.gap')};
`;

export function ButtonBar({ children }: ButtonBarProps) {
  return (
    <ButtonBarBox>
      {guaranteeArray(children).map((child, i) => (
        <ButtonBarItem key={i}>{child}</ButtonBarItem>
      ))}
    </ButtonBarBox>
  );
}
