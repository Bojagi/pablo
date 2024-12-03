import React, { ComponentElement, ComponentType, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { LayoutBoxProps } from '../Box';
import { Typography } from '../Typography';
import { conditionalStyles, getComponentStyle } from '../styleHelpers';
import { getSpacing } from '../styleHelpers/getSpacing';
import {
  topArrowStyles,
  bottomArrowStyles,
  rightArrowStyles,
  leftArrowStyles,
} from './tooltipSideStyles';
import { Popover } from '../Popover/Popover';
import { useComponentStyle } from '../theme/useComponentStyle';
import { BaseProps } from '../types';
import { TooltipStyleProperties } from './styles';
import { getCustomStyles } from '../utils/useCustomStyles';
import { baseStyle } from '../shared/baseStyle';
import { SlideAnimation } from '../animation/SlideAnimation';
import type { AnimationSetupProps, InOutAnimationProps } from '../animation';

export type TooltipSide = 'top' | 'left' | 'bottom' | 'right';

export interface TooltipProps<A extends object = object>
  extends LayoutBoxProps,
    BaseProps<TooltipStyleProperties> {
  content: React.ReactNode;
  side?: TooltipSide;
  showOnClick?: boolean;
  animation?: ComponentType<InOutAnimationProps<A>>;
  animationProps?: Partial<AnimationSetupProps & A>;
  delay?: number;
  disabled?: boolean;
  children: ComponentElement<any, any>;
}

interface TooltipPopoverProps extends BaseProps<TooltipStyleProperties> {
  side: TooltipSide;
}

const TooltipPopover = styled.div<TooltipPopoverProps>`
  ${baseStyle}
  z-index: ${getComponentStyle(['tooltip', 'zIndex'])};
  pointer-events: none;
  position: relative;
  border-radius: ${getComponentStyle(['tooltip', 'borderRadius'])}px;
  padding: ${getComponentStyle(['tooltip', 'padding'])};
  background-color: ${getComponentStyle(['tooltip', 'backgroundColor'])};
  color: ${getComponentStyle(['tooltip', 'color'])};
  white-space: nowrap;

  /* Bottom Arrow */
  &:after {
    ${baseStyle}
    content: '';
    position: absolute;

    ${conditionalStyles('side', {
      top: topArrowStyles,
      bottom: bottomArrowStyles,
      right: rightArrowStyles,
      left: leftArrowStyles,
    })}

    border-left: ${getSpacing(1.5) as any} solid transparent;
    border-right: ${getSpacing(1.5) as any} solid transparent;
    border-bottom: calc(2 * ${getSpacing(1.5) as any} * 0.866) solid black;
    border-top: ${getSpacing(1.5) as any} solid transparent;
    display: inline-block;

    ${getCustomStyles('tooltip.styles', 'arrow')}
  }

  ${getCustomStyles('tooltip.styles', 'box')}
`;

const Tooltip = ({
  content,
  children,
  showOnClick,
  disabled = false,
  side = 'top',
  delay = 0,
  animation = SlideAnimation,
  animationProps = {},
  customStyles,
}: TooltipProps) => {
  const usedAnimationProps = { side, duration: 150, reverse: false, ...animationProps };
  const [isOpen, setOpen] = useState(false);
  const gap = parseInt((useComponentStyle('tooltip.gap') as string) || '0', 10);

  useEffect(() => {
    if (disabled || children?.props?.disabled) {
      setOpen(false);
    }
  }, [disabled, children]);

  if (!content) {
    return <>{children}</>;
  }

  return (
    <Popover
      open={isOpen && !disabled && !children?.props?.disabled}
      placement={side}
      offset={gap}
      delay={delay}
      onClick={() => showOnClick && setOpen((prevOpen) => !prevOpen)}
      onClickOutside={() => setOpen(false)}
      onMouseEnter={() => !showOnClick && setOpen(true)}
      onMouseLeave={() => !showOnClick && setOpen(false)}
      animation={animation}
      animationProps={usedAnimationProps}
      content={
        <TooltipPopover
          role="tooltip"
          data-testid="pbl-tooltip-popover"
          side={side}
          customStyles={customStyles}
        >
          <Typography variant="info">{content}</Typography>
        </TooltipPopover>
      }
    >
      {children}
    </Popover>
  );
};

export { Tooltip };
