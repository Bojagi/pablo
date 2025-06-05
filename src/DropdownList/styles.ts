import { getSpacing } from '../styleHelpers/getSpacing';
import { Style } from '../theme/types';
import { BaseStyles } from '../types';
import { themeVars } from '../theme/themeVars';

export type DropdownListStyleProperties = 'simple';

export interface DropdownListStyles extends BaseStyles<DropdownListStyleProperties> {
  container: {
    backgroundColor: Style;
    borderRadius: Style;
    boxShadow: Style;
    borderWidth: Style;
    borderColor: Style;
    padding: Style;
  };
  item: {
    padding: Style;
    borderRadius: Style;
    selected: {
      backgroundColor: Style;
    };
  };
}

export const dropdownListStyles: DropdownListStyles = {
  container: {
    backgroundColor: themeVars.colors.common.white,
    borderRadius: '0.5rem',
    boxShadow: '',
    borderColor: themeVars.colors.gray[100],
    borderWidth: '1px',
    padding: getSpacing(0.5),
  },
  item: {
    padding: getSpacing(0.75),
    borderRadius: '0.25rem',
    selected: {
      backgroundColor: themeVars.colors.brand.lightest,
    },
  },
};
