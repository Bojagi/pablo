import { css } from 'styled-components';
import { getColor, getSpacing } from '../../utils/styleHelpers';
import { Style } from '../types';

export interface InputBaseVariantStyles {
  borderColor: Style;
  backgroundColor: Style;
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
export interface InputBaseStyles {
  padding: Style;
  defaultWidth: number | string;
  borderWidth: number;
  fontFamily: Style;
  transitions: string[][];
  outline: InputBaseVariantStyles;
  filled: InputBaseVariantStyles;
}

const filledVariantStyle = {
  borderColor: getColor('borders'),
  backgroundColor: getColor('common', 'white'),
  focus: {
    outlineSize: '3px',
    outlineColor: getColor('brand', 'lightest'),
  },
  error: {
    borderColor: getColor('negative'),
    focus: {
      outlineColor: getColor('negative', 'lightest'),
    },
  },
};

export const inputBaseStyles: InputBaseStyles = {
  defaultWidth: 300,
  padding: css`
    ${getSpacing(3)} ${getSpacing(4)}
  `,
  fontFamily: (props) => props.theme.typography.base.fontFamily,
  borderWidth: 1,
  filled: filledVariantStyle,
  outline: {
    ...filledVariantStyle,
    backgroundColor: 'transparent',
  },
  transitions: [
    ['border-color', '0.3s'],
    ['box-shadow', '0.3s', 'ease-in-out'],
  ],
};
