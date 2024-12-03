import { interpolateStyle, StyleInterpolation } from './interpolateStyles';

const ifProp =
  <P extends object>(
    prop: keyof P,
    style: StyleInterpolation<P>,
    fallbackStyle?: StyleInterpolation<P>
  ) =>
  (props: P) => {
    return props[prop]
      ? interpolateStyle(style, props, prop)
      : interpolateStyle(fallbackStyle, props, prop);
  };

export { ifProp };
