import React from 'react';
import { BoxProps } from '../Box';
import { IconButton } from '../IconButton';
import { useComponentStyle } from '../theme';
import { Tooltip, TooltipSide } from '../Tooltip/Tooltip';

export interface ToolbarItemProps extends BoxProps {
  active?: boolean;
  icon: React.ReactNode;
  disabled?: boolean;
  tooltip?: React.ReactNode;
  tooltipSide?: TooltipSide;
  onClick?: (name: string) => void;
  name: string;
}

export function ToolbarItem({
  active,
  tooltip,
  tooltipSide,
  icon,
  name,
  onClick,
  ...props
}: ToolbarItemProps) {
  const gap = useComponentStyle('toolbar.gap');

  return (
    <Tooltip delay={500} side={tooltipSide} content={tooltip}>
      <IconButton
        size="small"
        mx={gap}
        data-testid="pbl-toolbar-item-button"
        active={active}
        onClick={() => onClick && onClick(name)}
        {...props}
      >
        {icon}
      </IconButton>
    </Tooltip>
  );
}
