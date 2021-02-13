import { getColor } from '../utils/styleHelpers/getColor';
import { getSpacing } from '../utils/styleHelpers/getSpacing';
import { Style } from '../theme/types';
import { TypographyVariant } from '../Typography';

export interface SwitchStyles {
  innerPadding: Style;
  borderWidth: number;
  borderColor: Style;
  backgroundColor: Style;
  handleColorChecked: Style;
  handleColorUnchecked: Style;
  handleSize: {
    medium: Style;
    small: Style;
  };
  focus: {
    outlineSize: Style;
    outlineColor: Style;
  };
  boxTransition: string[][];
  handleTransition: Style;
  typographyVariant: {
    medium: TypographyVariant;
    small: TypographyVariant;
  };
}

export const switchStyles: SwitchStyles = {
  innerPadding: getSpacing(0.25),
  borderWidth: 1,
  borderColor: getColor('borders'),
  backgroundColor: getColor('common', 'white'),
  handleColorChecked: getColor('brand'),
  handleColorUnchecked: getColor('gray', '500'),
  handleSize: {
    medium: getSpacing(2.25),
    small: getSpacing(1.5),
  },
  focus: {
    outlineSize: getSpacing(0.375),
    outlineColor: getColor('brand', 'light'),
  },
  boxTransition: [['box-shadow', '0.3s', 'ease-in-out']],
  handleTransition: 'background-color 0.15s ease-in-out, transform 0.15s ease-in-out',
  typographyVariant: {
    medium: 'subtitle',
    small: 'paragraph',
  },
};
