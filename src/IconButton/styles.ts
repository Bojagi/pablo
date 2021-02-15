import { Style } from '../theme/types';
import { getColor, getSpacing } from '../utils/styleHelpers';

export interface IconButtonStyles {
  size: {
    small: Style;
    medium: Style;
    large: Style;
  };
  icon: {
    scale: number;
    transition: string[][];
    active: {
      scale: number;
    };
    size: {
      small: Style;
      medium: Style;
      large: Style;
    };
  };
  borderRadius: number;
  backgroundColor: Style;
  color: Style;
  transition: string[][];
  active: {
    backgroundColor: Style;
    color: Style;
  };
  disabled: {
    opacity: number;
  };
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
  icon: {
    scale: 1,
    transition: [['transform', '0.2s']],
    active: {
      scale: 0.833333333,
    },
    size: {
      small: getSpacing(2),
      medium: getSpacing(3),
      large: getSpacing(4),
    },
  },
  borderRadius: 6,
  backgroundColor: 'transparent',
  color: getColor('common', 'black'),
  transition: [
    ['background-color', '0.2s'],
    ['color', '0.2s'],
  ],
  active: {
    backgroundColor: getColor('brand'),
    color: getColor('common', 'white'),
  },
  disabled: {
    opacity: 0.3,
  },
  hover: {
    backgroundColor: getColor('brand', 'light'),
    color: getColor('common', 'black'),
  },
  focus: {
    backgroundColor: getColor('brand', 'light'),
    color: getColor('common', 'black'),
  },
};
