import { getSpacing } from '../styleHelpers/getSpacing';
import { themeVars } from '../theme/themeVars';
import { Style } from '../theme/types';
import { BaseStyles } from '../types';

export type CardStyleProperties = 'root';

export interface CardStyles extends BaseStyles<CardStyleProperties> {
  padding: Style;
  borderRadius: Style;
  backgroundColor: Style;
  color: Style;
  shadow: string[];
}

export const cardStyles: CardStyles = {
  padding: getSpacing(2),
  borderRadius: getSpacing(1),
  backgroundColor: themeVars.colors.common.white,
  color: themeVars.colors.common.whiteContrastText,
  shadow: ['0px 1px 2px rgba(0, 0, 0, 0.1)', '0px 4px 10px rgba(0, 0, 0, 0.05)'],
};
