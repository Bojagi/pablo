import { css } from '@emotion/react';
import type * as CSS from 'csstype';
import { getComponentStyle } from '../styleHelpers';
import { themeVars } from '../theme/themeVars';
import { ComponentPrimitiveStyle, Style } from '../theme/types';
import { BaseStyles } from '../types';

export type SliderStyleProperties = 'root';

export interface SliderRailStyles extends ComponentPrimitiveStyle {
  borderRadius: Style;
  backgroundColor: Style;
  thickness: Style;
}

export interface SliderThumbStyles extends ComponentPrimitiveStyle {
  borderRadius: Style;
  backgroundColor: Style;
  width: Style;
  height: Style;
  shadow: string[];
  css: Style;
  cursor: CSS.Property.Cursor;
}

export interface SliderTrackStyles extends ComponentPrimitiveStyle {
  backgroundColor: Style;
  thickness: Style;
  borderRadius: Style;
}

export interface SliderStyles extends BaseStyles<SliderStyleProperties> {
  rail: SliderRailStyles;
  thumb: SliderThumbStyles;
  track: SliderTrackStyles;
}

export const sliderStyles: SliderStyles = {
  rail: {
    borderRadius: getComponentStyle(['slider', 'rail', 'thickness']),
    backgroundColor: themeVars.colors.gray[100],
    thickness: '8px',
  },
  thumb: {
    borderRadius: '50%',
    backgroundColor: themeVars.colors.common.white,
    height: '16px',
    width: getComponentStyle(['slider', 'thumb', 'height']),
    shadow: ['0px 1px 2px rgba(0, 0, 0, 0.2)', '0px 4px 10px rgba(0, 0, 0, 0.1)'],
    css: css`
      border: 1px solid ${themeVars.colors.gray[100]};
    `,
    cursor: 'grab',
  },
  track: {
    backgroundColor: themeVars.colors.brand.main,
    thickness: '10px',
    borderRadius: getComponentStyle(['slider', 'track', 'thickness']),
  },
};
