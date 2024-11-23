import { getSpacing } from '../styleHelpers/getSpacing';
import { Style } from '../theme/types';
import { BaseStyles } from '../types';

export type ButtonBarStyleProperties = 'root';

export interface ButtonBarStyles extends BaseStyles<ButtonBarStyleProperties> {
  gap: Style;
}

export const buttonBarStyles: ButtonBarStyles = {
  gap: getSpacing(0.5),
};
