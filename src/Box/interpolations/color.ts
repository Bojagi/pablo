import { colorTransform, ResponsiveValue, system } from '../system';
import { KeyMap } from '../../types';
import { Colors } from '../../theme/colors';

export interface ColorProps {
  bgColor?: ResponsiveValue<KeyMap<Colors>>;
  textColor?: ResponsiveValue<KeyMap<Colors>>;
  opacity?: ResponsiveValue<number>;
}

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
