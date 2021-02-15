import { Style } from '../theme/types';
import { getColor, getSpacing } from '../utils/styleHelpers';

export interface IconButtonStyles {
  size: {
    small: Style;
    medium: Style;
    large: Style;
  };
  borderRadius: number;
  backgroundColor: Style;
  color: Style;
  buttonTransition: string[][];
  iconTransition: string[][];
  hover: {
    backgroundColor: Style;
    color: Style;
  };
  focus: {
    backgroundColor: Style;
    color: Style;
  };
}

export const iconButtonStyles: IconButtonStyles = {
  size: {
    small: getSpacing(3),
    medium: getSpacing(4),
    large: getSpacing(5),
  },
  borderRadius: 6,
  backgroundColor: 'transparent',
  color: getColor('common', 'black'),
  buttonTransition: [
    ['background-color', '0.2s'],
    ['color', '0.2s'],
  ],
  iconTransition: [['transform', '0.2s']],
  hover: {
    backgroundColor: getColor('brand', 'light'),
    color: getColor('common', 'black'),
  },
  focus: {
    backgroundColor: getColor('brand', 'light'),
    color: getColor('common', 'black'),
  },
};
