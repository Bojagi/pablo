import styled from 'styled-components';
import { layoutInterpolationFn, LayoutBoxProps } from '../Box';
import { getComponentStyle, shadowTransformer } from '../styleHelpers/getComponentStyle';

export const Card = styled.div<LayoutBoxProps>`
  padding: ${getComponentStyle('card.padding')};
  background-color: ${getComponentStyle('card.backgroundColor')};
  color: ${getComponentStyle('card.color')};
  box-shadow: ${getComponentStyle('card.shadow', shadowTransformer)};
  border-radius: ${getComponentStyle('card.borderRadius')};
  ${layoutInterpolationFn}
`;
