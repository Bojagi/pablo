import { BaseStyles } from '../types';
import { TypographyVariant } from './types';

export type TypographyStyleProperties = 'root' | TypographyVariant;

export interface TypographyStyles extends BaseStyles<TypographyStyleProperties> {}

export const typographyStyles: TypographyStyles = {};
