import { PabloTheme } from '../../theme/types';
import { ResponsiveValue, spacingTransform, system } from '../system';

const getGapSpacing = (value: any, theme: PabloTheme) => {
  if (Array.isArray(value)) {
    return value.map((val) => spacingTransform(val, theme)).join(' ');
  }

  const spacing = spacingTransform(value, theme);
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

const getConfig = <P extends string, S extends string>(property: P, shortHand: S) =>
  [
    {
      properties: [property],
      transform: spacingTransform,
      fromProps: [shortHand],
      as: 'all',
    },
    {
      properties: [`${property}Top`],
      transform: spacingTransform,
      fromProps: [`${shortHand}t`],
      as: 'top',
    },
    {
      properties: [`${property}Right`],
      transform: spacingTransform,
      fromProps: [`${shortHand}r`],
      as: 'right',
    },
    {
      properties: [`${property}Bottom`],
      transform: spacingTransform,
      fromProps: [`${shortHand}b`],
      as: 'bottom',
    },
    {
      properties: [`${property}Left`],
      transform: spacingTransform,
      fromProps: [`${shortHand}l`],
      as: 'left',
    },
    {
      properties: [`${property}Left`, `${property}Right`],
      transform: spacingTransform,
      fromProps: [`${shortHand}x`],
      as: 'x',
    },
    {
      properties: [`${property}Top`, `${property}Bottom`],
      transform: spacingTransform,
      fromProps: [`${shortHand}y`],
      as: 'y',
    },
  ] as const;

const margin = system([...getConfig('margin', 'm')]);
const padding = system([
  ...getConfig('padding', 'p'),
  { properties: ['gap'], transform: getGapSpacing },
]);

export { margin, padding, MarginProps, PaddingProps };
