import React from 'react';
import styled from 'styled-components';
import { boxInterpolateFn, BoxProps } from '../Box';

export interface ImageProps
  extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'color'>,
    BoxProps {
  className?: string;
  src: string;
  alt?: string;
  width?: number;
  height?: number;
}

const StyledImg = styled.img<BoxProps>`
  ${boxInterpolateFn}
`;

export function Image({ ...props }: ImageProps) {
  return <StyledImg {...props} />;
}
