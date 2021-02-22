import { getSpacing } from '../utils/styleHelpers/getSpacing';
import { Style } from '../theme/types';

export interface ModalStyles {
  backdropColor: Style;
  padding: Style;
  gap: Style;
  box: {
    shadow: string[];
    borderRadius: number;
    width: Style;
    backgroundColor: Style;
    padding: Style;
  };
}

export const modalStyles: ModalStyles = {
  backdropColor: 'rgba(5, 0, 21, 0.5)',
  padding: getSpacing(7),
  gap: getSpacing(5),
  box: {
    shadow: ['0px 4px 20px rgba(0, 0, 0, 0.2)'],
    backgroundColor: '#fafafa',
    padding: getSpacing(5),
    width: '780px',
    borderRadius: 12,
  },
};
