import { css } from "styled-components";
import { PabloThemeableProps } from "../theme";
import { AllColors, Colors } from "../theme/colors";
import { PabloTheme } from "../theme/types";

export type ColorPath<
  TName extends keyof Colors = keyof Colors,
  TVariant extends keyof AllColors = keyof AllColors
> = `${string & TName}.${TVariant}`;

export interface BoxColorProps {
  color?: ColorPath;
  bgColor?: ColorPath;
}

const getColorByPath = (theme: PabloTheme, path: string) => {
  const splitPath = path.split('.');
  return splitPath.reduce((acc, key) => acc[key], theme.colors);
}

export const colorInterpolateFn = (props: PabloThemeableProps & BoxColorProps) => css`
${typeof props.color === 'string' && css`color: ${getColorByPath(props.theme, props.color as unknown as string)};`}
${typeof props.bgColor === 'string' && css`background-color: ${getColorByPath(props.theme, props.bgColor as unknown as string)};`}
`;
