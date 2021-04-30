import { getColor } from '../styleHelpers/getColor';
import { Style } from '../theme/types';
import { checkableBaseStyles, CheckableBaseStyles } from '../shared/checkableBaseStyles';

export interface CheckboxStyles extends CheckableBaseStyles {
  handleColor: Style;
  innerBorderRadius: Style | string;
  outerBorderRadius: Style | string;
}

export const checkboxStyles: CheckboxStyles = {
  ...checkableBaseStyles,
  handleColor: getColor('brand'),
  innerBorderRadius: '3px',
  outerBorderRadius: '4px',
};
