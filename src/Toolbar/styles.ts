import { getSpacing } from '../styleHelpers/getSpacing';
import { registerComponentStyles } from '../theme/defaultComponentStyles';
import { themeVars } from '../theme/themeVars';
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
    color: themeVars.colors.borders.light,
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
    color: themeVars.colors.common.black,
    hover: {
      backgroundColor: themeVars.colors.brand.lightest,
      color: themeVars.colors.common.black,
    },
    focus: {
      backgroundColor: themeVars.colors.brand.lightest,
      color: themeVars.colors.common.black,
    },
    active: {
      iconScale: 0.833333333,
      backgroundColor: themeVars.colors.brand.main,
      color: themeVars.colors.common.white,
    },
  },
};

registerComponentStyles('toolbar', toolbarStyles);
