import { getComponentStyle } from '../styleHelpers/getComponentStyle';
import { useComponentStyle } from '../theme/useComponentStyle';
import { CssFunctionReturn, CustomStyles } from '../types';

export function useCustomStyles<S extends string>(
  stylesPath: string,
  propStyles: CustomStyles<S> = {}
): (key: S) => CssFunctionReturn {
  const customThemeStyles = ((useComponentStyle(stylesPath) as unknown) as CustomStyles<S>) || {};

  return (key: S) => [customThemeStyles[key], propStyles[key]];
}

export function getCustomStyles(stylesPath: string, key: string) {
  return (props) => {
    const customStyles = props.customStyles || getComponentStyle(stylesPath)(props) || {};

    return customStyles[key];
  };
}
