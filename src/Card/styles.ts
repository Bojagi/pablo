import { getColor, getSpacing } from '../styleHelpers';
import { Style } from '../theme/types';

export interface CardStyles {
  padding: Style;
  borderRadius: Style;
  backgroundColor: Style;
  color: Style;
  shadow: string[];
}

export const cardStyles: CardStyles = {
  padding: getSpacing(2),
  borderRadius: getSpacing(1),
  backgroundColor: getColor('common', 'white'),
  color: getColor('common', 'whiteContrastText'),
  shadow: ['0px 1px 2px rgba(0, 0, 0, 0.1)', '0px 4px 10px rgba(0, 0, 0, 0.05)'],
};
