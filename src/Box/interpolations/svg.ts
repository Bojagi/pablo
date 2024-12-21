import { Colors } from '../../theme/colors';
import { CssColor, KeyMap } from '../../types';
import { colorTransform, ResponsiveValue, system } from '../system';

export interface SvgProps {
  fillColor?: ResponsiveValue<KeyMap<Colors> | CssColor>;
}

export const svg = system([
  {
    properties: ['fill'],
    fromProps: ['fillColor'],
    transform: colorTransform,
  },
  {
    properties: ['stroke'],
    fromProps: ['strokeColor'],
    transform: colorTransform,
  },
]);
