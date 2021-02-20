import { css } from 'styled-components';
import { getColor } from '../utils/styleHelpers/getColor';
import { getSpacing } from '../utils/styleHelpers/getSpacing';
import { Style } from '../theme/types';

export interface ButtonBaseStyles {
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
}

export type ButtonBandColorStyles = ButtonColorStyles;
export type ButtonPlainColorStyles = ButtonColorStyles;
export type ButtonNegativeColorStyles = ButtonColorStyles;
export type ButtonPositiveColorStyles = ButtonColorStyles;

export interface ButtonStyles {
  base: ButtonBaseStyles;
  sizes: {
    small: ButtonSizeStyles;
    medium: ButtonSizeStyles;
    large: ButtonSizeStyles;
  };
  brand: ButtonBandColorStyles;
  plain: ButtonPlainColorStyles;
  positive: ButtonNegativeColorStyles;
  negative: ButtonPositiveColorStyles;
}

export const buttonStyles: ButtonStyles = {
  base: {
    borderRadius: getSpacing(0.5),
    icon: {
      gap: getSpacing(1),
      size: {
        small: getSpacing(2.5),
        medium: getSpacing(2.5),
        large: getSpacing(2.5),
      },
    },
    disabled: {
      opacity: 0.4,
    },
    borderSize: 1,
    focus: {
      outlineSize: getSpacing(0.5),
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
        ${getSpacing(0.5)} ${getSpacing(1)}
      `,
    },
    medium: {
      padding: css`
        ${getSpacing(1)} ${getSpacing(1.5)}
      `,
    },
    large: {
      padding: css`
        ${getSpacing(1.5)} ${getSpacing(2.5)}
      `,
    },
  },
  plain: {
    outlineColor: getColor('gray', '50'),
    primary: {
      color: getColor('common', 'black'),
      backgroundColor: getColor('gray', '50'),
      borderColor: getColor('gray', '100'),
      hover: {
        color: getColor('common', 'black'),
        backgroundColor: getColor('gray', '100'),
        borderColor: getColor('gray', '200'),
      },
      active: {
        color: getColor('common', 'black'),
        backgroundColor: getColor('gray', '200'),
        borderColor: getColor('gray', '300'),
      },
    },
    secondary: {
      color: getColor('common', 'black'),
      backgroundColor: 'transparent',
      borderColor: getColor('common', 'black'),
      hover: {
        color: getColor('common', 'black'),
        backgroundColor: getColor('gray', '50'),
        borderColor: getColor('common', 'black'),
      },
      active: {
        color: getColor('common', 'black'),
        backgroundColor: getColor('gray', '100'),
        borderColor: getColor('common', 'black'),
      },
    },
    text: {
      color: getColor('common', 'black'),
      backgroundColor: 'transparent',
      borderColor: 'transparent',
      hover: {
        color: getColor('common', 'black'),
        backgroundColor: getColor('gray', '50'),
        borderColor: 'transparent',
      },
      active: {
        color: getColor('common', 'black'),
        backgroundColor: getColor('gray', '100'),
        borderColor: 'transparent',
      },
    },
  },
  brand: {
    outlineColor: getColor('brand', 'lightest'),
    primary: createShadedButtonPrimaryStyles('brand'),
    secondary: createShadedButtonSecondaryStyles('brand'),
    text: createShadedButtonTextStyles('brand'),
  },
  positive: {
    outlineColor: getColor('positive', 'lightest'),
    primary: createShadedButtonPrimaryStyles('positive'),
    secondary: createShadedButtonSecondaryStyles('positive'),
    text: createShadedButtonTextStyles('positive'),
  },
  negative: {
    outlineColor: getColor('negative', 'lightest'),
    primary: createShadedButtonPrimaryStyles('negative'),
    secondary: createShadedButtonSecondaryStyles('negative'),
    text: createShadedButtonTextStyles('negative'),
  },
};

function createShadedButtonPrimaryStyles(
  color: 'brand' | 'negative' | 'positive'
): ButtonShadedVariantStyles {
  return {
    color: getColor(color, 'contrastText'),
    backgroundColor: getColor(color),
    borderColor: getColor(color),
    hover: {
      color: getColor(color, 'contrastText'),
      backgroundColor: getColor(color, 'dark'),
      borderColor: getColor(color, 'dark'),
    },
    active: {
      color: getColor(color, 'contrastText'),
      backgroundColor: getColor(color, 'darkest'),
      borderColor: getColor(color, 'darkest'),
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
      borderColor: getColor(color, 'darkest'),
    },
    active: {
      ...textStyles.active,
      borderColor: getColor(color, 'darkest'),
    },
    borderColor: getColor(color, 'dark'),
  };
}

function createShadedButtonTextStyles(
  color: 'brand' | 'negative' | 'positive'
): ButtonShadedVariantStyles {
  return {
    color: getColor(color, 'dark'),
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    hover: {
      color: getColor(color, 'darkest'),
      backgroundColor: getColor(color, 'lightest'),
      borderColor: 'transparent',
    },
    active: {
      color: getColor(color, 'darkest'),
      backgroundColor: getColor(color, 'light'),
      borderColor: 'transparent',
    },
  };
}
