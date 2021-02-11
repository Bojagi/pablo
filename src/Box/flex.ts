import { css } from 'styled-components';

export type AlignItemsValue = 'center' | 'flex-start' | 'flex-end';

export interface BoxFlexProps {
  alignItems?: AlignItemsValue;
}

export const flexInterpolateFn = (props: BoxFlexProps) =>
  props.alignItems &&
  css`
    align-items: ${props.alignItems};
  `;
