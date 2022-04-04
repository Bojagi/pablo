import { getSpacing } from '../styleHelpers/getSpacing';
import { Style } from '../theme/types';
import { checkableBaseStyles, CheckableBaseStyles } from '../shared/checkableBaseStyles';
import { themeVars } from '../theme/themeVars';

export interface SwitchStyles extends CheckableBaseStyles {
  handleColorChecked: Style;
  handleColorUnchecked: Style;
}

export const switchStyles: SwitchStyles = {
  ...checkableBaseStyles,
  innerPadding: {
    small: getSpacing(1),
    medium: getSpacing(1),
  },
  handleSize: {
    medium: '18px',
    small: '12px',
  },
  handleColorChecked: themeVars.colors.brand.main,
  handleColorUnchecked: themeVars.colors.gray[500],
  boxTransition: [['box-shadow', '0.3s', 'ease-in-out']],
  handleTransition: [
    ['background-color', '0.15s', 'ease-in-out'],
    ['transform', '0.15s', 'ease-in-out'],
  ],
};
