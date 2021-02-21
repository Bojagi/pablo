import { css, FlattenInterpolation, FlattenSimpleInterpolation } from 'styled-components';
import { BoxProps } from './Box';
import { interpolateFnFactory } from './interpolateFnFactory';

export interface BoxStyleProps {
  css?: FlattenInterpolation<BoxProps> | FlattenSimpleInterpolation;
  zIndex?: number;
}

export const styleInterpolateFn = interpolateFnFactory<BoxStyleProps>(
  ['css', (props) => props.css || css``],
  ['zIndex', 'z-index']
);
