import { css } from 'styled-components';
import { getColor } from '../utils/styleHelpers/getColor';
import { getSpacing } from '../utils/styleHelpers/getSpacing';
import { Style } from '../theme/types';

export interface SidebarNavItemStyles {
  marginY: Style;
  active: {
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
    active: {
      backgroundColor: getColor('brand', 'light'),
    },
    hover: {
      backgroundColor: getColor('brand', 'light'),
    },
  },
};
