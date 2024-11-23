import { getSpacing } from '../styleHelpers/getSpacing';
import { themeVars } from '../theme/themeVars';
import { Style } from '../theme/types';
import { BaseStyles } from '../types';

export type SidebarNavItemStyleProperties = 'root' | 'active' | 'focus' | 'selected' | 'hover';
export type SidebarNavStyleProperties = 'root';

export interface SidebarNavItemStyles extends BaseStyles<SidebarNavItemStyleProperties> {
  marginY: Style;
  active: {
    backgroundColor: Style;
    outlineSize: Style;
  };
  focus: {
    outlineColor: Style;
    outlineSize: Style;
  };
  selected: {
    backgroundColor: Style;
  };
  hover: {
    backgroundColor: Style;
  };
}

export interface SidebarNavStyles extends BaseStyles<SidebarNavStyleProperties> {
  borderLeft: Style;
  borderLeftSpacing: Style;
  item: SidebarNavItemStyles;
}

export const sidebarNavStyles: SidebarNavStyles = {
  borderLeft: `1px solid ${themeVars.colors.borders.light}`,
  borderLeftSpacing: getSpacing(2),
  item: {
    marginY: getSpacing(1),
    focus: {
      outlineColor: themeVars.colors.brand.lightest,
      outlineSize: getSpacing(0.5),
    },
    active: {
      backgroundColor: themeVars.colors.brand.light,
      outlineSize: getSpacing(0.5),
    },
    selected: {
      backgroundColor: themeVars.colors.brand.lightest,
    },
    hover: {
      backgroundColor: themeVars.colors.brand.lightest,
    },
  },
};
