import { Style } from '../theme/types';
import { BaseStyles } from '../types';
import { themeVars } from '../theme/themeVars';
import { registerComponentStyles } from '../theme/defaultComponentStyles';

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
    color: themeVars.colors.common.black,
    active: {
      backgroundColor: themeVars.colors.brand.main,
      color: themeVars.colors.common.white,
    },
    hover: {
      backgroundColor: themeVars.colors.blackOpacity[50],
      color: themeVars.colors.common.black,
    },
    focus: {
      backgroundColor: themeVars.colors.blackOpacity[100],
      color: themeVars.colors.common.black,
    },
  },
  brand: getIconButtonColorConfig('brand', themeVars.colors.common.white),
  positive: getIconButtonColorConfig('positive', themeVars.colors.common.white),
  negative: getIconButtonColorConfig('negative', themeVars.colors.common.white),
  transition: [
    ['background-color', '0.2s'],
    ['color', '0.2s'],
  ],
  disabled: {
    opacity: 0.3,
  },
};

function getIconButtonColorConfig(colorName: string, contrastColor: Style) {
  return {
    backgroundColor: 'transparent',
    color: themeVars.colors[colorName].main,
    active: {
      backgroundColor: themeVars.colors[colorName].main,
      color: contrastColor,
    },
    hover: {
      backgroundColor: themeVars.colors[colorName].lightest,
      color: themeVars.colors[colorName].dark,
    },
    focus: {
      backgroundColor: themeVars.colors[colorName].light,
      color: themeVars.colors[colorName].dark,
    },
  };
}

registerComponentStyles('iconButton', iconButtonStyles);
