export interface Spacing {
  unit: number;
}

export type GetSpacingFn = (multiplier: number) => number;

export const spacing: Spacing = {
  unit: 8,
};

export const getSpacing: GetSpacingFn = (multiplier = 1) => {
  return spacing.unit * multiplier;
}
