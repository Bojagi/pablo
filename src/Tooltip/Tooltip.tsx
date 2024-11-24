import React, { ComponentElement, ComponentType, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import type { BasePlacement } from '@popperjs/core';
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
import { SlideAnimation } from '../animation/SlideAnimation';
import { BaseProps } from '../types';
import { TooltipStyleProperties } from './styles';
import { getCustomStyles } from '../utils/useCustomStyles';
import { baseStyle } from '../shared/baseStyle';
import { InOutAnimationProps } from '../animation';

export type TooltipSide = BasePlacement;

export interface TooltipProps extends LayoutBoxProps, BaseProps<TooltipStyleProperties> {
  content: React.ReactNode;
  side?: TooltipSide;
  showOnClick?: boolean;
  animation?: ComponentType<InOutAnimationProps>;
  animationDuration?: number;
  animationReverse?: boolean;
  delay?: number;
  disabled?: boolean;
  children: ComponentElement<any, any>;
}

interface TooltipPopoverProps extends BaseProps<TooltipStyleProperties> {
  side: TooltipSide;
}

const TooltipPopover = styled.div<TooltipPopoverProps>`
  ${baseStyle}
  z-index: ${getComponentStyle('tooltip.zIndex')};
  pointer-events: none;
  position: relative;
  border-radius: ${getComponentStyle('tooltip.borderRadius')}px;
  padding: ${getComponentStyle('tooltip.padding')};
  background-color: ${getComponentStyle('tooltip.backgroundColor')};
  color: ${getComponentStyle('tooltip.color')};
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

export function Tooltip({
  content,
  children,
  showOnClick,
  disabled = false,
  side = 'top',
  delay = 0,
  animation = SlideAnimation,
  animationDuration = 150,
  animationReverse = false,
  customStyles,
}: TooltipProps) {
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
      animationProps={{
        side,
        reverse: animationReverse,
        duration: animationDuration,
      }}
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
}
