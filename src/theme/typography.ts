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

const typographyTokenNames: Array<keyof TypographyDefinition> = [
  'fontFamily',
  'fontSize',
  'lineHeight',
  'fontWeight',
  'marginBottom',
] as const;
const typographyTypesTokenNames: Array<keyof Typography> = [
  'base',
  'h1',
  'h2',
  'h3',
  'h4',
  'body',
  'button',
] as const;

export interface TypographyDefinitionVariant<K extends string> {
  variants: Record<K, Partial<TypographyDefinition>>;
}

export interface Typography {
  base: TypographyBase;
  body: TypographyDefinition & TypographyDefinitionVariant<'bold' | 'small'>;
  button: TypographyDefinition & TypographyDefinitionVariant<'small'>;
  h1: TypographyDefinition;
  h2: TypographyDefinition;
  h3: TypographyDefinition;
  h4: TypographyDefinition;
}

export type TypographyVariants = keyof Typography;

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
  body: {
    lineHeight: '1.45em',
    // fontSize: '0.875rem',
    fontSize: getTypographyStep(0),
    marginBottom: '1em',
    variants: {
      bold: {
        fontWeight: 500,
      },
      small: {
        fontSize: getTypographyStep(-1),
      },
    },
  },
  button: {
    lineHeight: '1.125em',
    // fontSize: '0.875rem',
    fontSize: getTypographyStep(0),
    marginBottom: 0,
    variants: {
      small: {
        fontSize: getTypographyStep(-1),
        fontWeight: 500,
      },
    },
  },
  h1: {
    lineHeight: '1.1em',
    // fontSize: '1.75rem',
    fontSize: getTypographyStep(4),
    marginBottom: '0.3em',
    fontWeight: 700,
  },
  h2: {
    lineHeight: '1.1em',
    // fontSize: '1.75rem',
    fontSize: getTypographyStep(3),
    marginBottom: '0.4em',
    fontWeight: 700,
  },
  h3: {
    lineHeight: '1.1em',
    // fontSize: '1.5rem',
    fontSize: getTypographyStep(2),
    fontWeight: 500,
    marginBottom: '0.4em',
  },
  h4: {
    lineHeight: '1.1em',
    // fontSize: '1rem',
    fontSize: getTypographyStep(1),
    marginBottom: '0.5em',
    fontWeight: 500,
  },
};

export const typographyVars = createThemeVars(
  'typography',
  Object.fromEntries(
    typographyTypesTokenNames.map((key) => [
      key,
      Object.fromEntries(typographyTokenNames.map((token) => [token, null])),
    ])
  )
);
