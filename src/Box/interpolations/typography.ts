import type * as CSS from 'csstype';
import { ResponsiveValue, system } from '../system';

export interface TypographyInterpolationProps {
  fontSize?: ResponsiveValue<number | string>;
  size?: ResponsiveValue<number | string>;
  lineHeight?: ResponsiveValue<number | string>;
  letterSpacing?: ResponsiveValue<number | string>;
  fontWeight?: ResponsiveValue<number | string>;
  align?: ResponsiveValue<number | string>;
  fontStyle?: ResponsiveValue<CSS.Property.FontStyle>;
}

export const typography = system([
  {
    properties: ['fontSize'],
    fromProps: ['size', 'fontSize'],
  },
  {
    properties: ['lineHeight'],
  },
  {
    properties: ['letterSpacing'],
  },
  {
    properties: ['fontWeight'],
  },
  {
    properties: ['textAlign'],
    fromProps: ['align'],
  },
  {
    properties: ['fontStyle'],
  },
]);
