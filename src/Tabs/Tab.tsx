import React from 'react';
import styled, { css } from 'styled-components';
import { LayoutBoxProps } from '../Box';
import { buttonBaseStyles } from '../ButtonBase';
import { getComponentStyle } from '../utils/styleHelpers/getComponentStyle';
import { Typography } from '../Typography';

export interface TabProps extends LayoutBoxProps {
  selected?: boolean;
  icon?: React.ReactNode;
  name: string;
  children: React.ReactNode;
  onClick?: (e: React.PointerEvent<HTMLButtonElement>) => void;
}

const TabButton = styled.button<Partial<TabProps>>`
  ${buttonBaseStyles}
  color: ${getComponentStyle('tabs.tab.color')};
  position: relative;
  padding: ${getComponentStyle('tabs.tab.padding')};
  margin: ${getComponentStyle('tabs.tab.margin')};

  &:hover {
    background-color: ${getComponentStyle('tabs.tab.hover.backgroundColor')};
  }

  &:focus {
    box-shadow: 0 0 0 ${getComponentStyle('button.base.focus.outlineSize')}
      ${getComponentStyle('tabs.tab.focus.outlineColor')};
  }

  &:active {
    background-color: ${getComponentStyle('tabs.tab.active.backgroundColor')};
  }

  ${(props) =>
    props.selected &&
    css`
      color: ${getComponentStyle('tabs.tab.selected.color')};
      padding: ${getComponentStyle('tabs.tab.selected.padding')};
      margin: ${getComponentStyle('tabs.tab.selected.margin')};
      &:after {
        content: '';
        position: absolute;
        bottom: 0;
        left: ${getComponentStyle('tabs.tab.selected.bottomBorder.gap')};
        width: calc(100% - 2 * ${getComponentStyle('tabs.tab.selected.bottomBorder.gap')});
        height: ${getComponentStyle('tabs.tab.selected.bottomBorder.thickness')};
        border-top-left-radius: ${getComponentStyle('tabs.tab.selected.bottomBorder.radius')};
        border-top-right-radius: ${getComponentStyle('tabs.tab.selected.bottomBorder.radius')};
        background-color: ${getComponentStyle('tabs.tab.selected.bottomBorder.color')};
      }
    `}
`;

const IconBox = styled.div`
  display: flex;
  margin-right: ${getComponentStyle('tabs.tab.icon.gap')};
  width: ${getComponentStyle('tabs.tab.icon.size')};
  height: ${getComponentStyle('tabs.tab.icon.size')};

  & > * {
    width: ${getComponentStyle('tabs.tab.icon.size')};
    height: ${getComponentStyle('tabs.tab.icon.size')};
  }
`;

export const Tab = ({ children, selected, icon, onClick, ...props }: TabProps) => (
  <TabButton
    data-testid="pbl-tab"
    {...props}
    selected={selected}
    onClick={(e) => {
      e.stopPropagation();
      if (onClick) {
        onClick(e);
      }

      e.currentTarget.blur();
    }}
  >
    {icon && <IconBox>{icon}</IconBox>}
    <Typography variant="button">{children}</Typography>
  </TabButton>
);
