import React from 'react';
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
    <SidebarNavItem active>Goodbye</SidebarNavItem>
    <SidebarNavItem>Ob-La-Di Ob-La-Da</SidebarNavItem>
  </SidebarNav>
);
