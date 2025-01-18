import { ResponsiveValue, system } from '../system';
import { BorderRadiusSizes } from '../../theme/shape';
import { PabloTheme } from '../../theme/types';
import { calculateFluidClamp, ensureFluidTuple } from '../../styleHelpers/fluidClamp';

type BorderRadiusInput = BorderRadiusSizes | string | number;

export interface ShapeProps {
  borderRadius?: ResponsiveValue<BorderRadiusInput>;
  br?: ResponsiveValue<BorderRadiusInput>;
}

const borderRadiusTransform = (value: BorderRadiusInput, theme: PabloTheme) => {
  const borderRadius = theme.shape.borderRadius[value as BorderRadiusSizes] || value;
  if (typeof borderRadius === 'string') {
    return borderRadius;
  }
  const [minSize, maxSize] = ensureFluidTuple(borderRadius);
  return calculateFluidClamp(minSize, maxSize, theme.fluid.minScreen, theme.fluid.maxScreen);
};

const shape = system([
  {
    properties: ['borderRadius'],
    fromProps: ['borderRadius', 'br'],
    transform: borderRadiusTransform,
    as: 'type',
  },
]);

export { shape, borderRadiusTransform };
