import { get } from 'styled-system';
import { PabloThemeableProps } from '../../theme/types';
import { InterpolateFn } from './index';

/* eslint-disable no-redeclare */
export function getSpacing(index: number): InterpolateFn<string>;
export function getSpacing(index: number, suffix: true): InterpolateFn<string>;
export function getSpacing(index: number, suffix: false): InterpolateFn<number>;
export function getSpacing(index: any, suffix: any = true): any {
  return ({ theme }: PabloThemeableProps) => {
    const spacing = get(theme, `space.${index}`);

    return (suffix ? `${spacing}px` : spacing) as any;
  };
}
/* eslint-enable no-redeclare */
