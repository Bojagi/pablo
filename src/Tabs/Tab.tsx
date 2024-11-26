import React, { forwardRef } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { LayoutBoxProps } from '../Box';
import { buttonBaseStyles } from '../ButtonBase';
import { baseStyle } from '../shared/baseStyle';
import { getComponentStyle } from '../styleHelpers/getComponentStyle';
import { BaseProps } from '../types';
import { Typography } from '../Typography';
import { getCustomStyles } from '../utils/useCustomStyles';
import { TabStyleProperties } from './styles';

export interface InnerTabProps extends LayoutBoxProps, BaseProps<TabStyleProperties> {
  selected?: boolean;
  icon?: React.ReactNode;
  name: string;
  children?: React.ReactNode;
  onClick?: (e: React.PointerEvent<HTMLButtonElement>) => void;
}

export type TabProps<C extends React.ElementType = 'button'> = InnerTabProps &
  React.ComponentPropsWithRef<C> & {
    as?: C;
  };

const TabButton = styled.button<Partial<InnerTabProps>>`
  ${buttonBaseStyles}
  color: ${getComponentStyle('tabs.tab.color')};
  position: relative;
  padding: ${getComponentStyle('tabs.tab.padding')};
  margin: ${getComponentStyle('tabs.tab.margin')};
  white-space: nowrap;

  ${getCustomStyles('tabs.tab.styles', 'root')}

  &:hover {
    background-color: ${getComponentStyle('tabs.tab.hover.backgroundColor')};
    ${getCustomStyles('tabs.tab.styles', 'hover')}
  }

  &:focus {
    box-shadow: 0 0 0 ${getComponentStyle('button.base.focus.outlineSize')}
      ${getComponentStyle('tabs.tab.focus.outlineColor')};
    ${getCustomStyles('tabs.tab.styles', 'focus')}
  }

  &:active {
    background-color: ${getComponentStyle('tabs.tab.active.backgroundColor')};
    ${getCustomStyles('tabs.tab.styles', 'active')}
  }

  ${(props) => props.css}

  ${(props) =>
    props.selected &&
    css`
      color: ${getComponentStyle('tabs.tab.selected.color')(props)};
      padding: ${getComponentStyle('tabs.tab.selected.padding')(props)};
      margin: ${getComponentStyle('tabs.tab.selected.margin')(props)};
      &:after {
        content: '';
        position: absolute;
        bottom: 0;
        left: ${getComponentStyle('tabs.tab.selected.bottomBorder.gap')(props)};
        width: calc(100% - 2 * ${getComponentStyle('tabs.tab.selected.bottomBorder.gap')(props)});
        height: ${getComponentStyle('tabs.tab.selected.bottomBorder.thickness')(props)};
        border-top-left-radius: ${getComponentStyle('tabs.tab.selected.bottomBorder.radius')(
          props
        )};
        border-top-right-radius: ${getComponentStyle('tabs.tab.selected.bottomBorder.radius')(
          props
        )};
        background-color: ${getComponentStyle('tabs.tab.selected.bottomBorder.color')(props)};
        ${getCustomStyles('tabs.tab.styles', 'indicator')(props)}
      }
      ${getCustomStyles('tabs.tab.styles', 'selected')(props)}
    `}
`;

interface IconBoxProps {
  hasText: boolean;
}

const IconBox = styled.div<IconBoxProps>`
  ${baseStyle}
  display: flex;
  ${(props) =>
    props.hasText &&
    css`
      margin-right: ${getComponentStyle('tabs.tab.icon.gap')(props)};
    `}
  width: ${getComponentStyle('tabs.tab.icon.size')};
  height: ${getComponentStyle('tabs.tab.icon.size')};

  & > * {
    width: ${getComponentStyle('tabs.tab.icon.size')};
    height: ${getComponentStyle('tabs.tab.icon.size')};
  }
`;

export const Tab = forwardRef<HTMLButtonElement, TabProps<any>>(
  ({ children, selected, icon, onClick, ...props }, ref) => (
    <TabButton
      ref={ref}
      data-testid="pbl-tab"
      role="tab"
      {...props}
      selected={selected}
      aria-selected={selected ? 'true' : 'false'}
      onClick={(e) => {
        e.stopPropagation();
        if (onClick) {
          onClick(e);
        }

        e.currentTarget.blur();
      }}
    >
      {icon && <IconBox hasText={!!children}>{icon}</IconBox>}
      {children && <Typography variant="button">{children}</Typography>}
    </TabButton>
  )
);
