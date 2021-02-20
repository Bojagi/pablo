import { css } from 'styled-components';
import { getColor, getSpacing } from '../../utils/styleHelpers';
import { Style } from '../types';

export interface InputBaseStyles {
  padding: Style;
  defaultWidth: number | string;
  borderWidth: number;
  borderColor: Style;
  backgroundColor: Style;
  fontFamily: Style;
  transitions: string[][];
  focus: {
    outlineSize: Style;
    outlineColor: Style;
  };
  error: {
    borderColor: Style;
    focus: {
      outlineColor: Style;
    };
  };
}

export const inputBaseStyles: InputBaseStyles = {
  defaultWidth: 300,
  padding: css`
    ${getSpacing(0.75)} ${getSpacing(1.5)}
  `,
  fontFamily: (props) => props.theme.typography.base.fontFamily,
  borderWidth: 1,
  borderColor: getColor('borders'),
  backgroundColor: getColor('common', 'white'),
  focus: {
    outlineSize: getSpacing(0.375),
    outlineColor: getColor('brand', 'lightest'),
  },
  transitions: [
    ['border-color', '0.3s'],
    ['box-shadow', '0.3s', 'ease-in-out'],
  ],
  error: {
    borderColor: getColor('negative'),
    focus: {
      outlineColor: getColor('negative', 'lightest'),
    },
  },
};
