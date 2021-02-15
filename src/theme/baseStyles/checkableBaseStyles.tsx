import { TypographyVariant } from '../../Typography';
import { getColor, getSpacing } from '../../utils/styleHelpers';
import { Style } from '../types';

export interface CheckableBaseStyles {
  innerPadding: {
    medium: Style;
    small: Style;
  };
  borderWidth: number;
  borderColor: Style;
  backgroundColor: Style;
  handleSize: {
    medium: Style;
    small: Style;
  };
  focus: {
    outlineSize: Style;
    outlineColor: Style;
  };
  boxTransition: string[][];
  handleTransition: string[][];
  typographyVariant: {
    medium: TypographyVariant;
    small: TypographyVariant;
  };
}

export const checkableBaseStyles: CheckableBaseStyles = {
  innerPadding: {
    medium: getSpacing(0.75),
    small: getSpacing(0.5),
  },
  borderWidth: 1,
  borderColor: getColor('borders'),
  backgroundColor: getColor('common', 'white'),
  handleSize: {
    medium: getSpacing(1.5),
    small: getSpacing(1),
  },
  focus: {
    outlineSize: getSpacing(0.375),
    outlineColor: getColor('brand', 'light'),
  },
  boxTransition: [['box-shadow', '0.3s', 'ease-in-out']],
  handleTransition: [['transform', '0.15s', 'cubic-bezier(0.34, 1.56, 0.64, 1)']],
  typographyVariant: {
    medium: 'subtitle',
    small: 'paragraph',
  },
};