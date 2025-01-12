import { calculateFluidClamp } from '../styleHelpers/fluidClamp';
import { createThemeVars } from './createThemeVars';
import { fluid } from './fluid';
import { Style } from './types';

export interface TypographyBase {
  fontFamily: string;
  fontWeight: string | number;
}

export interface TypographyDefinition {
  fontFamily?: string;
  fontSize: Style;
  lineHeight: string;
  fontWeight?: string | number;
  marginBottom: string | number;
}

export interface Typography {
  base: TypographyBase;
  paragraph: TypographyDefinition;
  paragraphBold: TypographyDefinition;
  button: TypographyDefinition;
  headline: TypographyDefinition;
  title: TypographyDefinition;
  subtitle: TypographyDefinition;
  info: TypographyDefinition;
  infoBold: TypographyDefinition;
}

export const getTypographyStep = (size: number) => {
  const { minScreen, maxScreen, minBaseSize, maxBaseSize, minRatio, maxRatio } = fluid;
  const stepMinSize = minBaseSize * Math.pow(minRatio, size);
  const stepMaxSize = maxBaseSize * Math.pow(maxRatio, size);
  return calculateFluidClamp(stepMinSize, stepMaxSize, minScreen, maxScreen);
};

export const typography: Typography = {
  base: {
    fontFamily: '"IBM Plex Sans", sans-serif',
    fontWeight: 'normal',
  },
  paragraph: {
    lineHeight: '1.45em',
    // fontSize: '0.875rem',
    fontSize: getTypographyStep(0),
    marginBottom: '1em',
  },
  paragraphBold: {
    lineHeight: '1.4em',
    // fontSize: '0.875rem',
    fontSize: getTypographyStep(0),
    marginBottom: '1em',
    fontWeight: 500,
  },
  button: {
    lineHeight: '1.125em',
    // fontSize: '0.875rem',
    fontSize: getTypographyStep(0),
    marginBottom: 0,
  },
  headline: {
    lineHeight: '1.1em',
    // fontSize: '1.75rem',
    fontSize: getTypographyStep(3),
    marginBottom: '0.4em',
    fontWeight: 700,
  },
  title: {
    lineHeight: '1.1em',
    // fontSize: '1.5rem',
    fontSize: getTypographyStep(2),
    fontWeight: 500,
    marginBottom: '0.4em',
  },
  subtitle: {
    lineHeight: '1.1em',
    // fontSize: '1rem',
    fontSize: getTypographyStep(1),
    marginBottom: '0.5em',
  },
  info: {
    lineHeight: '1.5em',
    // fontSize: '0.75rem',
    fontSize: getTypographyStep(-1),
    marginBottom: 0,
  },
  infoBold: {
    lineHeight: '1.5em',
    fontSize: '0.75rem',
    marginBottom: 0,
    fontWeight: 500,
  },
};

export const typographyVars = createThemeVars('typography', typography);
