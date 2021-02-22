import { TextColorProps, BackgroundColorProps, system } from 'styled-system';

export interface ColorProps {
  bgColor?: BackgroundColorProps['backgroundColor'];
  textColor?: TextColorProps['color'];
  opacity?: number;
}

export const color = system({
  textColor: {
    property: 'color',
    scale: 'colors',
  },
  bgColor: {
    property: 'backgroundColor',
    scale: 'colors',
  },
  opacity: true,
});
