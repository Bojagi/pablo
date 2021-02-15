import { getSpacing } from '../utils/styleHelpers/getSpacing';
import { Style } from '../theme/types';

export interface ModalStyles {
  backdropColor: Style;
  padding: Style;
  gap: Style;
  box: {
    borderRadius: number;
    width: Style;
    backgroundColor: Style;
    padding: Style;
  };
}

export const modalStyles: ModalStyles = {
  backdropColor: 'rgba(5, 0, 21, 0.5)',
  padding: getSpacing(3),
  gap: getSpacing(1.5),
  box: {
    backgroundColor: '#fafafa',
    padding: getSpacing(1.5),
    width: '780px',
    borderRadius: 12,
  },
};
