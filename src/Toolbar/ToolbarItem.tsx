import React from 'react';
import styled, { css } from 'styled-components';
import { boxInterpolateFn, BoxProps } from '../Box';
import { Tooltip, TooltipSide } from '../Tooltip/Tooltip';
import { getComponentStyle, transitionTransformer } from '../utils/styleHelpers';

interface ToolbarItemButtonProps extends BoxProps {
  active?: boolean;
  disabled?: boolean;
}
const ToolbarItemButton = styled.button<ToolbarItemButtonProps>`
  ${boxInterpolateFn}
  border: 0;
  margin: 0 ${getComponentStyle('toolbar.gap')};
  padding: 0;
  box-sizing: border-box;
  transition: ${getComponentStyle('toolbar.item.buttonTransition', transitionTransformer)};
  cursor: pointer;
  outline: 0;

  ${(props) =>
    props.active
      ? css`
          background-color: ${getComponentStyle('toolbar.item.active.backgroundColor')};
          color: ${getComponentStyle('toolbar.item.active.color')};
        `
      : css`
          background-color: ${getComponentStyle('toolbar.item.backgroundColor')};
          color: ${getComponentStyle('toolbar.item.color')};

          &:hover {
            background-color: ${getComponentStyle('toolbar.item.hover.backgroundColor')};
            color: ${getComponentStyle('toolbar.item.hover.color')};
          }

          &:focus {
            background-color: ${getComponentStyle('toolbar.item.focus.backgroundColor')};
            color: ${getComponentStyle('toolbar.item.focus.color')};
          }
        `}

  border-radius: ${getComponentStyle('toolbar.item.borderRadius')}px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${getComponentStyle('toolbar.item.size')};
  height: ${getComponentStyle('toolbar.item.size')};
`;

interface ToolbarItemIconBoxProps extends BoxProps {
  active?: boolean;
}

const ToolbarItemIconBox = styled.div<ToolbarItemIconBoxProps>`
  ${boxInterpolateFn}
  width: 100%;
  height: 100%;
  transition: ${getComponentStyle('toolbar.item.iconTransition', transitionTransformer)};
  display: flex;
  justify-content: center;
  align-items: center;
  transform: scale(
    ${(props) =>
      props.active
        ? props.theme.componentStyles.toolbar.item.active.iconScale
        : props.theme.componentStyles.toolbar.item.iconScale}
  );
`;

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
  return (
    <Tooltip delay={500} side={tooltipSide} content={tooltip}>
      <ToolbarItemButton active={active} onClick={() => onClick && onClick(name)} {...props}>
        <ToolbarItemIconBox active={active}>{icon}</ToolbarItemIconBox>
      </ToolbarItemButton>
    </Tooltip>
  );
}
