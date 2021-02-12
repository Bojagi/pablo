import React from 'react';
import styled, { css } from 'styled-components';
import { Box, BoxProps } from '../Box';
import { ButtonBase } from '../ButtonBase';
import { getComponentStyle } from '../utils/styleHelpers/getComponentStyle';
import { useComponentStyle } from '../theme';
import { Typography } from '../Typography';

export interface TabProps extends BoxProps {
  active?: boolean;
  icon?: React.ReactNode;
  name: string;
  children: React.ReactNode;
  // eslint-disable-next-line no-undef
  onClick?: (e: React.PointerEvent<HTMLButtonElement>) => void;
}

const TabButton = styled<React.FC<Partial<TabProps>>>((ButtonBase as unknown) as any)`
  color: ${getComponentStyle('tabs.tab.color')};
  position: relative;
  padding: ${getComponentStyle('tabs.tab.padding')};
  margin: ${getComponentStyle('tabs.tab.margin')};

  &:hover {
    background-color: ${getComponentStyle('tabs.tab.hover.backgroundColor')};
  }

  &:focus {
    box-shadow: 0 0 0 ${getComponentStyle('button.base.focus.outlineSize')}
      ${getComponentStyle('tabs.tab.hover.backgroundColor')};
  }

  ${(props) =>
    props.active &&
    css`
      color: ${getComponentStyle('tabs.tab.active.color')};
      padding: ${getComponentStyle('tabs.tab.active.padding')};
      margin: ${getComponentStyle('tabs.tab.active.margin')};
      &:after {
        content: '';
        position: absolute;
        bottom: 0;
        left: ${getComponentStyle('tabs.tab.active.bottomBorder.gap')};
        width: calc(100% - 2 * ${getComponentStyle('tabs.tab.active.bottomBorder.gap')});
        height: ${getComponentStyle('tabs.tab.active.bottomBorder.thickness')};
        border-top-left-radius: ${getComponentStyle('tabs.tab.active.bottomBorder.radius')};
        border-top-right-radius: ${getComponentStyle('tabs.tab.active.bottomBorder.radius')};
        background-color: ${getComponentStyle('tabs.tab.active.bottomBorder.color')};
      }
    `}
`;

export const Tab = ({ children, active, icon, onClick, ...props }: TabProps) => {
  const iconGap = useComponentStyle('button.base.iconGap') as number;
  return (
    <TabButton
      data-testid="pbl-tab"
      {...props}
      active={active}
      onClick={(e) => {
        e.stopPropagation();
        if (onClick) {
          onClick(e);
        }

        e.currentTarget.blur();
      }}
    >
      {icon && (
        <Box display="flex" mr={iconGap}>
          {icon}
        </Box>
      )}
      <Typography variant="button">{children}</Typography>
    </TabButton>
  );
};
