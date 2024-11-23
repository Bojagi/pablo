import styled from '@emotion/styled';
import { layoutInterpolationFn, LayoutBoxProps } from '../Box';
import { baseStyle } from '../shared/baseStyle';
import { getComponentStyle, shadowTransformer } from '../styleHelpers/getComponentStyle';
import { BaseProps } from '../types';
import { getCustomStyles } from '../utils/useCustomStyles';
import { CardStyleProperties } from './styles';

export interface CardProps extends LayoutBoxProps, BaseProps<CardStyleProperties> {}

export const Card = styled.div<CardProps>`
  ${baseStyle}
  padding: ${getComponentStyle('card.padding')};
  background-color: ${getComponentStyle('card.backgroundColor')};
  color: ${getComponentStyle('card.color')};
  box-shadow: ${getComponentStyle('card.shadow', shadowTransformer)};
  border-radius: ${getComponentStyle('card.borderRadius')};
  ${layoutInterpolationFn}
  ${getCustomStyles('card.styles', 'root')}
`;
