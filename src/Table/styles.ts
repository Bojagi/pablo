import { getSpacing } from '../styleHelpers/getSpacing';
import { Style } from '../theme/types';
import { BaseStyles } from '../types';
import { themeVars } from '../theme/themeVars';

export type TableStyleProperties = 'simple';

export interface TableStyles extends BaseStyles<TableStyleProperties> {
  header: {
    backgroundColor: Style;
    borderRadius: Style;
    isBold: boolean;
    color: Style;
    borderColor: Style;
    borderWidth: Style;
    borderOffset: Style;
    padding: Style;
  };
  body: {
    backgroundColor: Style;
    color: Style;
    isBold: boolean;
    borderColor: Style;
    borderWidth: Style;
    padding: Style;
    borderOffset: Style;
  };
}

export const tableStyles: TableStyles = {
  header: {
    backgroundColor: themeVars.colors.gray[50],
    borderRadius: '0.5rem',
    isBold: false,
    color: themeVars.colors.text.main,
    borderColor: themeVars.colors.gray[100],
    borderWidth: 0,
    borderOffset: 0,
    padding: getSpacing(1.5),
  },
  body: {
    backgroundColor: 'transparent',
    isBold: false,
    color: themeVars.colors.text.main,
    borderColor: themeVars.colors.gray[100],
    borderWidth: '1px',
    borderOffset: getSpacing(0.25),
    padding: getSpacing(1.5),
  },
};
