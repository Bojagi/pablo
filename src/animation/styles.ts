export type AnimationEasing = 'bounce' | 'easeIn' | 'easeOut' | 'easeInOut' | 'linear';

export interface AnimationStyles {
  easings: Record<AnimationEasing, string>;
}

export const animationStyles: AnimationStyles = {
  easings: {
    bounce: 'cubic-bezier(0.47, 1.64, 0.41, 0.8)',
    easeIn: 'ease-in',
    easeOut: 'ease-out',
    easeInOut: 'ease-in-out',
    linear: 'linear',
  },
};
