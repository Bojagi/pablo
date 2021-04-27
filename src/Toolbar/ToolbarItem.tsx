import React, { forwardRef } from 'react';
import { LayoutBoxProps } from '../Box';
import { IconButton } from '../IconButton';
import { useComponentStyle } from '../theme/useComponentStyle';
import { Tooltip, TooltipSide } from '../Tooltip/Tooltip';
import { BaseProps } from '../types';
import { ToolbarItemStyleProperties } from './styles';

export interface ToolbarItemProps
  extends Omit<LayoutBoxProps, 'size'>,
    BaseProps<ToolbarItemStyleProperties> {
  active?: boolean;
  icon: React.ReactNode;
  disabled?: boolean;
  tooltip?: React.ReactNode;
  tooltipSide?: TooltipSide;
  onClick?: (name: string) => void;
  name: string;
}

export const ToolbarItem = forwardRef<HTMLButtonElement, ToolbarItemProps>(
  ({ active, tooltip, tooltipSide, icon, name, onClick, customStyles, ...props }, ref) => {
    const gap = useComponentStyle('toolbar.gap');
    const themeCustomStyles: any = useComponentStyle('toolbar.item.styles');
    const combinedCustomStyles: any = {
      ...themeCustomStyles,
      ...customStyles,
    };

    return (
      <Tooltip delay={500} side={tooltipSide} content={tooltip} disabled={props.disabled}>
        <IconButton
          mx={gap}
          ref={ref}
          data-testid="pbl-toolbar-item-button"
          active={active}
          onClick={() => onClick && onClick(name)}
          customStyles={combinedCustomStyles}
          {...props}
          size="small"
        >
          {icon}
        </IconButton>
      </Tooltip>
    );
  }
);
