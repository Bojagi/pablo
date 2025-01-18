import { TypographyVariants } from '../theme/typography';
import { BaseStyles } from '../types';

export type TypographyStyleProperties = 'root' | TypographyVariants;

export type TypographyStyles = BaseStyles<TypographyStyleProperties>;

export const typographyStyles: TypographyStyles = {};
