import { SpacingNames } from '../theme/spacing';
import { PabloThemeableProps } from '../theme/types';
import { calculateFluidClamp, ensureFluidTuple } from './fluidClamp';

const getSpacing =
  (
    inputMultiplier: number | SpacingNames | string,
    micro: boolean = false,
    clamp: boolean = true
  ) =>
  ({ theme }: PabloThemeableProps) => {
    const fluid = theme.fluid;
    const [minSize, maxSize] = ensureFluidTuple(theme.spacing[micro ? 'micro' : 'macro']);

    const multiplier = theme.spacing.sizes[inputMultiplier] || inputMultiplier;
    if (typeof multiplier === 'string') {
      return multiplier;
    }

    if (minSize === maxSize) {
      return `${minSize * multiplier}rem`;
    }

    if (!clamp) {
      return `${(minSize + (maxSize - minSize) * 0.5) * multiplier}rem`;
    }

    if (clamp) {
      return calculateFluidClamp(
        minSize * multiplier,
        maxSize * multiplier,
        fluid.minScreen,
        fluid.maxScreen
      );
    }
  };

/**
 * Parse spacing CSS expression to pixel
 * @param expression spacing expression
 * @returns
 */
const parseSpacing = (expression: string): number => {
  const tempElement = document.createElement('div');
  tempElement.style.cssText = `width: ${expression};`;
  document.body.appendChild(tempElement);
  const computedValue = window.getComputedStyle(tempElement).getPropertyValue('width');
  document.body.removeChild(tempElement);
  return parseFloat(computedValue);
};

export { getSpacing, parseSpacing };
