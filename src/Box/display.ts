import { css } from 'styled-components';

export type DisplayValue = 'block' | 'inline' | 'inline-block' | 'flex' | 'inline-flex' | 'table';

export interface BoxDisplayProps {
  display?: DisplayValue;
}

export const displayInterpolateFn = (props: BoxDisplayProps) =>
  props.display &&
  css`
    display: ${props.display};
  `;
