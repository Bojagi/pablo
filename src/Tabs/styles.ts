import { css } from '@emotion/react';
import { getSpacing } from '../styleHelpers/getSpacing';
import { Style } from '../theme/types';
import { getComponentStyle } from '../styleHelpers';
import { BaseStyles } from '../types';
import { themeVars } from '../theme/themeVars';

export type TabsStyleProperties = 'root';
export type TabStyleProperties = 'root' | 'hover' | 'active' | 'focus' | 'selected' | 'indicator';

export interface TabActiveBorderBottomStyles {
  color: Style;
  thickness: Style;
  gap: Style;
  radius: Style;
}

export interface TabSelectedStyles {
  padding: Style;
  margin: Style;
  color: Style;
  bottomBorder: TabActiveBorderBottomStyles;
}

export interface TabHoverStyles {
  backgroundColor: Style;
}

export interface TabActiveStyles {
  backgroundColor: Style;
}

export interface TabFocusStyles {
  outlineColor: Style;
}

export interface TabSizeStyles {
  padding: Style;
  borderRadius: Style;
}

export interface TabStyles extends BaseStyles<TabStyleProperties> {
  icon: {
    gap: Style;
    size: Style;
  };
  sizes: {
    medium: TabSizeStyles;
    large: TabSizeStyles;
  };
  color: Style;
  margin: Style;
  focus: TabFocusStyles;
  hover: TabHoverStyles;
  active: TabActiveStyles;
  selected: TabSelectedStyles;
}

export interface TabsStyles extends BaseStyles<TabsStyleProperties> {
  gap: Style;
  tab: TabStyles;
}

export const tabsStyles: TabsStyles = {
  gap: getSpacing(0.5),
  tab: {
    color: themeVars.colors.common.black,
    icon: {
      gap: getComponentStyle('button.base.icon.gap'),
      size: getComponentStyle('button.base.icon.size.medium'),
    },
    sizes: {
      medium: {
        padding: '1.25em 1.75em 1.75em',
        borderRadius: 'md',
      },
      large: {
        padding: '2em 2.5em 2.5em',
        borderRadius: 'lg',
      },
    },
    margin: (props: any) => css`0 0 ${getSpacing(0)(props)}`,
    hover: {
      backgroundColor: getComponentStyle('button.brand.text.hover.backgroundColor'),
    },
    focus: {
      outlineColor: getComponentStyle('button.brand.outlineColor'),
    },
    active: {
      backgroundColor: getComponentStyle('button.brand.text.hover.backgroundColor'),
    },
    selected: {
      padding: (props: any) => css`
        ${getSpacing(1)(props)} ${getSpacing(1.5)(props)} ${getSpacing(1.5)(props)}
      `,
      margin: '0',
      color: themeVars.colors.brand.main,
      bottomBorder: {
        color: themeVars.colors.brand.main,
        thickness: getSpacing(0.5),
        gap: getSpacing(1),
        radius: getSpacing(0.5),
      },
    },
  },
};
