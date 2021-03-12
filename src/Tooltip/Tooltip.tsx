import React, { ReactComponentElement, useEffect, useState } from 'react';
import styled from 'styled-components';
import { BasePlacement } from '@popperjs/core';
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

export type TooltipSide = BasePlacement;

export interface TooltipProps extends LayoutBoxProps {
  content: React.ReactNode;
  side?: TooltipSide;
  delay?: number;
  disabled?: boolean;
  children: ReactComponentElement<any>;
}

interface TooltipPopoverProps {
  side: TooltipSide;
}

const TooltipPopover = styled.div<TooltipPopoverProps>`
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
    content: '';
    position: absolute;

    ${conditionalStyles('side', {
      top: topArrowStyles,
      bottom: bottomArrowStyles,
      right: rightArrowStyles,
      left: leftArrowStyles,
    })}

    border-left: ${getSpacing(5)} solid transparent;
    border-right: ${getSpacing(5)} solid transparent;
    border-bottom: calc(2 * ${getSpacing(5)} * 0.866) solid black;
    border-top: ${getSpacing(5)} solid transparent;
    display: inline-block;
  }
`;

export function Tooltip({
  content,
  children,
  disabled = false,
  side = 'top',
  delay = 0,
}: TooltipProps) {
  const [isHovered, setIsHovered] = useState(false);
  const gap = parseInt((useComponentStyle('tooltip.gap') as string) || '0', 10);

  useEffect(() => {
    if (disabled) {
      setIsHovered(false);
    }
  }, [disabled]);

  if (!content) {
    return <>{children}</>;
  }

  return (
    <Popover
      open={isHovered && !disabled}
      placement={side}
      offset={gap}
      delay={delay}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      animation={SlideAnimation}
      animationProps={{
        side,
        reverse: true,
        duration: 400,
      }}
      content={
        <TooltipPopover data-testid="pbl-tooltip-popover" side={side}>
          <Typography variant="info">{content}</Typography>
        </TooltipPopover>
      }
    >
      {children}
    </Popover>
  );
}
