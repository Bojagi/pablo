import { getSpacing } from '../styleHelpers';
import { Style } from '../theme/types';
import { themeVars } from '../theme/themeVars';
import { TypographyVariants } from '../theme/typography';

export interface CheckableBaseStyles {
  innerPadding: {
    medium: Style;
    small: Style;
  };
  borderWidth: number;
  borderColor: Style;
  backgroundColor: Style;
  handleSize: {
    medium: Style;
    small: Style;
  };
  focus: {
    outlineSize: Style;
    outlineColor: Style;
  };
  boxTransition: string[][];
  handleTransition: string[][];
  typographyVariant: {
    medium: TypographyVariants;
    small: TypographyVariants;
  };
}

export const checkableBaseStyles: CheckableBaseStyles = {
  innerPadding: {
    medium: getSpacing(1, true),
    small: getSpacing(1, true),
  },
  borderWidth: 1,
  borderColor: themeVars.colors.borders.main,
  backgroundColor: themeVars.colors.common.white,
  handleSize: {
    medium: getSpacing(3, true),
    small: getSpacing(2, true),
  },
  focus: {
    outlineSize: '3px',
    outlineColor: themeVars.colors.brand.lightest,
  },
  boxTransition: [['box-shadow', '0.3s', 'ease-in-out']],
  handleTransition: [['transform', '0.15s', 'cubic-bezier(0.34, 1.56, 0.64, 1)']],
  typographyVariant: {
    medium: 'body',
    small: 'body',
  },
};
