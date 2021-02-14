import { interpolateFnFactory } from './interpolateFnFactory';

export type DisplayValue = 'block' | 'inline' | 'inline-block' | 'flex' | 'inline-flex' | 'table';

export interface BoxDisplayProps {
  display?: DisplayValue;
}

export const displayInterpolateFn = interpolateFnFactory<BoxDisplayProps>(['display', 'display']);
