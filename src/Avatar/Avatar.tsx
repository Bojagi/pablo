import React, { forwardRef, FC } from 'react';
import styled, { css } from 'styled-components';
import { LayoutBoxProps } from '../Box';
import { Image, ImageProps } from '../Image';
import { useComponentStyle } from '../theme/useComponentStyle';
import { conditionalStyles, getComponentStyle } from '../styleHelpers';
import { BaseProps } from '../types';
import { AvatarStyleProperties } from './styles';
import { useCustomStyles } from '../utils/useCustomStyles';
import { baseStyle } from '../shared/baseStyle';

export type AvatarSize = 'tiny' | 'small' | 'medium' | 'large';
export type AvatarVariant = 'square' | 'circle';

export interface AvatarProps extends LayoutBoxProps, BaseProps<AvatarStyleProperties> {
  className?: string;
  /**
   * URL to the image you want to use as an avatar
   */
  src: string;
  /**
   * Size of the avatar
   */
  size?: AvatarSize;
  /**
   * Define if you want the avatar to be circle or square shaped
   */
  variant?: AvatarVariant;
}

interface AvatarImageProps extends ImageProps {
  size: AvatarSize;
  variant: AvatarVariant;
}

const AvatarImage = styled<
  React.ForwardRefExoticComponent<AvatarImageProps & React.RefAttributes<HTMLImageElement>>
>(Image as any)`
  ${baseStyle}
  ${conditionalStyles('variant', {
    square: css`
      border-radius: ${getComponentStyle('avatar.square.borderRadius')}px;
    `,
    circle: css`
      border-radius: 50%;
    `,
  })}
`;

/**
 * @react
 */
export const Avatar: FC<AvatarProps> = forwardRef<HTMLImageElement, AvatarProps>(
  ({ className, src, size = 'medium', variant = 'square', customStyles, ...props }, ref) => {
    const dimension = useComponentStyle('avatar.size.{size}', { size }) as number;
    const getCustomStyles = useCustomStyles('avatar.styles', customStyles);
    return (
      <AvatarImage
        ref={ref}
        {...props}
        variant={variant}
        size={size}
        width={dimension}
        height={dimension}
        css={getCustomStyles(variant)}
        className={className}
        src={src}
      />
    );
  }
);
