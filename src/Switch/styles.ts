import { getColor } from '../utils/styleHelpers/getColor';
import { getSpacing } from '../utils/styleHelpers/getSpacing';
import { Style } from '../theme/types';
import { checkableBaseStyles, CheckableBaseStyles } from '../theme/baseStyles/checkableBaseStyles';

export interface SwitchStyles extends CheckableBaseStyles {
  handleColorChecked: Style;
  handleColorUnchecked: Style;
}

export const switchStyles: SwitchStyles = {
  ...checkableBaseStyles,
  innerPadding: {
    small: getSpacing(0.25),
    medium: getSpacing(0.25),
  },
  handleSize: {
    medium: getSpacing(2.25),
    small: getSpacing(1.5),
  },
  handleColorChecked: getColor('brand'),
  handleColorUnchecked: getColor('gray', '500'),
  boxTransition: [['box-shadow', '0.3s', 'ease-in-out']],
  handleTransition: [
    ['background-color', '0.15s', 'ease-in-out'],
    ['transform', '0.15s', 'ease-in-out'],
  ],
};
