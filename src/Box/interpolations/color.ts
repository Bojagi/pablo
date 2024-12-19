// Only types

import type { TextColorProps, BackgroundColorProps } from 'styled-system';
import { themeVars } from '../../theme/themeVars';
import { getByPath } from '../../utils/getByPath';
import { InterpolationTransformFn, system } from '../system';

export interface ColorProps {
  bgColor?: BackgroundColorProps['backgroundColor'];
  textColor?: TextColorProps['color'];
  opacity?: number;
}

const colorTransform: InterpolationTransformFn<string> = (value) =>
  getByPath(themeVars.colors, value) || value;

export const color = system([
  {
    properties: ['color'],
    fromProps: ['textColor'],
    transform: colorTransform,
  },
  {
    properties: ['backgroundColor'],
    fromProps: ['bgColor'],
    transform: colorTransform,
  },
  {
    properties: ['opacity'],
  },
]);
