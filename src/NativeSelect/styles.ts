import { css } from 'styled-components';
import { inputBaseStyles, InputBaseStyles } from '../shared/inputBaseStyles';
import { Style } from '../theme/types';
import { getSpacing } from '../styleHelpers';

export interface NativeSelectStyles extends InputBaseStyles {
  adornmentGap: Style;
  arrowGap: Style;
  reservedArrowSpace: Style;
}

export const nativeSelectStyles: NativeSelectStyles = {
  ...inputBaseStyles,
  adornmentGap: getSpacing(4),
  arrowGap: getSpacing(4),
  reservedArrowSpace: css`calc(${getSpacing(4)} * 2 + 8px)`,
};
