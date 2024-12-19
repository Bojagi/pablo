import type { CSSObject } from '@emotion/react';
import { mediaQueryAbove } from '../breakpoints/mediaQueryFns';
import { themeVars } from '../theme';
import { Breakpoint } from '../theme/breakpoints';
import { PabloTheme, PabloThemeableProps } from '../theme/types';
import { enforceArray } from '../utils/enforceArray';
type InterpolationReturn = string | number | null | undefined;
type IdentityTransformFn<T extends InterpolationReturn = InterpolationReturn> =
  InterpolationTransformFn<T, T>;
const identityTransform: IdentityTransformFn = <T>(value: T): T => value;
type InterpolationTransformFn<T = any, R extends InterpolationReturn = InterpolationReturn> = (
  value: T,
  theme: PabloTheme
) => R;
type ResponsiveValue<T> = T | Array<T | null> | Record<Breakpoint, T | null>;

type InterpolationFn = (props: PabloThemeableProps) => CSSObject;
type SystemInterpolationFn<T> = (value: T) => InterpolationFn;

interface SystemInterpolationPropertyConfig<T> {
  properties: readonly string[];
  transform?: InterpolationTransformFn<T>;
}

interface SystemPropertyConfig<T = any> extends SystemInterpolationPropertyConfig<T> {
  fromProps?: readonly string[];
  as?: PropertyKey;
}

interface InterpolationFunction<P extends object> {
  (props: PabloThemeableProps & P): CSSObject;
}

type ExtractSystemProp<T extends SystemPropertyConfig<any>> = T extends {
  fromProps?: infer B extends readonly string[];
}
  ? B[number]
  : T['properties'][number];

type SingleSystemConfigProps<C extends SystemPropertyConfig<T>, T = any> = {
  [K in ExtractSystemProp<C>]?: TransformParameterType<
    Extract<C, { as?: K } | { fromProps?: readonly K[] } | { properties: readonly K[] }>
  >;
};

type ArraySystemConfigProps<C extends readonly SystemPropertyConfig<T>[], T = any> = {
  [K in ExtractSystemProp<C[number]>]?: TransformParameterType<
    Extract<C[number], { as?: K } | { fromProps?: readonly K[] } | { properties: readonly K[] }>
  >;
};

type SystemConfigProps<
  C extends SystemPropertyConfig<T> | readonly SystemPropertyConfig<T>[],
  T = any,
> = C extends SystemPropertyConfig[]
  ? ArraySystemConfigProps<C>
  : C extends SystemPropertyConfig
    ? SingleSystemConfigProps<C>
    : never;

type TransformParameterType<T extends SystemPropertyConfig> =
  T['transform'] extends InterpolationTransformFn
    ? Parameters<T['transform']>[0]
    : InterpolationReturn;

type ExtractStyledFunctionKey<T extends SystemPropertyConfig<any>> = T extends {
  as: infer A extends string;
}
  ? A
  : T extends { fromProps?: infer B extends readonly string[] }
    ? B[number]
    : T['properties'][number];

type StyledInterpolationFunctions<C extends SystemPropertyConfig<T>, T = any> = {
  [K in ExtractStyledFunctionKey<C>]: SystemInterpolationFn<TransformParameterType<C>>;
};

type ArrayStyledInterpolationFunctions<C extends readonly SystemPropertyConfig[]> = {
  [K in ExtractStyledFunctionKey<C[number]>]: SystemInterpolationFn<
    TransformParameterType<
      Extract<C[number], { as?: K } | { fromProps?: readonly K[] } | { properties: readonly K[] }>
    >
  >;
};

type SystemFn<
  C extends readonly SystemPropertyConfig<T>[] | SystemPropertyConfig<T>,
  T = any,
> = InterpolationFunction<SystemConfigProps<C>> &
  (C extends readonly SystemPropertyConfig<T>[]
    ? ArrayStyledInterpolationFunctions<C>
    : C extends SystemPropertyConfig<T>
      ? StyledInterpolationFunctions<C>
      : never);

const stringableTransform =
  <T>(transformFn: InterpolationTransformFn<Exclude<T, string>>) =>
  (value: T, theme: PabloTheme): ReturnType<typeof transformFn> => {
    if (typeof value === 'string') {
      return value;
    }
    return transformFn(value as Exclude<T, string>, theme);
  };
const pixelTransform: InterpolationTransformFn<number | string> = stringableTransform(
  (value) => `${value}px`
);
const spacingTransform: InterpolationTransformFn<number | string> = stringableTransform(
  (value, theme) => `${value * theme.spacing}px`
);

const interpolateSingleValue = (
  properties: readonly string[],
  value: any,
  props: PabloThemeableProps,
  transform: InterpolationTransformFn = identityTransform,
  forBreakpoint: string | null = null
) => {
  const transformedValue = transform(value, props.theme);
  return properties.map((property) => [property, transformedValue, forBreakpoint] as const);
};

const interpolate = (
  properties: readonly string[],
  value: any | readonly any[],
  props: PabloThemeableProps,
  transform: InterpolationTransformFn = identityTransform
) => {
  if (value === undefined) {
    return [];
  }

  if (Array.isArray(value)) {
    const breakpointNames = Array.from(props.theme.breakpoints.keys());
    return value.flatMap((v, index) =>
      interpolateSingleValue(properties, v, props, transform, breakpointNames[index])
    );
  }
  if (typeof value === 'object') {
    return Object.entries(value).flatMap(([key, value]) => {
      return interpolateSingleValue(properties, value, props, transform, key);
    });
  }
  return interpolateSingleValue(properties, value, props, transform);
};

const makeObject = (
  pairs: (readonly [string, string | number | undefined | null, string | null])[]
) => {
  return pairs.reduce((acc, [key, value, breakpointName]) => {
    if (breakpointName && breakpointName !== 'base') {
      const bp = themeVars.breakpoints[breakpointName];
      const breakpointKey = `@media min-width: ${mediaQueryAbove(bp)}`;

      if (!acc[breakpointKey]) {
        acc[breakpointKey] = {};
      }
      acc[breakpointKey][key] = value;
      return acc;
    }
    acc[key] = value;
    return acc;
  }, {});
};

const systemInterpolation =
  <T>(config: SystemInterpolationPropertyConfig<T>) =>
  (value: TransformParameterType<typeof config>) =>
  (props: PabloThemeableProps) =>
    makeObject(interpolate(config.properties, value, props, config.transform));

const createSystemProperty = (config: SystemPropertyConfig) => {
  const fromProps = config.fromProps || config.properties;
  const interpolateFn = (props) =>
    enforceArray(fromProps)
      .filter((propName) => props[propName])
      .flatMap((propName) => {
        return interpolate(config.properties, props[propName], props, config.transform);
      });
  return interpolateFn;
};

const createSystemProperties = <T extends SystemPropertyConfig[]>(configs: T): SystemFn<T> => {
  const interpolationFn = (props: PabloThemeableProps): CSSObject => {
    return makeObject(configs.flatMap((config) => createSystemProperty(config)(props)));
  };

  configs.forEach((config) => {
    const fromProps = config.fromProps || config.properties;
    if (config.as) {
      (interpolationFn as any)[config.as] = systemInterpolation(config);
    } else {
      fromProps.forEach((property) => {
        (interpolationFn as any)[property] = systemInterpolation(config);
      });
    }
  });

  return interpolationFn as SystemFn<T>;
};

const system = <const T extends SystemPropertyConfig | SystemPropertyConfig[]>(
  config: T
): SystemFn<T> => {
  const arrayConfig = enforceArray(config);
  return createSystemProperties(arrayConfig) as SystemFn<T>;
};

export type {
  ResponsiveValue,
  InterpolationTransformFn,
  IdentityTransformFn,
  SystemInterpolationPropertyConfig,
  SystemPropertyConfig,
};
export { system, systemInterpolation, pixelTransform, spacingTransform, identityTransform };
