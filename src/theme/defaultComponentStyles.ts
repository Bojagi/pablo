import { css } from "styled-components";
import { getColor, getSpacing } from "../styleHelpers";

export const defaultComponentStyles = {
  card: {
    padding: getSpacing(2),
    borderRadius: getSpacing(1),
    backgroundColor: getColor('common', 'white'),
    color: getColor('common', 'whiteContrastText'),
  },
  tabs: {
    tab: {
      color: getColor('common', 'black'),
      padding: css`${getSpacing(1)} ${getSpacing(1.5)} ${getSpacing(1.5)}`,
      hover: {
        backgroundColor: getColor('brand', 'light'),
      },
      active: {
        color: getColor('brand'),
        bottomBorder: {
          color: getColor('brand'),
          thickness: getSpacing(0.5),
          gap: getSpacing(1),
          radius: getSpacing(0.5),
        }
      },
    }
  },
  sidebarNav: {
    item: {
      active: {
        backgroundColor: getColor('brand', 'light'),
      },
      hover: {
        backgroundColor: getColor('brand', 'light'),
      },
    },
  },
  button: {
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
          color: getColor('common', 'black'),
          borderColor: getColor('common', 'black'),
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
          background: getColor('common', 'black'),
        },
      },
    },
  },
}

function createShadedButtonPrimaryStyles(color: 'brand' | 'negative' | 'positive') {
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

function createShadedButtonSecondaryStyles(color: 'brand' | 'negative' | 'positive') {
  return {
    ...createShadedButtonTextStyles(color),
    borderColor: getColor(color),
  }
}

function createShadedButtonTextStyles(color: 'brand' | 'negative' | 'positive') {
  return {
    color: getColor(color),
    hover: {
      backgroundColor: getColor(color, 'light'),
    },
  }
}
