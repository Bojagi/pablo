import { Style } from '../theme/types';
import { transformSpacing } from './spacing';
import { interpolateFnFactory } from './interpolateFnFactory';

export type PositionValue = 'static' | 'absolute' | 'relative' | 'fixed' | 'sticky';

export interface BoxPositionProps {
  position?: PositionValue;
  top?: Style | number;
  right?: Style | number;
  bottom?: Style | number;
  left?: Style | number;
}

export const positionInterpolateFn = interpolateFnFactory<BoxPositionProps>(
  ['position', 'position'],
  ['top', 'top', transformSpacing],
  ['right', 'right', transformSpacing],
  ['bottom', 'bottom', transformSpacing],
  ['left', 'left', transformSpacing]
);
