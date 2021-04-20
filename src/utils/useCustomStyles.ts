import { useComponentStyle } from '../theme/useComponentStyle';
import { CssFunctionReturn, CustomStyles } from '../types';

export function useCustomStyles<S extends string>(
  propStyles: CustomStyles<S>
): (key: S) => CssFunctionReturn {
  const customThemeStyles =
    ((useComponentStyle('modal.styles') as unknown) as CustomStyles<S>) || {};

  return (key: S) => [customThemeStyles[key], propStyles[key]];
}
