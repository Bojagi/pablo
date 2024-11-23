import React, { FC } from 'react';
import { LayoutBoxProps, layoutInterpolationFn } from '../Box';
import { baseStyle } from '../shared/baseStyle';
import styled from '@emotion/styled';
import { BaseProps } from '../types';
import { getCustomStyles } from '../utils/useCustomStyles';
import { ImageStyleProperties } from './styles';
import { interpolateCssProp } from '../utils/interpolateCssProp';

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

export const Image: FC<ImageProps> = styled('img')([
  baseStyle,
  layoutInterpolationFn,
  interpolateCssProp,
  getCustomStyles('image.styles', 'root'),
]);
