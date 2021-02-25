import React, { forwardRef } from 'react';
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

export const Image = forwardRef<HTMLImageElement, ImageProps>((props, ref) => (
  <StyledImg ref={ref} {...props} />
));
