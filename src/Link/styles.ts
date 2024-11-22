import { themeVars } from '../theme/themeVars';
import { Style } from '../theme/types';
import { BaseStyles } from '../types';

export type LinkStyleProperties = 'root' | 'hover' | 'focus' | 'visited';

export type FontStyleValues =
  | 'normal'
  | 'italic'
  | 'oblique'
  | `oblique ${number}deg`
  | 'inherit'
  | 'initial'
  | 'unset';

export interface BaseLinkStyle {
  color: Style;
  fontStyle: FontStyleValues;
  textDecoration: string;
  fontWeight: string | number;
}

export interface LinkStyles extends BaseLinkStyle, BaseStyles<LinkStyleProperties> {
  hover: BaseLinkStyle;
  focus: BaseLinkStyle;
  visited: BaseLinkStyle;
}

const BASE_LINK_STYLES: BaseLinkStyle = {
  color: themeVars.colors.brand.main,
  textDecoration: 'none',
  fontStyle: 'normal',
  fontWeight: 'inherit',
};

export const linkStyles: LinkStyles = {
  ...BASE_LINK_STYLES,
  hover: {
    ...BASE_LINK_STYLES,
    textDecoration: 'underline',
  },
  visited: {
    ...BASE_LINK_STYLES,
  },
  focus: {
    ...BASE_LINK_STYLES,
    textDecoration: 'underline',
  },
};
