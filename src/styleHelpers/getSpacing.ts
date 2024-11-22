import { get } from '@styled-system/core';
import { PabloThemeableProps } from '../theme/types';
import { InterpolateFn } from './index';

export function getSpacing(index: number): InterpolateFn<string>;
export function getSpacing(index: number, suffix: true): InterpolateFn<string>;
export function getSpacing(index: number, suffix: false): InterpolateFn<number>;
export function getSpacing(index: any, suffix: any = true): any {
  return ({ theme }: PabloThemeableProps) => {
    const spacing = get(theme, `space.${index}`);

    return (suffix ? `${spacing}px` : spacing) as any;
  };
}
