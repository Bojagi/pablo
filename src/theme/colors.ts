export type ShadedColor = {
  main: string;
  dark: string;
  light: string;
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
  light: string;
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
  grayOpacity: GrayColors;
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
  grayOpacity: {
    '50': getGrayOpacityColor(0.05),
    '100': getGrayOpacityColor(0.1),
    '200': getGrayOpacityColor(0.2),
    '300': getGrayOpacityColor(0.3),
    '400': getGrayOpacityColor(0.4),
    '500': getGrayOpacityColor(0.5),
    '600': getGrayOpacityColor(0.6),
    '700': getGrayOpacityColor(0.7),
    '800': getGrayOpacityColor(0.8),
    '900': getGrayOpacityColor(0.9),
  },
  borders: {
    main: `${BLACK}${getHexByte(0.25)}`,
    light: `${BLACK}${getHexByte(0.1)}`,
  },
  text: {
    main: BLACK,
    info: `${BLACK}${getHexByte(0.5)}`,
  },
  brand: {
    light: '#EBE7FF',
    main: '#6A50F2',
    dark: '#301A9E',
    contrastText: WHITE,
    contrastTextLight: BLACK,
  },
  positive: {
    light: '#C7F8D6',
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
function getGrayOpacityColor(value: number) {
  return `rgba(0,0,0,${value})`;
}
