import { Style } from '../theme/types';
import { getSpacing } from '../utils/styleHelpers/getSpacing';

export interface AvatarStyles {
  square: {
    borderRadius: number;
  };
  size: {
    tiny: Style;
    small: Style;
    medium: Style;
    large: Style;
  };
}

export const avatarStyles: AvatarStyles = {
  square: {
    borderRadius: 6,
  },
  size: {
    tiny: getSpacing(3, false),
    small: getSpacing(4, false),
    medium: getSpacing(5, false),
    large: getSpacing(8, false),
  },
};
