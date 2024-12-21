import { SpacingNames } from '../../theme/spacing';
import { PabloTheme } from '../../theme/types';
import {
  InterpolationReturn,
  InterpolationTransformFn,
  microSpacingTransform,
  macroSpacingTransform,
  ResponsiveValue,
  system,
} from '../system';

type SpacingTransformFn = InterpolationTransformFn<number | string, InterpolationReturn>;

const getGapSpacing = (transformFn: SpacingTransformFn) => (value: any, theme: PabloTheme) => {
  if (Array.isArray(value)) {
    return value.map((val) => transformFn(val, theme)).join(' ');
  }
  const spacing = transformFn(value, theme);
  return [spacing, spacing].join(' ');
};

interface MarginProps {
  m?: ResponsiveValue<string | number>;
  mt?: ResponsiveValue<string | number>;
  mr?: ResponsiveValue<string | number>;
  mb?: ResponsiveValue<string | number>;
  ml?: ResponsiveValue<string | number>;
  mx?: ResponsiveValue<string | number>;
  my?: ResponsiveValue<string | number>;
}

interface PaddingProps {
  p?: ResponsiveValue<string | number>;
  pt?: ResponsiveValue<string | number>;
  pr?: ResponsiveValue<string | number>;
  pb?: ResponsiveValue<string | number>;
  pl?: ResponsiveValue<string | number>;
  px?: ResponsiveValue<string | number>;
  py?: ResponsiveValue<string | number>;
  gap?: ResponsiveValue<string | number | Array<string | number>>;
}

type SpacingProps = MarginProps & PaddingProps;

const getConfig = <P extends string, S extends string>(
  property: P,
  shortHand: S,
  transform: SpacingTransformFn
) =>
  [
    {
      properties: [property],
      transform,
      fromProps: [shortHand],
      as: 'all',
    },
    {
      properties: [`${property}Top`],
      transform,
      fromProps: [`${shortHand}t`],
      as: 'top',
    },
    {
      properties: [`${property}Right`],
      transform,
      fromProps: [`${shortHand}r`],
      as: 'right',
    },
    {
      properties: [`${property}Bottom`],
      transform,
      fromProps: [`${shortHand}b`],
      as: 'bottom',
    },
    {
      properties: [`${property}Left`],
      transform,
      fromProps: [`${shortHand}l`],
      as: 'left',
    },
    {
      properties: [`${property}Left`, `${property}Right`],
      transform,
      fromProps: [`${shortHand}x`],
      as: 'x',
    },
    {
      properties: [`${property}Top`, `${property}Bottom`],
      transform,
      fromProps: [`${shortHand}y`],
      as: 'y',
    },
  ] as const;

const marginConfig = getConfig('margin', 'm', macroSpacingTransform);
const paddingConfig = [
  ...getConfig('padding', 'p', macroSpacingTransform),
  { properties: ['gap'], transform: getGapSpacing(macroSpacingTransform) },
] as const;
const microMarginConfig = getConfig('margin', 'mm', microSpacingTransform);
const microPaddingConfig = [
  ...getConfig('padding', 'mp', microSpacingTransform),
  { properties: ['gap'], transform: getGapSpacing(microSpacingTransform) },
] as const;

const macroGetter = (value: number | SpacingNames) => (props) =>
  macroSpacingTransform(value, props.theme);

const microGetter = (value: number | SpacingNames) => (props) =>
  microSpacingTransform(value, props.theme);

const margin = system([...marginConfig], macroGetter);
const microMargin = system([...microMarginConfig], microGetter);
const padding = system([...paddingConfig], macroGetter);
const microPadding = system([...microPaddingConfig], microGetter);

export { margin, padding, microMargin, microPadding, MarginProps, PaddingProps, SpacingProps };
