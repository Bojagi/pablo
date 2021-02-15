import { css } from 'styled-components';
import { interpolateFnFactory } from './interpolateFnFactory';

export type AlignItemsValue =
  | 'baseline'
  | 'start'
  | 'end'
  | 'inherit'
  | 'initial'
  | 'revert'
  | 'normal'
  | 'stretch'
  | 'center'
  | 'self-start'
  | 'self-end'
  | 'flex-start'
  | 'flex-end'
  | 'unset';

export type JustifyContentValue =
  | 'center'
  | 'stretch'
  | 'inherit'
  | 'initial'
  | 'left'
  | 'right'
  | 'revert'
  | 'start'
  | 'end'
  | 'flex-start'
  | 'flex-end'
  | 'space-between'
  | 'space-around'
  | 'space-evenly'
  | 'unset';

export interface BoxFlexProps {
  alignItems?: AlignItemsValue;
  justifyContent?: JustifyContentValue;
  flexGrow?: number;
  flexShrink?: number;
  flex?: boolean;
}

export const flexInterpolateFn = interpolateFnFactory<BoxFlexProps>(
  ['alignItems', 'align-items'],
  ['justifyContent', 'justify-content'],
  ['flexGrow', 'flex-grow'],
  ['flexShrink', 'flex-shrink'],
  [
    'flex',
    () => css`
      display: flex;
    `,
  ]
);
