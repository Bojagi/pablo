export type ShadedColor = {
  main: string;
  dark: string;
  darkest: string;
  light: string;
  lightest: string;
  contrastText: string;
  contrastTextLight: string;
};

export type CommonColors = {
  white: string;
  black: string;
  whiteContrastText: string;
  blackContrastText: string;
};

export type TextColors = {
  main: string;
  info: string;
};

export type BorderColors = {
  main: string;
  lightest: string;
};

export interface GrayColors {
  '50': string;
  '100': string;
  '200': string;
  '300': string;
  '400': string;
  '500': string;
  '600': string;
  '700': string;
  '800': string;
  '900': string;
}

export type AllColors = ShadedColor & TextColors & BorderColors & CommonColors;

export interface Colors {
  common: CommonColors;
  gray: GrayColors;
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
  gray: {
    '50': getGrayColor(0.95),
    '100': getGrayColor(0.9),
    '200': getGrayColor(0.8),
    '300': getGrayColor(0.7),
    '400': getGrayColor(0.6),
    '500': getGrayColor(0.5),
    '600': getGrayColor(0.4),
    '700': getGrayColor(0.3),
    '800': getGrayColor(0.2),
    '900': getGrayColor(0.1),
  },
  borders: {
    main: `${BLACK}${getHexByte(0.25)}`,
    lightest: `${BLACK}${getHexByte(0.1)}`,
  },
  text: {
    main: BLACK,
    info: `${BLACK}${getHexByte(0.5)}`,
  },
  brand: {
    lightest: '#EBE7FF',
    light: '#D6CEFF',
    main: '#6A50F2',
    dark: '#4129BD',
    darkest: '#281683',
    contrastText: WHITE,
    contrastTextLight: BLACK,
  },
  positive: {
    lightest: '#DFF6E6',
    light: '#BBECCB',
    main: '#38C765',
    dark: '#2FB85A',
    darkest: '#108B36',
    contrastText: WHITE,
    contrastTextLight: BLACK,
  },
  negative: {
    lightest: '#FFE7E5',
    light: '#FFCFCC',
    main: '#F21D0D',
    dark: '#CA271B',
    darkest: '#871A12',
    contrastText: WHITE,
    contrastTextLight: BLACK,
  },
  neutral: {
    lightest: '#FCF5DB',
    light: '#FFEB9E',
    main: '#FFDD5B',
    dark: '#EDC52A',
    darkest: '#D6AC0B',
    contrastText: WHITE,
    contrastTextLight: BLACK,
  },
};

/**
 * Get hex color byte (e.g. to get transparency)
 * @param value Percentage value (between 0.0 and 1.0)
 */
function getHexByte(value: number) {
  return (Math.round((255 * value) / 16) * 16).toString(16);
}

function getGrayColor(value: number) {
  return `#${getHexByte(value)}${getHexByte(value)}${getHexByte(value)}`;
}
