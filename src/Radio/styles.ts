import { getColor } from '../styleHelpers/getColor';
import { getSpacing } from '../styleHelpers/getSpacing';
import { Style } from '../theme/types';
import { checkableBaseStyles, CheckableBaseStyles } from '../shared/checkableBaseStyles';

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
    medium: getSpacing(5),
    small: getSpacing(4),
  },
};
