import { css } from 'styled-components';
import { getColor } from '../utils/styleHelpers/getColor';
import { getSpacing } from '../utils/styleHelpers/getSpacing';
import { Style } from '../theme/types';

export interface InputStyles {
  padding: Style;
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

export const inputStyles: InputStyles = {
  padding: css`
    ${getSpacing(0.75)} ${getSpacing(1.5)}
  `,
  fontFamily: (props) => props.theme.typography.base.fontFamily,
  borderWidth: 1,
  borderColor: getColor('borders'),
  backgroundColor: getColor('common', 'white'),
  focus: {
    outlineSize: getSpacing(0.375),
    outlineColor: getColor('brand', 'light'),
  },
  transitions: [
    ['border-color', '0.3s'],
    ['box-shadow', '0.3s', 'ease-in-out'],
  ],
  error: {
    borderColor: getColor('negative'),
    focus: {
      outlineColor: getColor('negative', 'light'),
    },
  },
};
