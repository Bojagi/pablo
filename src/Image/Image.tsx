import React from 'react';
import styled from 'styled-components';
import { LayoutBoxProps, layoutInterpolationFn } from '../Box';

export interface ImageProps
  extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'color'>,
    LayoutBoxProps {
  className?: string;
  src: string;
  alt?: string;
  width?: number;
  height?: number;
}

const StyledImg = styled.img<LayoutBoxProps>`
  ${layoutInterpolationFn}
`;

export function Image({ ...props }: ImageProps) {
  return <StyledImg {...props} />;
}
