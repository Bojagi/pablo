import { css } from 'styled-components';
import { getColor } from '../utils/styleHelpers/getColor';
import { getSpacing } from '../utils/styleHelpers/getSpacing';
import { Style } from '../theme/types';
import { getComponentStyle } from '../utils/styleHelpers';

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

export interface TabStyles {
  icon: {
    gap: Style;
    size: Style;
  };
  color: Style;
  padding: Style;
  margin: Style;
  focus: TabFocusStyles;
  hover: TabHoverStyles;
  active: TabActiveStyles;
  selected: TabSelectedStyles;
}

export interface TabsStyles {
  gap: Style;
  tab: TabStyles;
}

export const tabsStyles: TabsStyles = {
  gap: getSpacing(0.5),
  tab: {
    color: getColor('common', 'black'),
    icon: {
      gap: getComponentStyle('button.base.icon.gap'),
      size: getComponentStyle('button.base.icon.size.medium'),
    },
    padding: css`
      ${getSpacing(1)} ${getSpacing(1.5)}
    `,
    margin: css`0 0 ${getSpacing(0.5)}`,
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
      padding: css`
        ${getSpacing(1)} ${getSpacing(1.5)} ${getSpacing(1.5)}
      `,
      margin: '0',
      color: getColor('brand'),
      bottomBorder: {
        color: getColor('brand'),
        thickness: getSpacing(0.5),
        gap: getSpacing(1),
        radius: getSpacing(0.5),
      },
    },
  },
};
