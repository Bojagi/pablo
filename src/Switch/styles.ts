import { getColor, getSpacing } from '../styleHelpers';
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
  handleTransition: 'background-color 0.15s ease-in-out, transform 0.15s ease-in-out',
  typographyVariant: {
    medium: 'subtitle',
    small: 'paragraph',
  },
};
