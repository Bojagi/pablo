import { BaseStyles } from '../types';

export type MenuItemStyleProperties = 'item' | 'itemText';
export type MenuStyleProperties = 'box' | 'arrow' | MenuItemStyleProperties;

export type MenuStyles = BaseStyles<MenuStyleProperties>;

export const menuStyles: MenuStyles = {};
