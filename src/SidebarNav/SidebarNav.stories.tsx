import React from 'react';
import { css } from 'styled-components';
import { SidebarNav } from './SidebarNav';
import { SidebarNavItem } from './SidebarNavItem';

export default {
  title: 'SidebarNav',
};

export const UnselectedNavigation = () => (
  <SidebarNav>
    <SidebarNavItem>Hello</SidebarNavItem>
    <SidebarNavItem>Goodbye</SidebarNavItem>
    <SidebarNavItem>Ob-La-Di Ob-La-Da</SidebarNavItem>
  </SidebarNav>
);

export const SelectedNavigation = () => (
  <SidebarNav>
    <SidebarNavItem>Hello</SidebarNavItem>
    <SidebarNavItem selected>Goodbye</SidebarNavItem>
    <SidebarNavItem>Ob-La-Di Ob-La-Da</SidebarNavItem>
  </SidebarNav>
);

const CustomSidebarNavItem = (props) => (
  <SidebarNavItem
    {...props}
    customStyles={{
      root: css`
        background-color: yellow;
      `,
      hover: css`
        background-color: orange;
      `,
      active: css`
        background-color: red;
      `,
      selected: css`
        background-color: blue;
      `,
    }}
  />
);

export const WithCustomStyles = () => (
  <SidebarNav
    customStyles={{
      root: css`
        transform: rotate(15deg);
      `,
    }}
  >
    <CustomSidebarNavItem>Hello</CustomSidebarNavItem>
    <CustomSidebarNavItem selected>Goodbye</CustomSidebarNavItem>
    <CustomSidebarNavItem>Ob-La-Di Ob-La-Da</CustomSidebarNavItem>
  </SidebarNav>
);
