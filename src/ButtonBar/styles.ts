import { getSpacing } from '../styleHelpers/getSpacing';
import { Style } from '../theme/types';

export interface ButtonBarStyles {
  gap: Style;
}

export const buttonBarStyles: ButtonBarStyles = {
  gap: getSpacing(2),
};
