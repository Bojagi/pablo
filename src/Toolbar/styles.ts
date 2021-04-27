import { getColor } from '../styleHelpers/getColor';
import { getSpacing } from '../styleHelpers/getSpacing';
import { Style } from '../theme/types';
import { BaseStyles } from '../types';

export type ToolbarStyleProperties = 'root';
export type ToolbarDividerStyleProperties = 'root';
export type ToolbarItemStyleProperties = 'root' | 'hover' | 'focus' | 'active';

export interface ToolbarStyles extends BaseStyles<ToolbarStyleProperties> {
  gap: Style;
  divider: BaseStyles<ToolbarDividerStyleProperties> & {
    width: number;
    color: Style;
  };
  item: BaseStyles<ToolbarItemStyleProperties> & {
    size: Style;
    borderRadius: number;
    backgroundColor: Style;
    color: Style;
    buttonTransition: string[][];
    iconTransition: string[][];
    iconScale: number;
    hover: {
      backgroundColor: Style;
      color: Style;
    };
    focus: {
      backgroundColor: Style;
      color: Style;
    };
    active: {
      iconScale: number;
      backgroundColor: Style;
      color: Style;
    };
  };
}

export const toolbarStyles: ToolbarStyles = {
  gap: getSpacing(2),
  divider: {
    width: 1,
    color: getColor('borders', 'light'),
  },
  item: {
    buttonTransition: [
      ['background-color', '0.2s'],
      ['color', '0.2s'],
    ],
    iconTransition: [['transform', '0.2s']],
    iconScale: 1,
    size: '24px',
    borderRadius: 6,
    backgroundColor: 'transparent',
    color: getColor('common', 'black'),
    hover: {
      backgroundColor: getColor('brand', 'lightest'),
      color: getColor('common', 'black'),
    },
    focus: {
      backgroundColor: getColor('brand', 'lightest'),
      color: getColor('common', 'black'),
    },
    active: {
      iconScale: 0.833333333,
      backgroundColor: getColor('brand'),
      color: getColor('common', 'white'),
    },
  },
};
