import React from 'react';
import styled, { css } from 'styled-components';
import { LayoutBoxProps } from '../Box';
import { Image, ImageProps } from '../Image';
import { useComponentStyle } from '../theme';
import { conditionalStyles, getComponentStyle } from '../utils/styleHelpers';

export type AvatarSize = 'tiny' | 'small' | 'medium' | 'large';
export type AvatarVariant = 'square' | 'circle';

export interface AvatarProps extends LayoutBoxProps {
  className?: string;
  src: string;
  size?: AvatarSize;
  variant?: AvatarVariant;
}

interface AvatarImageProps extends ImageProps {
  size: AvatarSize;
  variant: AvatarVariant;
}

const AvatarImage = styled<React.FC<AvatarImageProps>>(Image)`
  ${conditionalStyles('variant', {
    square: css`
      border-radius: ${getComponentStyle('avatar.square.borderRadius')}px;
    `,
    circle: css`
      border-radius: 50%;
    `,
  })}
`;

export function Avatar({
  className,
  src,
  size = 'medium',
  variant = 'square',
  ...props
}: AvatarProps) {
  const dimension = useComponentStyle('avatar.size.{size}', { size }) as number;
  return (
    <AvatarImage
      {...props}
      variant={variant}
      size={size}
      width={dimension}
      height={dimension}
      className={className}
      src={src}
    />
  );
}
