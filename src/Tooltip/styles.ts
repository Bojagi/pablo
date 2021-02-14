import { css } from 'styled-components';
import { getColor } from '../utils/styleHelpers/getColor';
import { getSpacing } from '../utils/styleHelpers/getSpacing';
import { Style } from '../theme/types';

export interface TooltipStyles {
  gap: Style;
  padding: Style;
  transition: string[][];
  borderRadius: number;
  backgroundColor: Style;
  color: Style;
  zIndex: number;
}

export const tooltipStyles: TooltipStyles = {
  gap: getSpacing(1),
  padding: css`
    ${getSpacing(0.5)} ${getSpacing(1)}
  `,
  zIndex: 100,
  backgroundColor: getColor('common', 'black'),
  color: getColor('common', 'white'),
  transition: [
    ['transform', '0.3s'],
    ['opacity', '0.3s'],
  ],
  borderRadius: 4,
};
