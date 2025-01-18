import { FluidValue } from './types';

interface BorderRadiusTokens {
  sm: FluidValue;
  md: FluidValue;
  lg: FluidValue;
  xl: FluidValue;
}

type BorderRadiusSizes = keyof BorderRadiusTokens;

const borderRadiusSizes: BorderRadiusSizes[] = ['sm', 'md', 'lg', 'xl'];

interface ShapeTokens {
  borderRadius: BorderRadiusTokens;
}

const shape: ShapeTokens = {
  borderRadius: {
    sm: 0.25,
    md: 0.375,
    lg: 0.5,
    xl: 0.75,
  },
};

export { shape, ShapeTokens, BorderRadiusTokens, BorderRadiusSizes, borderRadiusSizes };
