import { inputBaseStyles, InputBaseStyles } from '../shared/inputBaseStyles';
import { Style } from '../theme/types';
import { getSpacing } from '../styleHelpers';
import { registerComponentStyles } from '../theme/defaultComponentStyles';

export interface InputStyles extends InputBaseStyles {
  adornmentGap: Style;
}

export const inputStyles: InputStyles = {
  ...inputBaseStyles,
  adornmentGap: getSpacing(4),
};

registerComponentStyles('input', inputStyles);
