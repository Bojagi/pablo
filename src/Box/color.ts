// Only types
// eslint-disable-next-line import/no-extraneous-dependencies
import { TextColorProps, BackgroundColorProps } from 'styled-system';
import { system } from '@styled-system/core';

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
