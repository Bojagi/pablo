import { getSpacing } from '../styleHelpers/getSpacing';
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

export type ButtonColor = 'brand' | 'plain' | 'positive' | 'negative';

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

const black = themeVars.colors.common.black;
const white = themeVars.colors.common.white;
const transparent = 'transparent';
const gray = themeVars.colors.gray;

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
      padding: '5px 8px',
    },
    medium: {
      padding: '10px 14px',
    },
    large: {
      padding: '14px 22px',
    },
  },
  plain: {
    outlineColor: gray[50],
    primary: {
      ...getColorTriple(black, gray[50], gray[100]),
      hover: getColorTriple(black, gray[100], gray[200]),
      active: getColorTriple(black, gray[200], gray[300]),
    },
    primaryInverted: {
      ...getColorTriple(black, white, white),
      hover: getColorTriple(black, gray[50], gray[50]),
      active: getColorTriple(black, gray[100], gray[100]),
    },
    secondary: {
      ...getColorTriple(black, transparent, black),
      hover: getColorTriple(black, gray[50], black),
      active: getColorTriple(black, gray[100], black),
    },
    secondaryInverted: {
      ...getColorTriple(white, transparent, white),
      hover: getColorTriple(white, gray[800], white),
      active: getColorTriple(white, gray[600], white),
    },
    text: {
      ...getColorTriple(black, transparent, transparent),
      hover: getColorTriple(black, gray[50], transparent),
      active: getColorTriple(black, gray[100], transparent),
    },
    textInverted: {
      ...getColorTriple(white, transparent, transparent),
      hover: getColorTriple(white, gray[800], transparent),
      active: getColorTriple(white, gray[600], transparent),
    },
  },
  brand: createButtonColorStyles('brand'),
  positive: createButtonColorStyles('positive'),
  negative: createButtonColorStyles('negative'),
};

function createButtonColorStyles(color: ButtonColor): ButtonColorStyles {
  return {
    outlineColor: themeVars.colors[color].lightest,
    primary: createShadedButtonPrimaryStyles(color),
    primaryInverted: createShadedButtonPrimaryInvertedStyles(color),
    secondary: createShadedButtonSecondaryStyles(color),
    secondaryInverted: createShadedButtonSecondaryInvertedStyles(color),
    text: createShadedButtonTextStyles(color),
    textInverted: createShadedButtonTextInvertedStyles(color),
  };
}

function createShadedButtonPrimaryStyles(color: ButtonColor): ButtonShadedVariantStyles {
  const colors = themeVars.colors[color];
  return {
    ...getColorTriple(colors.contrastText, colors.main, colors.main),
    hover: getColorTriple(colors.contrastText, colors.dark, colors.dark),
    active: getColorTriple(colors.contrastText, colors.darkest, colors.darkest),
  };
}

function createShadedButtonPrimaryInvertedStyles(color: ButtonColor): ButtonShadedVariantStyles {
  const colors = themeVars.colors[color];
  return {
    ...getColorTriple(colors.main, colors.contrastText, colors.contrastText),
    hover: getColorTriple(colors.main, colors.lightest, colors.lightest),
    active: getColorTriple(colors.main, colors.light, colors.light),
  };
}

function createShadedButtonSecondaryStyles(color: ButtonColor): ButtonShadedVariantStyles {
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

function createShadedButtonSecondaryInvertedStyles(color: ButtonColor): ButtonShadedVariantStyles {
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

function createShadedButtonTextStyles(color: ButtonColor): ButtonShadedVariantStyles {
  const colors = themeVars.colors[color];
  return {
    ...getColorTriple(colors.dark, transparent, transparent),
    hover: getColorTriple(colors.darkest, colors.lightest, transparent),
    active: getColorTriple(colors.darkest, colors.light, transparent),
  };
}

function createShadedButtonTextInvertedStyles(color: ButtonColor): ButtonShadedVariantStyles {
  const colors = themeVars.colors[color];
  return {
    ...getColorTriple(colors.contrastText, transparent, transparent),
    hover: getColorTriple(colors.contrastText, colors.dark, transparent),
    active: getColorTriple(colors.contrastText, colors.darkest, transparent),
  };
}

function getColorTriple(color: string, backgroundColor: string, borderColor: string) {
  return {
    color,
    backgroundColor,
    borderColor,
  };
}
