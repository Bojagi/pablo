import { PabloThemeableProps } from '../theme/types';
import { InterpolateFn } from './index';

export function getSpacing(multiplier: number | string): InterpolateFn<string> {
  return ({ theme }: PabloThemeableProps) => {
    if (typeof multiplier === 'string') {
      return multiplier;
    }

    const spacing = theme.spacing;
    return `${spacing.macro * multiplier}${spacing.unit}`;
  };
}
