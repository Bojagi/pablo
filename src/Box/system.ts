import type { CSSObject } from '@emotion/react';
import { mediaQueryAbove } from '../breakpoints/mediaQueryFns';
import { themeVars } from '../theme';
import { Breakpoint } from '../theme/breakpoints';
import { PabloTheme, PabloThemeableProps, PabloThemeFull, ThemeValueGetter } from '../theme/types';
import { enforceArray } from '../utils/enforceArray';
import { getByPath } from '../utils/getByPath';
import { Colors } from '../theme/colors';
import { KeyMap } from '../types';
import { SpacingNames, spacingNames } from '../theme/spacing';
import { getSpacing } from '../styleHelpers';
type InterpolationReturn = string | number | null | undefined;
type IdentityTransformFn<T extends InterpolationReturn = InterpolationReturn> =
  InterpolationTransformFn<T, T>;
type InterpolationTransformFn<T = any, R extends InterpolationReturn = InterpolationReturn> = (
  value: T,
  theme: PabloThemeFull
) => R;
type BreakpointObject<T> = Partial<Record<Breakpoint, T | null | undefined>>;
type ResponsiveValue<T> = T | (T | null | undefined)[] | BreakpointObject<T>;

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

type IncludedInArray<K, T> = readonly [K, ...T[]] | readonly [...T[], K];

type SingleSystemConfigProps<C extends SystemPropertyConfig<T>, T = any> = {
  [K in ExtractSystemProp<C>]?: ResponsiveValue<
    TransformParameterType<
      Extract<
        C,
        | { as?: K }
        | { fromProps?: IncludedInArray<K, string> }
        | { properties: IncludedInArray<K, string> }
      >
    >
  >;
};

type SystemConfigProps<
  C extends SystemPropertyConfig<T> | readonly SystemPropertyConfig<T>[],
  T = any,
> = C extends readonly SystemPropertyConfig[]
  ? SingleSystemConfigProps<C[number]>
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
      Extract<
        C[number],
        | { as?: K }
        | { fromProps?: IncludedInArray<K, string> }
        | { properties: IncludedInArray<K, string> }
      >
    >
  >;
};

type SystemFn<
  C extends readonly SystemPropertyConfig<T>[] | SystemPropertyConfig<T>,
  A extends ThemeValueGetter = any,
  T = any,
> = InterpolationFunction<SystemConfigProps<C>> &
  (C extends readonly SystemPropertyConfig<T>[]
    ? ArrayStyledInterpolationFunctions<C>
    : C extends SystemPropertyConfig<T>
      ? StyledInterpolationFunctions<C>
      : never) & {
    get: A extends ThemeValueGetter ? A : never;
  };

type InterpolateReturnTuple = readonly [string, InterpolationReturn, Breakpoint | null];

const stringableTransform =
  <T>(transformFn: InterpolationTransformFn<Exclude<T, string>>) =>
  (value: T, theme: PabloTheme): ReturnType<typeof transformFn> => {
    if (typeof value === 'string') {
      return value;
    }
    return transformFn(value as Exclude<T, string>, theme);
  };
const identityTransform: IdentityTransformFn = <T>(value: T): T => value;
const pixelTransform: InterpolationTransformFn<number | string> = stringableTransform(
  (value) => `${value}px`
);
const spacingTransform =
  (name: string): InterpolationTransformFn<number | string> =>
  (value, theme) => {
    if (typeof value === 'string' && spacingNames.includes(value as any)) {
      return `${theme.spacing.sizes[value] * theme.spacing[name]}${theme.spacing.unit}`;
    }
    if (typeof value === 'string') {
      return value;
    }
    return `${value * theme.spacing[name]}${theme.spacing.unit}`;
  };

const microSpacingTransform = spacingTransform('micro');
const macroSpacingTransform: InterpolationTransformFn<number | SpacingNames | string> = (
  value,
  theme
) => getSpacing(value)({ theme });

const colorTransform: InterpolationTransformFn<KeyMap<Colors>> = (value) =>
  (getByPath(themeVars.colors as Colors, value) as InterpolationReturn) || value;

const interpolateSingleValue = (
  properties: readonly string[],
  value: any,
  props: PabloThemeableProps,
  transform: InterpolationTransformFn = identityTransform,
  forBreakpoint: Breakpoint | null = null
): InterpolateReturnTuple[] => {
  const transformedValue = transform(value, props.theme);
  return properties.map((property) => [property, transformedValue, forBreakpoint] as const);
};

const interpolate = (
  properties: readonly string[],
  value: any | readonly any[],
  props: PabloThemeableProps,
  transform: InterpolationTransformFn = identityTransform
): InterpolateReturnTuple[] => {
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
      return interpolateSingleValue(properties, value, props, transform, key as Breakpoint);
    });
  }
  return interpolateSingleValue(properties, value, props, transform);
};

const makeObject = (
  pairs: (readonly [string, string | number | undefined | null, Breakpoint | null])[],
  theme: PabloTheme
) => {
  return pairs.reduce((acc, [key, value, breakpointName]) => {
    if (breakpointName && breakpointName !== 'base') {
      const breakpointKey = `@media ${mediaQueryAbove(breakpointName, theme.breakpoints)}`;

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
  (props: any) =>
    makeObject(interpolate(config.properties, value, props, config.transform), props.theme);

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
  const interpolationFn = (props: PabloThemeableProps): CSSObject =>
    makeObject(
      configs.flatMap((config) => createSystemProperty(config)(props)),
      props.theme
    );

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

const system = <
  const T extends SystemPropertyConfig | SystemPropertyConfig[],
  const A extends ThemeValueGetter,
>(
  config: T,
  getterFn?: A
): SystemFn<T, A> => {
  const arrayConfig = enforceArray(config);
  const properties = createSystemProperties(arrayConfig);
  properties.get = getterFn;
  return properties as SystemFn<T, A>;
};

export type {
  ResponsiveValue,
  InterpolationReturn,
  InterpolationTransformFn,
  InterpolationFunction,
  IdentityTransformFn,
  SystemInterpolationPropertyConfig,
  SystemPropertyConfig,
};
export {
  system,
  systemInterpolation,
  pixelTransform,
  macroSpacingTransform,
  microSpacingTransform,
  identityTransform,
  colorTransform,
};
