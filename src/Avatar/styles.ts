export interface AvatarStyles {
  square: {
    borderRadius: number;
  };
  size: {
    tiny: number;
    small: number;
    medium: number;
    large: number;
  };
}

export const avatarStyles: AvatarStyles = {
  square: {
    borderRadius: 6,
  },
  size: {
    tiny: 24,
    small: 32,
    medium: 40,
    large: 64,
  },
};
