import React from 'react';
import { LayoutBoxProps, layoutInterpolationFn } from '../Box';
import { baseStyle } from '../shared/baseStyle';
import { styled } from '../styled';
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

export const Image = styled<ImageProps>('img')([
  baseStyle,
  layoutInterpolationFn,
  getCustomStyles('image.styles', 'root'),
]);
