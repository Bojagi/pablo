import { css } from 'styled-components';
import { getSpacing } from '../styleHelpers/getSpacing';
import { registerComponentStyles } from '../theme/defaultComponentStyles';
import { themeVars } from '../theme/themeVars';
import { Style } from '../theme/types';
import { BaseStyles } from '../types';

export type ButtonStyleProperties =
  | 'icon'
  | 'startIcon'
  | 'endIcon'
  | 'primary'
  | 'secondary'
  | 'text';

export interface ButtonBaseStyles extends BaseStyles<ButtonStyleProperties> {
  icon: {
    gap: Style;
    size: {
      small: Style;
      medium: Style;
      large: Style;
    };
  };
  borderRadius: Style;
  disabled: {
    opacity: number;
  };
  focus: {
    outlineSize: Style;
  };
  active: {
    outlineSize: Style;
    transform: string;
  };
  borderSize: number;
  transitions: string[][];
}

export interface ButtonSizeStyles {
  padding: Style;
}

export interface ButtonShadedVariantStyles {
  color: Style;
  backgroundColor: Style;
  borderColor: Style;
  hover: {
    color: Style;
    backgroundColor: Style;
    borderColor: Style;
  };
  active: {
    color: Style;
    backgroundColor: Style;
    borderColor: Style;
  };
}

export interface ButtonColorStyles {
  outlineColor: Style;
  primary: ButtonShadedVariantStyles;
  secondary: ButtonShadedVariantStyles;
  text: ButtonShadedVariantStyles;
  primaryInverted: ButtonShadedVariantStyles;
  secondaryInverted: ButtonShadedVariantStyles;
  textInverted: ButtonShadedVariantStyles;
}

export type ButtonPlainColorStyles = ButtonColorStyles;
export type ButtonBrandColorStyles = ButtonColorStyles;
export type ButtonNegativeColorStyles = ButtonColorStyles;
export type ButtonPositiveColorStyles = ButtonColorStyles;

export interface ButtonStyles {
  base: ButtonBaseStyles;
  sizes: {
    small: ButtonSizeStyles;
    medium: ButtonSizeStyles;
    large: ButtonSizeStyles;
  };
  brand: ButtonBrandColorStyles;
  plain: ButtonPlainColorStyles;
  positive: ButtonNegativeColorStyles;
  negative: ButtonPositiveColorStyles;
}

export const buttonStyles: ButtonStyles = {
  base: {
    borderRadius: getSpacing(2),
    icon: {
      gap: getSpacing(4),
      size: {
        small: '20px',
        medium: '20px',
        large: '20px',
      },
    },
    disabled: {
      opacity: 0.4,
    },
    borderSize: 1,
    focus: {
      outlineSize: getSpacing(2),
    },
    active: {
      outlineSize: getSpacing(0.5),
      transform: 'scale(0.985)',
    },
    transitions: [
      ['background-color, 0.3s'],
      ['color', '0.3s'],
      ['border-color', '0.3s'],
      ['box-shadow', '0.3s', 'ease-in-out'],
      ['transform, 0.15s'],
    ],
  },
  sizes: {
    small: {
      padding: css`
        5px 8px
      `,
    },
    medium: {
      padding: css`
        10px 14px
      `,
    },
    large: {
      padding: css`
        14px 22px
      `,
    },
  },
  plain: {
    outlineColor: themeVars.colors.gray[50],
    primary: {
      color: themeVars.colors.common.black,
      backgroundColor: themeVars.colors.gray[50],
      borderColor: themeVars.colors.gray[100],
      hover: {
        color: themeVars.colors.common.black,
        backgroundColor: themeVars.colors.gray[100],
        borderColor: themeVars.colors.gray[200],
      },
      active: {
        color: themeVars.colors.common.black,
        backgroundColor: themeVars.colors.gray[200],
        borderColor: themeVars.colors.gray[300],
      },
    },
    primaryInverted: {
      color: themeVars.colors.common.black,
      backgroundColor: themeVars.colors.common.white,
      borderColor: themeVars.colors.common.white,
      hover: {
        color: themeVars.colors.common.black,
        backgroundColor: themeVars.colors.gray[50],
        borderColor: themeVars.colors.gray[50],
      },
      active: {
        color: themeVars.colors.common.black,
        backgroundColor: themeVars.colors.gray[100],
        borderColor: themeVars.colors.gray[100],
      },
    },
    secondary: {
      color: themeVars.colors.common.black,
      backgroundColor: 'transparent',
      borderColor: themeVars.colors.common.black,
      hover: {
        color: themeVars.colors.common.black,
        backgroundColor: themeVars.colors.gray[50],
        borderColor: themeVars.colors.common.black,
      },
      active: {
        color: themeVars.colors.common.black,
        backgroundColor: themeVars.colors.gray[100],
        borderColor: themeVars.colors.common.black,
      },
    },
    secondaryInverted: {
      color: themeVars.colors.common.white,
      backgroundColor: 'transparent',
      borderColor: themeVars.colors.common.white,
      hover: {
        color: themeVars.colors.common.white,
        backgroundColor: themeVars.colors.gray[800],
        borderColor: themeVars.colors.common.white,
      },
      active: {
        color: themeVars.colors.common.white,
        backgroundColor: themeVars.colors.gray[600],
        borderColor: themeVars.colors.common.white,
      },
    },
    text: {
      color: themeVars.colors.common.black,
      backgroundColor: 'transparent',
      borderColor: 'transparent',
      hover: {
        color: themeVars.colors.common.black,
        backgroundColor: themeVars.colors.gray[50],
        borderColor: 'transparent',
      },
      active: {
        color: themeVars.colors.common.black,
        backgroundColor: themeVars.colors.gray[100],
        borderColor: 'transparent',
      },
    },
    textInverted: {
      color: themeVars.colors.common.white,
      backgroundColor: 'transparent',
      borderColor: 'transparent',
      hover: {
        color: themeVars.colors.common.white,
        backgroundColor: themeVars.colors.gray[800],
        borderColor: 'transparent',
      },
      active: {
        color: themeVars.colors.common.white,
        backgroundColor: themeVars.colors.gray[600],
        borderColor: 'transparent',
      },
    },
  },
  brand: {
    outlineColor: themeVars.colors.brand.lightest,
    primary: createShadedButtonPrimaryStyles('brand'),
    primaryInverted: createShadedButtonPrimaryInvertedStyles('brand'),
    secondary: createShadedButtonSecondaryStyles('brand'),
    secondaryInverted: createShadedButtonSecondaryInvertedStyles('brand'),
    text: createShadedButtonTextStyles('brand'),
    textInverted: createShadedButtonTextInvertedStyles('brand'),
  },
  positive: {
    outlineColor: themeVars.colors.positive.lightest,
    primary: createShadedButtonPrimaryStyles('positive'),
    primaryInverted: createShadedButtonPrimaryInvertedStyles('positive'),
    secondary: createShadedButtonSecondaryStyles('positive'),
    secondaryInverted: createShadedButtonSecondaryInvertedStyles('positive'),
    text: createShadedButtonTextStyles('positive'),
    textInverted: createShadedButtonTextInvertedStyles('positive'),
  },
  negative: {
    outlineColor: themeVars.colors.negative.lightest,
    primary: createShadedButtonPrimaryStyles('negative'),
    primaryInverted: createShadedButtonPrimaryInvertedStyles('negative'),
    secondary: createShadedButtonSecondaryStyles('negative'),
    secondaryInverted: createShadedButtonSecondaryInvertedStyles('negative'),
    text: createShadedButtonTextStyles('negative'),
    textInverted: createShadedButtonTextInvertedStyles('negative'),
  },
};

function createShadedButtonPrimaryStyles(
  color: 'brand' | 'negative' | 'positive'
): ButtonShadedVariantStyles {
  return {
    color: themeVars.colors[color].contrastText,
    backgroundColor: themeVars.colors[color].main,
    borderColor: themeVars.colors[color].main,
    hover: {
      color: themeVars.colors[color].contrastText,
      backgroundColor: themeVars.colors[color].dark,
      borderColor: themeVars.colors[color].dark,
    },
    active: {
      color: themeVars.colors[color].contrastText,
      backgroundColor: themeVars.colors[color].darkest,
      borderColor: themeVars.colors[color].darkest,
    },
  };
}

function createShadedButtonPrimaryInvertedStyles(
  color: 'brand' | 'negative' | 'positive'
): ButtonShadedVariantStyles {
  return {
    color: themeVars.colors[color].main,
    backgroundColor: themeVars.colors[color].contrastText,
    borderColor: themeVars.colors[color].contrastText,
    hover: {
      color: themeVars.colors[color].main,
      backgroundColor: themeVars.colors[color].lightest,
      borderColor: themeVars.colors[color].lightest,
    },
    active: {
      color: themeVars.colors[color].main,
      backgroundColor: themeVars.colors[color].light,
      borderColor: themeVars.colors[color].light,
    },
  };
}

function createShadedButtonSecondaryStyles(
  color: 'brand' | 'negative' | 'positive'
): ButtonShadedVariantStyles {
  const textStyles = createShadedButtonTextStyles(color);
  return {
    ...textStyles,
    hover: {
      ...textStyles.hover,
      borderColor: themeVars.colors[color].darkest,
    },
    active: {
      ...textStyles.active,
      borderColor: themeVars.colors[color].darkest,
    },
    borderColor: themeVars.colors[color].dark,
  };
}

function createShadedButtonSecondaryInvertedStyles(
  color: 'brand' | 'negative' | 'positive'
): ButtonShadedVariantStyles {
  const textStyles = createShadedButtonTextInvertedStyles(color);
  return {
    ...textStyles,
    hover: {
      ...textStyles.hover,
      borderColor: themeVars.colors[color].contrastText,
    },
    active: {
      ...textStyles.active,
      borderColor: themeVars.colors[color].contrastText,
    },
    borderColor: themeVars.colors[color].contrastText,
  };
}

function createShadedButtonTextStyles(
  color: 'brand' | 'negative' | 'positive'
): ButtonShadedVariantStyles {
  return {
    color: themeVars.colors[color].dark,
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    hover: {
      color: themeVars.colors[color].darkest,
      backgroundColor: themeVars.colors[color].lightest,
      borderColor: 'transparent',
    },
    active: {
      color: themeVars.colors[color].darkest,
      backgroundColor: themeVars.colors[color].light,
      borderColor: 'transparent',
    },
  };
}

function createShadedButtonTextInvertedStyles(
  color: 'brand' | 'negative' | 'positive'
): ButtonShadedVariantStyles {
  return {
    color: themeVars.colors[color].contrastText,
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    hover: {
      color: themeVars.colors[color].contrastText,
      backgroundColor: themeVars.colors[color].dark,
      borderColor: 'transparent',
    },
    active: {
      color: themeVars.colors[color].contrastText,
      backgroundColor: themeVars.colors[color].darkest,
      borderColor: 'transparent',
    },
  };
}

registerComponentStyles('button', buttonStyles);
