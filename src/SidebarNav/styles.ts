import { css } from 'styled-components';
import { getColor } from '../utils/styleHelpers/getColor';
import { getSpacing } from '../utils/styleHelpers/getSpacing';
import { Style } from '../theme/types';

export interface SidebarNavItemStyles {
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

export interface SidebarNavStyles {
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
