import { Style } from '../theme/types';
import { getColor } from '../styleHelpers';
import { BaseStyles } from '../types';
import { Colors } from '../theme/colors';

export type IconButtonStyleProperties = 'root' | 'hover' | 'active' | 'focus';

export interface IconButtonColorStyles {
  backgroundColor: Style;
  color: Style;
  active: {
    backgroundColor: Style;
    color: Style;
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

export interface IconButtonStyles extends BaseStyles<IconButtonStyleProperties> {
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
  borderRadius: Style;
  transition: string[][];
  plain: IconButtonColorStyles;
  brand: IconButtonColorStyles;
  positive: IconButtonColorStyles;
  negative: IconButtonColorStyles;
  disabled: {
    opacity: number;
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
  borderRadius: '6px',
  plain: {
    backgroundColor: 'transparent',
    color: getColor('common', 'black'),
    active: {
      backgroundColor: getColor('brand'),
      color: getColor('common', 'white'),
    },
    hover: {
      backgroundColor: getColor('blackOpacity', '50'),
      color: getColor('common', 'black'),
    },
    focus: {
      backgroundColor: getColor('blackOpacity', '100'),
      color: getColor('common', 'black'),
    },
  },
  brand: getIconButtonColorConfig('brand', getColor('common', 'white')),
  positive: getIconButtonColorConfig('positive', getColor('common', 'white')),
  negative: getIconButtonColorConfig('negative', getColor('common', 'white')),
  transition: [
    ['background-color', '0.2s'],
    ['color', '0.2s'],
  ],
  disabled: {
    opacity: 0.3,
  },
};

function getIconButtonColorConfig(colorName: keyof Colors, contrastColor: Style) {
  return {
    backgroundColor: 'transparent',
    color: getColor(colorName),
    active: {
      backgroundColor: getColor(colorName),
      color: contrastColor,
    },
    hover: {
      backgroundColor: getColor(colorName, 'lightest'),
      color: getColor(colorName, 'dark'),
    },
    focus: {
      backgroundColor: getColor(colorName, 'light'),
      color: getColor(colorName, 'dark'),
    },
  };
}
