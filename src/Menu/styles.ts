import { registerComponentStyles } from '../theme/defaultComponentStyles';
import { BaseStyles } from '../types';

export type MenuItemStyleProperties = 'item' | 'itemText';
export type MenuStyleProperties = 'box' | 'arrow' | MenuItemStyleProperties;

export interface MenuStyles extends BaseStyles<MenuStyleProperties> {}

export const menuStyles: MenuStyles = {};

registerComponentStyles('menu', menuStyles);
