import { inputBaseStyles, InputBaseStyles } from '../shared/inputBaseStyles';
import { Style } from '../theme/types';
import { getSpacing } from '../styleHelpers';

export interface InputStyles extends InputBaseStyles {
  adornmentGap: Style;
}

export const inputStyles: InputStyles = {
  ...inputBaseStyles,
  adornmentGap: getSpacing(1),
};
