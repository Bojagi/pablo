
export type ShadedColor = {
  main: string;
  dark: string;
  light: string;
  contrastText: string;
  contrastTextLight: string;
}

export type CommonColors = {
  white: string;
  black: string;
  whiteContrastText: string;
  blackContrastText: string;
}

export type TextColors = {
  main: string;
  info: string;
}

export type BorderColors = {
  main: string;
  light: string;
}

export type AllColors = ShadedColor & TextColors & BorderColors & CommonColors;

export interface Colors {
  common: CommonColors;
  borders: BorderColors;
  brand: ShadedColor;
  positive: ShadedColor;
  negative: ShadedColor;
  neutral: ShadedColor;
  text: TextColors;
}

export const WHITE = '#ffffff';
export const BLACK = '#000000';

export const colors: Colors = {
  common: {
    white: WHITE,
    black: BLACK,
    whiteContrastText: BLACK,
    blackContrastText: WHITE,
  },
  borders: { 
    main: `${BLACK}${getHexByte(0.25)}`,
    light: `${BLACK}${getHexByte(0.1)}`,
  },
  text: {
    main: BLACK,
    info: `${BLACK}${getHexByte(0.5)}`
  },
  brand: {
    light: '#EBE7FF',
    main: '#6A50F2',
    dark: '#09022F',
    contrastText: WHITE,
    contrastTextLight: BLACK,
  },
  positive: {
    light: '#93EFB0',
    main: '#35D968',
    dark: '#30C35E',
    contrastText: WHITE,
    contrastTextLight: BLACK,
  },
  negative: {
    light: '#FFD3D0',
    main: '#F44336',
    dark: '#C92C21',
    contrastText: WHITE,
    contrastTextLight: BLACK,
  },
  neutral: {
    light: '#FCF5DB',
    main: '#FFDD5B',
    dark: '#E4BB1B',
    contrastText: WHITE,
    contrastTextLight: BLACK,
  },
}

/**
 * Get hex color byte (e.g. to get transparency)
 * @param value Percentage value (between 0.0 and 1.0)
 */
function getHexByte(value: number) {
  return (Math.round(255*value/16)*16).toString(16);
}
