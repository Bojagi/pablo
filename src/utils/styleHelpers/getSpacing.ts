import { PabloThemeableProps } from '../../theme/types';
import { InterpolateFn } from './index';

/* eslint-disable no-redeclare */
export function getSpacing(multiplier: number): InterpolateFn<string>;
export function getSpacing(multiplier: number, suffix: string): InterpolateFn<string>;
export function getSpacing(multiplier: number, suffix: false): InterpolateFn<number>;
export function getSpacing(multiplier: any, suffix: any = 'px'): any {
  return ({ theme }: PabloThemeableProps) => {
    const spacing = theme.spacing.unit * multiplier;
    return (suffix !== false ? `${spacing}${suffix}` : spacing) as any;
  };
}
/* eslint-enable no-redeclare */
