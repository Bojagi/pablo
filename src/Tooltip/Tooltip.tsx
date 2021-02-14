import React from 'react';
import styled from 'styled-components';
import { Typography } from '../Typography';
import { conditionalStyles, getComponentStyle, transitionTransformer } from '../utils/styleHelpers';
import { getSpacing } from '../utils/styleHelpers/getSpacing';
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

export type TooltipSide = 'top' | 'right' | 'bottom' | 'left';

export interface TooltipProps {
  content: React.ReactNode;
  side?: TooltipSide;
  delay?: number;
  children: React.ReactNode;
}

const TooltipWrapper = styled.div`
  position: relative;
`;

interface TooltipPopoverProps {
  contentHeight: number;
  contentWidth: number;
  isVisible: boolean;
  side: TooltipSide;
}

const TooltipPopover = styled.div<TooltipPopoverProps>`
  z-index: ${getComponentStyle('tooltip.zIndex')};
  pointer-events: none;
  opacity: ${(props) => (props.isVisible ? 1 : 0)};
  position: absolute;
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

    border-left: ${getSpacing(1.5)} solid transparent;
    border-right: ${getSpacing(1.5)} solid transparent;
    border-bottom: calc(2 * ${getSpacing(1.5)} * 0.866) solid black;
    border-top: ${getSpacing(1.5)} solid transparent;
    display: inline-block;
  }
`;

export function Tooltip({ content, children, side = 'top', delay = 0 }: TooltipProps) {
  const [elem, setElem] = React.useState<HTMLDivElement | null>(null);
  const [isHovered, setIsHovered] = useDelayedBooleanState(false, delay);
  const [contentHeight, setContentHeight] = React.useState(0);
  const [contentWidth, setContentWidth] = React.useState(0);

  React.useEffect(() => {
    if (elem) {
      const resizeHandler = () => {
        setContentHeight(elem.offsetHeight);
        setContentWidth(elem.offsetWidth);
      };
      elem.addEventListener('resize', resizeHandler);
      resizeHandler();
      return () => elem && elem.removeEventListener('resize', resizeHandler);
    }

    return () => {};
  }, [elem]);

  if (!content) {
    return <>{children}</>;
  }

  return (
    <TooltipWrapper
      ref={setElem}
      data-testid="pbl-tooltip-wrapper"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <TooltipPopover
        data-testid="pbl-tooltip-popover"
        isVisible={isHovered}
        side={side}
        contentWidth={contentWidth}
        contentHeight={contentHeight}
      >
        <Typography variant="info">{content}</Typography>
      </TooltipPopover>
      {children}
    </TooltipWrapper>
  );
}
