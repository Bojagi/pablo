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
  borderSize: number;
  transitions: string[][];
}

export interface ButtonSizeStyles {
  padding: Style;
}

export interface ButtonPrimaryShadedVariantStyles {
  color: Style;
  backgroundColor: Style;
  borderColor: Style;
  focus: {
    outlineColor: Style;
  };
  hover: {
    color: Style;
    backgroundColor: Style;
    borderColor: Style;
  };
}

export interface ButtonTextShadedVariantStyles {
  color: Style;
  hover: {
    color: Style;
    backgroundColor: Style;
  };
}

export interface ButtonSecondaryShadedVariantStyles extends ButtonTextShadedVariantStyles {
  borderColor: Style;
  focus: {
    outlineColor: Style;
  };
}

export interface ButtonVariantStyles<T> {
  brand: T;
  plain: T;
  positive: T;
  negative: T;
}

export type ButtonPrimaryVariantStyles = ButtonVariantStyles<ButtonPrimaryShadedVariantStyles>;
export type ButtonSecondaryVariantStyles = ButtonVariantStyles<ButtonSecondaryShadedVariantStyles>;
export type ButtonTextVariantStyles = ButtonVariantStyles<ButtonTextShadedVariantStyles>;

export interface ButtonStyles {
  base: ButtonBaseStyles;
  sizes: {
    small: ButtonSizeStyles;
    medium: ButtonSizeStyles;
    large: ButtonSizeStyles;
  };
  primary: ButtonPrimaryVariantStyles;
  secondary: ButtonSecondaryVariantStyles;
  text: ButtonTextVariantStyles;
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
    transitions: [
      ['background-color, 0.3s'],
      ['border-color', '0.3s'],
      ['box-shadow', '0.3s', 'ease-in-out'],
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
  primary: {
    brand: createShadedButtonPrimaryStyles('brand'),
    positive: createShadedButtonPrimaryStyles('positive'),
    negative: createShadedButtonPrimaryStyles('negative'),
    plain: {
      color: getColor('common', 'black'),
      backgroundColor: getColor('gray', '50'),
      borderColor: getColor('gray', '100'),
      focus: {
        outlineColor: getColor('gray', '50'),
      },
      hover: {
        color: getColor('common', 'black'),
        backgroundColor: getColor('gray', '100'),
        borderColor: getColor('gray', '200'),
      },
    },
  },
  secondary: {
    brand: createShadedButtonSecondaryStyles('brand'),
    positive: createShadedButtonSecondaryStyles('positive'),
    negative: createShadedButtonSecondaryStyles('negative'),
    plain: {
      color: getColor('common', 'black'),
      borderColor: getColor('common', 'black'),
      focus: {
        outlineColor: getColor('gray', '50'),
      },
      hover: {
        color: getColor('common', 'black'),
        backgroundColor: getColor('gray', '50'),
      },
    },
  },
  text: {
    brand: createShadedButtonTextStyles('brand'),
    positive: createShadedButtonTextStyles('positive'),
    negative: createShadedButtonTextStyles('negative'),
    plain: {
      color: getColor('common', 'black'),
      hover: {
        color: getColor('common', 'black'),
        backgroundColor: getColor('gray', '50'),
      },
    },
  },
};

function createShadedButtonPrimaryStyles(
  color: 'brand' | 'negative' | 'positive'
): ButtonPrimaryShadedVariantStyles {
  return {
    color: getColor(color, 'contrastText'),
    backgroundColor: getColor(color),
    borderColor: getColor(color),
    focus: {
      outlineColor: getColor(color, 'light'),
    },
    hover: {
      color: getColor(color, 'contrastText'),
      backgroundColor: getColor(color, 'dark'),
      borderColor: getColor(color, 'dark'),
    },
  };
}

function createShadedButtonSecondaryStyles(
  color: 'brand' | 'negative' | 'positive'
): ButtonSecondaryShadedVariantStyles {
  return {
    ...createShadedButtonTextStyles(color),
    focus: {
      outlineColor: getColor(color, 'light'),
    },
    borderColor: getColor(color),
  };
}

function createShadedButtonTextStyles(
  color: 'brand' | 'negative' | 'positive'
): ButtonTextShadedVariantStyles {
  return {
    color: getColor(color),
    hover: {
      color: getColor(color, 'dark'),
      backgroundColor: getColor(color, 'light'),
    },
  };
}
