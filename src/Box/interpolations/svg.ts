import { colorTransform, ResponsiveValue, system } from '../system';

export interface SvgProps {
  fillColor?: ResponsiveValue<string>;
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
