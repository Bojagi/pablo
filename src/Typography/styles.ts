import { BaseStyles } from '../types';
import { TypographyVariant } from './types';

export type TypographyStyleProperties = 'root' | TypographyVariant;

export type TypographyStyles = BaseStyles<TypographyStyleProperties>;

export const typographyStyles: TypographyStyles = {};
