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
  borderLeft: string;
  borderLeftSpacing: number;
  item: SidebarNavItemStyles;
}

export const sidebarNavStyles = {
  borderLeft: 'lightest',
  borderLeftSpacing: 2,
  item: {
    marginY: getSpacing(1),
    focus: {
      outlineColor: getColor('brand', 'lightest'),
      outlineSize: getSpacing(0.5),
    },
    active: {
      backgroundColor: getColor('brand', 'light'),
    },
    selected: {
      backgroundColor: getColor('brand', 'lightest'),
    },
    hover: {
      backgroundColor: getColor('brand', 'lightest'),
    },
  },
};
