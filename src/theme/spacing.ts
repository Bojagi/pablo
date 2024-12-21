export interface SpacingSizes {
  xxxs: number;
  xxs: number;
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  xxl: number;
  xxxl: number;
}

export interface Spacing {
  unit: 'rem' | 'em' | 'px';
  macro: number;
  micro: number;
  sizes: SpacingSizes;
}

export const spacingNames: Array<keyof SpacingSizes> = [
  'xxxs',
  'xxs',
  'xs',
  'sm',
  'md',
  'lg',
  'xl',
  'xxl',
  'xxxl',
];

export const spacing: Spacing = {
  unit: 'rem',
  // Spacing for layouts
  macro: 0.5,
  // Spacing for components
  micro: 0.25,
  // Sizes with multipliers for unit
  sizes: {
    xxxs: 0.25,
    xxs: 0.5,
    xs: 0.75,
    sm: 1,
    md: 1.5,
    lg: 2,
    xl: 3,
    xxl: 4,
    xxxl: 6,
  },
};
