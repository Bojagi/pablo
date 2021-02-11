import { getColor, getSpacing } from '../styleHelpers';
import { Style } from '../theme/types';

export interface CheckboxStyles {
  innerPadding: {
    medium: Style;
    small: Style;
  };
  borderWidth: number;
  borderColor: Style;
  backgroundColor: Style;
  handleColor: Style;
  innerBorderRadius: Style | string;
  outerBorderRadius: Style | string;
  handleSize: {
    medium: Style;
    small: Style;
  };
  handleTransition: Style;
}

export const checkboxStyles: CheckboxStyles = {
  innerPadding: {
    medium: getSpacing(0.75),
    small: getSpacing(0.5),
  },
  borderWidth: 1,
  borderColor: getColor('borders'),
  backgroundColor: getColor('common', 'white'),
  handleColor: getColor('brand'),
  handleSize: {
    medium: getSpacing(1.5),
    small: getSpacing(1),
  },
  innerBorderRadius: '3px',
  outerBorderRadius: '4px',
  handleTransition: 'transform 0.15s cubic-bezier(0.34, 1.56, 0.64, 1)',
};
