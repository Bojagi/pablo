import { css } from '@emotion/react';
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
  gap: getSpacing(0.5),
  padding: (props) => css`
    ${getSpacing(0.5)(props)} ${getSpacing(1)(props)}
  `,
  zIndex: 100,
  backgroundColor: themeVars.colors.common.black,
  color: themeVars.colors.common.white,
  borderRadius: 4,
};
