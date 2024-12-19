import type * as CSS from 'csstype';
import {
  identityTransform,
  InterpolationTransformFn,
  ResponsiveValue,
  spacingTransform,
  system,
} from '../system';
import { KeyMap } from '../../types';
import { Colors } from '../../theme/colors';

export interface PositionProps {
  bgColor?: ResponsiveValue<KeyMap<Colors>>;
  textColor?: ResponsiveValue<KeyMap<Colors>>;
  opacity?: number;
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
