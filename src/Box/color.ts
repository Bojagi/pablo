import { PabloTheme } from '../theme/types';
import { AllColors, Colors } from '../theme/colors';
import { interpolateFnFactory } from './interpolateFnFactory';

export type ColorPath<
  TName extends keyof Colors = keyof Colors,
  TVariant extends keyof AllColors = keyof AllColors
> = `${string & TName}.${TVariant}`;

export interface BoxColorProps {
  color?: ColorPath;
  bgColor?: ColorPath;
}

export const colorInterpolateFn = interpolateFnFactory<BoxColorProps>(
  ['color', 'color', getColorByPath],
  ['bgColor', 'background-color', getColorByPath]
);

function getColorByPath(path: string, { theme }: { theme: PabloTheme }) {
  const splitPath = path.split('.');
  return splitPath.reduce((acc, key) => acc[key], theme.colors);
}
