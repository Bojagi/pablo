import { css } from 'styled-components';
import { getColor } from '../styleHelpers';
import { PabloThemeableProps } from '../theme';
import { BorderColors } from '../theme/colors';

// eslint-disable-next-line no-use-before-define
type BorderType = boolean | keyof BoxBorderProps | string;

export interface BoxBorderProps {
  border?: BorderType;
  borderTop?: BorderType;
  borderRight?: BorderType;
  borderBottom?: BorderType;
  borderLeft?: BorderType;
}

export const borderInterpolateFn = (props: PabloThemeableProps & BoxBorderProps) => css`
  ${props.border && getBorderStyle(props.border, 'border')}
  ${props.borderTop && getBorderStyle(props.borderTop, 'border-top')}
  ${props.borderRight && getBorderStyle(props.borderRight, 'border-right')}
  ${props.borderBottom && getBorderStyle(props.borderBottom, 'border-bottom')}
  ${props.borderLeft && getBorderStyle(props.borderLeft, 'border-left')}
`;

function buildBorderStyle(property: string, variant: keyof BorderColors = 'main') {
  return (props) => `${property}: 1px solid ${getColor('borders', variant)(props)};`;
}

function getBorderStyle(value: BorderType, property: string) {
  if (value === true) {
    return buildBorderStyle(property);
  }

  if (value === 'main' || value === 'light') {
    return buildBorderStyle(property, value);
  }

  return `${property}: ${value}`;
}
