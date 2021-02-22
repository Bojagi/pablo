import { Style } from '../theme/types';
import { getColor } from '../utils/styleHelpers';

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
    small: '24px',
    medium: '32px',
    large: '40px',
  },
  icon: {
    scale: 1,
    transition: [['transform', '0.2s']],
    active: {
      scale: 0.833333333,
    },
    size: {
      small: '20px',
      medium: '28px',
      large: '36px',
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
    backgroundColor: getColor('blackOpacity', '50'),
    color: getColor('common', 'black'),
  },
  focus: {
    backgroundColor: getColor('blackOpacity', '100'),
    color: getColor('common', 'black'),
  },
};
