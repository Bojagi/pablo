import React from 'react';
import styled from 'styled-components';
import { LayoutBoxProps, layoutInterpolationFn } from '../Box';
import { BaseProps } from '../types';
import { getCustomStyles } from '../utils/useCustomStyles';
import { ImageStyleProperties } from './styles';

export interface ImageProps
  extends BaseProps<ImageStyleProperties>,
    Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'color' | 'css'>,
    LayoutBoxProps {
  className?: string;
  src: string;
  alt?: string;
  width?: number;
  height?: number;
}

export const Image = styled.img<ImageProps>`
  ${layoutInterpolationFn}
  ${getCustomStyles('image.styles', 'root')}
`;
