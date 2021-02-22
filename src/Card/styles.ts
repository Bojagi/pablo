import { getColor } from '../utils/styleHelpers/getColor';
import { getSpacing } from '../utils/styleHelpers/getSpacing';
import { Style } from '../theme/types';

export interface CardStyles {
  padding: Style;
  borderRadius: Style;
  backgroundColor: Style;
  color: Style;
  shadow: string[];
}

export const cardStyles: CardStyles = {
  padding: getSpacing(6),
  borderRadius: getSpacing(4),
  backgroundColor: getColor('common', 'white'),
  color: getColor('common', 'whiteContrastText'),
  shadow: ['0px 1px 2px rgba(0, 0, 0, 0.1)', '0px 4px 10px rgba(0, 0, 0, 0.05)'],
};
