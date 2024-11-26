import { system } from '@styled-system/core';
import { ResponsiveValue } from 'styled-system';

const DEFAULT_SCALE = 8;

const getSpacing = (value: any, scale: number) => {
  if (value === undefined) {
    return undefined;
  }

  if (typeof value === 'string') {
    return value;
  }
  return `${value * scale}px`;
};

const getGapSpacing = (value: any, scale: number) => {
  if (Array.isArray(value)) {
    return value.map((val) => getSpacing(val, scale)).join(' ');
  }

  const spacing = getSpacing(value, scale);
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

const getConfig = (property: string, shortHand: string) => ({
  [shortHand]: {
    property,
    scale: 'spacing',
    transform: getSpacing,
    defaultScale: DEFAULT_SCALE,
  },
  [`${shortHand}t`]: {
    property: `${property}Top`,
    scale: 'spacing',
    transform: getSpacing,
    defaultScale: DEFAULT_SCALE,
  },
  [`${shortHand}r`]: {
    property: `${property}Right`,
    scale: 'spacing',
    transform: getSpacing,
    defaultScale: DEFAULT_SCALE,
  },
  [`${shortHand}b`]: {
    property: `${property}Bottom`,
    scale: 'spacing',
    transform: getSpacing,
    defaultScale: DEFAULT_SCALE,
  },
  [`${shortHand}l`]: {
    property: `${property}Left`,
    scale: 'spacing',
    transform: getSpacing,
    defaultScale: DEFAULT_SCALE,
  },
  [`${shortHand}x`]: {
    properties: [`${property}Left`, `${property}Right`],
    scale: 'spacing',
    transform: getSpacing,
    defaultScale: DEFAULT_SCALE,
  },
  [`${shortHand}y`]: {
    properties: [`${property}Top`, `${property}Bottom`],
    scale: 'spacing',
    transform: getSpacing,
    defaultScale: DEFAULT_SCALE,
  },
});

const margin = system(getConfig('margin', 'm'));
const padding = system({
  ...getConfig('padding', 'p'),
  gap: { property: 'gap', scale: 'spacing', transform: getGapSpacing, defaultScale: DEFAULT_SCALE },
});

export { margin, padding, MarginProps, PaddingProps };
