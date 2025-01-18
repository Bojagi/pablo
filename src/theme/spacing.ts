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
  macro: number | [number, number];
  micro: number | [number, number];
  sizes: SpacingSizes;
}

export type SpacingNames = keyof SpacingSizes;
export const spacingNames: Array<SpacingNames> = [
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

export const spacingTokens: Spacing = {
  unit: 'rem',
  // Spacing for layouts
  macro: [0.5, 0.75],
  // Spacing for components
  micro: [0.25, 0.5],
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
