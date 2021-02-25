import { css } from 'styled-components';
import { getColor } from '../styleHelpers/getColor';
import { getSpacing } from '../styleHelpers/getSpacing';
import { Style } from '../theme/types';

export interface ToastCardStyles {
  width: Style;
  padding: Style;
  borderRadius: Style;
  backgroundColor: Style;
  shadow: string[];
  color: Style;
}

export const toastCardStyles: ToastCardStyles = {
  width: '400px',
  padding: css`
    ${getSpacing(5)} ${getSpacing(7)} ${getSpacing(5)} ${getSpacing(5)}
  `,
  borderRadius: '6px',
  backgroundColor: getColor('gray', '800'),
  color: getColor('common', 'blackContrastText'),
  shadow: ['0px 4px 20px rgba(0, 0, 0, 0.2)'],
};
