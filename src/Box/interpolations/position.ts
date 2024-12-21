import type * as CSS from 'csstype';
import {
  identityTransform,
  InterpolationTransformFn,
  ResponsiveValue,
  spacingTransform,
  system,
} from '../system';

export interface PositionProps {
  position?: ResponsiveValue<CSS.Property.Position>;
  pos?: ResponsiveValue<CSS.Property.Position>;
  zIndex?: ResponsiveValue<CSS.Property.ZIndex>;
  top?: ResponsiveValue<CSS.Property.Top>;
  right?: ResponsiveValue<CSS.Property.Right>;
  bottom?: ResponsiveValue<CSS.Property.Bottom>;
  left?: ResponsiveValue<CSS.Property.Left>;
}

export const position = system([
  {
    properties: ['position'],
    fromProps: ['position', 'pos'],
    transform: identityTransform as InterpolationTransformFn<CSS.Property.Position>,
    as: 'type',
  },
  {
    properties: ['zIndex'],
  },
  {
    properties: ['top'],
    transform: spacingTransform,
  },
  {
    properties: ['right'],
    transform: spacingTransform,
  },
  {
    properties: ['bottom'],
    transform: spacingTransform,
  },
  {
    properties: ['left'],
    transform: spacingTransform,
  },
]);
