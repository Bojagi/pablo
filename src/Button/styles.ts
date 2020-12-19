import { css } from "styled-components";
import { getColor, getSpacing } from "../styleHelpers";
import { Style } from "../theme/types";

export interface ButtonBaseStyles {
  iconGap: number;
  borderRadius: Style;
  disabled: {
    opacity: number;
  },
  borderSize: number;
  padding: Style;
  transitions: string[][];
}

export interface ButtonPrimaryShadedVariantStyles {
  color: Style;
  backgroundColor: Style;
  borderColor: Style;
  hover: {
    color: Style;
    backgroundColor: Style;
    borderColor: Style;
  },
}

export interface ButtonPrimaryVariantStyles {
  brand: ButtonPrimaryShadedVariantStyles;
  positive: ButtonPrimaryShadedVariantStyles;
  negative: ButtonPrimaryShadedVariantStyles;
  black: ButtonPrimaryShadedVariantStyles;
}

export interface ButtonSecondaryShadedVariantStyles extends ButtonTextShadedVariantStyles {
  borderColor: Style;
}

export interface ButtonSecondaryVariantStyles {
  brand: ButtonSecondaryShadedVariantStyles;
  positive: ButtonSecondaryShadedVariantStyles;
  negative: ButtonSecondaryShadedVariantStyles;
  black: ButtonSecondaryShadedVariantStyles;
}

export interface ButtonTextShadedVariantStyles {
  color: Style;
  hover: {
    backgroundColor: Style;
  },
}

export interface ButtonTextVariantStyles {
  brand: ButtonTextShadedVariantStyles;
  positive: ButtonTextShadedVariantStyles;
  negative: ButtonTextShadedVariantStyles;
  black: ButtonTextShadedVariantStyles;
}

export interface ButtonStyles {
  base: ButtonBaseStyles;
  primary: ButtonPrimaryVariantStyles;
  secondary: ButtonSecondaryVariantStyles;
  text: ButtonTextVariantStyles;
}

export const buttonStyles = {
  base: {
    iconGap: 1,
    borderRadius: getSpacing(0.5),
    disabled: {
      opacity: 0.4,
    },
    borderSize: 1,
    padding: css`${getSpacing(0.5)} ${getSpacing(1)}`,
    transitions: [
      ['background-color, 0.3s'],
      ['border-color', '0.3s'],
    ],
  },
  primary: {
    brand: createShadedButtonPrimaryStyles('brand'),
    positive: createShadedButtonPrimaryStyles('positive'),
    negative: createShadedButtonPrimaryStyles('negative'),
    black: {
      color: getColor('common', 'blackContrastText'),
      backgroundColor: getColor('common', 'black'),
      borderColor: getColor('common', 'black'),
      hover: {
        color: getColor('common', 'blackContrastText'),
        backgroundColor: getColor('common', 'black'),
        borderColor: getColor('common', 'black'),
      },
    },
  },
  secondary: {
    brand: createShadedButtonSecondaryStyles('brand'),
    positive: createShadedButtonSecondaryStyles('positive'),
    negative: createShadedButtonSecondaryStyles('negative'),
    black: {
      color: getColor('common', 'black'),
      borderColor: getColor('common', 'black'),
      hover: {
        backgroundColor: getColor('common', 'black'),
      },
    },
  },
  text: {
    brand: createShadedButtonTextStyles('brand'),
    positive: createShadedButtonTextStyles('positive'),
    negative: createShadedButtonTextStyles('negative'),
    black: {
      color: getColor('common', 'black'),
      hover: {
        backgroundColor: getColor('common', 'black'),
      },
    },
  },
};

function createShadedButtonPrimaryStyles(color: 'brand' | 'negative' | 'positive'): ButtonPrimaryShadedVariantStyles {
  return {
    color: getColor(color, 'contrastText'),
    backgroundColor: getColor(color),
    borderColor: getColor(color),
    hover: {
      color: getColor(color, 'contrastText'),
      backgroundColor: getColor(color, 'dark'),
      borderColor: getColor(color, 'dark'),
    },
  }
}

function createShadedButtonSecondaryStyles(color: 'brand' | 'negative' | 'positive'): ButtonSecondaryShadedVariantStyles {
  return {
    ...createShadedButtonTextStyles(color),
    borderColor: getColor(color),
  }
}

function createShadedButtonTextStyles(color: 'brand' | 'negative' | 'positive'): ButtonTextShadedVariantStyles {
  return {
    color: getColor(color),
    hover: {
      backgroundColor: getColor(color, 'light'),
    },
  }
}
