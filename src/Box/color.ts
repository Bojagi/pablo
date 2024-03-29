// Only types
// eslint-disable-next-line import/no-extraneous-dependencies
import { TextColorProps, BackgroundColorProps } from 'styled-system';
import { system } from '@styled-system/core';
import { themeVars } from '../theme/themeVars';
import { getByPath } from '../utils/getByPath';

export interface ColorProps {
  bgColor?: BackgroundColorProps['backgroundColor'];
  textColor?: TextColorProps['color'];
  opacity?: number;
}

export const color = system({
  textColor: {
    property: 'color',
    transform: (value: string) => getByPath(themeVars.colors, value),
  },
  bgColor: {
    property: 'backgroundColor',
    transform: (value: string) => getByPath(themeVars.colors, value),
  },
  opacity: true,
});
