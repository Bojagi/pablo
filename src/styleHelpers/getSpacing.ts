import { SpacingNames } from '../theme/spacing';
import { PabloThemeableProps } from '../theme/types';
import { calculateFluidClamp, ensureFluidTuple } from './fluidClamp';

const getSpacing =
  (inputMultiplier: number | SpacingNames | string) =>
  ({ theme }: PabloThemeableProps) => {
    const fluid = theme.fluid;
    const [minSize, maxSize] = ensureFluidTuple(theme.spacing.macro);

    const multiplier = theme.spacing.sizes[inputMultiplier] || inputMultiplier;
    if (typeof multiplier === 'string') {
      return multiplier;
    }

    if (minSize === maxSize) {
      return `${minSize * multiplier}rem`;
    }

    return calculateFluidClamp(
      minSize * multiplier,
      maxSize * multiplier,
      fluid.minScreen,
      fluid.maxScreen
    );
  };

export { getSpacing };
