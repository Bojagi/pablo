import { css } from 'styled-components';
import { getSpacing } from '../utils/styleHelpers/getSpacing';
import { Style } from '../theme/types';
import { getBackgroundColor, getColor } from '../utils/styleHelpers';

export interface ModalStyles {
  backdropColor: Style;
  padding: Style;
  gap: Style;
  backdropTransition: string[][];
  box: {
    closedTransform: Style;
    transition: string[][];
    shadow: string[];
    borderRadius: number;
    width: Style;
    backgroundColor: Style;
    padding: Style;
  };
}

export const modalStyles: ModalStyles = {

  backdropColor: getColor('blackOpacity', '600'),
  padding: getSpacing(7),
  gap: getSpacing(5),
  backdropTransition: [['opacity', '0.3s']],
  box: {
    closedTransform: css`translateY(60px)`,
    transition: [['transform', '0.3s']],
    shadow: ['0px 4px 20px rgba(0, 0, 0, 0.2)'],
    backgroundColor: getBackgroundColor(),
    padding: getSpacing(5),
    width: '780px',
    borderRadius: 12,
  },
};
