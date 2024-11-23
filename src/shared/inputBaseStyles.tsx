import { css } from '@emotion/react';
import { getSpacing } from '../styleHelpers';
import { themeVars } from '../theme/themeVars';
import { Style } from '../theme/types';

export interface InputBaseVariantStyles {
  borderColor: Style;
  backgroundColor: Style;
  focus: {
    outlineSize: Style;
    outlineColor: Style;
  };
  error: {
    borderColor: Style;
    focus: {
      outlineColor: Style;
    };
  };
}
export interface InputBaseStyles {
  padding: Style;
  defaultWidth: number | string;
  borderWidth: number;
  fontFamily: Style;
  transitions: string[][];
  borderRadius: Style;
  outline: InputBaseVariantStyles;
  filled: InputBaseVariantStyles;
}

const filledVariantStyle = {
  borderColor: themeVars.colors.borders.main,
  backgroundColor: themeVars.colors.common.white,
  focus: {
    outlineSize: '3px',
    outlineColor: themeVars.colors.brand.lightest,
  },
  error: {
    borderColor: themeVars.colors.negative.main,
    focus: {
      outlineColor: themeVars.colors.negative.lightest,
    },
  },
};

export const inputBaseStyles: InputBaseStyles = {
  defaultWidth: 300,
  padding: (props) => css`
    ${getSpacing(0.75)(props)} ${getSpacing(1)(props)}
  `,
  borderRadius: '8px',
  fontFamily: themeVars.typography.base.fontFamily,
  borderWidth: 1,
  filled: filledVariantStyle,
  outline: {
    ...filledVariantStyle,
    backgroundColor: 'transparent',
  },
  transitions: [
    ['border-color', '0.3s'],
    ['box-shadow', '0.3s', 'ease-in-out'],
  ],
};
