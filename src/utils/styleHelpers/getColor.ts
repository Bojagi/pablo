import { PabloThemeableProps } from '../../theme/types';
import { Colors } from '../../theme/colors';

export const getColor = (name: keyof Colors, variant: string = 'main') => ({
  theme,
}: PabloThemeableProps) => theme.colors[name][variant];
