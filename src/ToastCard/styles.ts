import { css } from 'styled-components';
import { getColor } from '../utils/styleHelpers/getColor';
import { getSpacing } from '../utils/styleHelpers/getSpacing';
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
  width: getSpacing(50),
  padding: css`
    ${getSpacing(1.5)} ${getSpacing(2.5)} ${getSpacing(1.5)} ${getSpacing(1.5)}
  `,
  borderRadius: '6px',
  backgroundColor: getColor('gray', '800'),
  color: getColor('common', 'blackContrastText'),
  shadow: ['0px 4px 20px rgba(0, 0, 0, 0.2)'],
};
