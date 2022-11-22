import { Style } from '../theme/types';
import { checkableBaseStyles, CheckableBaseStyles } from '../shared/checkableBaseStyles';
import { themeVars } from '../theme/themeVars';
import { registerComponentStyles } from '../theme/defaultComponentStyles';

export interface CheckboxStyles extends CheckableBaseStyles {
  handleColor: Style;
  innerBorderRadius: Style | string;
  outerBorderRadius: Style | string;
}

export const checkboxStyles: CheckboxStyles = {
  ...checkableBaseStyles,
  handleColor: themeVars.colors.brand.main,
  innerBorderRadius: '3px',
  outerBorderRadius: '4px',
};

registerComponentStyles('checkbox', checkboxStyles);
