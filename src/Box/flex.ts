import { css } from 'styled-components';

export type AlignItemsValue = 'center' | 'flex-start' | 'flex-end';

export interface BoxFlexProps {
  alignItems?: AlignItemsValue;
  flex?: boolean;
}

export const flexInterpolateFn = (props: BoxFlexProps) => css`
  ${props.alignItems &&
  css`
    align-items: ${props.alignItems};
  `}

  ${props.flex &&
  css`
    display: flex;
  `}
`;
