import { css } from 'styled-components';
import { getColor } from '../styleHelpers/getColor';
import { getSpacing } from '../styleHelpers/getSpacing';
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
  borderLeft: css`1px solid ${getColor('borders', 'light')}`,
  borderLeftSpacing: getSpacing(6),
  item: {
    marginY: getSpacing(4),
    focus: {
      outlineColor: getColor('brand', 'lightest'),
      outlineSize: getSpacing(2),
    },
    active: {
      backgroundColor: getColor('brand', 'light'),
      outlineSize: getSpacing(2),
    },
    selected: {
      backgroundColor: getColor('brand', 'lightest'),
    },
    hover: {
      backgroundColor: getColor('brand', 'lightest'),
    },
  },
};
