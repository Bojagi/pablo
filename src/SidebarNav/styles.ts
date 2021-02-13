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
  borderLeft: string;
  borderLeftSpacing: number;
  item: SidebarNavItemStyles;
}

export const sidebarNavStyles = {
  borderLeft: 'light',
  borderLeftSpacing: 2,
  item: {
    marginY: getSpacing(1),
    active: {
      backgroundColor: getColor('brand', 'light'),
    },
    hover: {
      backgroundColor: getColor('brand', 'light'),
    },
  },
};
