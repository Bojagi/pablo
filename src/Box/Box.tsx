import styled, { css } from "styled-components";
import { getColor, getSpacing } from "../styleHelpers";
import { PabloThemeableProps } from "../theme";
import { Colors, AllColors, BorderColors } from "../theme/colors";
import { PabloTheme } from "../theme/types";

export interface BoxMarginProps {
  m?: number;
  mx?: number;
  my?: number;
  mr?: number;
  mb?: number;
  ml?: number;
  mt?: number;
}

export interface BoxPaddingProps {
  p?: number;
  px?: number;
  py?: number;
  pr?: number;
  pb?: number;
  pl?: number;
  pt?: number;
}

export type DisplayValue = 'block' | 'inline' | 'inline-block' | 'flex' | 'inline-flex' | 'table';

export interface BoxDisplayProps {
  display?: DisplayValue;
}

export type ColorPath<
  TName extends keyof Colors = keyof Colors,
  TVariant extends keyof AllColors = keyof AllColors
> = `${string & TName}.${TVariant}`;

export interface BoxColorProps {
  color?: ColorPath;
  bgColor?: ColorPath;
}

type BorderType = boolean | keyof BoxBorderProps | string;

export interface BoxBorderProps {
  border?: BorderType;
  borderTop?: BorderType;
  borderRight?: BorderType;
  borderBottom?: BorderType;
  borderLeft?: BorderType;
}

export type BoxProps = BoxMarginProps & BoxPaddingProps & BoxDisplayProps & BoxColorProps & BoxBorderProps;

export const displayInterpolateFn = (props: BoxDisplayProps) => props.display && css`display: ${props.display};`;

const getColorByPath = (theme: PabloTheme, path: string) => {
  const splitPath = path.split('.');
  return splitPath.reduce((acc, key) => acc[key], theme.colors);
}

export const colorInterpolateFn = (props: PabloThemeableProps & BoxColorProps) => css`
${typeof props.color === 'string' && css`color: ${getColorByPath(props.theme, props.color as unknown as string)};`}
${typeof props.bgColor === 'string' && css`background-color: ${getColorByPath(props.theme, props.bgColor as unknown as string)};`}
`;

const buildBorderStyle = (property: string, variant: keyof BorderColors = 'main') => css`
  ${property}: 1px solid ${getColor('borders', variant)};
`;

const getBorderStyle = (value: BorderType, property: string) => {
  if (value === true) {
    return buildBorderStyle(property);
  }

  if (value === 'main' || value === 'light') {
    return buildBorderStyle(property, value);
  }

  return value;
}

export const borderInterpolateFn = (props: PabloThemeableProps & BoxBorderProps) => css`
  ${props.border && getBorderStyle(props.border, 'border')}
  ${props.borderTop && getBorderStyle(props.borderTop, 'border-top')}
  ${props.borderRight && getBorderStyle(props.borderRight, 'border-right')}
  ${props.borderBottom && getBorderStyle(props.borderBottom, 'border-bottom')}
  ${props.borderLeft && getBorderStyle(props.borderLeft, 'border-left')}
`;

export const marginInterpolateFn = (props: BoxMarginProps) => css`
  ${props.m && css`margin: ${getSpacing(props.m)};`};
  ${props.mx && css`
    margin-left: ${getSpacing(props.mx)};
    margin-right: ${getSpacing(props.mx)};
  `};
  ${props.my && css`
    margin-top: ${getSpacing(props.my)};
    margin-bottom: ${getSpacing(props.my)};
  `};
  ${props.mr && css`margin-right: ${getSpacing(props.mr)};`};
  ${props.mb && css`margin-bottom: ${getSpacing(props.mb)};`};
  ${props.ml && css`margin-left: ${getSpacing(props.ml)};`};
  ${props.mt && css`margin-top: ${getSpacing(props.mt)};`};
`;

export const paddingInterpolateFn = (props: BoxPaddingProps) => css`
  ${props.p && css`padding: ${getSpacing(props.p)};`};
  ${props.px && css`
    padding-left: ${getSpacing(props.px)};
    padding-right: ${getSpacing(props.px)};
  `};
  ${props.py && css`
    padding-top: ${getSpacing(props.py)};
    padding-bottom: ${getSpacing(props.py)};
  `};
  ${props.pr && css`padding-right: ${getSpacing(props.pr)};`};
  ${props.pb && css`padding-bottom: ${getSpacing(props.pb)};`};
  ${props.pl && css`padding-left: ${getSpacing(props.pl)};`};
  ${props.pt && css`padding-top: ${getSpacing(props.pt)};`};
`;

export const boxInterpolateFn = (props) => [
  displayInterpolateFn,
  marginInterpolateFn,
  paddingInterpolateFn,
  colorInterpolateFn,
  borderInterpolateFn,
].map(fn => fn(props));

export const Box = styled.div<BoxProps>`${boxInterpolateFn}`;
