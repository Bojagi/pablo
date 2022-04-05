import { getSpacing } from '../styleHelpers/getSpacing';
import { Style } from '../theme/types';
import { BaseStyles } from '../types';
import { themeVars } from '../theme/themeVars';

export type ModalStyleProperties = 'box' | 'backdrop' | 'area' | 'paneBox';

export interface ModalStyles extends BaseStyles<ModalStyleProperties> {
  backdropColor: Style;
  padding: Style;
  gap: Style;
  backdropTransition: string[][];
  box: {
    closedTransform: Style;
    transition: string[][];
    shadow: string[];
    borderRadius: number;
    maxWidth: {
      small: Style;
      medium: Style;
      large: Style;
      full: Style;
    };
    backgroundColor: Style;
    padding: Style;
  };
}

export const modalStyles: ModalStyles = {
  backdropColor: themeVars.colors.blackOpacity[600],
  padding: getSpacing(7),
  gap: getSpacing(5),
  backdropTransition: [['opacity', '0.3s']],
  box: {
    closedTransform: 'translateY(60px)',
    transition: [['transform', '0.3s']],
    shadow: ['0px 4px 20px rgba(0, 0, 0, 0.2)'],
    backgroundColor: themeVars.colors.background,
    padding: getSpacing(5),
    maxWidth: {
      small: '520px',
      medium: '780px',
      large: '1000px',
      full: '100%',
    },
    borderRadius: 12,
  },
};
