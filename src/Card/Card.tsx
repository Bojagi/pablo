import styled from 'styled-components';
import { boxInterpolateFn, BoxProps } from '../Box';
import { getComponentStyle, shadowTransformer } from '../utils/styleHelpers/getComponentStyle';

export const Card = styled.div<BoxProps>`
  padding: ${getComponentStyle('card.padding')};
  background-color: ${getComponentStyle('card.backgroundColor')};
  color: ${getComponentStyle('card.color')};
  box-shadow: ${getComponentStyle('card.shadow', shadowTransformer)};
  border-radius: ${getComponentStyle('card.borderRadius')};
  ${boxInterpolateFn}
`;
