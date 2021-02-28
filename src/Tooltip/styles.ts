import { css } from 'styled-components';
import { getColor } from '../styleHelpers/getColor';
import { getSpacing } from '../styleHelpers/getSpacing';
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
  gap: getSpacing(2),
  padding: css`
    ${getSpacing(2)} ${getSpacing(4)}
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
