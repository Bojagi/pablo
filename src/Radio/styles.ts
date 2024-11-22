import { getSpacing } from '../styleHelpers/getSpacing';
import { Style } from '../theme/types';
import { checkableBaseStyles, CheckableBaseStyles } from '../shared/checkableBaseStyles';
import { themeVars } from '../theme/themeVars';

export interface RadioStyles extends CheckableBaseStyles {
  handleColor: Style;
  groupItemGap: {
    medium: Style;
    small: Style;
  };
}

export const radioStyles: RadioStyles = {
  ...checkableBaseStyles,
  handleColor: themeVars.colors.brand.main,
  groupItemGap: {
    medium: getSpacing(5),
    small: getSpacing(4),
  },
};
