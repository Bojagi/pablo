import type { Interpolation } from '@emotion/react';

type InterpolationFunction<P extends object> = (props: P, prop?: keyof P) => Interpolation<P>;
type StyleInterpolation<P extends object> = Interpolation<P> | InterpolationFunction<P>;

const interpolateStyle = <P extends object>(
  style: StyleInterpolation<P>,
  props: P,
  prop?: keyof P
) => {
  if (typeof style === 'function') {
    return [style(props)];
  }
  if (Array.isArray(style)) {
    return interpolateStyles(style, props, prop);
  }
  return [style];
};

const interpolateStyles = <P extends object>(
  styles: Interpolation<P>[],
  props: P,
  prop?: keyof P
) => {
  return styles.flatMap((style) => interpolateStyle(style, props, prop));
};

export { interpolateStyles, interpolateStyle };
export type { StyleInterpolation };
