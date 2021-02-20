import { inputBaseStyles, InputBaseStyles } from '../theme/baseStyles/inputBaseStyles';
import { Style } from '../theme/types';
import { getSpacing } from '../utils/styleHelpers';

export interface InputStyles extends InputBaseStyles {
  adornmentGap: Style;
}

export const inputStyles: InputStyles = {
  ...inputBaseStyles,
  adornmentGap: getSpacing(1),
};
