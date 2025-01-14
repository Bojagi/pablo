import { getComponentStyle } from '../styleHelpers/getComponentStyle';
import { usePabloTheme } from '../theme';
import { PabloThemeableProps } from '../theme/types';
import { useComponentStyle } from '../theme/useComponentStyle';
import { CustomStyles } from '../types';
import { enforceArray } from './enforceArray';

export function useCustomStyles<S extends string>(
  stylesPath: string,
  propStyles: CustomStyles<S> = {}
) {
  const theme = usePabloTheme();
  const customThemeStyles = (useComponentStyle(stylesPath) as unknown as CustomStyles<S>) || {};

  return <P extends PabloThemeableProps>(key: S, props?: P) => {
    const customThemeStylesArray = enforceArray(customThemeStyles[key]);
    const propStylesArray = Array.isArray(propStyles[key]) ? propStyles[key] : [propStyles[key]];

    return [...customThemeStylesArray, ...propStylesArray]
      .filter(Boolean)
      .map((style) => (typeof style === 'function' ? style(props || { theme }) : style));
  };
}

export function getCustomStyles(stylesPath: string, key: string) {
  return (props) => {
    const customStyles = props.customStyles || getComponentStyle(stylesPath)(props) || {};
    return customStyles[key];
  };
}
