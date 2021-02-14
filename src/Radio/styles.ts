import { getColor } from '../utils/styleHelpers/getColor';
import { getSpacing } from '../utils/styleHelpers/getSpacing';
import { Style } from '../theme/types';
import { checkableBaseStyles, CheckableBaseStyles } from '../theme/baseStyles/checkableBaseStyles';

export interface RadioStyles extends CheckableBaseStyles {
  handleColor: Style;
  groupItemGap: {
    medium: Style;
    small: Style;
  };
}

export const radioStyles: RadioStyles = {
  ...checkableBaseStyles,
  handleColor: getColor('brand'),
  groupItemGap: {
    medium: getSpacing(1.5),
    small: getSpacing(1),
  },
};
