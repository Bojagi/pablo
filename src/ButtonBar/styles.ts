import { getSpacing } from '../styleHelpers/getSpacing';
import { registerComponentStyles } from '../theme/defaultComponentStyles';
import { Style } from '../theme/types';
import { BaseStyles } from '../types';

export type ButtonBarStyleProperties = 'root';

export interface ButtonBarStyles extends BaseStyles<ButtonBarStyleProperties> {
  gap: Style;
}

export const buttonBarStyles: ButtonBarStyles = {
  gap: getSpacing(2),
};

registerComponentStyles('buttonBar', buttonBarStyles);
