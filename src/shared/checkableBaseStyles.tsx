import { TypographyVariant } from '../Typography';
import { getSpacing } from '../styleHelpers';
import { Style } from '../theme/types';
import { themeVars } from '../theme/themeVars';

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
    medium: TypographyVariant;
    small: TypographyVariant;
  };
}

export const checkableBaseStyles: CheckableBaseStyles = {
  innerPadding: {
    medium: getSpacing(0.75),
    small: getSpacing(0.5),
  },
  borderWidth: 1,
  borderColor: themeVars.colors.borders.main,
  backgroundColor: themeVars.colors.common.white,
  handleSize: {
    medium: getSpacing(1.5),
    small: getSpacing(1),
  },
  focus: {
    outlineSize: '3px',
    outlineColor: themeVars.colors.brand.lightest,
  },
  boxTransition: [['box-shadow', '0.3s', 'ease-in-out']],
  handleTransition: [['transform', '0.15s', 'cubic-bezier(0.34, 1.56, 0.64, 1)']],
  typographyVariant: {
    medium: 'subtitle',
    small: 'paragraph',
  },
};
