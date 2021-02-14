import { interpolateFnFactory } from './interpolateFnFactory';

export interface BoxSizeProps {
  width?: string | number;
  height?: string | number;
  minWidth?: string | number;
  minHeight?: string | number;
  maxWidth?: string | number;
  maxHeight?: string | number;
}

export const sizeInterpolateFn = interpolateFnFactory<BoxSizeProps>(
  ['width', 'width', transformSize],
  ['height', 'height', transformSize],
  ['minWidth', 'min-width', transformSize],
  ['minHeight', 'min-height', transformSize],
  ['maxWidth', 'max-width', transformSize],
  ['maxHeight', 'max-height', transformSize]
);

function transformSize(value: string | number) {
  if (typeof value === 'string') {
    return value;
  }

  return `${value}px`;
}
