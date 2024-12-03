import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { LayoutBoxProps, layoutInterpolationFn } from '../Box';
import { baseStyle } from '../shared/baseStyle';
import { componentPrimitive, getComponentStyle, transitionTransformer } from '../styleHelpers';
import { BaseProps, CssFunctionReturn } from '../types';
import { getCustomStyles } from '../utils/useCustomStyles';
import { IconButtonStyleProperties } from './styles';
import { omit } from '../utils/omit';
import React, { forwardRef, HTMLProps } from 'react';
import { ifProp } from '../styleHelpers/styleProp';
import { pabloCss } from '../styleHelpers/css';

export type IconButtonSize = 'small' | 'medium' | 'large';
export type IconButtonColor = 'brand' | 'plain' | 'negative' | 'positive';

export interface IconButtonProps
  extends Omit<LayoutBoxProps, 'theme'>,
    BaseProps<IconButtonStyleProperties>,
    Omit<HTMLProps<HTMLButtonElement>, 'width' | 'height' | 'size' | 'as' | 'type'> {
  size?: IconButtonSize;
  color?: IconButtonColor;
  active?: boolean;
  role?: string;
  children?: React.ReactNode;
  css?: CssFunctionReturn<IconButtonProps>;
}

const activeStyles = (props: IconButtonProps) => pabloCss`
  background-color: ${getComponentStyle(['iconButton', props.color, 'active', 'backgroundColor'])};
  color: ${getComponentStyle(['iconButton', props.color, 'active', 'color'])};
  ${getCustomStyles('iconButton.styles', 'active')}
`;

const nonActiveStyles = (props: IconButtonProps) => pabloCss`
  &:hover:enabled {
    background-color: ${getComponentStyle(['iconButton', props.color, 'hover', 'backgroundColor'])};
    color: ${getComponentStyle(['iconButton', props.color, 'hover', 'color'])};
    ${getCustomStyles('iconButton.styles', 'hover')}
  }

  &:focus:enabled {
    background-color: ${getComponentStyle(['iconButton', props.color, 'focus', 'backgroundColor'])};
    color: ${getComponentStyle(['iconButton', props.color, 'focus', 'color'])};
    ${getCustomStyles('iconButton.styles', 'focus')}
  }
`;

const StyledIconButton = componentPrimitive<IconButtonProps, 'button'>(['iconButton'], {
  tag: 'button',
})`
  ${baseStyle}
  width:  ${getComponentStyle((props) => ['iconButton', 'size', props.size])};
  height: ${getComponentStyle((props) => ['iconButton', 'size', props.size])};
  background-color: ${getComponentStyle((props) => ['iconButton', props.color, 'backgroundColor'])};
  color: ${getComponentStyle(['iconButton', '{color}', 'color'])};

  border: 0;
  padding: 0;
  outline: 0;
  box-sizing: border-box;
  transition: ${getComponentStyle(['iconButton', 'transition'], transitionTransformer)};
  border-radius: ${getComponentStyle(['iconButton', 'borderRadius'])};
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;

  & > * {
    width: ${getComponentStyle((props) => ['iconButton', 'icon', 'size', props.size])};
    height: ${getComponentStyle((props) => ['iconButton', 'icon', 'size', props.size])};
    transition: ${getComponentStyle(['iconButton', 'icon', 'transition'], transitionTransformer)};
    transform: scale(
      ${ifProp(
        'active',
        (props) => props.theme.componentStyles.iconButton.icon.active.scale,
        (props) => props.theme.componentStyles.iconButton.icon.scale
      )}
    );
  }

  &:enabled {
    cursor: pointer;
  }

  &:disabled {
    opacity: ${getComponentStyle(['iconButton', 'disabled', 'opacity'])};
    cursor: normal;
  }

  ${getCustomStyles('iconButton.styles', 'root')}

  ${(props) => props.css}

  ${ifProp('active', activeStyles, nonActiveStyles)}

  ${(props) => layoutInterpolationFn(omit(props, ['size']))}
`;

const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ size = 'medium', color = 'plain', active = false, ...props }, ref) => (
    <StyledIconButton
      size={size}
      color={color}
      active={active}
      ref={ref}
      aria-pressed={active ? 'true' : 'false'}
      {...props}
    />
  )
);

export { IconButton };
