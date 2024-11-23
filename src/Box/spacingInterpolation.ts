import { system } from '@styled-system/core';

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

interface MarginProps {
  m?: string | number;
  mt?: string | number;
  mr?: string | number;
  mb?: string | number;
  ml?: string | number;
  mx?: string | number;
  my?: string | number;
}

interface PaddingProps {
  p?: string | number;
  pt?: string | number;
  pr?: string | number;
  pb?: string | number;
  pl?: string | number;
  px?: string | number;
  py?: string | number;
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
const padding = system(getConfig('padding', 'p'));

export { margin, padding, MarginProps, PaddingProps };
