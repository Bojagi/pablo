import { PabloTheme, Style } from '../theme/types';
import { AllColors, Colors } from '../theme/colors';
import { interpolateFnFactory } from './interpolateFnFactory';

export type ColorPath<
  TName extends keyof Colors = keyof Colors,
  TVariant extends keyof AllColors = keyof AllColors
> = `${string & TName}.${TVariant}`;

export interface BoxColorProps {
  color?: ColorPath | Style;
  bgColor?: ColorPath | Style;
  fillColor?: ColorPath | Style;
}

export const colorInterpolateFn = interpolateFnFactory<BoxColorProps>(
  ['color', 'color', getColorByPath],
  ['bgColor', 'background-color', getColorByPath],
  ['fillColor', 'fill', getColorByPath]
);

function getColorByPath(path: string, { theme }: { theme: PabloTheme }) {
  const splitPath = path.split('.');
  const pathColor = splitPath.reduce(
    (acc, key) => (acc && acc[key] ? acc[key] : undefined),
    theme.colors
  );
  return pathColor || path;
}
