import { css } from 'styled-components';
import { getSpacing } from '../styleHelpers/getSpacing';
import { themeVars } from '../theme/themeVars';
import { Style } from '../theme/types';

export type ToastCardStyleProperties = 'card' | 'title' | 'description' | 'closeButton' | 'iconBox';

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
  backgroundColor: themeVars.colors.gray[800],
  color: themeVars.colors.common.blackContrastText,
  shadow: ['0px 4px 20px rgba(0, 0, 0, 0.2)'],
};
