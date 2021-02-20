import { css } from 'styled-components';
import { getColor } from '../utils/styleHelpers/getColor';
import { interpolateFnFactory } from './interpolateFnFactory';

type BorderType = true | keyof BoxBorderProps | string;

export interface BoxBorderProps {
  border?: BorderType;
  borderTop?: BorderType;
  borderRight?: BorderType;
  borderBottom?: BorderType;
  borderLeft?: BorderType;
}

export const borderInterpolateFn = interpolateFnFactory<BoxBorderProps>(
  ['border', 'border', buildBorderStyle],
  ['borderTop', 'border-top', buildBorderStyle],
  ['borderRight', 'border-right', buildBorderStyle],
  ['borderBottom', 'border-bottom', buildBorderStyle],
  ['borderLeft', 'border-left', buildBorderStyle]
);

function buildBorderStyle(value) {
  if (value === true || value === 'main' || value === 'lightest') {
    return css`1px solid ${getBorderColor(value)}`;
  }

  return value;
}

function getBorderColor(value: BorderType) {
  if (value === true) {
    return getColor('borders', 'main');
  }

  return getColor('borders', value);
}
