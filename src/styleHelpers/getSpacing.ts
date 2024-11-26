import { get } from '@styled-system/core';
import { PabloThemeableProps } from '../theme/types';
import { InterpolateFn } from './index';

export function getSpacing(multiplier: number | string): InterpolateFn<string>;
export function getSpacing(multiplier: number, suffix: true): InterpolateFn<string>;
export function getSpacing(multiplier: number, suffix: false): InterpolateFn<number>;
export function getSpacing(multiplier: number, suffix: boolean = true): any {
  return ({ theme }: PabloThemeableProps) => {
    if (typeof multiplier === 'string') {
      return multiplier;
    }

    const spacing = get(theme, 'spacing');

    return (suffix ? `${spacing * multiplier}px` : spacing * multiplier) as any;
  };
}
