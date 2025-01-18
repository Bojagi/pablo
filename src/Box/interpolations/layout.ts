import type * as CSS from 'csstype';
import { pixelTransform, ResponsiveValue, system } from '../system';
import { PabloThemeFull } from '../../theme/types';
import { isNumber } from '../../utils/isNumber';

interface LayoutProps {
  width?: ResponsiveValue<number | string>;
  height?: ResponsiveValue<number | string>;
  minWidth?: ResponsiveValue<number | string>;
  minHeight?: ResponsiveValue<number | string>;
  maxWidth?: ResponsiveValue<number | string>;
  maxHeight?: ResponsiveValue<number | string>;
  squareSize?: ResponsiveValue<number | string>;
  display?: ResponsiveValue<CSS.Property.Display>;
}

const widthTransform = (value: number | string, theme: PabloThemeFull) =>
  isNumber(value) && value <= 1 ? `${value * 100}%` : pixelTransform(value, theme);

const layout = system([
  {
    properties: ['width'],
    transform: widthTransform,
  },
  {
    properties: ['height'],
    transform: pixelTransform,
  },
  {
    properties: ['minWidth'],
    transform: pixelTransform,
  },
  {
    properties: ['minHeight'],
    transform: pixelTransform,
  },
  {
    properties: ['maxWidth'],
    transform: pixelTransform,
  },
  {
    properties: ['maxHeight'],
    transform: pixelTransform,
  },
  {
    properties: ['width', 'height'],
    fromProps: ['squareSize'],
    transform: pixelTransform,
  },
  {
    properties: ['display'],
  },
]);

export { layout, widthTransform, type LayoutProps };
