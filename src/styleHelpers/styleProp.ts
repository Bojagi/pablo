import type { Interpolation } from '@emotion/react';
import type { CSSInterpolation } from '@emotion/serialize';

type InterpolationFunction<P extends object> = (props: P, prop?: keyof P) => CSSInterpolation;
type StyleInterpolation<P extends object> = Interpolation<P> | InterpolationFunction<P>;

const interpolateCss = <P extends object>(
  style: StyleInterpolation<P>,
  props: P,
  prop?: keyof P
) => {
  if (typeof style === 'function') {
    return style(props, prop);
  }

  if (Array.isArray(style)) {
    return style.map((css) => interpolateCss(css, props));
  }

  return style;
};

const ifProp =
  <P extends object>(prop: keyof P, style: StyleInterpolation<any>) =>
  (props: P) =>
    props[prop] ? interpolateCss(style, props, prop) : null;

const ifPropIs =
  <P extends object, K extends keyof P>(prop: K, value: P[K], style: StyleInterpolation<any>) =>
  (props: P) =>
    props[prop] === value ? interpolateCss(style, props, prop) : null;

export { ifProp, ifPropIs };
