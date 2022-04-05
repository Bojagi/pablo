import { css } from 'styled-components';
import { getSpacing } from '../styleHelpers/getSpacing';
import { themeVars } from '../theme/themeVars';
import { Style } from '../theme/types';
import { BaseStyles } from '../types';

export type TooltipStyleProperties = 'box' | 'arrow';

export interface TooltipStyles extends BaseStyles<TooltipStyleProperties> {
  gap: Style;
  padding: Style;
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
  backgroundColor: themeVars.colors.common.black,
  color: themeVars.colors.common.white,
  borderRadius: 4,
};
