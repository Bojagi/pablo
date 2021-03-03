import React, { ReactComponentElement } from 'react';
import styled from 'styled-components';
import { BasePlacement } from '@popperjs/core';
import { LayoutBoxProps } from '../Box';
import { Typography } from '../Typography';
import { conditionalStyles, getComponentStyle, transitionTransformer } from '../styleHelpers';
import { getSpacing } from '../styleHelpers/getSpacing';
import { useDelayedBooleanState } from '../utils/useDelayBooleanState';
import {
  topStyles,
  bottomStyles,
  rightStyles,
  leftStyles,
  topArrowStyles,
  bottomArrowStyles,
  rightArrowStyles,
  leftArrowStyles,
} from './tooltipSideStyles';
import { Popover } from '../Popover/Popover';

export type TooltipSide = BasePlacement;

export interface TooltipProps extends LayoutBoxProps {
  content: React.ReactNode;
  side?: TooltipSide;
  delay?: number;
  children: ReactComponentElement<any>;
}

interface TooltipPopoverProps {
  isVisible: boolean;
  side: TooltipSide;
}

const TooltipPopover = styled.div<TooltipPopoverProps>`
  z-index: ${getComponentStyle('tooltip.zIndex')};
  pointer-events: none;
  opacity: ${(props) => (props.isVisible ? 1 : 0)};
  position: relative;
  ${conditionalStyles('side', {
    top: topStyles,
    bottom: bottomStyles,
    right: rightStyles,
    left: leftStyles,
  })}

  border-radius: ${getComponentStyle('tooltip.borderRadius')}px;
  padding: ${getComponentStyle('tooltip.padding')};
  background-color: ${getComponentStyle('tooltip.backgroundColor')};
  color: ${getComponentStyle('tooltip.color')};
  white-space: nowrap;
  transition: ${getComponentStyle('tooltip.transition', transitionTransformer)};

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

export function Tooltip({ content, children, side = 'top', delay = 0 }: TooltipProps) {
  const [isHovered, setIsHovered] = useDelayedBooleanState(false, delay);

  if (!content) {
    return <>{children}</>;
  }

  return (
    <Popover
      open={true}
      placement={side}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      content={
        <TooltipPopover data-testid="pbl-tooltip-popover" isVisible={isHovered} side={side}>
          <Typography variant="info">{content}</Typography>
        </TooltipPopover>
      }
    >
      {children}
    </Popover>
  );
}
