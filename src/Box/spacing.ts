import { getSpacing } from '../utils/styleHelpers/getSpacing';
import { interpolateFnFactory } from './interpolateFnFactory';
import { InterpolateFn } from '../utils/styleHelpers';

export interface BoxMarginProps {
  m?: number | string;
  mx?: number | string;
  my?: number | string;
  mr?: number | string;
  mb?: number | string;
  ml?: number | string;
  mt?: number | string;
}

export interface BoxPaddingProps {
  p?: number | string;
  px?: number | string;
  py?: number | string;
  pr?: number | string;
  pb?: number | string;
  pl?: number | string;
  pt?: number | string;
}

export const marginInterpolateFn = interpolateFnFactory<BoxMarginProps>(
  ['m', 'margin', transformSpacing],
  ['mx', ['margin-left', 'margin-right'], transformSpacing],
  ['my', ['margin-top', 'margin-bottom'], transformSpacing],
  ['mt', 'margin-top', transformSpacing],
  ['mr', 'margin-right', transformSpacing],
  ['mb', 'margin-bottom', transformSpacing],
  ['ml', 'margin-left', transformSpacing]
);

export const paddingInterpolateFn = interpolateFnFactory<BoxPaddingProps>(
  ['p', 'padding', transformSpacing],
  ['px', ['padding-left', 'padding-right'], transformSpacing],
  ['py', ['padding-top', 'padding-bottom'], transformSpacing],
  ['pt', 'padding-top', transformSpacing],
  ['pr', 'padding-right', transformSpacing],
  ['pb', 'padding-bottom', transformSpacing],
  ['pl', 'padding-left', transformSpacing]
);

function transformSpacing(value: string | number | InterpolateFn<any>) {
  if (typeof value !== 'number') {
    return value;
  }

  return getSpacing(value);
}
